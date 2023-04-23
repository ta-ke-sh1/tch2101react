import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Button,Modal,Form } from "react-bootstrap";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Menu } from "antd";

import axios from "axios";
import { host_url } from "../../utils/utils";

export default function IdeaMainComponent() {
  const ideaPerPageCount = 5;
  const [show, setShow] = useState(false);
  const [idea, setIdea] = useState([]);
  const [ideaById, setIdeaById] = useState({});
  const [nameIdeaById, setNameIdeaById] = useState({});
  
 
  const [threads, setThreads] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [showIdea, setShowIdea] = useState(false);
  const [nameIdea, setNameIdea] = useState("");
//edit

  const [nameWriter_id, setNameWriter_id] = useState([]);
  const [approver_id, setApprover_id] = useState([]);
  const [title, setTitle] = useState([]);
  const [category, setCategory] = useState([]);
  const [thread, setThread] = useState([]);
  const [stat, setStat] = useState([]);
  const [content, setContent] = useState([]);

  
  

  


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseIdea = () => setShowIdea(false);
  function handleShowIdea(id)  {
    console.log(id);
      setShowIdea(true);
      axios.get(host_url + "/Idea?id=" + id).then((res) => {
          setIdeaById(res.data);
          console.log(res.data.id);
      });
  };
  const menuDownload = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Download all(ideas)
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Download Idea
        </a>
      </Menu.Item>
    </Menu>
  );

  const menuListCategory = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          category
        </a>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    fetchIdeas();
  }, []);
  function deleteIdea(id) {
    axios
        .delete(`${host_url}/idea?id=${id}`)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
}

function addIdea() {
  axios.post(host_url + "/idea", {
      name: nameIdea,
  });
}

