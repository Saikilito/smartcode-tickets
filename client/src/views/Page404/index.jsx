import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="container-fluid bg-info" style={{ height: "100vh" }}>
      <div className="d-flex no-gutters flex-column h-100 w-100 align-items-center justify-content-center">
        <h1 className="display-1 text-white">Page 404</h1>

        <figure>
          <img className="img-fluid image404" src="/images/not_found.png" alt="not found page" />
        </figure>

        <div className="text-center bg-info w-100 h-100">
          <Link to={"/signin"}>
            <button className="btn btn-large btn-primary rounded">
              <i className="fas fa-arrow-circle-left fa-lg"></i> Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page404;
