import path from "path";
import {configDotenv} from "dotenv";
import {CorsOptions} from "cors";

const rootPath = __dirname;

const envFile = process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : '.env';
configDotenv({path: path.join(rootPath, envFile)});

const corsWhiteList = ['http://localhost:5173', 'http://localhost:5183'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || corsWhiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

const config = {
  port: process.env.PORT,
  rootPath,
  corsOptions,
  publicPath: path.join(rootPath, 'public'),
  db: process.env.MONGO_DB_URL || "mongodb://localhost/shop",
  googleClientId: process.env.GOOGLE_CLIENT_ID,
};

export default config;