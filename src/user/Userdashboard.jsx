import React, {
  useEffect,
  useState,
} from "react";

import { getMyCourses } from "../api/enrollmentApi";

export default function Userdashboard() {
  const [loading, setLoading] =
    useState(true);

  const [hasCourse, setHasCourse] =
    useState(false);

  useEffect(() => {
    checkCourse();
  }, []);

  const checkCourse =
    async () => {
      try {
        const res =
          await getMyCourses();

        console.log(res);

        if (
          res.data &&
          res.data.length > 0
        ) {
          setHasCourse(true);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        User Dashboard
      </h1>

      {!hasCourse ? (
        <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">
            No Course Purchased
          </h2>

          <p className="mb-4">
            Please purchase a course to access learning content.
          </p>

          <a
            href="http://localhost:3000/courses"
            target="_blank"
            className="bg-green-600 text-white px-5 py-3 rounded"
          >
            Purchase Course
          </a>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold">
            Welcome Back 👋
          </h2>

          <p className="mt-2">
            Course Purchased ✅
          </p>

          {/* Yahan tum future me:
              My Courses
              Videos
              Progress
              Certificates
              etc dikha sakte ho */}
        </div>
      )}
    </div>
  );
}