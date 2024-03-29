import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import {
    getCurrentDateAsDBFormat,
    decodeToken,
    host_url,
} from "../../utils/utils";
import Select from "react-select";

export default function IdeaForm({ props }) {
    const [categories, setCategories] = useState([]);
    const [hashtags, setHashtags] = useState([]);

    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState([]);
    const [files, setFiles] = useState([]);
    const [isAnonymous, setAnonymous] = useState(false);

    useEffect(() => {
        fetchCategories();
        fetchHashtags();
    }, []);

    function fetchHashtags() {
        axios
            .get(host_url + "/hashtag")
            .then((res) => {
                var h = [];
                for (let i = 0; i < res.data.length; i++) {
                    h.push({
                        value: res.data[i].id,
                        label: res.data[i].id,
                    });
                }
                setHashtags(h);
            })
            .catch((err) => console.error(err));
    }

    function fetchCategories() {
        axios
            .get(host_url + "/category/")
            .then((res) => {
                var c = [];
                for (let i = 0; i < res.data.length; i++) {
                    c.push({
                        value: res.data[i].id,
                        label: res.data[i].name,
                    });
                }
                setCategories(c);
            })
            .catch((err) => console.error(err));
    }

    const handleChangeCategory = (selectValue) => {
        const categories = [];
        for (let i = 0; i < selectValue.length; i++) {
            categories.push(selectValue[i].value);
        }
        setCategory(categories);
    };

    async function handleSubmit(event) {
        const token = localStorage.getItem("access_token");
        const decodedToken = decodeToken(token);
        event.preventDefault();
        const chosenFiles = Array.prototype.slice.call(files);
        var formData = new FormData();
        formData.append("approver_id", "admin");
        formData.append("writer_id", decodedToken.user);
        formData.append("title", title);
        for (let i = 0; i < category.length; i++) {
            formData.append("category", category[i]);
        }
        formData.append("content", content);
        formData.append("is_anonymous", isAnonymous);
        formData.append("approved_date", getCurrentDateAsDBFormat());
        formData.append("post_date", getCurrentDateAsDBFormat());
        formData.append("visit_count", 0);
        formData.append("thread", props.threadId);
        formData.append("stat", "Approved");
        for (let i = 0; i < hashtags.length; i++) {
            formData.append("hashtag", hashtags[i]);
        }
        for (let i = 0; i < chosenFiles.length; i++) {
            formData.append("items", chosenFiles[i]);
        }

        const response = await axios.post(host_url + "/idea", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    return (
        <div
            className="model_box"
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Idea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-6">
                            <label
                                type="text"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Title
                            </label>
                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                id="title"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="Enter Title"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Content
                            </label>
                            <textarea
                                rows="6"
                                onChange={(e) => setContent(e.target.value)}
                                id="content"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                                placeholder="Enter content"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-whites"
                                htmlFor="Idea_avatar"
                            >
                                Support Files
                            </label>
                            <input
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                aria-describedby="Idea_avatar_help"
                                id="files"
                                multiple
                                type="file"
                                onChange={(e) => setFiles(e.target.files)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Select an category
                            </label>
                            <Select
                                required
                                closeMenuOnSelect={false}
                                isMulti
                                defaultValue={{
                                    label: "Equipment",
                                    value: "6YfqEukmUOYMnAzB8rb4",
                                }}
                                onChange={handleChangeCategory}
                                options={categories}
                            />
                        </div>
                        <div className="form-check form-switch mb-6">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                                onChange={(e) => setAnonymous(e.target.checked)}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexSwitchCheckDefault"
                            >
                                Is anonymous?
                            </label>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={props.handleClose}
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Add Idea
                            </button>
                            <div
                                onClick={props.handleClose}
                                className="text-black bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Cancel
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            {/* Model Box Finsihs */}
        </div>
    );
}
