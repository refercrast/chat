import React, { Fragment } from "react";
import AuthForm from "../components/auth/AuthForm";

interface StateProps {
    authType: string
}

const AuthPage = (props: StateProps) => {
  return (
      <Fragment>
          <AuthForm authType={props.authType}/>
      </Fragment>
  )
};

export default AuthPage;