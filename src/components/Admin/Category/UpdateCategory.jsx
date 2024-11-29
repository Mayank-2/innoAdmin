import axios from "axios";
import React, {useState } from "react";
import Cookies from "js-cookie";

function UpdateCategory({ setUpdateCategory, dataforUpdate,setDataforUpdate,getAllCategory }) {
  const url = process.env.REACT_APP_ALLOWED_HOST;
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios({
      method: "put",
      url: `${url}/innoAdmin/api/admin/category/${dataforUpdate.id}`,
      data: dataforUpdate,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      withCredentials: true,
    })
      .then((response) => {
        setLoading(false);
        getAllCategory();
        setUpdateCategory(false)
      })
      .catch((error) => {
        console.log(error);
      });
    // onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <h2 className="font-medium">Update Category</h2>
      </div>
      <div className="flex flex-col my-2">
        <label>heading:</label>
        <input
          type="text"
          value={dataforUpdate.heading}
          name="category"
          onChange={(e) =>
            setDataforUpdate({ ...dataforUpdate, heading: e.target.value })
          }
          className="outline-none border-2 rounded border-slate-400"
        />
      </div>
      <div className="flex flex-col my-2">
        <label>Category Name:</label>
        <input
          type="text"
          value={dataforUpdate.category}
          name="category"
          onChange={(e) =>
            setDataforUpdate({ ...dataforUpdate, category: e.target.value })
          }
          className="outline-none border-2 rounded border-slate-400"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-700 px-4 py-1 rounded-lg text-white"
      >
        {loading ? "updating...." :"update"}
      </button>
      <button
        onClick={() => {
          setUpdateCategory(false);
        }}
        className="bg-red-400 px-4 py-1 rounded-lg text-white mx-1"
      >
        cancel
      </button>
    </form>
  );
}

export default UpdateCategory;
