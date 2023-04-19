// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Dropdown, Space } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar";
import { DownOutlined } from "@ant-design/icons";
import { Modal } from "react-bootstrap";

import {
    fromMilisecondsToDate,
    host_url,
    isExpired,
} from "../../utils/utils.js";

import IdeaForm from "./ideaForm.js";
import CardItem from "./cardIdea.js";
import { useAuth } from "../../hooks/useAuth.js";
import Tags from "../../components/tag.js";
import Link from "antd/es/typography/Link";

export default function ThreadDetails() {
    const { Content, Footer } = Layout;
    let { id } = useParams();
    const auth = useAuth();

    const ideaPerPageCount = 4;

    const [categories, setCategories] = useState([]);

    const [ideas, setIdeas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [thread, setThread] = useState({});

    const indexOfLastPost = currentPage * ideaPerPageCount;
    const indexIfFirstPost = indexOfLastPost - ideaPerPageCount;
    var currentIdeas = ideas.slice(indexIfFirstPost, indexOfLastPost);

    const [show, setShow] = useState(false);
    const [showEditIdea, setShowEditIdea] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseEditIdea = () => setShowEditIdea(false);
    const handleShowEditIdea = () => setShowEditIdea(true);

    const [addCategory, setAddCategory] = useState(false);
    const handleShowCategory = () => setAddCategory(true);
    const handleCloseCategory = () => setAddCategory(false);
    const [nameCategory, setNameCategory] = useState({});

    const [isLoadedThread, setIsLoadedThread] = useState(false);
    const [isLoadedIdeas, setIsLoadedIdeas] = useState(false);

    const [departments, setDepartments] = useState([]);

    const [asc, setAsc] = useState(true);

    useEffect(() => {
        initIdeas();
        initThread();
        initCategories();
        initDepartment();
    }, []);

    const menuListDeparment = (
        <Menu>
            <Menu.Item>
                {departments.map((tag) => (
                    <Tags
                        key={tag.name}
                        text={tag.name}
                        onClick={() => sort(tag.id)}
                    />
                ))}
            </Menu.Item>
        </Menu>
    );

    const menuListCategory = (
        <Menu>
            <Menu.Item>
                {categories.map((tag) => (
                    <Tags
                        key={tag.id}
                        text={tag.name}
                        onClick={() => sort(tag.id)}
                    />
                ))}
            </Menu.Item>
        </Menu>
    );

    function addNewCategory() {
        if (nameCategory === "") return;
        axios
            .post(host_url + "/category/", {
                name: nameCategory,
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.error(err));
    }

    async function initDepartment() {
        axios.get(host_url + "/department").then((res) => {
            var result = [];
            for (let i = 0; i < res.data.length; i++) {
                result.push({
                    coordinator: res.data[i].coordinator,
                    name: res.data[i].name,
                });
            }
            setDepartments(result);
        });
    }

    async function initCategories() {
        axios.get(host_url + "/category").then((res) => {
            var result = [];
            for (let i = 0; i < res.data.length; i++) {
                result.push({
                    id: res.data[i].id,
                    name: res.data[i].name,
                });
            }
            setCategories(result);
        });
    }

    async function initIdeas() {
        axios
            .get(host_url + "/idea", {
                params: {
                    id: id,
                },
            })
            .then((res) => {
                var result = [];
                for (var i = 0; i < res.data.length; i++) {
                    result.push({
                        id: res.data[i].id,
                        key: res.data[i].idea.id,
                        visit_count: res.data[i].idea.visit_count,
                        stat: res.data[i].idea.stat,
                        post_date: res.data[i].idea.post_date,
                        title: res.data[i].idea.title,
                        description: res.data[i].idea.description,
                        category: res.data[i].idea.category,
                        is_anonymous: res.data[i].idea.is_anonymous,
                        writer_id: res.data[i].idea.writer_id,
                        file: res.data[i].idea.file,
                        content: res.data[i].idea.content,
                    });
                }
                result.sort((a, b) => a.post_date - b.post_date).reverse();
                setIdeas(result);
                setIsLoadedIdeas(true);
            })
            .catch((err) => console.error(err));
    }

    async function initThread() {
        axios
            .get(host_url + "/idea/threads", {
                params: {
                    id: id,
                },
            })
            .then((res) => {
                setThread({
                    id: res.id,
                    name: res.data.name,
                    startDate: fromMilisecondsToDate(res.data.startDate),
                    endDate: res.data.endDate,
                    description: res.data.description,
                    closedDate: res.data.closedDate,
                });
                setIsLoadedThread(true);
            })
            .catch((err) => console.error(err));
    }

    async function sortByReaction() {
        axios
            .get(host_url + "/idea/sortByLike", {
                params: {
                    thread: id,
                    asc: asc,
                },
            })
            .then((res) => {
                console.log(res);
                let result = [];
                for (let i = 0; i < res.data.length; i++) {
                    result.push({
                        id: res.data[i].id,
                        key: res.data[i].idea.id,
                        visit_count: res.data[i].idea.visit_count,
                        stat: res.data[i].idea.stat,
                        post_date: res.data[i].idea.post_date,
                        title: res.data[i].idea.title,
                        description: res.data[i].idea.description,
                        category: res.data[i].idea.category,
                        is_anonymous: res.data[i].is_anonymous,
                        file: res.data[i].idea.file,
                        writer_id: res.data[i].idea.writer_id,
                        content: res.data[i].idea.content,
                    });
                }
                setIdeas(result);
            });
    }

    function sort(tag) {
        axios
            .get(host_url + "/idea/filter", {
                params: {
                    thread: id,
                    category: tag,
                },
            })
            .then((res) => {
                console.log(res.data);
                var result = [];
                for (var i = 0; i < res.data.length; i++) {
                    result.push({
                        id: res.data[i].id,
                        key: res.data[i].idea.id,
                        visit_count: res.data[i].idea.visit_count,
                        stat: res.data[i].idea.stat,
                        post_date: res.data[i].idea.post_date,
                        title: res.data[i].idea.title,
                        description: res.data[i].idea.description,
                        category: res.data[i].idea.category,
                        is_anonymous: res.data[i].is_anonymous,
                        file: res.data[i].idea.file,
                        writer_id: res.data[i].idea.writer_id,
                        content: res.data[i].idea.content,
                    });
                }
                result.sort((a, b) => a.post_date - b.post_date).reverse();
                setIdeas(result);
            });
    }

    if (!isLoadedIdeas || !isLoadedThread) {
        return (
            <>
                {" "}
                <h1>Loading ... </h1>{" "}
            </>
        );
    }

    return (
        <>
            <Layout>
                <Navbar />

                <Content
                    className="site-layout"
                    style={{ margin: "24px 16px 0", overflow: "initial" }}
                >
                    <div className="flex flex-col md:justify-start space-y-10 md:space-y-0 md:flex-row md:space-x-10 sm:h-20 bg-gray-100">
                        {!isExpired(thread.endDate) ? (
                            <Button
                                type="primary"
                                onClick={handleShow}
                                className="w-40"
                            >
                                {" "}
                                Add New Idea
                            </Button>
                        ) : (
                            <></>
                        )}

                        {auth.clearance > 2 ? (
                            <div className="text-white  bg-white d-flex items-center justify-center  w-40 h-8 rounded">
                                <Link
                                    variant="primary"
                                    onClick={handleShowCategory}
                                >
                                    Add New Category
                                </Link>
                            </div>
                        ) : (
                            <></>
                        )}
                        <div className="w-70">
                            <Dropdown
                                overlay={menuListCategory}
                                className="rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                            >
                                <div
                                    className="text-black  bg-white d-flex items-center justify-center  w-40 h-8 rounded"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <Space>
                                        Sort by category
                                        <DownOutlined />
                                    </Space>
                                </div>
                            </Dropdown>
                        </div>
                        <div className=" w-70">
                            <Dropdown
                                overlay={menuListDeparment}
                                className="rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                            >
                                <div
                                    className="text-black  bg-white d-flex items-center justify-center  w-40 h-8 rounded"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <Space>
                                        Sort by Department
                                        <DownOutlined />
                                    </Space>
                                </div>
                            </Dropdown>
                        </div>
                        <Button
                            type="primary"
                            onClick={sortByReaction}
                            className="w-40"
                        >
                            {" "}
                            Sort by Reaction
                        </Button>
                    </div>

                    <br></br>
                    {!ideas.length && "No posts found."}
                    {currentIdeas.map((idea) => (
                        <CardItem
                            key={idea.id}
                            props={{
                                id: idea.id,
                                post_date: idea.post_date,
                                title: idea.title,
                                description: idea.description,
                                category: idea.category,
                                is_anonymous: false,
                                writer_id: idea.writer_id,
                                file: idea.file,
                                content: idea.content,
                                categories: categories,
                                isEnded: isExpired(thread.endDate),
                                isClosed: isExpired(thread.closedDate),
                            }}
                        />
                    ))}

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
                                    if (
                                        currentPage <
                                        Math.ceil(
                                            ideas.length / ideaPerPageCount
                                        )
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
                </Content>
                <Footer style={{ textAlign: "center" }}>TCH2202</Footer>
            </Layout>

            {/*  */}
            <IdeaForm
                props={{
                    show: show,
                    showEditIdea: showEditIdea,
                    handleClose: handleClose,
                    handleShow: handleShow,
                    handleShowEditIdea: handleShowEditIdea,
                    handleCloseEditIdea: handleCloseEditIdea,
                    threadId: id,
                }}
            />
            {/* */}
            <div className="model_box">
                <Modal
                    show={addCategory}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add A New Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={addNewCategory}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                        setNameCategory(e.target.value)
                                    }
                                    id="name"
                                    placeholder="Enter Name Category"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success mt-4"
                            >
                                Add A New Category
                            </button>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleCloseCategory}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}
