import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { validateForms } from "../../../helpers";
import { ToastContainer, toast } from "react-toastify";

import SignupForm from "./SignupForm";

const style = {
  height: "100vh",
};

const initialState = {
  nombre: "",
  mail: "",
  pass: "",
  pass_r: "",
};

const RightContainer = () => {
  const { register } = useContext(AuthContext);
  const [dataSignin, handleDataSignin] = useState(initialState);

  const handleChange = (e) => {
    handleDataSignin({
      ...dataSignin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valError = validateForms.signup(dataSignin);
    if (valError && valError.length > 0) {
      return valError.forEach((e) => toast.error(`${e}`));
    }

    const objData = { ...dataSignin };
    delete objData.pass_r;

    const error = await register(objData);
    if (error) {
      toast.error(`${error}`);
    }
  };
  return (
    <div className="grey lighten-3" style={style}>
      <div className="row no-gutters h-100 justify-content-center align-items-center">
        <div className="col">
          <h2 className="mx-5 mt-5 font-weight-bold">Sign Up</h2>
          <p className="ml-5">And enjoy our platform</p>

          <SignupForm handleDataSignun={handleChange} handleSubmit={handleSubmit} />
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
