// import React, { useEffect, useState } from "react";
// import { Modal } from "react-bootstrap";
// import axios from "axios";
// import {
//     getCurrentDateAsDBFormat,
//     decodeToken,
//     host_url,
// } from "../../utils/utils";
// import Select from "react-select";
// export default function CategoryForm({ props }) {
//     return (
//         <div
//             className="model_box"
//             style={{
//                 position: "absolute",
//                 left: "50%",
//                 top: "50%",
//                 transform: "translate(-50%, -50%)",
//             }}
//         >
//              <Modal
//             show={props.show}
//             onHide={props.handleClose}
//             backdrop="static"
//             keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Add A New Category</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form>
//             <div class="form-group">
//               <input
//                 type="text"
//                 class="form-control"
//                 id="name"
//                 placeholder="Enter Name Category"
//               />
//             </div>

//             <button type="submit" class="btn btn-success mt-4">
//               Add A New Category
//             </button>
//           </form>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//         </div>
       
//     );
// }