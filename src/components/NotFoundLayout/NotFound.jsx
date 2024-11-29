import React from "react";

function NotFound() {
  return (
    <div className="w-screen h-screen border">
      <div
        className="w-full mt-[56px] flex items-center justify-center"
        style={{ height: "calc(100% - 56px)" }}
      >
        <h2 className="font-medium">Page not found</h2>
      </div>
    </div>
  );
}

export default NotFound;
