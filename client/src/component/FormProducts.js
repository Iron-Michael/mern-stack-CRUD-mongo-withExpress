import React, { useEffect, useState } from "react";
import axios from "axios";
import { Creater, GetData, Remover } from "../functions/product";
import { Link } from "react-router-dom";

const FormProducts = () => {
  const tam = "Michael dynamic";
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    GetData()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handlechange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    Creater(form)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = async (id) => {
    console.log(id);
    Remover(id)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      FormProducts
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={(e) => handlechange(e)}
          placeholder="name"
        />
        <br></br>
        <input
          type="text"
          name="detail"
          placeholder="detail"
          onChange={(e) => handlechange(e)}
        />
        <br></br>
        <input
          type="text"
          name="price"
          placeholder="price"
          onChange={(e) => handlechange(e)}
        />
        <br></br>
        <button>Submit</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">detail</th>
            <th scope="col">price</th>
            <th scope="col">actions</th>
            <th scope="col">edit</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <th scope="row">{item.name}</th>
                  <td>{item.detail}</td>
                  <td>{item.price}</td>
                  <td onClick={() => handleRemove(item._id)}>DELETE</td>

                  <td>
                    <Link to={"/edit/" + item._id}>Edit</Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default FormProducts;
