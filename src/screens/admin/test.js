// import React, { useState } from "react";

// function CommentPopup() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [comments, setComments] = useState([]);

//   function openPopup() {
//     setIsOpen(true);
//   }

//   function closePopup() {
//     setIsOpen(false);
//   }

//   function handleCommentSubmit(e) {
//     e.preventDefault();
//     const inputComment = e.target.comment.value;
//     setComments([...comments, inputComment]);
//     e.target.comment.value = "";
//   }

//   return (
//     <div className="relative">
//       <a href="#" className="text-blue-500 hover:underline" onClick={openPopup}>
//         Show comments ({comments.length})
//       </a>
//       <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}>
//         <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//           <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={closePopup}>
//             <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//           </div>
//           <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
//             <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//               <h2 className="text-lg font-medium leading-6 text-gray-900" id="modal-headline">
//                 Comments
//               </h2>
//               <div className="mt-4">
//               {!comments.length && "No comments available."}
//               {comments.map((comment) => (
//                 <div className="flex items-start mb-4">
//                   <div className="flex-shrink-0 mr-2">
//                     <img
//                       className="w-8 h-8 rounded-full"
//                       src={`https://avatars.dicebear.com/api/avataaars/${comment.user_id}.svg`}
//                       alt={`${comment.user_id}'s avatar`}
//                     />
//                   </div>
//                   <div>
//                     <div className="flex items-center mb-1">
//                       <h4 className="text-gray-800 font-medium mr-2">
//                         {comment.user_id}
//                       </h4>
//                       <span className="text-gray-500 text-sm">2 hours ago</span>
//                     </div>
//                     <p className="text-gray-700">{comment.content}</p>
//                   </div>
//                 </div>
//               ))}
//               </div>
//               <div className="flex justify-between">
//                   {idea.file === "" ? "" : idea.file}
//                 </div>
//                 <form onSubmit={handleSubmit} encType="multipart/form-data">
//                   <div className="mt-4">
//                     <input
//                       onChange={(e) => setComment(e.target.value)}
//                       type="text"
//                       id="comment"
//                       className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//                       placeholder="Enter Comment"
//                     />
//                   </div>
//                   <div className="form-check form-switch mb-6">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id="flexSwitchCheckDefault"
//                       onChange={(e) => setAnonymous(e.target.checked)}
//                     />
//                     <label
//                       className="form-check-label"
//                       htmlFor="flexSwitchCheckDefault"
//                     >
//                       Is anonymous?
//                     </label>
//                   </div>
//                   <div className="flex w-full">
//                     <div className="justify-end">
//                       <button
//                         type="submit"
//                         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                       >
//                         Add Comment
//                       </button>
//                     </div>
//                   </div>
//                 </form>

//             </div>
//             <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//               <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={closePopup}>Close</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Test() {
//   return (
//     <div>
//       <CommentPopup />
//     </div>
//   );
// }

// export default Test;