// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Tag from "../../components/tag.js";
import {
  fromMilisecondsToDate,
  host_url,
  isExpired,
} from "../../utils/utils.js";
import { Button } from "react-bootstrap";
import IdeaForm from "./ideaForm.js";
import { Link } from "react-router-dom";
import CardItem from "./cardIdea.js";

export default function ThreadDetails() {
  let { id } = useParams();

  const ideaPerPageCount = 4;

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
  }, []);

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
    console.log(tag);
    var sorted = ideas.filter((a) => a.category.includes(tag));
    console.log(sorted);
    setIdeas(sorted);
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
      <div className="flex flex-row md-auto mx-auto  h-screen ">
        <div className="w-1/4 bg-white shadow p-4 mb-10">
          {/* left sidebar content */}
          <div className="mt-10  h-30 shadow">
            <ul>
              <li>
                <Link to={"/threads"}>
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
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                {!isExpired(thread.endDate) ? (
                  <a  onClick={handleShow}>
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
                  </a>
                ) : (
                  <Button className="bg-gray-500 disabled text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Archived Thread
                  </Button>
                )}
                
              </li>
            </ul>
          </div>

          <div className="h-30 w-full shadow  mt-10">
            <h2 className="text-lg font-bold">Sort available tags: </h2>
            <ul>
              {tags.map((tag) => (
                <li>
                  <Tag key={tag} text={tag} onClick={() => sort(tag)} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-2/4  md:w-3/4 lg:w-4/5  md:px-12 lg:24 h-full overflow-x-scroll divide-y antialiased bg-white shadow p-4">
          <div className="space-y-2 pt-6 pb-8 pl-6 pr-6 md:space-y-5 ">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {thread.name}
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              From: {thread.startDate}
              <br />
              Closed Date: {fromMilisecondsToDate(thread.endDate)}
            </p>
            <div>
              <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 mb-1">
                Available tags:
              </p>
            </div>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify">
              {thread.description}
            </p>
          </div>

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
        </div>
      </div>

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
      {/*  */}
    </>
  );
}
