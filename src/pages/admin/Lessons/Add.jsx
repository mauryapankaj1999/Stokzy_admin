// // import React, { useEffect, useState } from "react";
// // import { useNavigate ,useParams } from "react-router-dom";
// // import { useCourses } from "../../../hooks/useCourses";
// // import { useModules } from "../../../hooks/useModules";
// // import { useCreateLesson, useSingleLesson, useUpdateLesson } from "../../../hooks/useLessons";

// // export default function AddLesson() {
// //   const [videoFiles, setVideoFiles] =
// //   useState([]);

// // const [pdfFiles, setPdfFiles] =
// //   useState([]);
// //   const navigate = useNavigate();
// // const { id } = useParams();

// // const isEdit = !!id;

// //   const [selectedCourse, setSelectedCourse] = useState("");

// //  const [formData, setFormData] =
// //   useState({
// //     module: "",
// //     title: "",
// //     description: "",
// //     duration: "",
// //     order: 1,
// //     isPreview: false,
// //     status: "active",

// //     videoUrls: [""],
// //     pdfUrls: [""],
// //   });

// //   const { data: courses } = useCourses();
// //   const { data: modules } = useModules(selectedCourse);
// //   const { mutateAsync: createLessonMutation } = useCreateLesson();
// //   const {
// //   data: lessonData,
// // } = useSingleLesson(id);

// // const {
// //   mutateAsync:
// //     updateLessonMutation,
// // } = useUpdateLesson();

// //  const handleSubmit =
// //   async (e) => {
// //     e.preventDefault();

// //     try {
// //       const payload =
// //         new FormData();

// //       payload.append(
// //         "module",
// //         formData.module
// //       );

// //       payload.append(
// //         "title",
// //         formData.title
// //       );

// //       payload.append(
// //         "description",
// //         formData.description
// //       );

// //       payload.append(
// //         "duration",
// //         formData.duration
// //       );

// //       payload.append(
// //         "order",
// //         formData.order
// //       );

// //       payload.append(
// //         "isPreview",
// //         formData.isPreview
// //       );

// //       payload.append(
// //         "status",
// //         formData.status
// //       );

// //       payload.append(
// //         "videoUrls",
// //         JSON.stringify(
// //           formData.videoUrls.filter(
// //             (x) => x
// //           )
// //         )
// //       );

// //       payload.append(
// //         "pdfUrls",
// //         JSON.stringify(
// //           formData.pdfUrls.filter(
// //             (x) => x
// //           )
// //         )
// //       );

// //       videoFiles.forEach(
// //         (file) => {
// //           payload.append(
// //             "videos",
// //             file
// //           );
// //         }
// //       );

// //       pdfFiles.forEach(
// //         (file) => {
// //           payload.append(
// //             "pdfs",
// //             file
// //           );
// //         }
// //       );

// //       if (isEdit) {
// //         await updateLessonMutation({
// //           id,
// //           data: payload,
// //         });

// //         alert(
// //           "Lesson Updated Successfully"
// //         );
// //       } else {
// //         await createLessonMutation(
// //           payload
// //         );

// //         alert(
// //           "Lesson Created Successfully"
// //         );
// //       }

// //       navigate("/lessons");
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// // useEffect(() => {
// //   if (!lessonData?.data) return;

// //   const lesson =
// //     lessonData.data;

// //   setSelectedCourse(
// //     lesson.module?.course
// //   );

// //   setFormData({
// //     module:
// //       lesson.module?._id || "",

// //     title:
// //       lesson.title || "",

// //     description:
// //       lesson.description || "",

// //     duration:
// //       lesson.duration || "",

// //     order:
// //       lesson.order || 1,

// //     isPreview:
// //       lesson.isPreview || false,

// //     status:
// //       lesson.status || "active",

// //     videoUrls:
// //       lesson.videos
// //         ?.filter(
// //           (v) =>
// //             v.type === "url"
// //         )
// //         .map((v) => v.url) ||
// //       [""],

