// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useMyCourseDetails } from "../hooks/useCourses";
// import { useModules } from "../hooks/useModules";

// const BASE_URL = "http://localhost:5000";

// const handleDownload = async (url, filename) => {
//   try {
//     const response = await fetch(url);
//     const blob = await response.blob();
//     const blobUrl = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = blobUrl;
//     link.download = filename;
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//     window.URL.revokeObjectURL(blobUrl);
//   } catch (error) {
//     console.error("Download failed:", error);
//   }
// };

// export default function CourseDetails() {
//   const { id } = useParams();
//   const { data, isLoading } = useMyCourseDetails(id);
//   const { data: modules } = useModules(id);

//   const [expandedModules, setExpandedModules] = useState({});

//   const toggleModule = (moduleId) => {
//     setExpandedModules((prev) => ({
//       ...prev,
//       [moduleId]: !prev[moduleId],
//     }));
//   };

//   if (isLoading)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-gray-500 text-lg">Loading...</div>
//       </div>
//     );

//   const course = data?.data;
//   const modulesList = modules?.data || [];

//   const totalLessons = modulesList.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
//   const totalVideos = modulesList.reduce(
//     (acc, m) => acc + (m.lessons?.reduce((a, l) => a + (l.videos?.length || 0), 0) || 0),
//     0
//   );
//   const totalPdfs = modulesList.reduce(
//     (acc, m) => acc + (m.lessons?.reduce((a, l) => a + (l.pdfs?.length || 0), 0) || 0),
//     0
//   );

//   return (
//     <div className="max-w-4xl mx-auto p-6">

//       {/* ─── Course Header ─── */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">{course?.title || "—"}</h1>
//         <p className="text-gray-500 text-base">{course?.shortDescription || ""}</p>

//         <div className="flex gap-6 mt-4">
//           <div className="text-center">
//             <p className="text-2xl font-bold text-green-600">{modulesList.length}</p>
//             <p className="text-xs text-gray-400 mt-1">Modules</p>
//           </div>
//           <div className="text-center">
//             <p className="text-2xl font-bold text-blue-600">{totalLessons}</p>
//             <p className="text-xs text-gray-400 mt-1">Lessons</p>
//           </div>
//           <div className="text-center">
//             <p className="text-2xl font-bold text-purple-600">{totalVideos}</p>
//             <p className="text-xs text-gray-400 mt-1">Videos</p>
//           </div>
//           <div className="text-center">
//             <p className="text-2xl font-bold text-orange-500">{totalPdfs}</p>
//             <p className="text-xs text-gray-400 mt-1">PDFs</p>
//           </div>
//         </div>
//       </div>

//       {/* ─── Modules List ─── */}
//       <h2 className="text-xl font-bold text-gray-800 mb-4">
//         Course Content
//         <span className="ml-2 text-sm font-normal text-gray-400">
//           ({modulesList.length} modules)
//         </span>
//       </h2>

//       <div className="space-y-4">
//         {modulesList.map((module, moduleIndex) => {
//           const isOpen = expandedModules[module._id];
//           const modVideos = module.lessons?.reduce((a, l) => a + (l.videos?.length || 0), 0) || 0;
//           const modPdfs = module.lessons?.reduce((a, l) => a + (l.pdfs?.length || 0), 0) || 0;

//           return (
//             <div
//               key={module._id}
//               className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
//             >
//               {/* Module Header */}
//               <button
//                 type="button"
//                 onClick={() => toggleModule(module._id)}
//                 className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition text-left"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 font-bold text-sm flex items-center justify-center">
//                     {moduleIndex + 1}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-800 text-base">{module.title}</h3>
//                     <div className="flex gap-3 mt-1">
//                       <span className="text-xs text-gray-400">
//                         📚 {module.lessons?.length || 0} lesson{module.lessons?.length !== 1 ? "s" : ""}
//                       </span>
//                       <span className="text-xs text-purple-500">
//                         🎬 {modVideos} video{modVideos !== 1 ? "s" : ""}
//                       </span>
//                       <span className="text-xs text-orange-500">
//                         📄 {modPdfs} PDF{modPdfs !== 1 ? "s" : ""}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <span className="text-gray-400 text-lg">{isOpen ? "▲" : "▼"}</span>
//               </button>

//               {/* Lessons */}
//               {isOpen && (
//                 <div className="border-t border-gray-100 divide-y divide-gray-50">
//                   {(module.lessons || []).map((lesson, lessonIndex) => (
//                     <div key={lesson._id} className="p-5">

//                       {/* Lesson Title Row */}
//                       <div className="flex items-start gap-3 mb-3">
//                         <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
//                           {lessonIndex + 1}
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 flex-wrap">
//                             <h4 className="font-semibold text-gray-800">{lesson.title}</h4>
//                             {lesson.isPreview && (
//                               <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
//                                 Preview
//                               </span>
//                             )}
//                             {lesson.duration && (
//                               <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
//                                 ⏱ {lesson.duration}
//                               </span>
//                             )}
//                           </div>
//                           {lesson.description && (
//                             <p className="text-sm text-gray-400 mt-1">{lesson.description}</p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="ml-10 grid grid-cols-1 sm:grid-cols-2 gap-3">

