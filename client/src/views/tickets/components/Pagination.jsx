import React from "react";
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";

const PaginationPage = ({ pagination, setPagination, total }) => {
  return (
    <MDBRow>
      <MDBCol>
        <MDBPagination circle>
          <MDBPageItem disabled></MDBPageItem>
          <MDBPageItem
            onClick={() => setPagination(pagination - 1)}
            disabled={pagination === 0 ? true : false}
          >
            <MDBPageItem>
              <MDBPageNav className="page-link">&laquo;</MDBPageNav>
            </MDBPageItem>
          </MDBPageItem>
          <MDBPageItem active>
            <MDBPageNav className="page-link">{pagination + 1}</MDBPageNav>
          </MDBPageItem>

          <MDBPageItem
            onClick={() => setPagination(pagination + 1)}
            disabled={pagination === total - 1 ? true : false}
          >
            <MDBPageNav className="page-link">&raquo;</MDBPageNav>
          </MDBPageItem>
        </MDBPagination>
      </MDBCol>
    </MDBRow>
  );
};

export default PaginationPage;
