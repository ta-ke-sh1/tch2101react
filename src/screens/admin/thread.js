import React, { useEffect, useState, } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { host_url } from "../../utils/utils";
import moment from "moment";

export default function ThreadComponent() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showThread, setShowThread] = useState(false);
  const handleCloseThread = () => setShowThread(false);
  const [nameThread, setNameThread] = useState("");
  const [descriptionThread, setDescriptionThread] = useState({});
  const [startDateThread, setStartDateThread] = useState({});
  const [endDateThread, setEndDateThread] = useState({});
  const [closedThread, setClosedThread] = useState({});



  const handleShowThread = (id) => {
    console.log(id);
    setShowThread(true);
    axios
      .get(host_url + "/thread?id=" + id)
      .then((res) => {
        setThreadById(res.data);
        console.log(res.data.id);
      });
  };

//edit
  const [threadById, setThreadById] = useState({});
  const [nameThreadById, setNameThreadById] = useState("");
  const [descriptionThreadById, setDescriptionThreadById] = useState("");
  const [startDateThreadById, setStartDateThreadById] = useState("");
  const [endDateThreadById, setEndDateThreadById] = useState("");
  const [closedThreadById, setClosedThreadById] = useState("");

  const [threads, setThread] = useState([]);
  useEffect(() => {
    fetchThread();
  }, []);

  const fromMilisecondsToDate = (milisecondsSinceEpoch) => {
    const date = new Date(milisecondsSinceEpoch * 1000);
    return date.toUTCString();
  };

  async function fetchThread() {
    axios
      .get(host_url + "/thread/")
      .then((res) => {
        setThread(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }

  const getAllSelected = () => {
    var array = []
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < checkboxes.length; i++) {
      array.push(checkboxes[i].value)
    }

    return array;
  }

  const handleDownloadCSV = async (id) => {
    const response = await axios.get(host_url + '/admin/createThreadReport', {
      responseType: 'blob',
      params: {
        id: id
      },
      headers: {
        Authorization: localStorage.getItem('access_token'),
      }
    });
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.setAttribute('download', `${"Report_" + id + '.csv'}`);
    fileLink.setAttribute('target', '_blank');
    document.body.appendChild(fileLink);
    fileLink.click();
    fileLink.remove();
  }

  const handleDownloadZip = async () => {
    const selected = getAllSelected();
    console.log(selected)

    const response = await axios.get(host_url + '/admin/zipDirectory', {
      responseType: 'blob',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      }
    });
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.setAttribute('download', `${"\\summary_file\\summary" + new Date().toJSON().slice(0, 10).replace(/-/g, "-") + '.zip'}`);
    fileLink.setAttribute('target', '_blank');
    document.body.appendChild(fileLink);
    fileLink.click();
    fileLink.remove();
  }

  function addThread() {
    axios.post(host_url + "/thread/", {
      name: nameThread,
      description: descriptionThread,
      startDate: startDateThread,
      endDate: endDateThread,
      closedDate: closedThread,
    });
  }

  async function editThread(e) {
    e.preventDefault();
    await axios.post(host_url + "/thread/edit/", {
      id: threadById.id,
      name: !nameThreadById ? threadById.name : nameThreadById,
      description: !descriptionThreadById ? threadById.name : descriptionThreadById,
      startDate: !startDateThreadById ? threadById.startDate : startDateThreadById ,
      endDate: !endDateThreadById ? threadById.endDate : endDateThreadById,
      closedDate: !closedThreadById ? threadById.closedDate : closedThreadById,
      emp_count: 0,
    })
    .then(async (response) => {
      handleCloseThread();
      await fetchThread();
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    // let obj = {
    //   a: descriptionThreadById,
    //   b: startDateThreadById,
    //   c: endDateThreadById,
    //   d: closedThreadById,
    // }
    // console.log(obj)
  }

  function deleteThread(id) {
    axios.delete(`${host_url}/Thread?id=${id}`)
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
            <button
              onClick={() => handleDownloadZip()}
              type="button"
              className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 mr-2 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                  clipRule="evenodd"
                />
              </svg>
              Zip All Files
            </button>
          </div>
          <div
            className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b> List Thread</b>
            </h2>
          </div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button variant="primary" onClick={handleShow} >
              Add New Thread
            </Button>
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
                    Description
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
                          value={item.id}
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
                    <td className="px-6 py-4" >{item.description}</td>
                    <td className="px-6 py-4" >{fromMilisecondsToDate(item.startDate)}</td>
                    <td className="px-6 py-4" >{fromMilisecondsToDate(item.endDate)}</td>
                    <td className="px-6 py-4" >{fromMilisecondsToDate(item.closedDate)}</td>
                    <td className="pl-3">
                      {/* Modal toggle */}
                      <Button
                        variant="primary"
                        onClick={() => handleShowThread(item.id)}
                      >
                        Edit
                      </Button>
                      <br />
                      <Button
                        variant="danger"
                        onClick={() => deleteThread(item.id)}
                      >
                        Delete
                      </Button>
                      <br />
                      <Button
                        onClick={() => handleDownloadCSV(item.id)}
                      >
                        Download CSV File
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
              <Modal.Title>Add A New Thread</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={addThread}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setNameThread(e.target.value)}
                    id="name"
                    placeholder="Enter Name Thread"
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setDescriptionThread(e.target.value)}
                    id="DescriptionThread"
                    placeholder="Enter Description"
                  />
                </div>
                <div className="form-group mt-3">
                  <Form.Group controlId="Start Date<">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" name="startDate" placeholder="Enter Start Date" onChange={(e) => setStartDateThread(e.target.value)} />
                  </Form.Group>
                </div>
                <div className="form-group mt-3">
                  <Form.Group controlId="End Date<">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" name="startDate" placeholder="Enter Start  Date" onChange={(e) => setEndDateThread(e.target.value)} />
                  </Form.Group>
                </div>
                <div className="form-group mt-3">
                  <Form.Group controlId="Closed Thread">
                    <Form.Label>Close Date</Form.Label>
                    <Form.Control type="date" name="startDate" placeholder="Enter Start  Date" onChange={(e) => setClosedThread(e.target.value)} />
                  </Form.Group>
                </div>

                <button type="submit" className="btn btn-success mt-4">
                  Add A New Thread
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
                    onSubmit={editThread}
                    className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    {/* Modal body */}
                    <div className=" ">
                  
                        <div className="form-group mt-3">
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
                            defaultValue={threadById.name}
                            onChange={(e) => setNameThreadById(e.target.value)}
                          />
                        </div>
                      </div>
                   
                    <div className="form-group mt-3">
                    <label
                            htmlFor="first-name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Description
                          </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setDescriptionThreadById(e.target.value)}
                        id="DescriptionThread"
                        defaultValue={threadById.description}
                      />
                    </div>
                    <div className="form-group mt-3">
                      <Form.Group controlId="Start Date<">
                        <Form.Label>Start Date: {moment(threadById.startDate*1000).format('yyyy-MM-DD')}</Form.Label>
                        <Form.Control type="date" name="startDate"  onChange={(e) => setStartDateThreadById(e.target.value)} />
                      </Form.Group>
                    </div>
                    <div className="form-group mt-3">
                      <Form.Group controlId="End Date<">
                        <Form.Label>End Date: {moment(threadById.endDate * 1000).format('yyyy-MM-DD')}</Form.Label>
                        <Form.Control type="date" name="startDate" onChange={(e) => setEndDateThreadById(e.target.value)} />
                      </Form.Group>
                    </div>
                    <div className="form-group mt-3">
                      <Form.Group controlId="Closed Thread">
                        <Form.Label>Close Date: {moment(threadById.closedDate*1000).format('yyyy-MM-DD')}</Form.Label>
                        <Form.Control type="date" name="startDate" onChange={(e) => setClosedThreadById(e.target.value)} />
                      </Form.Group>
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
