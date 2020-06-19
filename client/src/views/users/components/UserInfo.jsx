import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const UserInfo = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="card custom-card">
      <div className="card-cover" style={{ backgroundImage: `url(https://picsum.photos/500)` }}>
        <div
          className="circle-image"
          style={{ backgroundImage: `url(http://lorempixel.com/200/200/people/)` }}
        ></div>
      </div>
      <div className="card-body">
        <h5 className="card-title"> {user.nombre} </h5>
        <p className="card-text">
          {" "}
          <strong>Email: </strong> {user.mail}{" "}
        </p>

        <p className="card-text text-center text-white bg-info p-1">
          {" "}
          <strong>ROL: </strong> {user.rol}{" "}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
