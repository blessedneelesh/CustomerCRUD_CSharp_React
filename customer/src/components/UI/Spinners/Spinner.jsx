import React from "react";
import { Spin } from "antd";
import "./Spinner.css";
const Spinner = () => (
  <div className="app_loader">
    <Spin />
  </div>
);
export default Spinner;
