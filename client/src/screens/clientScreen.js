import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainClients from "./../components/Clients/MainClients";

const ProductScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <MainClients />
            </main>
        </>
    );
};

export default ProductScreen;