// //     pdfUrls:
// //       lesson.pdfs
// //         ?.filter(
// //           (p) =>
// //             p.type === "url"
// //         )
// //         .map((p) => p.url) ||
// //       [""],
// //   });
// // }, [lessonData]);
// //   return (
// //     <div className="bg-white p-6 rounded-xl">
// //       <h2 className="text-2xl font-bold mb-5">Add Lesson</h2>

// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         {/* Course */}

// //         <select
// //           value={selectedCourse}
// //           onChange={(e) => setSelectedCourse(e.target.value)}
// //           className="w-full border p-3 rounded"
// //         >
// //           <option value="">Select Course</option>

// //           {courses?.data?.map((item) => (
// //             <option key={item._id} value={item._id}>
// //               {item.title}
// //             </option>
// //           ))}
// //         </select>

// //         {/* Module */}

// //         <select
// //           value={formData.module}
// //           onChange={(e) =>
// //             setFormData({
// //               ...formData,
// //               module: e.target.value,
// //             })
// //           }
// //           className="w-full border p-3 rounded"
// //         >
// //           <option value="">Select Module</option>

// //           {modules?.data?.map((item) => (
// //             <option key={item._id} value={item._id}>
// //               {item.title}
// //             </option>
// //           ))}
// //         </select>

// //         <input
// //           type="text"
// //           placeholder="Lesson Title"
// //           value={formData.title}
// //           onChange={(e) =>
// //             setFormData({
// //               ...formData,
// //               title: e.target.value,
// //             })
// //           }
// //           className="w-full border p-3 rounded"
// //         />

// //         <textarea
// //           placeholder="Description"
// //           value={formData.description}
// //           onChange={(e) =>
// //             setFormData({
// //               ...formData,
// //               description: e.target.value,
// //             })
// //           }
// //           className="w-full border p-3 rounded"
// //         />

// //         <input
// //           type="text"
// //           placeholder="Video URL"
// //           value={formData.videoUrl}
// //           onChange={(e) =>
// //             setFormData({
// //               ...formData,
// //               videoUrl: e.target.value,
// //             })
// //           }
// //           className="w-full border p-3 rounded"
// //         />

// //         <input
// //           type="text"
// //           placeholder="Duration"
// //           value={formData.duration}
// //           onChange={(e) =>
// //             setFormData({
// //               ...formData,
// //               duration: e.target.value,
// //             })
// //           }
// //           className="w-full border p-3 rounded"
// //         />


// //         <div>
// //   <label className="block mb-2">
// //     Upload Videos
// //   </label>

// //   <input
// //     type="file"
// //     multiple
// //     accept="video/*"
// //     onChange={(e) =>
// //       setVideoFiles(
// //         Array.from(
// //           e.target.files
// //         )
// //       )
// //     }
// //     className="w-full border p-3 rounded"
// //   />
// // </div>

// // <div>
// //   <label className="block mb-2">
// //     Upload PDFs
// //   </label>

// //   <input
// //     type="file"
// //     multiple
// //     accept=".pdf"
// //     onChange={(e) =>
// //       setPdfFiles(
// //         Array.from(
// //           e.target.files
// //         )
// //       )
// //     }
// //     className="w-full border p-3 rounded"
// //   />
// // </div>
// // <div>
// //   <label>
// //     Video URLs
// //   </label>

// //   {formData.videoUrls.map(
// //     (url, index) => (
// //       <input
// //         key={index}
// //         type="text"
// //         value={url}
// //         placeholder="Video URL"
// //         onChange={(e) => {
// //           const updated = [
// //             ...formData.videoUrls,
// //           ];

// //           updated[index] =
// //             e.target.value;

// //           setFormData({
// //             ...formData,
// //             videoUrls:
// //               updated,
// //           });
// //         }}
// //         className="w-full border p-3 rounded mb-2"
// //       />
// //     )
// //   )}

// //   <button
// //     type="button"
// //     onClick={() =>
// //       setFormData({
// //         ...formData,
// //         videoUrls: [
// //           ...formData.videoUrls,
// //           "",
// //         ],
// //       })
// //     }
// //   >
// //     + Add Video URL
// //   </button>
// // </div>


