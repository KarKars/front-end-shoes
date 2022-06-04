import React, { useState, useEffect } from "react";
import ItemSold from "./ItemSold";
import axiosClient from "../baseUrl/root";

const Form = () => {
  const date = new Date();
  const [sell, setSell] = useState({
    date: new Date().toLocaleDateString(),
    brand: "",
    model: "",
    price: "",
    size: "",
  });
  const [alert, setAlert] = useState({ show: true, mssg: "", status: "" });
  const [itemID, setItemID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  //get data from localStorage

  const [list, setList] = useState(() => {
    const saved = localStorage.getItem("list");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  //trigger the rerender after each list changment
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const clearItems = () => {
    localStorage.clear();
    setList([]);
  };
  const changeForm = (brand = "", model = "", price = "", size = "") => {
    setSell({ brand, model, price, size });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;

    setSell({ ...sell, [name]: value });
  };

  const editItem = (id) => {
    const specifiedItem = list.find((item) => item.id === id);
    setSell({
      brand: specifiedItem.brand,
      model: specifiedItem.model,
      size: specifiedItem.size,
      price: specifiedItem.price,
      date: specifiedItem.date,
    });
    setItemID(id);
    setIsEditing(true);
  };

  const deleteItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    console.log(newList);
    setList(newList);
    changeForm();
  };
  const sendSell = (id) => {
    list.map((item) => {
      if (item.id === id) {
        console.log(item);
        axiosClient.post(`/`, item);
      }
    });
    console.log(list);
    const newList = list.filter((item) => item.id !== id);

    setList(newList);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (sell && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === itemID) {
            return {
              ...item,
              date: sell.date,
              model: sell.model,
              brand: sell.brand,
              size: sell.size,
              price: sell.price,
            };
          }
          return item;
        })
      );
      setIsEditing(false);
      setItemID(null);
      changeForm();
      console.log(list);
    } else if (sell.brand && sell.model && sell.price && sell.size) {
      setList([...list, { id: new Date().getTime().toString(), ...sell }]);
      console.log(list);
      changeForm();
    } else {
      setAlert(true, "please enter value", "danger");
      console.log(alert);
    }
  };
  return (
    <div className="Form-container ">
      <div className="title">
        <h1>New Sell</h1>
      </div>
      <div className="Form">
        <form className="main-Form">
          <div className="m-2">
            <input
              type="text"
              name="brand"
              value={sell.brand}
              onChange={handleChange}
              className="Input"
              placeholder="Brand"
            />
          </div>
          <div className="m-2">
            <input
              type="text"
              name="model"
              value={sell.model}
              onChange={handleChange}
              className="Input"
              placeholder="model"
            />
          </div>
          <div className="m-2">
            <input
              type="number"
              name="price"
              value={sell.price}
              onChange={handleChange}
              className="Input"
              placeholder="price"
            />
          </div>
          <div className="m-2">
            <select name="size" onChange={handleChange} className="Input">
              <option value={""} disabled selected hidden className="text-gray-400">
                size
              </option>
              <option>39</option>
              <option>40</option>
              <option>41</option>
              <option>42</option>
              <option>43</option>
              <option>44</option>
            </select>
          </div>
        </form>
        <div className="space-x-3">
          {isEditing ? (
            <button className="btn-Form" onClick={handleClick}>
              Edit
            </button>
          ) : (
            <button className="btn-Form" onClick={handleClick}>
              Submit
            </button>
          )}
          {list.length > 10 && (
            <button className="btn-Form" onClick={clearItems}>
              clear Items
            </button>
          )}
        </div>
        {list.length > 0 && (
          <div className="List">
            <div className="List-title-container">
              <h1 className="List-header">Brand</h1>
              <h2 className="List-header">model</h2>
              <h1 className="List-header">price</h1>
              <h1 className="List-header">size</h1>
            </div>
            {list.length > 0 &&
              list.map((item) => {
                return (
                  <ItemSold
                    key={item.id}
                    item={item}
                    deleteItem={deleteItem}
                    editItem={editItem}
                    sendSell={sendSell}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
export default Form;
