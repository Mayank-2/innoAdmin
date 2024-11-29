import React, { useEffect, useState } from "react";
import AddProductImages from "./AddProductImages";
import axios from "axios";
import Cookies from "js-cookie"

function Images({ product, setAddImages }) {
  const url = process.env.REACT_APP_ALLOWED_HOST;
  const [images, setImages] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const loadImages = async () => {
    await axios({
      method: "GET",
      url: `${url}/innoAdmin/api/admin/product_image/${product.id}`,
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    loadImages();
  }, []);

  const handleDelete = async (id) => {
    
    await axios({
      method: "DELETE",
      url: `${url}/innoAdmin/api/admin/product_image/${id}`,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    })
      .then(() => {
        loadImages();
        
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  return (
    <div className="w-full bg-gray-100 p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Product Images</h1>
        <button
          onClick={() => {
            setShowForm(true);
          }}
          className="bg-blue-500 text-white py-1 px-4 mx-3 rounded-md hover:bg-blue-600"
        >
          Add Image
        </button>
        <button
          onClick={() => {
            setAddImages(false);
          }}
          className="bg-red-500 text-white py-1 px-4 mx-3 rounded-md hover:bg-red-600"
        >
          Cancel
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length > 0 &&
          images.map((image) => (
            <div
              key={image.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={`${url}${image.image}`}
                alt={image.alt_text || "Product image"}
                className="w-[300px]  object-cover rounded-md mb-2"
              />

              <button
                onClick={() => handleDelete(image.id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 mt-2"
              >
               delete
              </button>
            </div>
          ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <AddProductImages product={product} setShowForm={setShowForm} loadImages={loadImages} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Images;
