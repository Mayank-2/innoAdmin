import React, { useCallback, useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";
import AddProductImages from "./AddProductImages";
import Images from "./Images";

function AllProduct() {
  const url = process.env.REACT_APP_ALLOWED_HOST;
  const [query, setQuery] = useState("");
  const [addProduct, setAddProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [addImages, setAddImages] = useState(false);
  const [dataforUdpate, setDataforUpdate] = useState({});
  const [productList, setProductList] = useState([]);

  const getAllProduct = useCallback(async () => {
    try {
      const response = await axios.get(
        `${url}/innoAdmin/api/admin/allproduct`,
        {
          withCredentials: true,
        }
      );
      setProductList(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [url]);
  useEffect(() => {
    getAllProduct();
  }, [getAllProduct]);

  const getProductBySearch = async () => {
    await axios({
      method: "get",
      url: `${url}/innoAdmin/api/admin/searchproduct/${query}`,
      withCredentials: true,
    })
      .then((response) => {
        setProductList(response.data);
        setQuery("");
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  const handleDelete = async (product_id) => {
    if (window.confirm("Delete the item?")) {
      setProductList(productList.filter((data) => data.id !== product_id));
      await axios({
        method: "delete",
        url: `${url}/innoAdmin/api/admin/product/delete/${product_id}`,
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        withCredentials: true,
      })
        .then((response) => {
          //   console.log(response);
        })
        .catch((error) => {
          //   console.log(error);
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
          <AddProduct
            setAddProduct={setAddProduct}
            getAllProduct={getAllProduct}
          />
        </div>
      )}
      {updateProduct && (
        <div
          className="absolute top-2/4 left-2/4 z-30 bg-white p-6 border-2 border-slate-300 rounded"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          <UpdateProduct
            product={dataforUdpate}
            setDataforUpdate={setDataforUpdate}
            setUpdateProduct={setUpdateProduct}
            getAllProduct={getAllProduct}
          />
        </div>
      )}
      {addImages && (
        <div
          className="absolute top-2/4 left-2/4 z-30 bg-white p-6 border-2 border-slate-300 rounded"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          <Images product={dataforUdpate} setAddImages={setAddImages}/>
          
        </div>
      )}

      <div className="flex justify-end items-center h-[40px] ">
        <form>
          <div className="flex mx-2">
            <input
              type="search"
              value={query || ""}
              placeholder="search by products"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              required
              className="mx-2 outline-none border-2 border-black-300 px-2 rounded"
            />
            <button
              className="bg-green-300 px-3 py-1 my-1"
              onClick={() => {
                getProductBySearch();
              }}
            >
              search
            </button>
          </div>
        </form>

        <button
          className="bg-green-300 px-3 py-1 m-1"
          onClick={() => {
            getAllProduct();
          }}
        >
          All Product
        </button>
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
                  src={`${url}${data.main_image}`}
                />
                <p
                  className="my-1 px-1 font-medium  text-clip overflow-hidden line-clamp-2 underline cursor-pointer"
                  onClick={() => {
                    setDataforUpdate(data);
                    setUpdateProduct(true);
                  }}
                >
                  {data.name}
                </p>
                <button
                  className="w-fit text-red-500 text-white rounded-md hover:text-red-600 m-1"
                  aria-label="Delete item"
                  onClick={() => {
                    handleDelete(data.id);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 hover:text-red-600"
                  />
                </button>
                <button
                  className="w-fit text-white hover:text-black rounded-md  m-1 bg-green-600 px-2"
                  aria-label="Delete item"
                  onClick={() => {
                    setDataforUpdate(data);
                    setAddImages(true);
                  }}
                >
                  Add Images
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AllProduct;
