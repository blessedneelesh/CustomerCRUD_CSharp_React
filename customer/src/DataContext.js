import Axios from "axios";
import React, { useContext, useState } from "react";

const baseUrl = "https://localhost:7285/api";

const DataContext = React.createContext();

export const useData = () => {
  return useContext(DataContext);
};

export default function DataProvider({ children }) {
  const getAllCustomers = async () => {
    let { data: result } = await Axios.get(baseUrl + "/Customer/GetCustomer");
    console.log("lst", result);
    return result;
  };

  const getCustomerById = async (id) => {
    console.log("clicked");
    try {
      var { data: response } = await Axios.get(
        baseUrl + "/Customer/GetCustomerById?id=" + id
      );
      console.log(response, "customer from ");
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const addCustomer = async (data) => {
    console.log(data + "from datacontext");
    let result = await Axios.post(baseUrl + "/Customer/AddCustomer", data);
    console.log(result, "response");
    return result;
  };

  const editCustomer = async (id, data) => {
    console.log(data, "from Datacontext");
    try {
      let result = await Axios.put(
        baseUrl + "/Customer/UpdateCustomer?id=" + id,
        data
      );
      console.log(result, "from datacontext");
      return result;
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCustomer = async (id) => {
    console.log(id, "from dbcontext");
    let result = await Axios.delete(
      baseUrl + "/Customer/DeleteCustomer?id=" + id
    );
    return result;
  };

  const getState = async () => {
    let { data: result } = await Axios.get(baseUrl + "/Customer/GetStates");
    return result;
  };

  const value = {
    getAllCustomers,
    getCustomerById,
    addCustomer,
    editCustomer,
    deleteCustomer,
    getState,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
