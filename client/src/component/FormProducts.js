import React, { useEffect, useState } from "react";
import axios from "axios";

const FormProducts = () => {
  const tam = "Michael dynamic";
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await axios
      .get("http://localhost:5000/api/product")
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
    await axios
      .post("http://localhost:5000/api/product", form)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = async (id) => {
    console.log(id);
    await axios
      .delete(`http://localhost:5000/api/product/${id}`)
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
                  <td onClick={() => handleRemove(item._id)}>DELETE </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default FormProducts;
