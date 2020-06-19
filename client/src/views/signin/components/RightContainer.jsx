import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { validateForms } from "../../../helpers";
import { ToastContainer, toast } from "react-toastify";
import SigninForm from "./SigninForm";

const style = {
  height: "100vh",
};

const initialState = {
  mail: "",
  pass: "",
};

const RightContainer = () => {
  const { login } = useContext(AuthContext);

  const [dataSignin, handleDataSignin] = useState(initialState);

  const handleChange = (e) => {
    handleDataSignin({
      ...dataSignin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valError = validateForms.signin(dataSignin);
    if (valError && valError.length > 0) {
      return valError.forEach((e) => toast.error(`${e}`));
    }

    const error = await login(dataSignin);
    if (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <div className="grey lighten-3" style={style}>
      <div className="row no-gutters h-100 justify-content-center align-items-center">
        <div className="col">
          <h2 className="mx-5 mt-5 font-weight-bold">Sign in</h2>
          <p className="ml-5">And enjoy our platform</p>

          <SigninForm handleDataSignin={handleChange} handleSubmit={handleSubmit} login={login} />
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default RightContainer;
