import {Route, Routes} from "react-router-dom"
import {Container, Typography} from "@mui/material"
import AppToolbar from "./components/ui/AppToolbar/AppToolbar.tsx"
import Products from "./features/products/Products.tsx";
import NewProduct from "./features/products/NewProduct.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import ProtectedRoute from "./components/ui/ProtectedRoute/ProtectedRoute.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/users/usersSlice.ts";

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <Container component="main" maxWidth="xl">
        <Routes>
          <Route path="/" element={<Products/>}/>
          <Route path="/products/new" element={(
            <ProtectedRoute isAllowed={(user && user.role ==='admin')}>
              <NewProduct/>
            </ProtectedRoute>
          )}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='*' element={<Typography variant={"h4"}>Not found</Typography>}/>
        </Routes>
      </Container>
    </>
  )
};

export default App
