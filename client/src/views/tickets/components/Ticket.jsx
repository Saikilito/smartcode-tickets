import React, { useState } from "react";
import moment from "moment";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

const Ticket = ({
  index,
  user,
  ticket: { id, ticket_pedido, created_at },
  ticket,
  handleDeleteTicket,
  handleAssignTicket,
  handleUpdateTicket,
}) => {
  const [update, setUpdate] = useState(false);
  const [id_user, setIdUser] = useState(user.id);

  const handleChange = (e) => {
    const { value } = e.target;
    setIdUser(value);
  };
  return (
    <>
      <div className="card custom-card m-3">
        <div className="card-cover" style={{ backgroundImage: `url(https://picsum.photos/40${index + 1})` }}>
          <div className="circle-image circle-image-ticket">
            <p className="h1">{id} </p>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title"> Ticket ID: {id} </h5>
          <p className="card-text">
            <strong>Date:</strong>
            {moment(created_at).format("DD/MM/YYYY")}{" "}
          </p>
          <p className="card-text">
            {" "}
            <strong>User ID: </strong> {user.id}
          </p>
          <div className={`p-1 ${ticket_pedido ? "bg-warning" : "bg-success"}`}>
            <p className="card-text text-center text-white">
              {" "}
              <strong>Status: </strong> {ticket_pedido ? "Pending" : "Ready"}
            </p>
          </div>{" "}
        </div>
        <div className="card-footer d-flex justify-content-center">
          <button onClick={() => handleAssignTicket(id, ticket)} className="btn btn-sm btn-success">
            <i className="fas fa-check"></i>
          </button>
          <button onClick={() => setUpdate((status) => !status)} className="btn btn-sm btn-warning">
            <i className="fas fa-wrench"></i>
          </button>
          <button onClick={() => handleDeleteTicket(id)} className="btn btn-sm btn-danger">
            <i className="fas fa-minus-circle"></i>
          </button>
        </div>
      </div>
      <MDBContainer className={update ? "" : "d-none"}>
        <MDBRow>
          <MDBCol md="12">
            <form onSubmit={(e) => handleUpdateTicket(e, id, ticket)}>
              <div className="grey-text">
                <select
                  defaultValue={ticket_pedido}
                  name="ticket_pedido"
                  className="browser-default custom-select"
                >
                  <option value={false}>Raedy</option>
                  <option value={true}>Pending</option>
                </select>
                <MDBInput
                  onChange={handleChange}
                  name="id_user"
                  label="User ID"
                  value={id_user}
                  group
                  type="number"
                  validate
                />
              </div>
              <div className="text-center">
                <MDBBtn onClick={() => setUpdate(false)} size="sm" color="success" type="submit">
                  Update
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Ticket;