// // <div>
// //   <label>
// //     PDF URLs
// //   </label>

// //   {formData.pdfUrls.map(
// //     (url, index) => (
// //       <input
// //         key={index}
// //         type="text"
// //         value={url}
// //         placeholder="PDF URL"
// //         onChange={(e) => {
// //           const updated = [
// //             ...formData.pdfUrls,
// //           ];

// //           updated[index] =
// //             e.target.value;

// //           setFormData({
// //             ...formData,
// //             pdfUrls:
// //               updated,
// //           });
// //         }}
// //         className="w-full border p-3 rounded mb-2"
// //       />
// //     )
// //   )}

// //   <button
// //     type="button"
// //     onClick={() =>
// //       setFormData({
// //         ...formData,
// //         pdfUrls: [
// //           ...formData.pdfUrls,
// //           "",
// //         ],
// //       })
// //     }
// //   >
// //     + Add PDF URL
// //   </button>
// // </div>

// //         <input
// //           type="number"
// //           placeholder="Order"
// //           value={formData.order}
// //           onChange={(e) =>
// //             setFormData({
// //               ...formData,
// //               order: Number(e.target.value),
// //             })
// //           }
// //           className="w-full border p-3 rounded"
// //         />

// //         <label className="flex items-center gap-2">
// //           <input
// //             type="checkbox"
// //             checked={formData.isPreview}
// //             onChange={(e) =>
// //               setFormData({
// //                 ...formData,
// //                 isPreview: e.target.checked,
// //               })
// //             }
// //           />
// //           Preview Lesson
// //         </label>

// //         <button
// //           type="submit"
// //           className="bg-green-600 text-white px-5 py-2 rounded"
// //         >
// //           Save Lesson
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useCourses } from "../../../hooks/useCourses";
// import { useModules } from "../../../hooks/useModules";
// import { useCreateLesson, useSingleLesson, useUpdateLesson } from "../../../hooks/useLessons";

// export default function AddLesson() {
//   const [videoFiles, setVideoFiles] = useState([]);
//   const [pdfFiles, setPdfFiles] = useState([]);
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isEdit = !!id;

//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [formData, setFormData] = useState({
//     module: "",
//     title: "",
//     description: "",
//     duration: "",
//     order: 1,
//     isPreview: false,
//     status: "active",
//     videoUrls: [],
//     pdfUrls: [],
//   });

//   const { data: courses } = useCourses();
//   const { data: modules } = useModules(selectedCourse);
//   const { mutateAsync: createLessonMutation } = useCreateLesson();
//   const { data: lessonData } = useSingleLesson(id);
//   const { mutateAsync: updateLessonMutation } = useUpdateLesson();

//   // ─── Video URL handlers ───────────────────────────────
//   const addVideoUrl = () =>
//     setFormData((prev) => ({ ...prev, videoUrls: [...prev.videoUrls, ""] }));

//   const updateVideoUrl = (index, value) => {
//     const updated = [...formData.videoUrls];
//     updated[index] = value;
//     setFormData((prev) => ({ ...prev, videoUrls: updated }));
//   };

//   const removeVideoUrl = (index) => {
//     const updated = formData.videoUrls.filter((_, i) => i !== index);
//     setFormData((prev) => ({ ...prev, videoUrls: updated }));
//   };

//   // ─── PDF URL handlers ────────────────────────────────
//   const addPdfUrl = () =>
//     setFormData((prev) => ({ ...prev, pdfUrls: [...prev.pdfUrls, ""] }));

//   const updatePdfUrl = (index, value) => {
//     const updated = [...formData.pdfUrls];
//     updated[index] = value;
//     setFormData((prev) => ({ ...prev, pdfUrls: updated }));
//   };

//   const removePdfUrl = (index) => {
//     const updated = formData.pdfUrls.filter((_, i) => i !== index);
//     setFormData((prev) => ({ ...prev, pdfUrls: updated }));
//   };

