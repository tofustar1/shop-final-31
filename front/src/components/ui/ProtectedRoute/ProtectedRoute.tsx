import {Navigate} from "react-router-dom";
import type {PropsWithChildren} from "react";

interface Props extends PropsWithChildren {
  isAllowed: boolean | null;
}

const ProtectedRoute = ({isAllowed, children}: Props) => {

  if (!isAllowed) {
    return <Navigate to={'/login'}/>
  }

  return children;
};

export default ProtectedRoute;