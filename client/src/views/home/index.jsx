import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Main as MainLayout } from "../../layouts";
import { UserInfo, UserMenu, Ticket } from "./components";
import { Pagination } from "./components";

import { fetcher, orderArrayObj } from "../../helpers";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [ticketsCopy, setTicketsCopy] = useState([]);
  useEffect(() => {
    async function fetcherEffect() {
      const resTickets = await fetcher(`/ticket/user/${user.id}`);

      if (!resTickets) {
        return toast.error("Unexpected Error on load data");
      }

      const ticketsArray = resTickets.response || [];
      ticketsArray.sort((a, b) => orderArrayObj(a.id, b.id, -1));
      setTicketsCopy([...ticketsArray]);
      setTickets([...ticketsArray]);
    }
    fetcherEffect();
  }, [user]);

  /**
   * @description Send a new post request for order a new ticket
   */
  const handleGetTicket = async (e) => {
    e.preventDefault();

    const data = {
      ticket_pedido: true,
      id_user: user.id,
    };

    const response = await fetcher("/ticket/add", "POST", data);

    if (response && !response.ok) {
      return toast.error(`${response.message}`);
    }

    setTickets((tickets) => [response.response, ...tickets]);
  };

  /**
   * @description Use for search the tickets
   */
  const handleSeachTickets = (e, id) => {
    e.preventDefault();

    let ticketsFiltered = ticketsCopy.filter((e) => e.id === parseInt(id));
    setTickets(ticketsFiltered);
  };
  /**
   * @description Use for view all tickets
   */
  const handleViewAll = () => {
    setTickets(ticketsCopy);
  };

  return (
    <MainLayout>
      <h1 className="font-weight-bold ml-4">Welcome {user.nombre}</h1>
      <div className="row">
        <div className="col-12 col-md-4 px-5 my-3">
          <UserInfo user={user} />
          <UserMenu
            className="my-5"
            selectOptions={selectOptions}
            handleGetTicket={handleGetTicket}
            handleSeachTickets={handleSeachTickets}
            handleViewAll={handleViewAll}
          />
        </div>
        <div className="col-12 col-md-8">
          <h2 className="display-4 text-center">My Tickets</h2>
          <div className="row">
            {tickets && tickets.length > 0 ? (
              tickets.map((e, i) => {
                return (
                  <div key={e.id} className="col-12 col-md-6 col-xl-4">
                    <Ticket index={i} ticket={e} />
                  </div>
                );
              })
            ) : (
              <p className="w-100 h3 text-center my-5">You don't have any tickets assigned</p>
            )}
          </div>
          <div className="row justify-content-center my-5">
            {tickets && tickets.length > 12 ? <Pagination /> : ""}
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
    text: "Ticket ID",
    value: "1",
  },
];
export default Home;