//   // ─── Submit ──────────────────────────────────────────
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = new FormData();
//       payload.append("module", formData.module);
//       payload.append("title", formData.title);
//       payload.append("description", formData.description);
//       payload.append("duration", formData.duration);
//       payload.append("order", formData.order);
//       payload.append("isPreview", formData.isPreview);
//       payload.append("status", formData.status);
//       payload.append("videoUrls", JSON.stringify(formData.videoUrls.filter((x) => x)));
//       payload.append("pdfUrls", JSON.stringify(formData.pdfUrls.filter((x) => x)));
//     videoFiles.filter((file) => file !== null).forEach((file) => payload.append("videos", file));
// pdfFiles.filter((file) => file !== null).forEach((file) => payload.append("pdfs", file));
//       if (isEdit) {
//         await updateLessonMutation({ id, data: payload });
//         alert("Lesson Updated Successfully");
//       } else {
//         await createLessonMutation(payload);
//         alert("Lesson Created Successfully");
//       }
//       navigate("/lessons");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ─── Edit mode prefill ───────────────────────────────
//   useEffect(() => {
//     if (!lessonData?.data) return;
//     const lesson = lessonData.data;
//     setSelectedCourse(lesson.module?.course);
//     setFormData({
//       module: lesson.module?._id || "",
//       title: lesson.title || "",
//       description: lesson.description || "",
//       duration: lesson.duration || "",
//       order: lesson.order || 1,
//       isPreview: lesson.isPreview || false,
//       status: lesson.status || "active",
//       videoUrls: lesson.videos?.filter((v) => v.type === "url").map((v) => v.url) || [],
//       pdfUrls: lesson.pdfs?.filter((p) => p.type === "url").map((p) => p.url) || [],
//     });
//   }, [lessonData]);

//   return (
//     <div className="bg-white p-6 rounded-xl max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">
//         {isEdit ? "Edit Lesson" : "Add Lesson"}
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Course */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
//           <select
//             value={selectedCourse}
//             onChange={(e) => setSelectedCourse(e.target.value)}
//             className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//           >
//             <option value="">Select Course</option>
//             {courses?.data?.map((item) => (
//               <option key={item._id} value={item._id}>{item.title}</option>
//             ))}
//           </select>
//         </div>

//         {/* Module */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Module</label>
//           <select
//             value={formData.module}
//             onChange={(e) => setFormData({ ...formData, module: e.target.value })}
//             className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//           >
//             <option value="">Select Module</option>
//             {modules?.data?.map((item) => (
//               <option key={item._id} value={item._id}>{item.title}</option>
//             ))}
//           </select>
//         </div>

//         {/* Title */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
//           <input
//             type="text"
//             placeholder="Enter lesson title"
//             value={formData.title}
//             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//           <textarea
//             placeholder="Enter lesson description"
//             value={formData.description}
//             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//             rows={3}
//             className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         {/* Duration */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
//           <input
//             type="text"
//             placeholder="e.g. 10:30"
//             value={formData.duration}
//             onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//             className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         {/* ─── Video URLs ─── */}
//        {/* ─── Upload Videos ─── */}
// <div className="border border-green-200 bg-green-50 p-4 rounded-xl">
//   <label className="block text-sm font-semibold text-green-800 mb-3">🎬 Upload Videos</label>

//   {videoFiles.map((file, index) => (
//     <div key={index} className="flex items-center gap-2 mb-2 bg-white border border-gray-200 p-2 rounded-lg">
//       <span className="flex-1 text-sm text-gray-700 truncate">📹 {file.name}</span>
//       <button
//         type="button"
//         onClick={() => setVideoFiles(videoFiles.filter((_, i) => i !== index))}
//         className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm font-medium"
//       >
//         ✕ Remove
//       </button>
//     </div>
//   ))}

//   <button
//     type="button"
//     onClick={() => document.getElementById("videoFileInput").click()}
//     className="mt-1 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold"
//   >
//     + Add Video
//   </button>

