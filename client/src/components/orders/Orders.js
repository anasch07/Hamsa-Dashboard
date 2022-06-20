import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const   Orders = (props) => {
  const { orders,filterStatus } = props;
  return (

    <table className="table">
      <thead>
        <tr>
          <th scope="col">Seller Name</th>
          <th scope="col">Client Name</th>
          <th scope="col">Email</th>
          <th scope="col">Total</th>
          <th scope="col">Paid</th>
          <th scope="col">Date</th>
          <th>Status</th>
          <th scope="col" className="text-end">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.filter(order => {
                console.log(order)
            if(filterStatus === "all"){
                return order
            }
            if(filterStatus === "paid"){
                return order.isPaid === true
            }
            if(filterStatus === "Notpaid"){
                return order.isPaid === false
            }
            if(filterStatus === "delievered"){
                return order.isDelivered === true
            }
            if(filterStatus === "notDelievered"){
                return order.isDelivered === false
            }
            if(filterStatus === "shipped"){
                return order.isShipped === true
            }
            if(filterStatus === "notShipped"){
                return order.isShipped === false
            }
        }
        ).
        map((order) => (
          <tr key={order._id}>
            <td>{order.seller.name}</td>
            <td>
              <b>{order.user.name}</b>
            </td>
            <td>{order.user.email}</td>
            <td>${order.totalPrice}</td>
            <td>
              {order.isPaid ? (
                <span className="badge rounded-pill alert-success">
                  Paid At {moment(order.paidAt).format("MMM Do YY")}
                </span>
              ) : (
                <span className="badge rounded-pill alert-danger">
                  Not Paid
                </span>
              )}
            </td>
            <td>{moment(order.createdAt).format("MMM Do YY")}</td>
            <td>
              {order.isDelivered ? (
                <span className="badge btn-success m-2">Delivered</span>
              ) : (
                <span className="badge btn-dark m-2">Not delivered</span>
              )}
                {order.isShipped ? (
                    <span className="badge btn-success m-2">Shipped</span>
                ) : (
                    <span className="badge btn-dark m-2">Not Shipped</span>
                )}
            </td>
            <td className="d-flex justify-content-end align-item-center">
              <Link to={`/order/${order._id}`} className="text-success">
                <i className="fas fa-eye"></i>
              </Link>
            </td>
          </tr>
        ))}

        {/* Not paid Not delivered */}
        {/* <tr>
          <td>
            <b>Velcro Sneakers For Boys & Girls (Blue)</b>
          </td>
          <td>user@example.com</td>
          <td>$45,789</td>
          <td>
            <span className="badge rounded-pill alert-danger">Not paid</span>
          </td>
          <td>Dec 12 2021</td>
          <td>
            <span className="badge btn-dark">Not Delivered</span>
          </td>
          <td className="d-flex justify-content-end align-item-center">
            <Link to={`/order`} className="text-success">
              <i className="fas fa-eye"></i>
            </Link>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};

export default Orders;
