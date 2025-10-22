"use client";
import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Enrollment } from "../../Enrollments/reducer";
import type { User } from "../../Account/reducer";

type Course = {
  _id: string;
  name: string;
  [key: string]: unknown;
};

type CoursesState = {
  courses: Course[];
};

type EnrollmentsState = {
  enrollments: Enrollment[];
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
  const { enrollments } = useSelector((state: { enrollmentsReducer: EnrollmentsState }) => state.enrollmentsReducer);

  const course = courses.find((course: Course) => course._id === cid);

  // Check if user is enrolled in the course (or is Faculty)
  useEffect(() => {
    if (currentUser && cid && !Array.isArray(cid)) {
      const isEnrolled = enrollments.some(
        (e: Enrollment) => e.user === currentUser._id && e.course === cid
      );
      const isFaculty = currentUser.role === "FACULTY";

      // If not enrolled and not faculty, redirect to dashboard
      if (!isEnrolled && !isFaculty) {
        router.push("/Dashboard");
      }
    }
  }, [currentUser, cid, enrollments, router]);

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
