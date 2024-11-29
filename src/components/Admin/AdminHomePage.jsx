import React, { useState } from "react";
import CategoryHome from "./Category/CategoryHome";
import AllProduct from "./product/AllProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import AllUpcomingProduct from "./UpcomingProducts/AllUpcomingProduct";

function AdminHomePage() {
  const user = JSON.parse(sessionStorage.getItem("ino_admin_auth")) || {};
  const navigate = useNavigate();
  const [tabs, setTabs] = useState("Category");
  const [leftPosition, setLeftPosition] = useState(true);
  return Object.keys(user).length > 0 ? (
    <div className="w-screen h-screen ">
      <div
        style={{ height: "56px" }}
        className="flex items-center justify-center bg-green-100"
      >
        <h2 className="font-medium text-2xl text-black">Innocomm Admin</h2>
      </div>
      <div style={{ height: "calc(100% - 56px)" }}>
        <div className="w-full relative h-full">
          <div
            className={`absolute top-0 w-[300px] h-full z-40 bg-white transition ease-in-out duration-700 border border-slate-300 rounded`}
            style={
              leftPosition
                ? { transform: "translateX(0)" }
                : { transform: "translateX(-300px)" }
            }
          >
            <div className="flex flex-col w-full justify-center items-center">
              <div className="w-full flex justify-center items-center bg-slate-200 relative rounded">
                <h2 className="font-bold text-lg ">Tabs</h2>
                <button
                  className="absolute right-[10px] top-2/4"
                  style={{ transform: "translateY(-50%)" }}
                  onClick={() => {
                    setLeftPosition(false);
                  }}
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>

              <div className="flex flex-col w-full">
                <button
                  className="my-2 font-medium hover:bg-gray-200 rounded px-3 py-2"
                  onClick={() => {
                    setTabs("UpComing");
                  }}
                >
                  Upcoming Products
                </button>
                <button
                  className="my-2 font-medium hover:bg-gray-200 rounded px-3 py-2"
                  onClick={() => {
                    setTabs("Category");
                  }}
                >
                  Category
                </button>
                <button
                  className="my-2 font-medium hover:bg-gray-200 rounded px-3 py-2"
                  onClick={() => {
                    setTabs("Product");
                  }}
                >
                  All Products
                </button>
                <button
                  className="my-2 font-medium bg-red-400 hover:bg-red-600 rounded px-3 py-2 mx-1"
                  onClick={() => {
                    sessionStorage.clear();
                    navigate("/");
                  }}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
          <div className="relative w-full h-full">
            <div className="absolute z-20 left-[5px] top-[5px]">
              <button
                onClick={() => {
                  setLeftPosition(true);
                }}
              >
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
              </button>
            </div>

            {tabs === "UpComing" && <AllUpcomingProduct />}
            {tabs === "Category" && <CategoryHome />}
            {tabs === "Product" && <AllProduct />}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[90%] h-[90%] bg-white rounded-lg shadow flex flex-col justify-center items-center">
        <h2 className="font-medium my-2">
          Please authenticate yourself as administrator
        </h2>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="bg-yellow-300 p-3 rounded-lg"
        >
          Admin Login
        </button>
      </div>
    </div>
  );
}

export default AdminHomePage;
