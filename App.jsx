import { useState } from "react";
import './App.css';

const MyForm = () => {
  const [users, setUsers] = useState([]);
  const [inputData, setInputData] = useState({ name: "", email: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });//This uses the spread operator to create a new object 
  };

  const handleSubmit = (e) => {
    e.preventDefault();  //// it helps us to Prevent the page  ffrom reloading the page

    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = inputData;
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      setUsers([...users, inputData]);
    }

    setInputData({ name: "", email: "" });
  };

  const handleEdit = (index) => {
    setInputData(users[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div className="front-page">
      <h2>EssetFirst Technologies Trading P.L.C</h2>
      <h3>
        <div className="name-box">
          <span className="green-bg">Esset</span>
          <span className="white-bg">First</span>
        </div>
      </h3>
      <div className="container">
        <h1>displays a list of users</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={inputData.name}
            onChange={handleChange}
            required

          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={inputData.email}
            onChange={handleChange}
            required   //compel the user to fill them before submitting the form
          />
          <button type="submit">
            {editIndex !== null ? "Save Changes" : "Add User"}
          </button>
        </form>
        <ul className="user-list">
          {users.map((user, index) => (
            <li key={index}>
              <span>{user.name} - {user.email}</span>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyForm;
