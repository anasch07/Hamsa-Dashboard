import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Pagination from "../Pagination/Pagination";

const MainProducts = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  const categoryList = useSelector((state) => state.categoryList);
    const { loading: loadingCategory, error: errorCategory, categories } = categoryList;

    useEffect(()=>{
        dispatch(listProducts());
    }
    ,[dispatch])

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successDelete]);

    //filter parts
  const [filterStatus, setFilterStatus] = useState("all");



  //pagination part
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = products;
  if(products){
    currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  }
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //-------------------------
const [search, setSearch] = useState("");


  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
                <select className="form-control p-2"
                    value={filterStatus}
                    onChange={(e) => {
                      setFilterStatus(e.target.value)
                      console.log(e.target.value)
                    }}

                >
                    <option value="all">Select Category(ALL)</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>

            </div>
            {/*<div className="col-lg-2 col-6 col-md-3">*/}
            {/*  <select className="form-select">*/}
            {/*    <option>Latest added</option>*/}
            {/*    <option>Cheap first</option>*/}
            {/*    <option>Most viewed</option>*/}
            {/*  </select>*/}
            {/*</div>*/}
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}
             {/*/ if products else  currentPosts*/}
                {!search && currentPosts.
                    filter((product) => {
                        //search by name

                        if(filterStatus === "all"){
                            return product;
                        }
                        return product.category === filterStatus;
                    }
                ).

                map((product) => (
                    <Product key={product._id} product={product} />
                ))}
                {search && products.
                filter((product) => {
                        //search by name
                     return product.name.toLowerCase().includes(search.toLowerCase());

                    }
                ).

                map((product) => (
                    <Product key={product._id} product={product} />
                ))}


            </div>
          )}
          {filterStatus == "all" && !search && <Pagination
              postsPerPage={postsPerPage}
              totalPosts={products.length}
              paginate={paginate}
              currentPage={currentPage}
          />
          }
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
