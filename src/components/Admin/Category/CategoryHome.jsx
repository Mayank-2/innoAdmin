import React, { useCallback, useEffect, useState } from "react";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";
import axios from "axios";
import Cookies from "js-cookie";

function CategoryHome() {
  const url = process.env.REACT_APP_ALLOWED_HOST;
  const [addCategory, setAddCategory] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [dataforUpdate, setDataforUpdate] = useState({});

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

  const handleDelete = async (id) => {
    if (window.confirm("Delete the item?")) {
      setAllCategory(allCategory.filter((data) => data.id !== id));
      await axios({
        method: "delete",
        url: `${url}/innoAdmin/api/admin/category/delete/${id}`,
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
    <div className="w-full h-full p-4 border-2 relative">
      {addCategory && (
        <div
          className="absolute top-2/4 left-2/4 z-30 bg-white p-6 border-2 border-slate-300 rounded"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          <AddCategory
            setAddCategory={setAddCategory}
            getAllCategory={getAllCategory}
          />
        </div>
      )}

      {updateCategory && (
        <div
          className="absolute top-2/4 left-2/4 z-30 bg-white p-6 border-2 border-slate-300 rounded"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          <UpdateCategory
            setUpdateCategory={setUpdateCategory}
            dataforUpdate={dataforUpdate}
            setDataforUpdate={setDataforUpdate}
            getAllCategory={getAllCategory}
          />
        </div>
      )}
      <div className="relative overflow-x-auto overflow-y-scroll w-full h-full ">
        <div className="flex justify-end items-center">
          <button
            className="bg-green-300 px-3 py-1 my-1"
            onClick={() => {
              setUpdateCategory(false);
              setAddCategory(true);
            }}
          >
            Add Category
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No.
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Action 1
              </th>
              <th scope="col" className="px-6 py-3">
                Action 2
              </th>
            </tr>
          </thead>
          <tbody>
            {allCategory.length > 0 &&
              allCategory.map((data, index) => {
                return (
                  <tr className="bg-white dark:bg-gray-800" key={index}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{data.category}</td>
                    <td className="px-6 py-4">
                      <button
                        className="text-white bg-green-400 px-1 rounded"
                        onClick={() => {
                          setDataforUpdate(data);
                          setUpdateCategory(true);
                        }}
                      >
                        update
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-white bg-red-400 px-1 rounded"
                        onClick={() => {
                          setUpdateCategory(false);
                          handleDelete(data.id);
                        }}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryHome;
