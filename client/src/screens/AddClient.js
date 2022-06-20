import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AddClientMain from "./../components/Clients/AddClientMain";

const AddClient = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <AddClientMain />
            </main>
        </>
    );
};

export default AddClient;
