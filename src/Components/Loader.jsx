import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="loader">
      <ThreeDots height={25} width={25} color="blue" />
    </div>
  );
}
