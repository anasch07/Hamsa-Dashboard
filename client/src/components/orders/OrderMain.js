import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Orders from "./Orders";
import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {listOrders} from "../../Redux/Actions/OrderActions";
import Pagination from "../Pagination/Pagination";
import Toast from "../LoadingError/Toast";
import OrdersWithSearch from "./OrdersWithSearch";
const OrderMain = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

    const dispatch = useDispatch();
    useEffect(async () => {
          await dispatch(listOrders());
        }
    , [dispatch]);

  const [filterStatus, setFilterStatus] = useState("all");
  //-------------------------
  //pagination part

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    let currentPosts = orders;

  if(orders){
    currentPosts = orders.slice(indexOfFirstPost, indexOfLastPost);
  }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);



const [search, setSearch] = useState("");

  return (
    <>
      <Toast />

    <section className="content-main">

      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"


                placeholder="Search( userName, email, totalPrice, Items names )"
                className="form-control p-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select"
              value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value)
                }}
              >
                <option value={"paid"}>Paid</option>
                <option value={"Notpaid"}>Not Paid</option>
                <option value={"delievered"}>Delievered</option>
                <option value={"notDelievered"}>Not Delievered</option>
                <option value={"shipped"}>Shipped</option>
                <option value={"notShipped"}>Not Shipped</option>
                <option value={"all"}>Show all</option>
              </select>
            </div>

          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
            //    if currents posts is empty show message else show orders
                currentPosts.length === 0 ? (
                    <Message variant="alert-info">No orders</Message>
                ) : (
                    <>
                    <div>
                      {!search && (<Orders orders={orders}
                            //if filterStatus is all show all orders
                                            orders={filterStatus === "all" ? currentPosts : orders}


                                            filterStatus={filterStatus} paginate={paginate}/>
                    )
                    }
                      {search && orders && (<OrdersWithSearch
                                           orders={orders}
                                           search={search}
                                          />
                      )
                      }
                    </div>
                    {/*pagination if filter is all*/}

                      {filterStatus === "all" && !search && (
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={orders.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    )}
                    </>
                )
            )}
          </div>
        </div>
      {/*  if currents posts are defined */}

      </div>
    </section>
    </>
  );
};

export default OrderMain;
