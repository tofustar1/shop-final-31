import {Typography} from "@mui/material";
import ProductForm from "./ui/ProductForm.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import type {ProductMutation} from "../../interfaces.ts";
import {createProduct} from "./productsThunks.ts";
import {useNavigate} from "react-router-dom";

const NewProduct = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const onSubmit = async (product: ProductMutation) => {
    await dispatch(createProduct(product)).unwrap();
    navigate("/")
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>New product</Typography>
      <ProductForm onSubmit={onSubmit} />
    </>
  );
};

export default NewProduct;