//   <input
//     id="videoFileInput"
//     type="file"
//     accept="video/*"
//     className="hidden"
//     onChange={(e) => {
//       if (e.target.files[0]) {
//         setVideoFiles([...videoFiles, e.target.files[0]]);
//         e.target.value = ""; // reset so same file can be added again
//       }
//     }}
//   />
// </div>

// {/* ─── Upload PDFs ─── */}
// {/* ─── Upload Videos ─── */}
// <div className="border border-green-200 bg-green-50 p-4 rounded-xl">
//   <label className="block text-sm font-semibold text-green-800 mb-3">🎬 Upload Videos</label>

//   {videoFiles.map((file, index) => (
//     <div key={index} className="flex items-center gap-2 mb-2">
//       <input
//         type="file"
//         accept="video/*"
//         onChange={(e) => {
//           const updated = [...videoFiles];
//           if (e.target.files[0]) {
//             updated[index] = e.target.files[0];
//           } else {
//             updated[index] = null;
//           }
//           setVideoFiles(updated);
//         }}
//         className="flex-1 border border-gray-300 p-2 rounded-lg bg-white text-sm"
//       />
//       <button
//         type="button"
//         onClick={() => setVideoFiles(videoFiles.filter((_, i) => i !== index))}
//         className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm font-medium whitespace-nowrap"
//       >
//         ✕ Remove
//       </button>
//     </div>
//   ))}

//   <button
//     type="button"
//     onClick={() => setVideoFiles([...videoFiles, null])}
//     className="mt-1 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold"
//   >
//     + Add Video
//   </button>
// </div>

// {/* ─── Upload PDFs ─── */}
// <div className="border border-blue-200 bg-blue-50 p-4 rounded-xl">
//   <label className="block text-sm font-semibold text-blue-800 mb-3">📄 Upload PDFs</label>

//   {pdfFiles.map((file, index) => (
//     <div key={index} className="flex items-center gap-2 mb-2">
//       <input
//         type="file"
//         accept=".pdf"
//         onChange={(e) => {
//           const updated = [...pdfFiles];
//           if (e.target.files[0]) {
//             updated[index] = e.target.files[0];
//           } else {
//             updated[index] = null;
//           }
//           setPdfFiles(updated);
//         }}
//         className="flex-1 border border-gray-300 p-2 rounded-lg bg-white text-sm"
//       />
//       <button
//         type="button"
//         onClick={() => setPdfFiles(pdfFiles.filter((_, i) => i !== index))}
//         className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm font-medium whitespace-nowrap"
//       >
//         ✕ Remove
//       </button>
//     </div>
//   ))}

//   <button
//     type="button"
//     onClick={() => setPdfFiles([...pdfFiles, null])}
//     className="mt-1 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
//   >
//     + Add PDF
//   </button>
// </div>

//         {/* ─── PDF URLs ─── */}
//         <div className="border border-blue-200 bg-blue-50 p-4 rounded-xl">
//           <label className="block text-sm font-semibold text-blue-800 mb-3">📄 PDF URLs</label>

//           {formData.pdfUrls.length === 0 && (
//             <p className="text-sm text-gray-400 mb-2">No PDF URLs added yet.</p>
//           )}

//           {formData.pdfUrls.map((url, index) => (
//             <div key={index} className="flex gap-2 mb-2">
//               <input
//                 type="text"
//                 value={url}
//                 placeholder={`PDF URL ${index + 1}`}
//                 onChange={(e) => updatePdfUrl(index, e.target.value)}
//                 className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//               />
//               <button
//                 type="button"
//                 onClick={() => removePdfUrl(index)}
//                 className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm font-medium"
//               >
//                 ✕ Remove
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addPdfUrl}
//             className="mt-1 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
//           >
//             + Add PDF URL
//           </button>
//         </div>

//         {/* Upload Videos */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Upload Videos</label>
//           <input
//             type="file"
//             multiple
//             accept="video/*"
//             onChange={(e) => setVideoFiles(Array.from(e.target.files))}
//             className="w-full border border-gray-300 p-3 rounded-lg bg-white"
//           />
//         </div>

