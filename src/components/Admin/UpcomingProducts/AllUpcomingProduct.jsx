import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddUpcomingProduct from "./AddUpcomingProduct";
import UpdateUpcomingProduct from "./UpdateUpcomingProduct";
import Cookies from "js-cookie";

function AllUpcomingProduct() {
  const url = process.env.REACT_APP_ALLOWED_HOST;
  const [addProduct, setAddProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [dataforUdpate, setDataforUpdate] = useState({});
  const [productList, setProductList] = useState([]);

  const getUpcomingProduct = async () => {
    await axios({
      method: "GET",
      url: `${url}/innoAdmin/api/upcoming-products`,
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        setProductList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUpcomingProduct();
  }, []);

  const deleteUpcomingProduct = async (data_id) => {
    if (window.confirm("delete upcoming product poster ?")) {
      await axios({
        method: "DELETE",
        url: `${url}/innoAdmin/api/upcoming-products/${data_id}`,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        withCredentials: true,
      })
        .then((resposne) => {
          // console.log(resposne);
          getUpcomingProduct();
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  };
  return (
    <div className="relative w-full h-full overflow-y-scroll p-2">
      {addProduct && (
        <div
          className="absolute top-2/4 left-2/4 z-30 bg-white p-6 border-2 border-slate-300 rounded"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          <AddUpcomingProduct
            setAddProduct={setAddProduct}
            getUpcomingProduct={getUpcomingProduct}
          />
        </div>
      )}
      {updateProduct && (
        <div
          className="absolute top-2/4 left-2/4 z-30 bg-white p-6 border-2 border-slate-300 rounded"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          <UpdateUpcomingProduct
            setUpdateProduct={setUpdateProduct}
            dataforUdpate={dataforUdpate}
            setDataforUpdate={setDataforUpdate}
            getUpcomingProduct={getUpcomingProduct}
          />
        </div>
      )}

      <div className="flex justify-end items-center h-[40px] ">
        <button
          className="bg-green-300 px-3 py-1 my-1"
          onClick={() => {
            setAddProduct(true);
          }}
        >
          Add Product
        </button>
      </div>
      <div className="my-1 w-full h-fit p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productList.length > 0 &&
          productList.map((data, index) => {
            return (
              <div className="w-[300px] h-fit border-2 rounded" key={index}>
                <img
                  alt="pImg"
                  className="w-full h-[240px] object-cover"
                  src={`${url}${data.poster}`}
                />
                <p
                  className="my-1 px-1 font-medium  text-clip overflow-hidden line-clamp-2 underline cursor-pointer"
                  onClick={() => {
                    setDataforUpdate(data);
                    setUpdateProduct(true);
                  }}
                >
                  {data.title}
                </p>
                <button
                  className="w-fit text-red-500 text-white rounded-md hover:text-red-600 m-1"
                  aria-label="Delete item"
                  onClick={() => {
                    deleteUpcomingProduct(data.id);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 hover:text-red-600"
                  />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AllUpcomingProduct;
