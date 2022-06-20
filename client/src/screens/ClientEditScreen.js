import React, {useEffect} from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditClientMain from "../components/Clients/EditClientMain";
import {getClientById} from "../Redux/Actions/clientActions";
import {useDispatch, useSelector} from "react-redux";

const ClientEditScreen = ({ match }) => {
    const clientId = match.params.id;

    const dispatch = useDispatch();
    const clientById = useSelector((state) => state.getClientById);
    const { loading, client } = clientById;

    useEffect(() => {
        dispatch(getClientById(clientId));
    }, [dispatch, clientId]);




    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                {client && <EditClientMain client={client} />
                }
            </main>
        </>
    );
};
export default ClientEditScreen;
