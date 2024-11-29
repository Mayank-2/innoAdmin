import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

function AddProduct({ setAddProduct,getAllProduct }) {
  const url = process.env.REACT_APP_ALLOWED_HOST;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
    main_image: null,
  });
  const [allCategory, setAllCategory] = useState([]);

  const getAllCategory = useCallback(async () => {
    try {
      const response = await axios.get(
        `${url}/innoAdmin/api/admin/allcategory`,
        {
          withCredentials: true,
        }
      );
      setAllCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [url]); // Add dependencies here

  useEffect(() => {
    getAllCategory();
  }, [getAllCategory]);
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "main_image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    await axios({
      method: "POST",
      url: `${url}/innoAdmin/api/admin/allproduct`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      withCredentials: true,
    })
      .then((response) => {
        setLoading(false)
        getAllProduct();
        setAddProduct(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Select a category</option>
          {allCategory.length > 0 && allCategory.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label
          htmlFor="main_image"
          className="block text-sm font-medium text-gray-700"
        >
          Main Image
        </label>
        <input
          type="file"
          id="main_image"
          name="main_image"
          onChange={handleChange}
          className="mt-1 block w-full text-sm text-gray-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        {loading ? "Adding...." : "Add Product"}
        
      </button>
      <button
        type="submit"
        onClick={() => {
          setAddProduct(false);
        }}
        className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
      >
        cancel
      </button>
    </form>
  );
}

export default AddProduct;
