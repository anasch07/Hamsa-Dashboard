import React from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import Toast from "../LoadingError/Toast";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {listCategories} from "../../Redux/Actions/CategoryActions";

const MainCategories = () => {

    // const dispatch = useDispatch();
    //
    // useEffect(() => {
    //     dispatch(listCategories());
    // }
    // , [dispatch]);

  return (
      <>
      <Toast />
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Categories</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create category */}
            <CreateCategory />
            {/* Categories table */}
            <CategoriesTable />
          </div>
        </div>
      </div>
    </section>
    </>
  );

};

export default MainCategories;