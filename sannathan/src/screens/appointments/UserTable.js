import React, { useState, useEffect, useRef } from "react";
import { Table, Modal } from "react-bootstrap";
import countpng from "../images/count.png";
import { useReactToPrint } from "react-to-print";
import Button from "react-bootstrap/Button";
import useAxiosPost from "../../api/useAxiosPost";


const UserTable = ({
  orders,
  checkedCount,
  setCheckedCount,
  showAllPatients,
  searchTerm,
  onPatientClick,
}) => {
  const axiosInst = useAxiosPost();

  const componentRef = useRef(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null); 

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  });

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "print doc",
  });
  // Function to fetch patient details using Axios
  const fetchPatientDetails = async (patientId) => {
    try {
      const response = await axiosInst.get("/admin/getPatientDetails", {
        params: {
          patientId: patientId,
        },
      });

      const patientDetails = response.data; // Assuming the response contains patient details
      console.log( response.data);
      return patientDetails;
      console.log(patientDetails);
    } catch (error) {
      console.error("Error fetching patient details:", error);
      return null;
    }
  };

  const handleRowClick = async (order) => {
    setSelectedOrder(order);

    // Fetch patient details using the patient ID from the clicked order
    const patientDetails = await fetchPatientDetails(order.message);

    if (patientDetails) {
      // Handle the patient details, e.g., display them in a modal
      setPatientDetails(patientDetails);
      onPatientClick(patientDetails); // Call onPatientClick function and pass the order as an argument

      // You can open a modal and display the patient details here
      // Example: set a state to show a modal and pass patientDetails as props to the modal component
    } else {
      // Handle the case when patient details are not available
      console.error("Patient details not found.");
    }
  };

  useEffect(() => {
    // console.log("Fetched Orders:", orders);
  }, [orders]);
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
  // console.log(orders);
  console.log(patientDetails);

  return (
    <div className="overflow-auto">
      <div className="user-table ">
      {filteredOrders.map((order) => (
          // <div className="card mb-2 hover-card" key={order.PatientId}>
          <div className="card mb-2 hover-card" key={order.message}>
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
