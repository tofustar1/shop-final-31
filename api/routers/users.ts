import express from "express";
import User from "../models/User";
import {UserFields} from "../types";
import auth, {RequestWithUser} from "../middlewares/auth";
import mongoose from "mongoose";
import {OAuth2Client} from "google-auth-library";
import config from "../config";

const usersRouter = express.Router();
const googleClient = new OAuth2Client(config.googleClientId);

usersRouter.post('/', async (req, res) => {
  const userData: Omit<UserFields, 'token' | 'role'> = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const user = new User(userData);
    user.generateToken();
    await user.save();
    res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    res.sendStatus(500);
  }
});


usersRouter.post('/login', async (req, res) => {
  const user = await User.findOne({username: req.body.username});

  if (!user) {
    return res.status(400).send({error: 'Invalid data'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(400).send({error: 'Invalid data password'});
  }

  user.generateToken();
  await user.save();

  res.send(user);
});

usersRouter.post('/login/google', async (req, res, next) => {
  try {
   const ticket = await googleClient.verifyIdToken({
     idToken: req.body.credential,
     audience: config.googleClientId,
   });

   const payload = ticket.getPayload();

   console.log('Payload: ', payload);

   if (!payload) {
     return res.status(400).send({error: 'Google login error!'});
   }

   const email = payload.email;
   const id = payload.sub;
   const displayName = payload.name;

   let user = await User.findOne({ googleId: id });

   if (!user) {
     user = new User({
       username: email,
       password: crypto.randomUUID(),
       googleId: id,
       displayName
     });
   }

   user.generateToken();
   await user.save();

   return res.send(user);
  } catch (e) {
    next(e);
  }
});

usersRouter.delete('/logout', async (req, res) => {
  try {
    const token = req.get('Authorization');

    if (!token) {
      return res.status(204).send();
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.status(204).send();
    }

    console.log(user);

    user.generateToken();
    await user.save();

    console.log(user);

    res.status(204).send();
  } catch {
    res.sendStatus(500);
  }
});

usersRouter.post('/secret', auth, async (req, res) => {
  const user = (req as RequestWithUser).user;

  res.send(`Success!, ${user}`);
});

export default usersRouter;