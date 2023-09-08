import React, { useState, useEffect, useRef } from "react";
import { Table, Modal } from "react-bootstrap";
import countpng from "../images/count.png";
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
      // message is used instead of patientID
    const orderPatientId = order.message    
      ? order.message.toString().toLowerCase()
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
  console.log(orders);

  return (
    <div className="overflow-auto">
      <div className="user-table ">
      {filteredOrders.map((order) => (
          // <div className="card mb-2 hover-card" key={order.PatientId}>
          <div className="card mb-2 hover-card" key={order.name}>
            <div className="card-body">
              <div className="media-box">
                <img className="idimages" src={countpng} alt="Logo" />
                <div
                  className="media-body"
                  onClick={() => handleRowClick(order)}
                >
                  <p className="id_name mt-0 pl-2 mb-0">{order.name}</p>
                  <p className="pl-2 mb-0">ID: {order.message}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
