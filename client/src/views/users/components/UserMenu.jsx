import React, { useState } from "react";

const UserMenu = ({ selectOptions, handleViewAll, handleSearchUsers }) => {
  const [id, setId] = useState(0);
  const handleChange = (e) => {
    const idInput = e.target.value;
    console.log("buh1", idInput);
    setId((id) => idInput);
  };
  return (
    <div className="my-5">
      <p>Search for tickets</p>
      <form onSubmit={(e) => handleSearchUsers(e, id)} className="form-row">
        <div className="input-group">
          <select className="browser-default custom-select" id="inputGroupSelect01">
            {selectOptions.map((e, i) => (
              <option key={i} value={e.value}>
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
    </div>
  );
};

export default UserMenu;
