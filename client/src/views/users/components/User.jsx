import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

const User = ({ index, user, handleUpdateUser, handleDeleteUser }) => {
  const initialState = {
    nombre: user.nombre,
    mail: user.mail,
    rol: user.id_tipouser.nombre,
  };

  const [update, setUpdate] = useState(false);
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <div className="card custom-card">
      <div className="card-cover" style={{ backgroundImage: `url(https://picsum.photos/50${user.id})` }}>
        <div
          className="circle-image"
          style={{ backgroundImage: `url(http://lorempixel.com/200/20${user.id}/people/)` }}
        ></div>
      </div>
      <div className="card-body">
        <h5 className="card-title"> {user.nombre} </h5>
        <p className="card-text">
          {" "}
          <strong>User ID: </strong> {user.id}{" "}
        </p>
        <p className="card-text">
          {" "}
          <strong>Email: </strong> {user.mail}{" "}
        </p>

        <p className="card-text text-center text-white bg-info p-1">
          {" "}
          <strong>ROL: </strong> {user.id_tipouser.nombre}{" "}
        </p>
      </div>

      <div className="row justify-content-center p-3">
        <button onClick={() => setUpdate((status) => !status)} className="btn btn-sm btn-success rounded">
          <i className="fas fa-wrench"></i>
        </button>
        <button
          onClick={() => handleDeleteUser(user.id)}
          id="btn-user-delete"
          className="btn btn-sm btn-danger rounded"
        >
          <i className="fas fa-minus-circle"></i>
        </button>
      </div>

      <MDBContainer className={update ? "" : "d-none"}>
        <MDBRow>
          <MDBCol md="12">
            <form onSubmit={(e) => handleUpdateUser(e, user.id, data)}>
              <div className="grey-text">
                <select
                  defaultValue="admin"
                  onChange={handleChange}
                  name="rol"
                  className="browser-default custom-select"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                <MDBInput
                  onChange={handleChange}
                  name="nombre"
                  label="Name"
                  value={data.nombre}
                  group
                  type="text"
                  validate
                />
                <MDBInput
                  onChange={handleChange}
                  name="mail"
                  label="Email"
                  value={data.mail}
                  group
                  type="email"
                  validate
                />
              </div>
              <div className="text-center">
                <MDBBtn
                  className="mb-3"
                  onClick={() => setUpdate(false)}
                  size="sm"
                  color="success"
                  type="submit"
                >
                  Update
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default User;
