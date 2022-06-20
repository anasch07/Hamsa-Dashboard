import React from 'react';
import {useState} from "react";
import { createClient} from "../../Redux/Actions/clientActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";




const AddClientMain = () => {


    const dispatch = useDispatch();
    const clientCreate = useSelector((state) => state.clientCreate);
    const { loading: loadingClient, error: errorClient } = clientCreate;


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createClient({name, email, address, city, postalCode, country,phone}));
    setName("");
    setEmail("");
    setAddress("");
    setCity("");
    setPostalCode("");
    setCountry("");
    setPhone("");

  }


    return (
<>
        <Toast />
    {errorClient && <Message variant="alert-danger">{errorClient}</Message>}
    {loadingClient && <Loading />}



        <div className={"content-main"}>

            <form onSubmit={submitHandler}>

                <div className="content-header">
                    <Link to="/clients" className="btn btn-danger text-white">
                        Go to Clients
                    </Link>
                    <h2 className="content-title">Add Client</h2>
                    <div>
                        <button type="submit" className="btn btn-primary">
                            Add Client
                        </button>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter name"
                    value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Enter address"
                    value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" className="form-control" id="city" placeholder="Enter city"
                    value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" className="form-control" id="postalCode" placeholder="Enter postal code"
                    value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input type="text" className="form-control" id="country" placeholder="Enter country"
                    value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    {/*little label for example*/}

                    <input type="text" className="form-control" id="phone" placeholder="Enter phone"
                    value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>





            </form>
        </div>
</>
    );
};

export default AddClientMain;
