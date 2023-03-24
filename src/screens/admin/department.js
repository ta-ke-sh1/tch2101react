import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { host_url } from "../../utils/utils";

export default function DepartmentComponent() {
  const [show, setShow] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);
  const [nameDepartment, setNameDepartment] = useState("");


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseDepartment = () => setShowDepartment(false);
  const handleShowDepartment = (id) => {
    setShowDepartment(true);
    axios
      .get(host_url + "/department?id=" + id)
      .then((res) => {
        setDepartmentById(res.data);
        console.log(res.data);
      });
  };

  const [department, setDepartment] = useState([]);
  const [departmentById, setDepartmentById] = useState({});
  const [nameDepartmentById, setNameDepartmentById] = useState({});

  useEffect(() => {
    fetchDepartment();
  }, []);

  function fetchDepartment() {
    axios
      .get(host_url + "/department")
      .then((res) => {
        setDepartment(res.data);
      })
      .catch((err) => console.error(err));
  }
  function addDepartment() {
    axios.post(host_url + "/department/add", {
      name: nameDepartment,
    });
  }
  function editDepartment() {
    axios.post(host_url + "/department/edit", {
      id: departmentById.id,
      name: nameDepartmentById,
      emp_count: 0,
    });
  }
  function deleteDepartment(id) {
    axios
      .post(host_url + "/department/delete/", {
        id: id,
      })
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
                  placeholder="Search Department"
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
              <b> List Department</b>
            </h2>
          </div>
          <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button variant="primary" onClick={handleShow}>
              Add New Department
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
                    emp_count
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {department.map((item, index) => (
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
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {index + 1}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.emp_count}</td>

                    <td className="pl-3">
                      {/* Modal toggle */}
                      <Button
                        variant="primary"
                        onClick={() => handleShowDepartment(item.id)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => deleteDepartment(item.id)}
                      >
                        Delete
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
              <Modal.Title>Add A New Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={addDepartment}>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => setNameDepartment(e.target.value)}
                    id="name"
                    placeholder="Enter Name Department"
                  />
                </div>

                <button type="submit" class="btn btn-success mt-4">
                  Add A New Department
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
            id="DepartmentModal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
          >


            <div className="relative w-full h-full max-w-2xl md:h-auto">

              <Modal
                show={showDepartment}
                onHide={handleCloseDepartment}
                backdrop="static"
                keyboard={false}
              >
                {/* Modal header */}
                <Modal.Header closeButton>
                  <Modal.Title>Edit </Modal.Title>
                </Modal.Header>
                {/* Modal content */}


                <Modal.Body>

                  <form
                    onSubmit={editDepartment}
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
                            Name Department
                          </label>
                          <input
                            type="text"
                            name="form-control"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={departmentById.name}
                            onChange={(e) => setNameDepartmentById(e.target.value)}
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