function editIdea() {
  axios.put(host_url + "/idea", {
      id: ideaById.id,
      name: nameIdeaById,
      emp_count: 0,
  });
}
  async function fetchIdeas() {
    axios
      .get(host_url + "/idea/")
      .then((res) => {
        console.log(res);
        var ideas = [];
        for (let i = 0; i < res.data.length; i++) {
          ideas.push(res.data[i]);
        }
        setIdeas(ideas);
      })
      .catch((err) => console.error(err));
  }
  

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * ideaPerPageCount;
  const indexIfFirstPost = indexOfLastPost - ideaPerPageCount;
  var currentIdeas = ideas.slice(indexIfFirstPost, indexOfLastPost);

  function handleClick(e) {
    console.log(e);
    // const { id, checked } = e.target;
    // setIsCheck([...isCheck, id]);
    // if (!checked) {
    //   setIsCheck(isCheck.filter(item => item !== id));
    // }
  }

  return (
    <div className="container ">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="flex flex-grow ">
          <div className="col-sm-3 mt-5 mb-4 text-gred flex">
            <div className="w-48 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ">
              <Dropdown
                overlay={menuDownload}
                className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              >
                <div onClick={(e) => e.preventDefault()}>
                  <Space>
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
                    Download
                    <DownOutlined />
                  </Space>
                </div>
              </Dropdown>
            </div>
          </div>
          <div
            className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b> List idea</b>
            </h2>
          </div>
          <div className="col-sm-3 mt-5 mb-4 text-gred flex justify-end">
            <div className="w-48 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ">
              <Dropdown
                overlay={menuListCategory}
                className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              >
                <div onClick={(e) => e.preventDefault()}>
                  <Space>
                    Sort by category
                    <DownOutlined />
                  </Space>
                </div>
              </Dropdown>
            </div>
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
                    </div>
                  </th>
                  <th scope="col" className="px-3 py-2">
                    No
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Writer_id
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Approver_id
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Approved_date
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Title
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Category
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Thread
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Stat
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Post_date
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentIdeas.map((idea) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          onClick={() => handleClick(idea.id)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </td>

                    {/* <td className="px-3 py-2">{index + 1}</td> */}
                    <td className="px-3 py-2">{idea.writer_id}</td>
                    <td className="px-3 py-2">{idea.approver_id}</td>
                    <td className="px-3 py-2">{idea.approved_date} </td>
                    <td className="px-3 py-2">{idea.title}</td>
                    <td className="px-3 py-2">{idea.category}</td>
                    <td className="px-3 py-2">{idea.thread}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />{" "}
                        {idea.stat}
                      </div>
                    </td>
                    <td className="px-3 py-2">{idea.post_date}</td>
                    {/* <td className="px-3 py-2">{idea.is_anonymous}</td> */}
                    <Button
                      variant="primary"
                      onClick={() => handleShowIdea(idea.id)}
                    >
                      Edit
                    </Button>
                    <br />
                    <Button
                      variant="danger"
                      onClick={() => deleteIdea(idea.id)}
                    >
                      Delete
                    </Button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="model_box">
          {/* <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add A New Idea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={addIdea}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setNameIdea(e.target.value)}
                    id="name"
                    placeholder="Enter Name Idea"
                  />
                </div>

                <button type="submit" className="btn btn-success mt-4">
                  Add A New Idea
                </button>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal> */}
          {/* Model Box Finsihs */}
          {/*Model EDit account*/}

          <div
            id="IdeaModal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
          >
            <div className="relative w-full h-full max-w-2xl md:h-auto">
              <Modal
                show={showIdea}
                onHide={handleCloseIdea}
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
                    onSubmit={editIdea}
                    className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    {/* Modal body */}
                    <div className="form-group">
                    <Form.Label>Writer_id</Form.Label>

                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setNameWriter_id(e.target.value)}
                    id="name"
                    placeholder="admin"
                  />
                </div>
                <div className="form-group mt-3">
                <Form.Label>Approver_id</Form.Label>

                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setApprover_id(e.target.value)}
                    id="DescriptionThread"
                    placeholder="admin"
                  />
                </div>
                <div className="form-group mt-3">
                <Form.Label>title</Form.Label>

                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    placeholder="Lorem Ipsum Sit Dolor"
                  />
                </div>
                <div className="form-group mt-3">
                <Form.Label>Category</Form.Label>

                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setCategory(e.target.value)}
                    id="Category"
                    placeholder="Funding"
                  />
                </div>
                <div className="form-group mt-3">
                <Form.Label>Thread</Form.Label>

                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setThread(e.target.value)}
                    id="DescriptionThread"
                    placeholder="Fall 2022 Halloween Event"
                  />
                </div>
                <div className="form-group mt-3">
                <Form.Label>Stat</Form.Label>

                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setStat(e.target.value)}
                    id="Stat"
                    placeholder="Approved"
                  />
                </div>
                <div className="form-group mt-3">
                <Form.Label>Content</Form.Label>

                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setContent(e.target.value)}
                    id="Content"
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate libero in finibus laoreet. Suspendisse dignissim ultricies tortor in iaculis. Nam in nunc tellus. Vivamus vitae congue elit, vel auctor nunc"
                  />
                </div>
                
                <div className="form-group mt-3">
                  <Form.Group controlId="Start Date<">
                    <Form.Label>Post Date</Form.Label>
                    <Form.Control type="date" name="startDate" placeholder="2023/3/13"  />
                  </Form.Group>
                </div>
                <div className="form-group mt-3">
                  <Form.Group controlId="End Date<">
                    <Form.Label>approved_date</Form.Label>
                    <Form.Control type="date" name="startDate" placeholder="2023/3/20" />
                  </Form.Group>
                </div>
                <div className="form-group mt-3">
                <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="flexSwitchCheckDefault"
                                        // onChange={(e) =>
                                        //     setAnonymous(e.target.checked)
                                        // }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexSwitchCheckDefault"
                                    >
                                        Is anonymous?
                                    </label>
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
        </div>
        <div className="flex flex-col items-center mb-5">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Page{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentPage}
            </span>{" "}
            /{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.ceil(ideas.length / ideaPerPageCount)}
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
                if (currentPage < Math.ceil(ideas.length / ideaPerPageCount)) {
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
    </div>
  );
}
