import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function UpdateUpcomingProduct({
  setUpdateProduct,
  dataforUdpate,
  setDataforUpdate,
  getUpcomingProduct,
}) {
  const url = process.env.REACT_APP_ALLOWED_HOST;
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    poster: null,
  });

  useEffect(() => {
    setFormData({
      title: dataforUdpate.title || "",
      date: dataforUdpate.date || "",
      poster: null,
    });
  }, [dataforUdpate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      poster: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("date", formData.date);
    if (formData.poster) {
      data.append("poster", formData.poster);
    }
    await axios({
      method: "put",
      url: `${url}/innoAdmin/api/upcoming-products/${dataforUdpate.id}`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      withCredentials: true,
    })
      .then((response) => {
        setDataforUpdate({});
        // console.log(response);
        getUpcomingProduct();
        setUpdateProduct(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter title"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="date"
        >
          Date:
        </label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="poster"
        >
          Poster:
        </label>
        <input
          type="file"
          id="poster"
          name="poster"
          onChange={handleFileChange}
          className="w-full text-gray-700 p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Update Upcoming Product
      </button>
      <button
        onClick={() => {
          setUpdateProduct(false);
        }}
        className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 my-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Cancel
      </button>
    </form>
  );
}

export default UpdateUpcomingProduct;
