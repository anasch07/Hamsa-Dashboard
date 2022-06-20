import React from "react";
import { Link } from "react-router-dom";
import {deleteCategory, listCategories} from "../../Redux/Actions/CategoryActions";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import {useEffect} from "react";



const CategoriesTable = () => {
const dispatch = useDispatch();



    useEffect(() => {
        dispatch(listCategories());
    }
    , [dispatch]);

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
    const { loading: loadingDelete, error: errorDelete, category } = categoryDelete;


    const handleDelete = (id) => {
        dispatch(deleteCategory(id));
        dispatch(listCategories());
    }

  return (

    <div className="col-md-12 col-lg-8">
      <table className="table text-center">
        <thead>
          <tr>

            <th>Index</th>
            <th>Name</th>
            <th>Description</th>
            <th className="">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody className="text-center">
            {categories.map((category,index) => (
                <tr key={category.id}>
                    <td >{index+1}</td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td className="">
                        <button className="btn btn-danger"
                        onClick={() => handleDelete(category._id)}>

                            Delete
                        </button>
                    </td>
                </tr>
            ))}

        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
