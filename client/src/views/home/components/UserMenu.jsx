import React, { useState } from "react";
import { MDBBtn } from "mdbreact";

const UserMenu = ({ selectOptions, handleGetTicket, handleSeachTickets, handleViewAll }) => {
  const [id, setId] = useState(0);
  const handleChange = (e) => {
    const idInput = e.target.value;
    setId((id) => idInput);
  };
  return (
    <>
      <MDBBtn onClick={(e) => handleGetTicket(e)} className="btn-block" color="info">
        Get new ticket
      </MDBBtn>
      <p>Search for tickets</p>
      <form onSubmit={(e) => handleSeachTickets(e, id)} className="form-row">
        <div className="input-group">
          <select className="browser-default custom-select" id="inputGroupSelect01">
            {selectOptions.map((e, i) => (
              <option key={i} defaultValue={e.value}>
                {e.text}
              </option>
            ))}
          </select>
          <input onChange={handleChange} type="number" aria-label="Last name" className="form-control" />
          <div className="input-group-prepend">
            <button type="submit" className="input-group-text rounded">
              <i className="fas fa-search"></i>{" "}
            </button>
          </div>
        </div>
      </form>
      <button onClick={handleViewAll} className="btn btn-info btn-block btn-sm my-3">
        View all
      </button>
    </>
  );
};

export default UserMenu;
