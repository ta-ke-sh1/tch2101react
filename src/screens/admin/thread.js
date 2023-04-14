import React, { useEffect, useState, } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { host_url  } from "../../utils/utils";



export default function ThreadComponent() {
  const [show, setShow] = useState(false);
  const [showThread, setShowThread] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseThread= () => setShowThread(false);
  const handleShowThread= () => setShowThread(true);

  const [threads, setThread] = useState([]);
  useEffect(() => {
    fetchThread();
  }, []);

  const fromMilisecondsToDate = (milisecondsSinceEpoch) => {
    const date = new Date(milisecondsSinceEpoch * 1000);
    return date.toUTCString();
};
  function fetchThread() {
    axios
      .get(host_url+"/thread/")
      .then((res) => {
        setThread(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }

  function deleteThread(id) {
    axios.delete(`${host_url}/department?id=${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="container ">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row ">
          <div className="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search Thread"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div
            className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b> List Thread</b>
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive ">
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
                    Start Day
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End Day
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Close Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Idea Count
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {threads.map((item, index) => (
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
                    <td className="px-6 py-4" >{item.name}</td>
                    <td className="px-6 py-4" >{fromMilisecondsToDate(item.startDate)}</td>
                    <td className="px-6 py-4" >{fromMilisecondsToDate(item.endDate)}</td>
                    <td className="px-6 py-4" >{fromMilisecondsToDate(item.closedDate)}</td>
                    <td className="px-6 py-4" >{item.ideaCount}</td>


                    <td className="pl-3">
                      {/* Modal toggle */}
                      <Button
                        variant="primary"
                        onClick={() => handleShowThread(item.id)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => deleteThread(item.id)}
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
         
          {/*Model EDit account*/}

          <div
            id="ThreadModal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
          >
            <div className="relative w-full h-full max-w-2xl md:h-auto">
              <Modal
                show={showThread}
                onHide={handleCloseThread}
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
                            End Date
                          </label>
                          <input type="text" id="datepicker" class="border border-gray-400 p-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Select date" />
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
