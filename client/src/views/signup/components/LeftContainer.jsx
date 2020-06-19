import React from "react";

const style = {
  height: "100vh",
  backgroundImage: `url(images/auth.jpg)`,
  backgroundSize: "cover",
  color: "#f1f1f1",
};

const LeftContainer = () => {
  return (
    <div style={style}>
      <div className="row h-100 align-items-center justify-content-center text-center">
        <div className="col text-center">
          <h2 className="p-5">
            Welcome to register of <br /> <strong>SmartCode Tickets</strong>{" "}
          </h2>
          <p>Thank you for preferring us</p>
        </div>
      </div>
    </div>
  );
};

export default LeftContainer;
