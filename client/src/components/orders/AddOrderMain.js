import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../LoadingError/Toast";
import {listProducts, updateStockOfProduct} from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import axios from "axios";
import {listClient} from "../../Redux/Actions/clientActions";
import {createOrder} from "../../Redux/Actions/OrderActions";
import {toast} from "react-toastify";




const AddOrderMain = () => {

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const {products} = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {success: successDelete} = productDelete;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successDelete]);


  const clientList = useSelector((state) => state.clientList);
  const clientCreate = useSelector((state) => state.clientCreate);

  const orderCreate = useSelector((state) => state.orderCreate);
    const {success: successCreate} = orderCreate;

    const updateStock = useSelector((state) => state.updateStock);
    const {success: successUpdate} = updateStock;

  useEffect(() => {
    dispatch(listClient());
  }, [dispatch]);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    console.log(userInfo);


// ------------------------------------------------------

  const [clientId, setClientId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [taxPrice, setTaxPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [payementMethod, setPayementMethod] = useState("cash");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [firstTimeClientBuy, setFirstTimeClientBuy] = useState(true);
  const [reduction, setReduction] = useState(0);
// --------------
//  make uste state all 0 for the first time


  const [qtyBought, setQtyBought] = useState([...Array(products.length).keys()].map(i => 0));
  //set all the products to 0
  //


  const calculateTotalPrice = () => {
    let total = 0;
    const selectedRows = document.querySelectorAll("input[type=checkbox]:checked");

    selectedRows.forEach((row) => {
      const product = (row.value).toString().split(",");
      let qt = qtyBought[product[0]];
      total += parseInt(qt,10) * parseFloat(product[2],10);
    })
    if(payementMethod!='cadeau' && reduction<=100 && reduction>=0) {
        //total price after reduction in %
        total = total - (total * (reduction/100));
        total += parseFloat(taxPrice,10) + parseFloat(shippingPrice,10);
        setTotalPrice(total);
    }
    else{
        setTotalPrice(0);
    }
  }


  const handleOnBlurOfPayementMethod = (e) => {
      //set paid to true if payement method is cadeau
      calculateTotalPrice();
        if(e.target.value==='cadeau'){
            setIsPaid(true);
        }
  }



  const submitHandler = async (e) => {
    e.preventDefault();

    //extract from the table selected rows and put them in an array
    const selectedRows = document.querySelectorAll("input[type=checkbox]:checked");
    const orderProducts = [];
    const orderProductsQty = [];
    const quantityBoughtandQuantityInStock = [];
    selectedRows.forEach((row) => {
        const product = (row.value).toString().split(",");
        let qt=qtyBought[product[0]];
          quantityBoughtandQuantityInStock.push({
      quantityBought:qt,
        quantityInStock:product[4]
          }
        );
        orderProducts.push({
          // index,
          // product.name,
          // product.price,
          // product._id,
          // product.image
            name: product[1],
            category: product[5],
            qty: qt,
            image: product[6],
            price: product[2],
            product: product[3],

        });

    }
    );




    const order = {
        seller: userInfo._id,
      user: clientId,
      orderItems: orderProducts,
      shippingAddress: {
        address: address,
        city: city,
        postalCode: postalCode,
        country: country,
      },
        phone: phone,
      paymentMethod: payementMethod,
      paymentResult: {
        id: "",
        status: isPaid,
        update_time: new Date(),
        email_address: "",
      },
        reduction: reduction,
      taxPrice: taxPrice,
      shippingPrice: shippingPrice,
      totalPrice: totalPrice,
      isPaid: isPaid,
      paidAt: new Date(),
      isDelivered: isDelivered,
      deliveredAt: "",
    };

    //check in the order for every orderItem that qtyBought is greater than 0
    let qtyBoughtCheck = true;
    orderProducts.forEach((orderItem) => {
        if (orderItem.qty <= 0) {
            qtyBoughtCheck = false;
            toast.error("You must select at least one product");
        }
    }
    );
    //check if the stock is enough for the order compare the stock with the qtyBought
    let stockCheck = true;

quantityBoughtandQuantityInStock.forEach((orderItem) => {
    if (parseInt(orderItem.quantityBought,10) > parseInt(orderItem.quantityInStock,10)) {
      toast("Not enough stock for the order", {
        type: "error",
      });
        stockCheck = false;
    }
}
);

if(order.user === ""){
    toast("Please select a client", {
        type: "error",
    });
}




    if((order.orderItems.length>0) && (order.user!=="") && (qtyBoughtCheck)  && (stockCheck) ) {

      for(let i=0;i<order.orderItems.length;i++){
        await dispatch(updateStockOfProduct(order.orderItems[i].product,order.orderItems[i].qty));
      }
        dispatch(createOrder(order));
      dispatch(listProducts());


      //reset the form
      setClientId("");
      setName("");
      setEmail("");
      setAddress("");
      setCity("");
      setPostalCode("");
      setCountry("");
      setTaxPrice(0);
      setShippingPrice(0);
      setPayementMethod("cash");
      setTotalPrice(0);
      setIsPaid(false);
      setIsDelivered(false);
      setQtyBought([0]);
      //reset the table
      const checkboxes = document.querySelectorAll("input[type=checkbox]");
      checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
          }
      );
      //reset the table
      const qtyInputs = document.querySelectorAll("input[type=number]");
      qtyInputs.forEach((qtyInput) => {
            qtyInput.value = 0;
          }
      );
    }
    else{
      toast.error("verify your data");
    }





  }



  return (
      <>
      <Toast />
    <div className="container ">
      <form onSubmit={submitHandler} className="mt-3 mb-3">







        <div className="table-responsive text-center">
          <table className="table">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Count In Stock</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Checked</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product, index) => (
                <tr key={product._id}>
                  <th scope="row" className="product">{index + 1}</th>
                  <td>{product.name}</td>
                  <td>
                    {product.countInStock}
                  </td>
                  <td>
                    <img src={product.image} alt={product.name} width="100"/>
                  </td>
                  <td>{product.price}</td>
                  <td>
                    <input type="number" className="form-control input-sm
                    qtBought  " id={product._id}

                           style={{"width": "90px", "height": "30px"}}
                           value={qtyBought[index]}
                           onBlur={
                             () => {
                               calculateTotalPrice()
                             }
                           }
                           onChange={(e) => {
                             setQtyBought({...qtyBought, [index]: e.target.value})

                           }
                           }


                    />
                  </td>
                  <td>
                    <input className="form-check-input" type="checkbox"
                           style={{"width": "30px", "height": "30px"}}
                            value={[index,
                                product.name,
                                product.price,
                                product._id,
                                product.countInStock,
                                product.category,
                                product.image

                            ]}
                  onChange={(e) => {
                    calculateTotalPrice();
                  }
                    }

                    />
                  </td>

                </tr>
            ))}
            </tbody>
          </table>
        </div>
        <hr/>
        <h3>client Info</h3>

        <div className="form-group">
          <label htmlFor="newOrOldClient">First time ?</label>
          {/*  select : */}
          <select className="form-control"
          onChange={(e) => {
            setFirstTimeClientBuy(e.target.value)
            if(e.target.value){
              setClientId("")
              setName("")
              setAddress("")
              setEmail("")
              setCity("")
              setPostalCode("")
              setCountry("")
            }
          }}
          >
            <option value={true}>Yes</option>
            <option value=''>No</option>
          </select>
        </div>
        {/*check if it's first time then show*/}
          {firstTimeClientBuy ? (
            <div>
              <p className="mt-2 mb-2">Dont forget to create an account before</p>
            </div>
        ) : (
           <div>
                <div className="form-group mb-3 mt-3">
           {/*         map for every client his name and his email */}
                    <select className="form-control"
                            onChange={(e) =>{
                              if (e.target.value) {
                              let clientSelected=(JSON.parse(e.target.value))
                                setClientId(clientSelected._id)
                                setName(clientSelected.name)
                                setAddress(clientSelected.address)
                                setEmail(clientSelected.email)
                                setCity(clientSelected.city)
                                setPostalCode(clientSelected.postalCode)
                                setCountry(clientSelected.country)
                                  setPhone(clientSelected.phone)
                              }
                              else {
                                setClientId("")
                                setName("")
                                setAddress("")
                                setEmail("")
                                setCity("")
                                setPostalCode("")
                                setCountry("")
                                }

                            }}
                    >
                      <option value=""
                        >Select Client</option>
                        {clientList.CLIENTS.map((client) => (
                            <option key={client._id}
                            value={JSON.stringify(client)}

                            >

                                {client.name} | {client.email}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        )}


        <div className="form-group mt-2 mb-2">
          <label htmlFor="ShippingAddress" className="mt-2 mb-2">Shipping Address</label>
          {/*address city postalCode country*/}
            <input type="text" className="form-control" id="ShippingAddress" placeholder="Address"
            disabled
            value={address}
            onChange={(e) => setAddress(e.target.value)}

            />

          <input type="text" className="form-control mt-2 mb-2" id="ShippingCity" placeholder="City"
            value={city} disabled
            onChange={(e) => setCity(e.target.value)}
          />
          <input type="text" className="form-control mt-2 mb-2" id="ShippingPostalCode" placeholder="Postal Code"

            value={postalCode} disabled
            onChange={(e) => setPostalCode(e.target.value)}

          />
          <input type="text" className="form-control mt-2 mb-2" id="ShippingCountry" placeholder="Country"

            value={country} disabled
            onChange={(e) => setCountry(e.target.value)}

          />

            <div className="form-group mt-2 mb-2">
                <label htmlFor="ShippingAddress" className="mt-2 mb-2">Phone Number</label>
                {/*address city postalCode country*/}
                <input type="text" className="form-control" id="ShippingAddress" placeholder="Phone Number"
                       disabled
                       value={phone}
                       onChange={(e) => setPhone(e.target.value)}

                />
                </div>







        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Payement Method</label>
        {/*  select : */}
            <select className="form-control"
                value={payementMethod}

                    onBlur={
                        handleOnBlurOfPayementMethod
                    }


                onChange={(e) => {
                    setPayementMethod(e.target.value)
                }}>
            >

                <option value="cash">Cash</option>
                <option value="cheque">Chéque</option>
                <option value="aLalivraison">A la livraison</option>
                <option value="cadeau">Cadeau</option>
            </select>
        </div>
        {/*paid or not*/}
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Paid</label>
            <select className="form-control"
            value={isPaid}
            onChange={(e) => setIsPaid(e.target.value)}
            >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
        </div>
        {/*tax price input*/}

          <div className="form-group">
              <label htmlFor="Reduction">Reduction (%)</label>
              <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Tax"
                     min="0"
                        max="100"
                     value={reduction}

                     onBlur={
                         () => {
                             calculateTotalPrice()

                         }
                     }


                     onChange={(e) => {
                            setReduction(e.target.value)
                     }
                     }
              />
          </div>



        <div className="form-group">
            <label htmlFor="TaxPrice">Tax Price</label>
            <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Tax"
                   min={0}
            value={taxPrice}

                   onBlur={
                     () => {
                       calculateTotalPrice()

                     }
                   }


            onChange={(e) => {
              setTaxPrice(e.target.value)
            }
            }
            />
        </div>
        {/*Shipping price*/}
        <div className="form-group">
            <label htmlFor="ShippingPrice">Shipping Price</label>
            <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Shipping"
            value={shippingPrice}
                   min={0}
                   onBlur={
                     () => {
                       calculateTotalPrice()
                     }
                   }

            onChange={(e) =>{ setShippingPrice(e.target.value)
            }


            }

            />
        </div>

        {/*Delievred or not*/}
        <div className="form-group">
          <label htmlFor="DelievredOrNot">Delievred</label>
          <select className="form-control"
          value={isDelivered}
            onChange={(e) => setIsDelivered(e.target.value)}
          >
            <option value={true}>Delievred</option>
            <option value={false}>Not Delievred</option>
          </select>
        </div>
        {/*total price*/}
        <div className="form-group">
            <label htmlFor="TotalPrice">Total Price</label>
            <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Total"
            value={totalPrice} disabled={true}

            />
        </div>





        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary mt-3 mb-3">Submit</button>


          </form>
    {/*  add label and inputs for shippingAddress and payement method and tax price and totalprice and isPaid and isDelivered*/}


    </div>
      </>
  );
};

export default AddOrderMain;
