import React, { useState, useEffect } from "react";
import { Main as MainLayout } from "../../layouts";
import { UserInfo, UserMenu, Ticket } from "./components";
import { Pagination } from "./components";

import { fetcher, orderArrayObj } from "../../helpers";
import { toast, ToastContainer } from "react-toastify";

const Tickets = () => {
  const [search, setSearch] = useState("1");
  const [tickets, setTickets] = useState([]);
  const [ticketsCopy, setTicketsCopy] = useState([]);
  const [pagination, setPagination] = useState(0);
  const maxPerPage = 6;

  useEffect(() => {
    async function fetcherEffect() {
      const resTickets = await fetcher(`/ticket/all`);

      if (!resTickets) {
        return toast.error("Unexpected Error on load data");
      }

      const ticketsArray = resTickets.response;
      ticketsArray.sort((a, b) => orderArrayObj(a.id, b.id, -1));
      setTicketsCopy([...ticketsArray]);
      setTickets([...ticketsArray]);
    }
    fetcherEffect();
  }, []);

  /**
   * @description Send a new delete request for delete a tickt
   * @param {number} id ticket id
   */
  const handleDeleteTicket = async (id) => {
    const response = await fetcher(`/ticket/delete/${id}`, "DELETE");

    if (!response || !response.ok) {
      return toast.error("Error: Ticket not delete please try again leater");
    }

    const updateTickets = tickets.filter((e) => e.id !== id);
    setTickets(updateTickets);
    return toast.success("Ticket Delete Successfull");
  };

  /**
   * @description assign tickeckt
   * @param {number} id
   * @param {object} ticket
   */
  const handleAssignTicket = async (id, ticket) => {
    let data = {
      ticket_pedido: false,
    };

    const response = await fetcher(`/ticket/update/${id}`, "PUT", data);

    if (!response || !response.ok) {
      return toast.error("Error: Tickets not update please try again leater");
    }

    data = {
      ...ticket,
      ticket_pedido: false,
    };
    const updateTickets = tickets.map((e) => {
      if (e.id === id) {
        return data;
      }
      return e;
    });

    setTickets(updateTickets);
    return toast.success("Ticket Update Successfull");
  };

  /**
   *
   * @param {object} e event
   * @param {number} id ticket id
   */
  const handleUpdateTicket = async (e, id) => {
    e.preventDefault();
    const val = e.target.elements[0].value === "true" ? true : false;
    const userId = parseInt(e.target.elements[1].value);
    let data = {
      ticket_pedido: val,
      id_user: userId,
    };

    const response = await fetcher(`/ticket/update/${id}`, "PUT", data);

    if (!response || !response.ok) {
      return toast.error("Error: Tickets not update please try again leater");
    }

    data = {
      ...response.response,
    };

    const updateTickets = tickets.map((e) => {
      if (e.id === id) {
        return data;
      }
      return e;
    });

    setTickets(updateTickets);
    return toast.success("Ticket Update Successfull");
  };

  /**
   * @description Use for search the tickets
   */
  const handleSeachTickets = (e, value) => {
    e.preventDefault();
    let ticketsFiltered = [];
    switch (search) {
      case "1":
        ticketsFiltered = ticketsCopy.filter((e) => e.ticket_pedido === false);
        setTickets(ticketsFiltered);
        break;
      case "2":
        ticketsFiltered = ticketsCopy.filter((e) => e.ticket_pedido === true);
        setTickets(ticketsFiltered);
        break;
      case "id_user":
        ticketsFiltered = ticketsCopy.filter((e) => e.id_user.id === parseInt(value.search));
        setTickets(ticketsFiltered);
        break;
      case "id_ticket":
        ticketsFiltered = ticketsCopy.filter((e) => e.id === parseInt(value.search));
        setTickets(ticketsFiltered);
        break;

      default:
        setTickets(ticketsCopy);
        break;
    }

    /*
    let ticketsFiltered = tickets.filter((e) => e.id === parseInt(id));
    setTickets(ticketsFiltered);*/
  };

  const handleViewAll = () => {
    console.log(ticketsCopy);
    setTickets(ticketsCopy);
  };

  const handleSelectedOption = (option) => {
    setSearch(option);
  };

  return (
    <MainLayout>
      <h1 className="font-weight-bold ml-4">Welcome to Tickets</h1>
      <div className="row">
        <div className="col-12 col-md-4 px-5 my-3">
          <UserInfo />
          <UserMenu
            className="my-5"
            handleSelectedOption={handleSelectedOption}
            selectOptions={selectOptions}
            handleSeachTickets={handleSeachTickets}
            handleViewAll={handleViewAll}
          />
        </div>
        <div className="col-12 col-md-8">
          <h2 className="display-4 text-center">All Tickets</h2>
          <div className="row">
            {tickets && tickets.length > 0 ? (
              tickets.map((e, i) => {
                if (i > pagination * maxPerPage && i <= pagination * maxPerPage + maxPerPage) {
                  return (
                    <div key={e.id} className="col-12 col-md-6 col-xl-4">
                      <Ticket
                        index={i}
                        ticket={e}
                        user={e.id_user}
                        handleDeleteTicket={handleDeleteTicket}
                        handleAssignTicket={handleAssignTicket}
                        handleUpdateTicket={handleUpdateTicket}
                      />
                    </div>
                  );
                } else {
                  return null;
                }
              })
            ) : (
              <p className="w-100 h3 text-center my-5">don't exits any tickets created</p>
            )}
          </div>
          <div className="row justify-content-center my-5">
            {tickets && (
              <Pagination
                pagination={pagination}
                setPagination={setPagination}
                total={Math.ceil((tickets.length + 1) / maxPerPage)}
              />
            )}
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
    text: "Status Ready",
    value: 1,
  },
  {
    text: "Status Pending",
    value: 2,
  },
  {
    text: "User ID",
    value: "id_user",
  },
  {
    text: "Ticket ID",
    value: "id_ticket",
  },
];
export default Tickets;
