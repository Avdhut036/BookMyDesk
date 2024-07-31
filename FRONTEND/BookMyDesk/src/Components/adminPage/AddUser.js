import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddUser = () => {
  const initialFormData = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "",
    frequency: "",
    floor: "",
    seatName: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/role`);
        setRoles(response.data);
        console.log("fetchdata:", response);
      } catch (error) {
        console.log("Error fetching roles: ", error);
      }
    };

    fetchData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fname, lname, email, password, role, frequency, floor, seatName } =
      formData;

    //Check if all fields are filled
    if (
      !fname ||
      !lname ||
      !email ||
      !password ||
      !role ||
      !frequency ||
      !floor ||
      !seatName
    ) {
      toast.error("All fields are required.");
      return;
    }
    //Validate email format
    const emailPattern = /^[a-zA-Z0-9.]*$/;
    if (!emailPattern.test(email)) {
      toast.error("Email can only contain letters, numbers, and '.'");
      return;
    }
    //Concatenate the email domain
    const fullEmail = email + "@siddhatech.com";

    console.log("User Created:", { ...formData, email: fullEmail });
    toast.success("User Created successfully!");

    setFormData(initialFormData);
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };
  const handleClose = () => {
    console.log("Form Closed");
  };

  return (
    <div>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="container mt-4"
        style={{ maxWidth: "400px" }}
      >
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <span className="input-group-text">@siddhatech.com</span>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.roleId} value={role.roleId}>
                {role.roleName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Frequency</label>
          <select
            className="form-select"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
          >
            {" "}
            <option value="">Select Frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Floor</label>
          <select
            className="form-select"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
          >
            <option value="">Select Floor</option>
            <option value="1">1st Floor</option>
            <option value="2">2nd Floor</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Seat Name</label>
          <select
            className="form-select"
            name="seatName"
            value={formData.seatName}
            onChange={handleChange}
          >
            <option value="">Select Seat Name</option>
            <option value="A1">Seat A1</option>
            <option value="A2">Seat A2</option>
            <option value="B1">Seat B1</option>
            <option value="B2">Seat B2</option>
          </select>
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Add User
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
