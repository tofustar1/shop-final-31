import {type ChangeEvent, useState, type SubmitEvent, useEffect} from "react";
import type {ProductMutation} from "../../../interfaces.ts";
import {Button, MenuItem, Stack, TextField} from "@mui/material";
import FileInput from "../../../components/ui/FileInput/FileInput.tsx";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {getCategories} from "../../categories/categoriesThunks.ts";
import {categories} from "../../categories/categoriesSlice.ts";

interface Props {
  onSubmit: (product: ProductMutation) => void;
}

const ProductForm = ({ onSubmit }: Props) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(categories);

  const [state, setState] = useState<ProductMutation>({
    category: '',
    title: '',
    description: '',
    price: '',
    image: null
  })

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const fileInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target

    if (files) {
      setState(prevState => ({ ...prevState, [name]: files[0] }))
    }
  }

  const submitHandler = (e: SubmitEvent) => {
    e.preventDefault()

    onSubmit(state)
  }

  return (
    <form onSubmit={submitHandler}>
      <Stack spacing={2} sx={{ maxWidth: 600 }}>
        <TextField
          select
          id="category"
          label="Category"
          value={state.category}
          name="category"
          onChange={changeHandler}
        >
          <MenuItem value="" disabled>Please select a category</MenuItem>
          {items.map(cat => (
            <MenuItem key={cat._id} value={cat._id}>{cat.title}</MenuItem>
          ))}
        </TextField>
        <TextField
         id="title"
         label="Title"
         value={state.title}
         name="title"
         onChange={changeHandler}
        />
        <TextField
          id="price"
          label="Price"
          value={state.price}
          name="price"
          onChange={changeHandler}
        />
        <TextField
          id="description"
          label="Description"
          value={state.description}
          name="description"
          onChange={changeHandler}
          multiline
          rows={3}
        />
        <FileInput
          label={"Image"}
          name="image"
          onChange={fileInputChangeHandler}
        />
        <Button type="submit" color="primary" variant="contained">Create</Button>
      </Stack>
    </form>
  );
};

export default ProductForm;