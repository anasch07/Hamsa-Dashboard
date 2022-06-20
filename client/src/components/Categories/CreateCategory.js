import React, {useEffect} from "react";
import { useState } from "react";
//import use selector to get categorys
import { useSelector } from "react-redux";
//import dispatch to dispatch action
import { useDispatch } from "react-redux";
import {createCategory, listCategories} from "../../Redux/Actions/CategoryActions";
import Toast from "../LoadingError/Toast";


const CreateCategory = () => {

  const [name, setName] = useState("");
    const [description, setDescription] = useState("");



    // use selector to get categorys
    const categoriesCreate = useSelector(state => state.categoryCreate);
    const { loading, category } = categoriesCreate;




    //use dispatch to dispatch action
    const dispatch = useDispatch();



    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createCategory(name,description));
        dispatch(listCategories());
        setName("");
        setDescription("");
    }




  return (
      <>
      <Toast />

    <div className="col-md-12 col-lg-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            required
            id="product_name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            placeholder="Type here"
            className="form-control"
            rows="4"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="d-grid">
          <button className="btn btn-primary py-3">Create category</button>
        </div>
      </form>
    </div>
      </>
  );
};

export default CreateCategory;
