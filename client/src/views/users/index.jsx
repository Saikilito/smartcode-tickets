import React, { useState, useEffect } from "react";
import { Main as MainLayout } from "../../layouts";
import { UserInfo, UserMenu, User } from "./components";
import { Pagination } from "./components";

import { fetcher, orderArrayObj } from "../../helpers";
import { toast, ToastContainer } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [usersCopy, setUsersCopy] = useState([]);

  useEffect(() => {
    async function fetcherEffect() {
      const resUsers = await fetcher(`/user/all`);

      if (!resUsers) {
        return toast.error("Unexpected Error on load data");
      }

      const usersArray = resUsers.response || [];
      usersArray.sort((a, b) => orderArrayObj(a.id, b.id, -1));
      setUsersCopy([...usersArray]);
      setUsers([...usersArray]);
    }
    fetcherEffect();
  }, []);

  /**
   * @description Send a new delete request for delete a user
   * @param {number} id user id
   */
  const handleDeleteUser = async (id) => {
    const response = await fetcher(`/user/delete/${id}`, "DELETE");

    if (!response || !response.ok) {
      return toast.error("Error: User not delete please try again leater");
    }

    const updateUsers = users.filter((e) => e.id !== id);
    setUsers(updateUsers);
    return toast.success("User Delete Successfull");
  };

  /**
   * @description use for update a user
   * @param {object} e event
   * @param {number} id User id
   */
  const handleUpdateUser = async (e, id, user) => {
    e.preventDefault();

    const response = await fetcher(`/user/update/${id}`, "PUT", user);

    if (!response || !response.ok) {
      if (response) {
        return toast.error(response.error);
      }
      return toast.error("Error: User not update please try again leater");
    }

    const data = {
      ...response.response,
    };

    const updateUsers = users.map((e) => {
      if (e.id === id) {
        return data;
      }
      return e;
    });

    setUsers(updateUsers);
    return toast.success("User Update Successfull");
  };
  /**
   * @description Use for search the users
   */
  const handleSearchUsers = (e, id) => {
    e.preventDefault();
    let usersFiltered = usersCopy.filter((e) => e.id === parseInt(id));
    setUsers(usersFiltered);
  };

  /**
   * @description Use for view all tickets
   */
  const handleViewAll = () => {
    setUsers(usersCopy);
  };

  return (
    <MainLayout>
      <h1 className="font-weight-bold ml-4">Welcome to Users</h1>
      <div className="row">
        <div className="col-12 col-md-4 px-5 my-3">
          <UserInfo />
          <UserMenu
            className="my-5"
            handleViewAll={handleViewAll}
            selectOptions={selectOptions}
            handleSearchUsers={handleSearchUsers}
          />
        </div>
        <div className="col12 col-md-8">
          <h2 className="display-4 text-center">All Users</h2>
          <div className="row">
            {users && users.length > 0 ? (
              users.map((e, i) => (
                <div key={i} className="col-12 col-md-6 col-xl-4 my-3">
                  <User
                    index={i}
                    user={e}
                    handleUpdateUser={handleUpdateUser}
                    handleDeleteUser={handleDeleteUser}
                  />
                </div>
              ))
            ) : (
              <p className="w-100 h3 text-center my-5">You don't have any users</p>
            )}
          </div>
          <div className="row justify-content-center my-5">
            {users && users.length > 5 ? <Pagination /> : ""}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </MainLayout>
  );
};

const selectOptions = [
  {
    text: "User ID",
    value: "2",
  },
];
export default Users;
