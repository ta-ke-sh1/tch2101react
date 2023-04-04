// // eslint-disable-next-line
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Tag from "../../components/tag.js";
// import {
//     fromMilisecondsToDate,
//     host_url,
//     isExpired,
// } from "../../utils/utils.js";
// import { Button } from "react-bootstrap";
// import IdeaForm from "./ideaForm.js";
// import ContainerWrapper from "../../components/container_wrapper.js";
// import ThreadItem from "../../components/idea_item.js";

// export default function ThreadDetails() {
//     let { id } = useParams();

//     const ideaPerPageCount = 4;

//     const [ideas, setIdeas] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [tags, setTags] = useState([]);
//     const [thread, setThread] = useState({});

//     const indexOfLastPost = currentPage * ideaPerPageCount;
//     const indexIfFirstPost = indexOfLastPost - ideaPerPageCount;
//     var currentIdeas = ideas.slice(indexIfFirstPost, indexOfLastPost);

//     const [show, setShow] = useState(false);
//     const [showEditIdea, setShowEditIdea] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//     const handleCloseEditIdea = () => setShowEditIdea(false);
//     const handleShowEditIdea = () => setShowEditIdea(true);

//     const [isLoadedThread, setIsLoadedThread] = useState(false);
//     const [isLoadedIdeas, setIsLoadedIdeas] = useState(false);

    

//     useEffect(() => {
//         initIdeas();
//         initThread();
//     }, []);

//     async function initIdeas() {
//         axios
//             .get(host_url + "/idea", {
//                 params: {
//                     id: id
//                 }
//             })
//             .then((res) => {
//                 var result = [];
//                 var curr_tags = [];
//                 for (var i = 0; i < res.data.length; i++) {
//                     var categories = res.data[i].idea.category;
//                     result.push({
//                         id: res.data[i].id,
//                         key: res.data[i].idea.id,
//                         visit_count: res.data[i].idea.visit_count,
//                         stat: res.data[i].idea.stat,
//                         post_date: res.data[i].idea.post_date,
//                         title: res.data[i].idea.title,
//                         description: res.data[i].idea.description,
//                         category: res.data[i].idea.category,
//                         is_anonymous: false,
//                         writer_id: res.data[i].idea.writer_id,
//                     });

//                     for (let j = 0; j < categories.length; j++) {
//                         if (
//                             !curr_tags.includes(categories[j]) &&
//                             categories[j] !== null &&
//                             categories[j] !== undefined
//                         ) {
//                             curr_tags.push(categories[j]);
//                         }
//                     }
//                 }
//                 result.sort((a, b) => a.post_date - b.post_date).reverse();
//                 setIdeas(result);
//                 setTags(curr_tags);
//                 setIsLoadedIdeas(true);
//             })
//             .catch((err) => console.error(err));
//     }

//     async function initThread() {
//         axios
//             .get(host_url + "/idea/threads", {
//                 params: {
//                     id: id
//                 }
//             })
//             .then((res) => {
//                 setThread({
//                     id: res.id,
//                     name: res.data.name,
//                     startDate: fromMilisecondsToDate(res.data.startDate),
//                     endDate: res.data.endDate,
//                     description: res.data.description,
//                 });
//                 setIsLoadedThread(true);
//             })
//             .catch((err) => console.error(err));
//     }

//     function sort(tag) {
//         console.log(tag);
//         var sorted = ideas.filter((a) => a.category.includes(tag));
//         console.log(sorted);
//         setIdeas(sorted);
//     }

//     if (!isLoadedIdeas || !isLoadedThread) {
//         return <> <h1>Loading ... </h1> </>
//     }

