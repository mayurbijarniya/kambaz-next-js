"use client";
import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import type { User } from "../../Account/reducer";

type Course = {
  _id: string;
  name: string;
  [key: string]: unknown;
};

type CoursesState = {
  courses: Course[];
};

export default function CoursesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { cid } = useParams();
  const router = useRouter();

  const { courses } = useSelector((state: { coursesReducer: CoursesState }) => state.coursesReducer);
  const { currentUser } = useSelector((state: { accountReducer: { currentUser: User | null } }) => state.accountReducer);

  const course = courses.find((course: Course) => course._id === cid);

  // Check if user is enrolled in the course (or is Faculty)
  // Since courses array contains only enrolled courses (fetched from server),
  // we check if the course exists in the courses array
  // Only check if user is logged in (allow access when not logged in for testing)
  useEffect(() => {
    if (currentUser && cid && !Array.isArray(cid)) {
      const isEnrolled = courses.some((c: Course) => c._id === cid);
      const isFaculty = currentUser.role === "FACULTY";

      // If not enrolled and not faculty, redirect to dashboard
      // If no currentUser, allow access (for testing API endpoints)
      if (!isEnrolled && !isFaculty) {
        router.push("/Dashboard");
      }
    }
    // If currentUser is null/undefined, allow access (for testing)
  }, [currentUser, cid, courses, router]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
