import React, { useState } from "react";

const UserMenu = ({ selectOptions, handleSelectedOption, handleSeachTickets, handleViewAll }) => {
  const [inputValue, setInputValue] = useState({ search: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  return (
    <div className="my-5">
      <p>Search for tickets</p>
      <form onSubmit={(e) => handleSeachTickets(e, inputValue)} className="form-row">
        <div className="input-group">
          <select
            defaultValue={1}
            onChange={(e) => handleSelectedOption(e.target.value)}
            className="browser-default custom-select"
            id="inputGroupSelect01"
          >
            {selectOptions.map((e, i) => (
              <option key={i} value={e.value}>
                {" "}
                {e.text}{" "}
              </option>
            ))}
          </select>
          <input
            onChange={handleChange}
            name="search"
            type="number"
            aria-label="Last name"
            className="form-control"
          />
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
