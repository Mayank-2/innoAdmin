import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";

function AddCategory({ setAddCategory , getAllCategory }) {
  const url = process.env.REACT_APP_ALLOWED_HOST;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({category:""});
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios({
      method: "POST",
      url: `${url}/innoAdmin/api/admin/allcategory`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      withCredentials: true,
    })
      .then((response) => {
        setLoading(false);
        getAllCategory()
        setAddCategory(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <h2 className="font-medium">Add Category</h2>
      </div>
      <div className="flex flex-col my-2">
        <label>heading:</label>
        <input
          type="text"
          name="heading"
          value={formData.heading}
          onChange={(e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
          }}
          className="outline-none border-2 rounded border-slate-400"
        />
      </div>
      <div className="flex flex-col my-2">
        <label>Category Name:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={(e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
          }}
          className="outline-none border-2 rounded border-slate-400"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-700 px-4 py-1 rounded-lg text-white"
      >
        {loading ? "Adding...." : "Add Category"}
      </button>
      <button
        onClick={() => {
          setAddCategory(false);
        }}
        className="bg-red-400 px-4 py-1 rounded-lg text-white mx-1"
      >
        cancel
      </button>
    </form>
  );
}

export default AddCategory;
