// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme, Card } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

import {
  fromMilisecondsToDate,
  host_url,
  isExpired,
} from "../../utils/utils.js";

import IdeaForm from "./ideaForm.js";
import CategoryForm from "./categoryForm";
import CardItem from "./cardIdea.js";
import { useAuth } from "../../hooks/useAuth.js";
import Tags from "../../components/tag.js";

export default function ThreadDetails() {
  const { Header, Content, Footer } = Layout;
  let { id } = useParams();
  const auth = useAuth();

  const ideaPerPageCount = 4;

  const [categories, setCategories] = useState([]);

  const [ideas, setIdeas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tags, setTags] = useState([]);
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

  const [isLoadedThread, setIsLoadedThread] = useState(false);
  const [isLoadedIdeas, setIsLoadedIdeas] = useState(false);
  useEffect(() => {
    initIdeas();
    initThread();
    initCategories();
  }, []);

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
        var curr_tags = [];
        for (var i = 0; i < res.data.length; i++) {
          var categories = res.data[i].idea.category;
          result.push({
            id: res.data[i].id,
            key: res.data[i].idea.id,
            visit_count: res.data[i].idea.visit_count,
            stat: res.data[i].idea.stat,
            post_date: res.data[i].idea.post_date,
            title: res.data[i].idea.title,
            description: res.data[i].idea.description,
            category: res.data[i].idea.category,
            is_anonymous: false,
            writer_id: res.data[i].idea.writer_id,
            file: res.data[i].idea.file,
            content: res.data[i].idea.content,
          });

          for (let j = 0; j < categories.length; j++) {
            if (
              !curr_tags.includes(categories[j]) &&
              categories[j] !== null &&
              categories[j] !== undefined
            ) {
              curr_tags.push(categories[j]);
            }
          }
        }
        result.sort((a, b) => a.post_date - b.post_date).reverse();
        setIdeas(result);
        setTags(curr_tags);
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
        });
        setIsLoadedThread(true);
      })
      .catch((err) => console.error(err));
  }

  function sort(tag) {
    axios
      .get(host_url + "/idea/filter", {
        params: {
          category: tag,
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
            is_anonymous: false,
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

  const handleDeleteCategory = (id) => {
    axios.delete(host_url + "/category", { params: { id: id } }).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <Layout>
        <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
          <div
            style={{
              float: "right",
              width: 120,
              height: 31,
              margin: "16px 24px 16px 0",
              background: "rgba(255, 255, 255, 0.2)",
            }}
          />

          <Menu
            theme="dark"
            mode="horizontal"
          >
            <Menu.Item>
              <a rel="noopener noreferrer" href="/threads">
                Threads
              </a>
            </Menu.Item>

            <Menu.Item>
              <a rel="noopener noreferrer" href="/threads">
                Upload Idea
              </a>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          className="site-layout "
          style={{ margin: "24px 16px 0", overflow: "initial" }}
        >
          <Breadcrumb
            style={{ margin: "16px 0" }}
            className="flex justify-center items-center h-16  sm:h-20 bg-gray-100"
          >
           
            {!isExpired(thread.endDate) ? (
                  <Button type="primary" onClick={handleShow} className="xs:text-xs sm:text-sm md:text-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Add New Idea
                  </Button>
                ) : (
                 <Button className="flex flex-row md:text-2px bg-blue-200 mr-2 xs:text-xs sm:text-sm md:text-md "> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                    Archived Thread
                    </Button>
                )}
                {auth.clearance < 2 ? (
            <div className="h-30 w-full shadow  mt-10">
              <Button variant="primary" onClick={handleShow}>
                Add New Category
              </Button>
             
              {categories.map((tag) => (
                <li>
                  <span>{tag.id}</span> - <span>{tag.idea}</span> -{" "}
                  <button onClick={() => handleDeleteCategory(tag.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </div>
          ) : (
            <div className="h-30 w-full shadow  mt-10">
              <h2 className="text-lg font-bold">Sort by category: </h2>
              <ul>
                {tags.map((tag) => (
                  <li>
                    <Tags key={tag} text={tag} onClick={() => sort(tag)} />
                  </li>
                ))}
              </ul>
            </div>
          )}
            
            <Button type="primary">asdasd</Button>
            <Button type="primary">asdasd</Button>
            <Button type="primary">asdasd</Button>
            <Button type="primary">asdasd</Button>

          </Breadcrumb>
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
                    currentPage < Math.ceil(ideas.length / ideaPerPageCount)
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
      <CategoryForm
        props={{

        }}
      />
   
    </>
  );
}
