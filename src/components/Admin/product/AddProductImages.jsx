import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function AddProductImages({ product, setShowForm , loadImages }) {
  const url = process.env.REACT_APP_ALLOWED_HOST;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    product: "",
    image: null,
    alt_text: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      product: product.id,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };
  const handleAddProductImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios({
      method: "POST",
      url: `${url}/innoAdmin/api/admin/product_images`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      withCredentials: true,
    })
      .then((response) => {
        loadImages()
        setLoading(false);
        setShowForm(false);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  return (
    <form
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleAddProductImage}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="image"
        >
          Image:
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
          className="w-full text-gray-700 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="alt_text"
        >
          Alt Text:
        </label>
        <input
          type="text"
          id="alt_text"
          name="alt_text"
          value={formData.alt_text}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Alt Text"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
      >
        {loading ? "Adding Image....":"Add"}
      </button>
      <button
        type="submit"
        className="w-full bg-red-500 text-white font-bold py-2 px-4 my-1 rounded-md hover:bg-red-600"
        onClick={() => {
            setShowForm(false);
        }}
      >
        Cancel
      </button>
    </form>
  );
}

export default AddProductImages;