//     return (
//         <>
//         <div className="flex flex-row md-auto mx-auto  h-screen ">
//         <div className="w-1/4 bg-white shadow p-4">
//           {/* left sidebar content */}
//           <h2 className="text-lg font-bold">Categories</h2>
//           <ul>
//             <li>
//               <a href="#" className="text-blue-500 hover:underline">
//                 Category 1
//               </a>
//             </li>
//             <li>
//               <a href="#" className="text-blue-500 hover:underline">
//                 Category 2
//               </a>
//             </li>
//             <li>
//               <a href="#" className="text-blue-500 hover:underline">
//                 Category 3
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div className="w-2/4  md:w-3/4 lg:w-4/5  md:px-12 lg:24 h-full overflow-x-scroll divide-y antialiased bg-white shadow p-4">
//           {/* main content */}
//           {/* <div className="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full overflow-x-scroll antialiased"> */}
//           <div className=" mt-3 flex flex-col">
//             <div className="bg-white mt-3">
//               {/* <img
//               className="border rounded-t-lg shadow-lg "
//               src={
//                 "https://images.unsplash.com/photo-1572817519612-d8fadd929b00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
//               }
//             /> */}
//               <div className="bg-white border shadow p-5 text-xl text-gray-700 font-semibold">
//                 <div className="space-y-2 pt-6 pb-8 md:space-y-5">
//                   <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 mb-2">
//                     {idea.title}
//                   </h1>
//                   {idea.category
//                     ? idea.category.map((tag) => <Tag key={tag} text={tag} />)
//                     : ""}
//                   <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify mb-1">
//                     Posted on: {idea.post_date}
//                   </p>
//                   <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify mb-1">
//                     Approved by {idea.approver_id}
//                   </p>
//                   <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify">
//                     {idea.content}
//                   </p>
//                 </div>
//               </div>
//               <div className="bg-white p-1 rounded-b-lg border shadow flex flex-row flex-wrap">
//                 <div className="w-1/3 flex items-center justify-center  p-2 bg-white rounded-md hover:bg-gray-200 focus:outline-none">
//                   <button
//                     onClick={(e) => handleReaction(e, true)}
//                     className={
//                       isReacted === 1
//                         ? "bg-blue-500 text-white hover:bg-blue-700  font-bold py-2 px-4 border border-blue-700 rounded"
//                         : "bg-white text-black hover:bg-blue-700 font-bold py-2 px-4  border-blue-700 rounded"
//                     }
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       className="w-6 h-6 "
//                     >
//                       <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
//                     </svg>
//                   </button>
//                   {reactions.like}
//                 </div>
//                 <div className="w-1/3 flex items-center justify-center  p-2 bg-white rounded-md hover:bg-gray-200 focus:outline-none">
//                   <button
//                     onClick={(e) => handleReaction(e, false)}
//                     className={
//                       isReacted === -1
//                         ? "bg-blue-500 text-white hover:bg-blue-700  font-bold py-2 px-4  border-blue-700 rounded"
//                         : "bg-white text-black hover:bg-blue-700  font-bold py-2 px-4  border-blue-700 rounded"
//                     }
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       className="w-6 h-6"
//                     >
//                       <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
//                     </svg>
//                   </button>
//                   {reactions.dislike}
//                 </div>
//                 <div className="w-1/3 flex items-center justify-center  p-2 bg-white rounded-md hover:bg-gray-200 focus:outline-none">
//                   <a
//                     href="#"
//                     className="text-blue-500 hover:underline"
//                     onClick={openPopup}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       className="w-6 h-6"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </a>
//                   ({comments.length})
//                 </div>
//               </div>
//               <div
//                 className={`fixed z-10 inset-0 overflow-y-auto ${
//                   isOpen ? "" : "hidden"
//                 }`}
//               >
//                 <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//                   <div
//                     className="fixed inset-0 transition-opacity"
//                     aria-hidden="true"
//                     onClick={closePopup}
//                   >
//                     <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//                   </div>
//                   <div
//                     className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
//                     role="dialog"
//                     aria-modal="true"
//                     aria-labelledby="modal-headline"
//                   >
//                     <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                       <h2
//                         className="text-lg font-medium leading-6 text-gray-900"
//                         id="modal-headline"
//                       >
//                         Comments
//                       </h2>
//                       <div className="mt-4">
//                         {!comments.length && "No comments available."}
//                         {comments.map((comment) => (
//                           <div className="flex items-start mb-4">
//                             <div className="flex-shrink-0 mr-2">
//                               <img
//                                 className="w-8 h-8 rounded-full"
//                                 src={`https://avatars.dicebear.com/api/avataaars/${comment.user_id}.svg`}
//                                 alt={`${comment.user_id}'s avatar`}
//                               />
//                             </div>
//                             <div>
//                               <div className="flex items-center mb-1">
//                                 <h4 className="text-gray-800 font-medium mr-2">
//                                   {comment.user_id}
//                                 </h4>
//                                 <span className="text-gray-500 text-sm">
//                                   2 hours ago
//                                 </span>
//                               </div>
//                               <p className="text-gray-700">{comment.content}</p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                       <div className="flex justify-between">
//                         {idea.file === "" ? "" : idea.file}
//                       </div>
//                       <form
//                         onSubmit={handleSubmit}
//                         encType="multipart/form-data"
//                       >
//                         <div className="mt-4">
//                           <input
//                             onChange={(e) => setComment(e.target.value)}
//                             type="text"
//                             id="comment"
//                             className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//                             placeholder="Enter Comment"
//                           />
//                         </div>
//                         <div className="form-check form-switch mb-6">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             id="flexSwitchCheckDefault"
//                             onChange={(e) => setAnonymous(e.target.checked)}
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="flexSwitchCheckDefault"
//                           >
//                             Is anonymous?
//                           </label>
//                         </div>
//                         <div className="flex w-full">
//                           <div className="justify-end">
//                             <button
//                               type="submit"
//                               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                             >
//                               Add Comment
//                             </button>
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                     <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                       <button
//                         type="button"
//                         className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//                         onClick={closePopup}
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="w-1/4 bg-white shadow p-4">
//           {/* right sidebar content */}
//           <h2 className="text-lg font-bold">Recent Posts</h2>
//           <ul>
//             <li>
//               <a href="#" className="text-blue-500 hover:underline">
//                 Post 1
//               </a>
//             </li>
//             <li>
//               <a href="#" className="text-blue-500 hover:underline">
//                 Post 2
//               </a>
//             </li>
//             <li>
//               <a href="#" className="text-blue-500 hover:underline">
//                 Post 3
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
           