//         {/* Upload PDFs */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDFs</label>
//           <input
//             type="file"
//             multiple
//             accept=".pdf"
//             onChange={(e) => setPdfFiles(Array.from(e.target.files))}
//             className="w-full border border-gray-300 p-3 rounded-lg bg-white"
//           />
//         </div>

//         {/* Order */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
//           <input
//             type="number"
//             placeholder="Order"
//             value={formData.order}
//             onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
//             className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         {/* Preview checkbox */}
//         <label className="flex items-center gap-3 cursor-pointer">
//           <input
//             type="checkbox"
//             checked={formData.isPreview}
//             onChange={(e) => setFormData({ ...formData, isPreview: e.target.checked })}
//             className="w-4 h-4 accent-green-600"
//           />
//           <span className="text-sm font-medium text-gray-700">Mark as Preview Lesson</span>
//         </label>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition text-base"
//         >
//           {isEdit ? "Update Lesson" : "Save Lesson"}
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourses } from "../../../hooks/useCourses";
import { useModules } from "../../../hooks/useModules";
import { useCreateLesson, useSingleLesson, useUpdateLesson } from "../../../hooks/useLessons";

export default function AddLesson() {
 const [existingVideos, setExistingVideos] = useState([]); // server se aaye hue
const [existingPdfs, setExistingPdfs] = useState([]);
const [videoFiles, setVideoFiles] = useState([null]);  // naye upload
const [pdfFiles, setPdfFiles] = useState([null]);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [selectedCourse, setSelectedCourse] = useState("");
  const [formData, setFormData] = useState({
    module: "",
    title: "",
    description: "",
    duration: "",
    order: 1,
    isPreview: false,
    status: "active",
  });

  const { data: courses } = useCourses();
  const { data: modules } = useModules(selectedCourse);
  const { mutateAsync: createLessonMutation } = useCreateLesson();
  const { data: lessonData } = useSingleLesson(id);
  const { mutateAsync: updateLessonMutation } = useUpdateLesson();

  // ─── Submit ──────────────────────────────────────────
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = new FormData();
    payload.append("module", formData.module);
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("duration", formData.duration);
    payload.append("order", formData.order);
    payload.append("isPreview", formData.isPreview);
    payload.append("status", formData.status);

    // ✅ existing files jo rakhni hain unke IDs bhejo
    payload.append("existingVideos", JSON.stringify(existingVideos.map((v) => v._id)));
    payload.append("existingPdfs", JSON.stringify(existingPdfs.map((p) => p._id)));

    // naye files
    videoFiles.filter((f) => f !== null).forEach((file) => payload.append("videos", file));
    pdfFiles.filter((f) => f !== null).forEach((file) => payload.append("pdfs", file));

    if (isEdit) {
      await updateLessonMutation({ id, data: payload });
      alert("Lesson Updated Successfully");
    } else {
      await createLessonMutation(payload);
      alert("Lesson Created Successfully");
    }
    navigate("/lessons");
  } catch (error) {
    console.log(error);
  }
};
  // ─── Edit mode prefill ───────────────────────────────
  useEffect(() => {
    if (!lessonData?.data) return;
    const lesson = lessonData.data;
    setSelectedCourse(lesson.module?.course);
    setFormData({
      module: lesson.module?._id || "",
      title: lesson.title || "",
      description: lesson.description || "",
      duration: lesson.duration || "",
      order: lesson.order || 1,
      isPreview: lesson.isPreview || false,
      status: lesson.status || "active",
      
    });
    setExistingVideos(lesson.videos?.filter((v) => v.type === "file") || []);
  setExistingPdfs(lesson.pdfs?.filter((p) => p.type === "file") || []);
  }, [lessonData]);

  return (
    <div className="bg-white p-6 rounded-xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEdit ? "Edit Lesson" : "Add Lesson"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Course */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Course</option>
            {courses?.data?.map((item) => (
              <option key={item._id} value={item._id}>{item.title}</option>
            ))}
          </select>
        </div>

        {/* Module */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Module</label>
          <select
            value={formData.module}
            onChange={(e) => setFormData({ ...formData, module: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Module</option>
            {modules?.data?.map((item) => (
              <option key={item._id} value={item._id}>{item.title}</option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
          <input
            type="text"
            placeholder="Enter lesson title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Enter lesson description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
          <input
            type="text"
            placeholder="e.g. 10:30"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* ─── Upload Videos ─── */}
     {/* ─── Upload Videos ─── */}
<div className="border border-green-200 bg-green-50 p-4 rounded-xl">
  <label className="block text-sm font-semibold text-green-800 mb-3">🎬 Upload Videos</label>

  {/* Existing videos from server */}
  {existingVideos.map((video, index) => (
    <div key={video._id} className="flex items-center gap-2 mb-2 bg-white border border-green-200 p-2 rounded-lg">
      <span className="text-green-600 text-sm">✅</span>
      <span className="flex-1 text-sm text-gray-700 truncate">{video.originalName || video.url || `Video ${index + 1}`}</span>
      <button
        type="button"
        onClick={() => setExistingVideos(existingVideos.filter((_, i) => i !== index))}
        className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm font-medium"
      >
        ✕ Remove
      </button>
    </div>
  ))}

  {/* New file inputs */}
  {videoFiles.map((file, index) => (
    <div key={index} className="flex items-center gap-2 mb-2">
      <input
        type="file"
        accept="video/*"
        onChange={(e) => {
          const updated = [...videoFiles];
          updated[index] = e.target.files[0] || null;
          setVideoFiles(updated);
        }}
        className="flex-1 border border-gray-300 p-2 rounded-lg bg-white text-sm"
      />
      <button
        type="button"
        onClick={() => setVideoFiles(videoFiles.filter((_, i) => i !== index))}
        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm font-medium whitespace-nowrap"
      >
        ✕ Remove
      </button>
    </div>
  ))}

  <button
    type="button"
    onClick={() => setVideoFiles([...videoFiles, null])}
    className="mt-1 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold"
  >
    + Add Video
  </button>
</div>

{/* ─── Upload PDFs ─── */}
<div className="border border-blue-200 bg-blue-50 p-4 rounded-xl">
  <label className="block text-sm font-semibold text-blue-800 mb-3">📄 Upload PDFs</label>

  {/* Existing PDFs from server */}
  {existingPdfs.map((pdf, index) => (
    <div key={pdf._id} className="flex items-center gap-2 mb-2 bg-white border border-blue-200 p-2 rounded-lg">
      <span className="text-blue-600 text-sm">✅</span>
      <span className="flex-1 text-sm text-gray-700 truncate">{pdf.originalName || pdf.url || `PDF ${index + 1}`}</span>
      <button
        type="button"
        onClick={() => setExistingPdfs(existingPdfs.filter((_, i) => i !== index))}
        className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm font-medium"
      >
        ✕ Remove
      </button>
    </div>
  ))}

  {/* New file inputs */}
  {pdfFiles.map((file, index) => (
    <div key={index} className="flex items-center gap-2 mb-2">
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          const updated = [...pdfFiles];
          updated[index] = e.target.files[0] || null;
          setPdfFiles(updated);
        }}
        className="flex-1 border border-gray-300 p-2 rounded-lg bg-white text-sm"
      />
      <button
        type="button"
        onClick={() => setPdfFiles(pdfFiles.filter((_, i) => i !== index))}
        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm font-medium whitespace-nowrap"
      >
        ✕ Remove
      </button>
    </div>
  ))}

  <button
    type="button"
    onClick={() => setPdfFiles([...pdfFiles, null])}
    className="mt-1 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
  >
    + Add PDF
  </button>
</div>

        {/* Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <input
            type="number"
            placeholder="Order"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Preview checkbox */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isPreview}
            onChange={(e) => setFormData({ ...formData, isPreview: e.target.checked })}
            className="w-4 h-4 accent-green-600"
          />
          <span className="text-sm font-medium text-gray-700">Mark as Preview Lesson</span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition text-base"
        >
          {isEdit ? "Update Lesson" : "Save Lesson"}
        </button>

      </form>
    </div>
  );
}