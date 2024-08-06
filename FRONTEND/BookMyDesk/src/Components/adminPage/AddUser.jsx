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
    phoneNo: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [roles, setRoles] = useState([]);
  const [seatNames, setSeatNames] = useState([]);
  const [seatId, setSeatId] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Role");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles: ", error);
        toast.error("Failed to fetch roles.");
      }
    };

    fetchRoles();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "floor" && value) {
      try {
        const response = await axios.get(`http://localhost:5000/api/Seat/byFloor/${value}`);
        setSeatNames(response.data);
        setFormData((prevFormData) => ({ ...prevFormData, seatName: "" }));
      } catch (error) {
        console.error("Error fetching seats:", error);
        setSeatNames([]);
        setFormData((prevFormData) => ({ ...prevFormData, seatName: "" }));
        toast.error("Failed to fetch seats.");
      }
    }

    if (name === "seatName" && value) {
      try {
        const response = await axios.get(`http://localhost:5000/api/Seat/seatId/${value}/${formData.floor}`);
        setSeatId(response.data.seatId);
      } catch (error) {
        console.error("Error fetching seat ID:", error);
        setSeatId(null);
        toast.error("Failed to fetch seat ID.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fname, lname, email, password, role, frequency, floor, seatName , phoneNo} =
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
      !seatName ||
      !phoneNo
    ) {

      toast.error("All fields are required.");
      return;
    }
// Validate the local part of the email
const emailPattern = /^[a-zA-Z0-9._%+-]+$/;
if (!emailPattern.test(email)) {
  toast.error("Invalid email format.");
  return;
}
const fullEmail = email + "@siddhatech.com";
console.log("Form Data:", formData);
console.log("seatid:" + seatId + ". floor:" + floor);

    try {

      const response = await axios.post(
        "http://localhost:5000/api/user/createUser",
        {
          fname: formData.fname,
          lname: formData.lname,
          emailId : fullEmail,
          password: formData.password,
          role: parseInt(formData.role, 10),
          frequency: formData.frequency,
          phoneNo: formData.phoneNo,
          seatId: parseInt(seatId, 10),
          floor: parseInt(formData.floor, 10),
        }
      );
      console.log("User Created:", response.data);
      toast.success("User Created successfully!");

      setFormData(initialFormData);
      setSeatNames([]);
      setSeatId(null);
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user. Please try again.");
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setSeatNames([]);
    setSeatId(null);
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
            <label htmlFor="fname" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lname" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lname"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <span className="input-group-text">@siddhatech.com</span>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            className="form-select"
            id="role"
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
          <label htmlFor="frequency" className="form-label">Frequency</label>
          <select
            className="form-select"
            id="frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
          >
            <option value="">Select Frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="floor" className="form-label">Floor</label>
          <select
            className="form-select"
            id="floor"
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
          <label htmlFor="seatName" className="form-label">Seat Name</label>
          <select
            className="form-select"
            id="seatName"
            name="seatName"
            value={formData.seatName}
            onChange={handleChange}
            disabled={!formData.floor}
          >
            <option value="">Select Seat Name</option>
            {seatNames.map((seat) => (
              <option key={seat.seatId} value={seat.seatName}>
                {seat.seatName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
          />
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
        </div>
      </form>
    </div>
  );
};

export default AddUser;