// {/* ///// test */}

//                 <div className="space-y-2 pt-6 pb-8 md:space-y-5">
//                     <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
//                         {thread.name}
//                     </h1>
//                     <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
//                         From: {thread.startDate}
//                         <br />
//                         Closed Date:{" "}
//                         {fromMilisecondsToDate(thread.endDate)}
//                     </p>
//                     <div>
//                         <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 mb-1">
//                             Available tags:
//                         </p>
//                         {tags.map((tag) => (
//                             <Tag
//                                 key={tag}
//                                 text={tag}
//                                 onClick={() => sort(tag)}
//                             />
//                         ))}
//                     </div>
//                     <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify">
//                         {thread.description}
//                     </p>
//                 </div>
//                 <div className="flex justify-between">
//                     {!isExpired(thread.endDate) ? (
//                         <Button variant="primary" onClick={handleShow}>
//                             Add New Idea
//                         </Button>
//                     ) : (
//                         <button className="bg-gray-500 disabled text-white font-bold py-2 px-4 border border-blue-700 rounded">
//                             Archived Thread
//                         </button>
//                     )}
//                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
//                         Sort
//                     </button>
//                 </div>

//                 <ul className="divide-y divide-gray-200 dark:divide-gray-700">
//                     {!ideas.length && "No posts found."}
//                     {currentIdeas.map((idea) => (
//                         <ThreadItem
//                             key={idea.id}
//                             props={{
//                                 id: idea.id,
//                                 post_date: idea.post_date,
//                                 title: idea.title,
//                                 description: idea.description,
//                                 category: idea.category,
//                                 is_anonymous: false,
//                                 writer_id: idea.writer_id,
//                             }}
//                         />
//                     ))}
//                 </ul>

//                 <div className="flex flex-col items-center mb-5">
//                     <span className="text-sm text-gray-700 dark:text-gray-400">
//                         Page{" "}
//                         <span className="font-semibold text-gray-900 dark:text-white">
//                             {currentPage}
//                         </span>{" "}
//                         /{" "}
//                         <span className="font-semibold text-gray-900 dark:text-white">
//                             {Math.ceil(ideas.length / ideaPerPageCount)}
//                         </span>
//                     </span>
//                     <div className="inline-flex mt-2 xs:mt-0">
//                         <button
//                             onClick={() => {
//                                 if (currentPage > 1) {
//                                     setCurrentPage(currentPage - 1);
//                                 }
//                             }}
//                             className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//                         >
//                             Prev
//                         </button>
//                         <button
//                             onClick={() => {
//                                 if (
//                                     currentPage <
//                                     Math.ceil(
//                                         ideas.length / ideaPerPageCount
//                                     )
//                                 ) {
//                                     setCurrentPage(currentPage + 1);
//                                 }
//                             }}
//                             className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </div>

//             {/*  */}
//             <IdeaForm
//                 props={{
//                     show: show,
//                     showEditIdea: showEditIdea,
//                     handleClose: handleClose,
//                     handleShow: handleShow,
//                     handleShowEditIdea: handleShowEditIdea,
//                     handleCloseEditIdea: handleCloseEditIdea,
//                     threadId: id,
//                 }}
//             />
//             {/*  */}
//         </>
//     );
// }


