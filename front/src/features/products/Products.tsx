import {Stack, Typography, Button, Grid} from "@mui/material"
import {Link} from "react-router-dom"
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getProducts} from "./productsThunks.ts";
import {products} from "./productsSlice.ts";
import ProductItem from "./ui/ProductItem.tsx";
import {selectUser} from "../users/usersSlice.ts";

const Products = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const items = useAppSelector(products)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <Stack spacing={2}>
      <Stack direction={'row'} sx={{ justifyContent: "space-between", alignItems: "center"}}>
        <Typography variant="h4">Products</Typography>
        {user && user.role === 'admin' && <Button
          color="primary"
          component={Link}
          to={'/products/new'}
          variant="contained"
        >
          Add product
        </Button>}
      </Stack>
      {!items.length && <Typography>Products not yet</Typography>}
      <Grid container spacing={2}>
        {items.map(i => (
          <ProductItem
            key={i._id}
            title={i.title}
            price={i.price}
            id={i._id}
            image={i.image}
            categoryTitle={i.category.title}
          />
        ))}
      </Grid>
    </Stack>
  );
};

export default Products;
