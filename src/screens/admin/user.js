import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { host_url } from "../../utils/utils";

export default function UserComponent() {
  const [show, setShow] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEditUser = () => setShowEditUser(false);
  const handleShowEditUser = () => setShowEditUser(true);

  const [users, setUsers] = useState([]);
  const [department, setDepartment] = useState([]);

  const [fullNameUser, setFullNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [userName, setUserName] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [numberPhoneUser, setNumberPhoneUser] = useState("");
  const [statusUser, setStatusUser] = useState("");
  const [avatarUser, setAvatarUser] = useState("");
  const [roleUser, setRoleUser] = useState("");
  const [dobUser, setDobUser] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchDepartment();
  }, []);
  async function fetchUsers() {
    axios
      .get(host_url + "/user/")
      .then((res) => {
        var users = [];
        for (let i = 0; i < res.data.length; i++) {
          users.push(res.data[i]);
        }
        setUsers(users);
        console.log(users);
      })
      .catch((err) => console.error(err));
  }
  function fetchDepartment() {
    axios
      .get(host_url + "/department")
      .then((res) => {
        setDepartment(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }
  function addUser() {
    axios
      .post(host_url + "/user/add", {
        fullName: fullNameUser,
        email: emailUser,
        username: userName,
        password: passwordUser,
        phone: numberPhoneUser,
        stat: statusUser,
        avatar: avatarUser,
        role: roleUser,
        dob: dobUser,
        department_id: departmentId,
      },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data.messages);
      });
  }
  // function deleteUser(id) {
  //   axios
  //     .post("http://localhost:9000/department/delete/", {
  //       id: id,
  //     })
  //     .then((res) => {
  //       console.log(res.data.messages);
  //     });
  // }

  return (
    <div class="container ">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div class="row ">
          <div class="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form class="form-inline">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search account"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div
            class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b> List account</b>
            </h2>
          </div>
          <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button variant="primary" onClick={handleShow}>
              Add New Account
            </Button>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive ">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4">{index + 1}</td>
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {/* <img
                      className="w-10 h-10 rounded-full"
                      src="{item}"
                      alt="Jese image"
                    /> */}
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {item.fullName}
                        </div>
                        <div className="font-normal text-gray-500">
                          {item.email}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{item.role}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />{" "}
                        {item.stat}
                      </div>
                    </td>
                    <td className="pl-3">
                      {/* Modal toggle */}
                      <Button
                        variant="primary"
                        onClick={handleShowEditUser}
                        key={index}
                      >
                        Edit User
                      </Button>

                      <Button variant="danger">Delete User</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <!--- Model Box ---> */}
        <div className="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add A New Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={addUser} encType='multipart/form-data'>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => setFullNameUser(e.target.value)}
                    id="name"
                    placeholder="Enter Full Name"
                  />
                </div>
                <div class="form-group mt-3">
                  <input
                    type="email"
                    class="form-control"
                    onChange={(e) => setEmailUser(e.target.value)}
                    id="InputEmail1"
                    placeholder="Enter Email"
                  />
                </div>
                <div class="form-group mt-3">
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => setUserName(e.target.value)}
                    id="username"
                    aria-describedby="emailHelp"
                    placeholder="Enter Username"
                  />
                </div>
                <div class="form-group mt-3">
                  <input
                    type="password"
                    class="form-control"
                    onChange={(e) => setPasswordUser(e.target.value)}
                    id="Password1"
                    placeholder="Enter Password"
                  />
                </div>
                <div class="form-group mt-3">
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => setNumberPhoneUser(e.target.value)}
                    id="phone"
                    placeholder="Enter NumberPhone"
                  />
                </div>

                <div class="form-group mt-3">
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => setDobUser(e.target.value)}
                    id="dob"
                    placeholder="Enter Dob"
                  />
                </div>

                <div class="form-group mt-3">
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => setStatusUser(e.target.value)}
                    id="status"
                    placeholder="Enter Status"
                  />
                </div>

                <div class="form-group mt-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-whites"
                    htmlFor="avatar"
                  >
                    Upload file
                  </label>
                  <input
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    aria-describedby="avatar"
                    onChange={(e) => setAvatarUser(e.target.value)}
                    id="image idea"
                    type="file"
                  />
                </div>

                <div class="form-group mt-3">
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => setRoleUser(e.target.value)}
                    id="role"
                    placeholder="Enter Role"
                  />
                </div>
                <div class="form-group mt-3" >
                  <label
                    htmlFor="department"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select a department
                  </label>


                  <select
                    onChange={(e) => setDepartmentId(e.target.value)}
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {department.map((item) =>
                      <option
                        value={item.id}

                      >{item.id} - {item.name}</option>
                    )}

                  </select>

                </div>
                <button type="submit" class="btn btn-success mt-4">
                  Add A New Account
                </button>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Model Box Finsihs */}
          {/*Model EDit account*/}

          <div
            id="editUserModal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
          >
            <div className="relative w-full h-full max-w-2xl md:h-auto">
              <Modal
                show={showEditUser}
                onHide={handleCloseEditUser}
                backdrop="static"
                keyboard={false}
              >
                {/* Modal header */}
                <Modal.Header closeButton>
                  <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                {/* Modal content */}
                <Modal.Body>
                  <form
                    action="#"
                    className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    {/* Modal body */}
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Bonnie"
                            required=""
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Green"
                            required=""
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="example@company.com"
                            required=""
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="phone-number"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Phone Number
                          </label>
                          <input
                            type="number"
                            name="phone-number"
                            id="phone-number"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="e.g. +(12)3456 789"
                            required=""
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="department"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Department
                          </label>
                          <input
                            type="text"
                            name="department"
                            id="department"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Development"
                            required=""
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="company"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Company
                          </label>
                          <input
                            type="number"
                            name="company"
                            id="company"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={123456}
                            required=""
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="current-password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Current Password
                          </label>
                          <input
                            type="password"
                            name="current-password"
                            id="current-password"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="••••••••"
                            required=""
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="new-password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            name="new-password"
                            id="new-password"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="••••••••"
                            required=""
                          />
                        </div>
                      </div>
                    </div>
                    {/* Modal footer */}
                    <Modal.Footer>
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Save all
                      </button>
                    </Modal.Footer>
                  </form>
                </Modal.Body>
              </Modal>
            </div>
          </div>

          {/*Model EDit account finish*/}
        </div>
      </div>
    </div>
  );
}