//                         {/* ─── Videos Section ─── */}
//                         {lesson.videos?.length > 0 && (
//                           <div className="bg-purple-50 border border-purple-100 rounded-xl p-3">
//                             <p className="text-xs font-semibold text-purple-700 mb-2">
//                               🎬 Videos ({lesson.videos.length})
//                             </p>
//                             <ul className="space-y-2">
//                               {lesson.videos.map((video) => (
//                                 <li key={video._id} className="flex items-center justify-between gap-2">
//                                   <div className="flex items-center gap-2 text-sm text-gray-600 min-w-0">
//                                     <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
//                                     <span className="truncate">{video.title || "Video"}</span>
//                                   </div>
//                                   <button
//                                     type="button"
//                                     onClick={() => handleDownload(`${BASE_URL}${video.url}`, video.title || "video.mp4")}
//                                     className="shrink-0 text-xs bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded-lg transition"
//                                   >
//                                     ⬇ Download
//                                   </button>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}

//                         {/* ─── PDFs Section ─── */}
//                         {lesson.pdfs?.length > 0 && (
//                           <div className="bg-orange-50 border border-orange-100 rounded-xl p-3">
//                             <p className="text-xs font-semibold text-orange-700 mb-2">
//                               📄 PDFs ({lesson.pdfs.length})
//                             </p>
//                             <ul className="space-y-2">
//                               {lesson.pdfs.map((pdf) => (
//                                 <li key={pdf._id} className="flex items-center justify-between gap-2">
//                                   <div className="flex items-center gap-2 text-sm text-gray-600 min-w-0">
//                                     <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
//                                     <span className="truncate">{pdf.title || "PDF"}</span>
//                                   </div>
//                                   <button
//                                     type="button"
//                                     onClick={() => handleDownload(`${BASE_URL}${pdf.url}`, pdf.title || "file.pdf")}
//                                     className="shrink-0 text-xs bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded-lg transition"
//                                   >
//                                     ⬇ Download
//                                   </button>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}

//                         {/* No content */}
//                         {!lesson.videos?.length && !lesson.pdfs?.length && (
//                           <p className="text-xs text-gray-300 italic">No content added yet</p>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMyCourseDetails } from "../hooks/useCourses";
import { useModules } from "../hooks/useModules";
import { FaChevronDown } from "react-icons/fa";

const BASE_URL = "http://localhost:5000";

const handleDownload = async (url, filename) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
  }
};

