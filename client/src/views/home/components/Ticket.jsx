import React from "react";
import moment from "moment";
const Ticket = ({ index, ticket: { id, ticket_pedido, created_at } }) => {
  return (
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
        <p className={`card-text p-1 text-center text-white ${ticket_pedido ? "bg-warning" : "bg-success"}`}>
          {" "}
          <strong>Status: </strong> <span className={ticket_pedido ? "text-info" : "text-success"}></span>{" "}
          {ticket_pedido ? "Pending" : "Ready"}
        </p>
      </div>
    </div>
  );
};

export default Ticket;
