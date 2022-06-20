import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Pagination from "../Pagination/Pagination";
import {deleteClient, listClient} from "../../Redux/Actions/clientActions";
import Toast from "../LoadingError/Toast";

const MainClients = () => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(listClient());
    }
    ,[dispatch]);

    //dispatch for client lists

    const clientList = useSelector((state) => state.clientList);
    const { loading, CLIENTS } = clientList;

        // console.log(clientList.CLIENTS);


const handleDelete = (id) => {
    dispatch(deleteClient(id));
    dispatch(listClient());
}


//pagination part
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    let currentPosts = CLIENTS;

    if(CLIENTS){
        //just for info the server send clients ordred by the newest ones
        currentPosts = CLIENTS.slice(indexOfFirstPost, indexOfLastPost);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [search, setSearch] = useState("");

    return (
        <>
        <Toast />


            {currentPosts &&
        <div className="content-main ">



            <div className="content-header">
                <h2 className="content-title">Clients</h2>


                <div>
                    <Link to="/addclient" className="btn btn-primary">
                        Create new
                    </Link>
                </div>
            </div>

            <div className="col-lg-4 col-md-6 me-auto">
                <input
                    type="text"
                    placeholder="Search...( Name | Email | Address | Phone )"
                    className="form-control p-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="table-responsive text-center">
                <table className="table table-striped   table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!search && currentPosts && currentPosts.map((client, index) => (
                        <tr key={client._id}>
                            <th scope="row">{index + 1 + (currentPage-1)*postsPerPage}</th>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>{client.address}</td>
                            <td>
        <Link to={`/client/${client._id}/edit`} className="btn btn-primary m-2">Edit</Link>
        <Link to="#" onClick={() => handleDelete(client._id)} className="btn btn-danger m-2">Delete</Link>

                            </td>
                        </tr>
                    ))}
                    {search && CLIENTS && CLIENTS.
                        //filter if name or email
                        filter(client => client.name.toLowerCase().includes(search.toLowerCase())
                            || client.email.toLowerCase().includes(search.toLowerCase())
                            || client.phone.toLowerCase().includes(search.toLowerCase())
                            || client.address.toLowerCase().includes(search.toLowerCase())
                        ).

                    map((client, index) => (
                        <tr key={client._id}>
                            <th scope="row">{index + 1 + (currentPage-1)*postsPerPage}</th>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>{client.address}</td>
                            <td>
                                <Link to={`/client/${client._id}/edit`} className="btn btn-primary m-2">Edit</Link>
                                <Link to="#" onClick={() => handleDelete(client._id)} className="btn btn-danger m-2">Delete</Link>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

        </div>

            <div>
                {!search && <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={CLIENTS.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
                }
            </div>

        </div> }
        </>

    );
};

export default MainClients;
