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

  const [users, setUsers] = useState([]);
  const [department, setDepartment] = useState([]);

  const [fullNameUser, setFullNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [userName, setUserName] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [numberPhoneUser, setNumberPhoneUser] = useState("");
  const [avatarUser, setAvatarUser] = useState("");
  const [roleUser, setRoleUser] = useState([]);
  const [dobUser, setDobUser] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  //edit 

  const [userById, setUserById] = useState({});
  const [fullNameEdit, setFullNameEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  // const [passwordUserEdit, setPasswordUserEdit] = useState("");
  const [avatarUserEdit, setAvatarUserEdit] = useState("");
  const [roleUserEdit, setRoleUserEdit] = useState("");
  const [dobUserEdit, setDobUserEdit] = useState("");
  const [departmentIdEdit, setDepartmentIdEdit] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const userPerPageCount = 6;

  const indexOfLastUser = currentPage * userPerPageCount;
  const indexIfFirstUser = indexOfLastUser - userPerPageCount;
  var currentUsers = users.slice(indexIfFirstUser, indexOfLastUser);

  useEffect(() => {
    fetchUsers();
    fetchDepartment();
  }, []);
  async function handleShowEditUser(id) {
    
    await axios
      .get(`${host_url}/user?id=${id}`)
      .then((res) => {
        setUserById(res.data);
        console.log(res.data.username);

        setShowEditUser(true);
      });
  };
  async function fetchUsers() {
    axios
      .get(host_url + "/user/")
      .then((res) => {
        var users = [];
        for (let i = 0; i < res.data.length; i++) {
          users.push(res.data[i]);
        }
        setUsers(users);
        // console.log(users);
      })
      .catch((err) => console.error(err));
  }
  function fetchDepartment() {
    axios
      .get(host_url + "/department")
      .then((res) => {
        setDepartment(res.data);
      })
      .catch((err) => console.error(err));
  }

  function addUser(event) {
    event.preventDefault();
    axios
      .post(host_url + "/user/", {
        fullName: fullNameUser,
        email: emailUser,
        username: userName,
        password: passwordUser,
        phone: numberPhoneUser,
        stat: 'Activated',
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
  async function editUser(event) {
    console.log(userById.username);
    event.preventDefault();
    await axios
    .post(host_url + "/user/edit/", {
      id: userById.username,
      fullName: fullNameEdit == "" ? userById.fullName : fullNameEdit,
      email: emailEdit == "" ? userById.email : emailEdit,
      stat: 'Activated',
      avatar:null, 
      role: roleUserEdit == "" ? userById.role[0] : roleUserEdit,
      dob: dobUserEdit== "" ? userById.dob : dobUserEdit,
      department_id: departmentIdEdit== "" ? userById.department_id : departmentIdEdit,
    },)
    .then(async (response) => {
      console.log(response);
      handleCloseEditUser()
      await fetchUsers();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function deleteUser(id) {
    axios.delete(`${host_url}/user?id=${id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

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
                {currentUsers.map((item, index) => (
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
                        onClick={() => handleShowEditUser(item.username)}
                        key={item.username}
                      >
                        Edit User
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => deleteUser(item.username)}
                      >
                        Delete User
                      </Button>
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
                    placeholder="Enter Phone Number"
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
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select a Role
                  </label>
                  <select
                    defaultValue={'Staff'}
                    onChange={(e) => setRoleUser(e.target.value)}
                    id="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option
                      value={'Admin'}
                    >Admin</option>
                    <option
                      value={'QAM'}
                    >Quality Assurance Manager</option>
                    <option
                      value={'QAC'}
                    >Quality Assurance Coordinator</option>
                    <option
                      value={'Staff'}
                    >Staff</option>
                  </select>
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
                    id="department"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {department.map((item) =>
                      <option
                        selected
                        value={item.id}
                      >{item.name}</option>
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
                    onSubmit={editUser}
                    className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    {/* Modal body */}
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setFullNameEdit(e.target.value)}
                        id="name"
                        defaultValue={userById.fullName}
                      />
                    </div>
                    <div class="form-group mt-3">
                      <input
                        type="email"
                        class="form-control"
                        onChange={(e) => setEmailEdit(e.target.value)}
                        id="InputEmail1"
                        defaultValue={userById.email}
                      />
                    </div>
                    {/* <div class="form-group mt-3">
                      <input
                        type="password"
                        class="form-control"
                        onChange={(e) => setPasswordUserEdit(e.target.value)}
                        id="Password"
                        placeholder="nhập mật khẩu mới"
                      />
                    </div> */}
                    {/* <div class="form-group mt-3">
                      <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setNumberPhoneUserEdit(e.target.value)}
                        id="phone"
                        defaultValue={userById.phone}
                      />
                    </div> */}

                    <div class="form-group mt-3">
                      <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setDobUserEdit(e.target.value)}
                        id="dob"
                        defaultValue={userById.dob}
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
                        onChange={(e) => setAvatarUserEdit(e.target.value)}
                        id="image idea"
                        type="file"
                      />
                    </div>

                    <div class="form-group mt-3">
                      <label
                        htmlFor="role"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select a Role
                      </label>
                      <select
                        defaultValue={userById.role}
                        onChange={(e) => setRoleUserEdit(e.target.value)}
                        id="role"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option
                          value={'Admin'}
                        >Admin</option>
                        <option
                          value={'QAM'}
                        >Quality Assurance Manager</option>
                        <option
                          value={'QAC'}
                        >Quality Assurance Coordinator</option>
                        <option
                          value={'Staff'}
                        >Staff</option>
                      </select>
                    </div>
                    <div class="form-group mt-3" >
                      <label
                        htmlFor="department"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select a department
                      </label>
                      <select
                        onChange={(e) => setDepartmentIdEdit(e.target.value)}
                        id="department"
                        placeholder={userById.department}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {department.map((item) =>
                          <option
                            selected
                            value={item.id}
                          >{item.name}</option>
                        )}
                      </select>
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
      <div className="flex flex-col items-center mb-5">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Page{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentPage}
              </span>{" "}
              /{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {Math.ceil(users.length / userPerPageCount)}
              </span>
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <Button
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Prev
              </Button>
              <Button
                onClick={() => {
                  if (
                    currentPage < Math.ceil(users.length / userPerPageCount)
                  ) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </Button>
            </div>
          </div>
    </div>
  );
}