export default function CourseDetails() {
  const { id } = useParams();
  const { data, isLoading } = useMyCourseDetails(id);
  const { data: modules } = useModules(id);

  const [expandedModules, setExpandedModules] = useState({});

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: "#f0faf0" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: "#57a846", borderTopColor: "transparent" }} />
          <p className="text-sm font-medium" style={{ color: "#57a846" }}>Loading...</p>
        </div>
      </div>
    );

  const course = data?.data;
  const modulesList = modules?.data || [];

  const totalLessons = modulesList.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
  const totalVideos = modulesList.reduce(
    (acc, m) => acc + (m.lessons?.reduce((a, l) => a + (l.videos?.length || 0), 0) || 0),
    0
  );
  const totalPdfs = modulesList.reduce(
    (acc, m) => acc + (m.lessons?.reduce((a, l) => a + (l.pdfs?.length || 0), 0) || 0),
    0
  );

  return (
    <div className="min-h-screen" style={{ background: "#f0faf0" }}>
      <div className="max-w-5xl mx-auto p-6">

        {/* ─── Course Header ─── */}
        <div
          className="rounded-2xl p-6 mb-6 shadow-sm"
          style={{ background: "linear-gradient(135deg, #57a846 0%, #3d8a32 100%)" }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">{course?.title || "—"}</h1>
          <p className="text-base" style={{ color: "#d4f0cf" }}>{course?.shortDescription || ""}</p>

          <div className="flex gap-4 mt-6 flex-wrap">
            {[
              { label: "Modules", value: modulesList.length },
              { label: "Lessons", value: totalLessons },
              { label: "Videos", value: totalVideos },
              { label: "PDFs", value: totalPdfs },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center px-5 py-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.18)" }}
              >
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: "#d4f0cf" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Modules Heading ─── */}
        <h2 className="text-xl font-bold mb-4" style={{ color: "#2d6b24" }}>
          Course Content
          <span className="ml-2 text-sm font-normal" style={{ color: "#57a846" }}>
            ({modulesList.length} modules)
          </span>
        </h2>

        <div className="space-y-4">
          {modulesList.map((module, moduleIndex) => {
            const isOpen = expandedModules[module._id];
            const modVideos = module.lessons?.reduce((a, l) => a + (l.videos?.length || 0), 0) || 0;
            const modPdfs = module.lessons?.reduce((a, l) => a + (l.pdfs?.length || 0), 0) || 0;

            return (
              <div
                key={module._id}
                className="rounded-2xl overflow-hidden shadow-sm"
                style={{ border: "1.5px solid #c6e8c1", background: "#fff" }}
              >
                {/* Module Header */}
                <button
                  type="button"
                  onClick={() => toggleModule(module._id)}
                  className="w-full flex items-center justify-between p-5 text-left transition"
                  style={{ background: isOpen ? "#f0faf0" : "#fff" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f0faf0")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = isOpen ? "#f0faf0" : "#fff")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full font-bold text-sm flex items-center justify-center shrink-0"
                      style={{ background: "#57a846", color: "#fff" }}
                    >
                      {moduleIndex + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base" style={{ color: "#1e4d18" }}>
                        {module.title}
                      </h3>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs" style={{ color: "#888" }}>
                          📚 {module.lessons?.length || 0} lesson{module.lessons?.length !== 1 ? "s" : ""}
                        </span>
                        <span className="text-xs" style={{ color: "#57a846" }}>
                          🎬 {modVideos} video{modVideos !== 1 ? "s" : ""}
                        </span>
                        <span className="text-xs" style={{ color: "#e07b00" }}>
                          📄 {modPdfs} PDF{modPdfs !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className="text-lg font-bold transition-transform"
                    style={{ color: "#57a846", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                  <FaChevronDown />

                  </span>
                </button>

                {/* Lessons */}
                {isOpen && (
                  <div style={{ borderTop: "1.5px solid #c6e8c1" }}>
                    {(module.lessons || []).map((lesson, lessonIndex) => (
                      <div
                        key={lesson._id}
                        className="p-5"
                        style={{ borderBottom: "1px solid #eaf5e8" }}
                      >
                        {/* Lesson Title Row */}
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className="w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: "#e6f5e3", color: "#57a846" }}
                          >
                            {lessonIndex + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-semibold" style={{ color: "#1e4d18" }}>
                                {lesson.title}
                              </h4>
                              {lesson.isPreview && (
                                <span
                                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                                  style={{ background: "#e6f5e3", color: "#57a846" }}
                                >
                                  Preview
                                </span>
                              )}
                              {lesson.duration && (
                                <span
                                  className="text-xs px-2 py-0.5 rounded-full"
                                  style={{ background: "#f0f0f0", color: "#666" }}
                                >
                                  ⏱ {lesson.duration}
                                </span>
                              )}
                            </div>
                            {lesson.description && (
                              <p className="text-sm mt-1" style={{ color: "#6b8f66" }}>
                                {lesson.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="ml-10 grid grid-cols-1 sm:grid-cols-2 gap-3">

                          {/* ─── Videos Section ─── */}
                          {lesson.videos?.length > 0 && (
                            <div
                              className="rounded-xl p-3"
                              style={{ background: "#f0faf0", border: "1.5px solid #c6e8c1" }}
                            >
                              <p className="text-xs font-semibold mb-2" style={{ color: "#2d6b24" }}>
                                🎬 Videos ({lesson.videos.length})
                              </p>
                              <ul className="space-y-2">
                                {lesson.videos.map((video) => (
                                  <li key={video._id} className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 text-sm min-w-0" style={{ color: "#3d5c3a" }}>
                                      <span
                                        className="w-1.5 h-1.5 rounded-full shrink-0"
                                        style={{ background: "#57a846" }}
                                      />
                                      <span className="truncate">{video.title || "Video"}</span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleDownload(`${BASE_URL}${video.url}`, video.title || "video.mp4")}
                                      className="shrink-0 text-xs px-2 py-1 rounded-lg transition font-medium text-white"
                                      style={{ background: "#57a846" }}
                                      onMouseEnter={(e) => (e.currentTarget.style.background = "#3d8a32")}
                                      onMouseLeave={(e) => (e.currentTarget.style.background = "#57a846")}
                                    >
                                      ⬇ Download
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* ─── PDFs Section ─── */}
                          {lesson.pdfs?.length > 0 && (
                            <div
                              className="rounded-xl p-3"
                              style={{ background: "#fff8f0", border: "1.5px solid #f5d9b0" }}
                            >
                              <p className="text-xs font-semibold mb-2" style={{ color: "#a05a00" }}>
                                📄 PDFs ({lesson.pdfs.length})
                              </p>
                              <ul className="space-y-2">
                                {lesson.pdfs.map((pdf) => (
                                  <li key={pdf._id} className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 text-sm min-w-0" style={{ color: "#6b4a1e" }}>
                                      <span
                                        className="w-1.5 h-1.5 rounded-full shrink-0"
                                        style={{ background: "#e07b00" }}
                                      />
                                      <span className="truncate">{pdf.title || "PDF"}</span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleDownload(`${BASE_URL}${pdf.url}`, pdf.title || "file.pdf")}
                                      className="shrink-0 text-xs px-2 py-1 rounded-lg transition font-medium text-white"
                                      style={{ background: "#e07b00" }}
                                      onMouseEnter={(e) => (e.currentTarget.style.background = "#b86200")}
                                      onMouseLeave={(e) => (e.currentTarget.style.background = "#e07b00")}
                                    >
                                      ⬇ Download
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* No content */}
                          {!lesson.videos?.length && !lesson.pdfs?.length && (
                            <p className="text-xs italic" style={{ color: "#b0c8ac" }}>
                              No content added yet
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}