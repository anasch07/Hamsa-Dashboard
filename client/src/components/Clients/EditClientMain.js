//use effect and usestate
import React, { useState, useEffect } from 'react';
import Toast from './../LoadingError/Toast';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {editClient, getClientById, listClient} from './../../Redux/Actions/clientActions';
import { toast } from 'react-toastify';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';








const EditClientMain = (props) => {


    const { client } = props;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");




    useEffect(() => {

            if(client){
            setName(client.name);
            setEmail(client.email);
            setPhone(client.phone);
            setAddress(client.address);
            setCity(client.city);
            setPostalCode(client.postalCode);
            setCountry(client.country);
            }
    }, [client]);


    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const clientUpdated = {
            clientId: client._id,
            name,
            email,
            phone,
            address,
            city,
            postalCode,
            country
        }
           dispatch(editClient(clientUpdated));
    }





    return (
        <>
            <Toast />




            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form onSubmit={handleSubmit} >

                    <div className="content-header">
                        <Link to="/clients" className="btn btn-danger text-white">
                            Go to Clients
                        </Link>
                        <h2 className="content-title">Update Client</h2>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Edit Client
                            </button>
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input type="text" className="form-control" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input type="text" className="form-control" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>

                </form>
            </section>
        </>
    );
};

export default EditClientMain;
