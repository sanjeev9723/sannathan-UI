import React, { useState, useEffect, useRef } from "react";
import { Table, Modal } from "react-bootstrap";
import profile from "../images/profile.png";
import { useReactToPrint } from "react-to-print";
import Button from "react-bootstrap/Button";

const UserTable = ({
  orders,
  checkedCount,
  setCheckedCount,
  showAllPatients,
  searchTerm,
  onPatientClick,
}) => {
  const componentRef = useRef(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  });

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "print doc",
  });
  const handleRowClick = (order) => {
    setSelectedOrder(order);
    onPatientClick(order); // Call onPatientClick function and pass the order as an argument
  };
  // console.log(onPatientClick);
  // const handleRowClick = (order, index) => {
  //   setSelectedOrder({ ...order, index });
  // };
  // const handleRowClick = (order) => {
  //   setSelectedOrder(order); // Set the selectedOrder state
  // };

  const handleMarkVisited = () => {
    if (selectedOrder && !selectedOrder.visited) {
      const updatedOrders = orders.map((order, index) => {
        if (index === selectedOrder.index) {
          const updatedOrder = { ...order, visited: true };
          // Save updated order to localStorage
          localStorage.setItem(
            `order_${order.PatientId}`,
            JSON.stringify(updatedOrder)
          );
          return updatedOrder;
        }
        return order;
      });
      setCheckedCount((prevCount) => prevCount + 1);
      // Close the modal after marking as visited
      setSelectedOrder(null);
    }
  };

  useEffect(() => {
    // console.log("Fetched Orders:", orders);
  }, [orders]);
  useEffect(() => {
    if (selectedOrder && selectedOrder.index !== undefined) {
      // Check if the order exists in localStorage
      const storedOrder = localStorage.getItem(
        `order_${selectedOrder.PatientId}`
      );
      if (storedOrder) {
        const parsedOrder = JSON.parse(storedOrder);
        setSelectedOrder(parsedOrder);
      }
    }
  }, [selectedOrder]);

  const getVisitedStatus = (order) => {
    const storedOrder = localStorage.getItem(`order_${order.PatientId}`);
    return storedOrder ? JSON.parse(storedOrder).visited : false;
  };

  // Filter orders based on visited filter and showAllPatients state
  const filteredOrders = orders.filter((order) => {
    const visitedStatus = getVisitedStatus(order);
    const orderName = order.name ? order.name.toLowerCase() : "";
    const orderTokenNumber = order.TokenNumber
      ? order.TokenNumber.toString().toLowerCase()
      : "";
    const orderPatientId = order.PatientId
      ? order.PatientId.toString().toLowerCase()
      : "";

    if (showAllPatients && searchTerm) {
      // If showAllPatients is true and searchTerm exists, filter based on TokenNumber, name, PatientId, and searchTerm
      return (
        orderName.includes(searchTerm.toLowerCase()) ||
        orderTokenNumber.includes(searchTerm.toLowerCase()) ||
        orderPatientId.includes(searchTerm.toLowerCase())
      );
    } else if (showAllPatients) {
      // If only showAllPatients is true, return all orders
      return true;
    } else if (visitedStatus && searchTerm) {
      // If visitedStatus is true and searchTerm exists, filter based on visitedStatus, TokenNumber, name, PatientId, and searchTerm
      return (
        visitedStatus &&
        (orderName.includes(searchTerm.toLowerCase()) ||
          orderTokenNumber.includes(searchTerm.toLowerCase()) ||
          orderPatientId.includes(searchTerm.toLowerCase()))
      );
    } else {
      // If visitedStatus is true or searchTerm exists, filter based on visitedStatus
      return visitedStatus;
    }
  });

  return (
    <div className="user-table">
      <div className="table-responsive">
        <Table hover>
          {/* Table headers */}
          <thead>
            {/* <tr>
                <th></th>
                <th></th>
                <th></th>
                {showAllPatients && <th>Visited</th>}
              </tr> */}
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((ele, index) => (
                <tr
                  key={ele.PatientId}
                  onClick={() => handleRowClick(ele, index)}
                  className={getVisitedStatus(ele) ? "visited-row" : ""}
                >
                  <td>
                    <img
                      src={profile}
                      alt="Profile Icon"
                      className="profile-icon2"
                    />
                  </td>
                  <td>
                    <h6 className="user-name">{ele.name}</h6>
                    <p className="user-id">ID: {ele.message}</p>
                  </td>
                  <td>
                    {/* <div className="token-wrapper">
                      <p
                        className={
                          getVisitedStatus(ele)
                            ? "token-number visited"
                            : "token-number"
                        }
                      >
                        Token: {ele.id}
                      </p>
                    </div> */}
                  </td>
                  {/* {showAllPatients && (
                    <td>
                      {getVisitedStatus(ele) ? (
                        <h6 className="visited-row"></h6>
                      ) : (
                        <span className="not-visited"></span>
                      )}
                    </td>
                  )} */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No Patients available</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Modal to display selected order details */}
      </div>
    </div>
  );
};

export default UserTable;
