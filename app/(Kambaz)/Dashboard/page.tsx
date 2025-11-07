"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import CardBody from "react-bootstrap/esm/CardBody";
import Button from "react-bootstrap/esm/Button";
import CardText from "react-bootstrap/esm/CardText";
import CardTitle from "react-bootstrap/esm/CardTitle";
import CardImg from "react-bootstrap/esm/CardImg";
import FormControl from "react-bootstrap/esm/FormControl";
import * as client from "../Courses/client";
import { useDispatch, useSelector } from "react-redux";
import { updateCourse, setCourses } from "../Courses/reducer";
import { enrollCourse, unenrollCourse, setEnrollments, type Enrollment } from "../Enrollments/reducer";
import type { User } from "../Account/reducer";

export type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  image?: string;
};

type CoursesState = {
  courses: Course[];
};

type EnrollmentsState = {
  enrollments: Enrollment[];
};

export default function Dashboard() {
  const { courses } = useSelector((state: { coursesReducer: CoursesState }) => state.coursesReducer);
  const { currentUser } = useSelector((state: { accountReducer: { currentUser: User | null } }) => state.accountReducer);
  const { enrollments } = useSelector((state: { enrollmentsReducer: EnrollmentsState }) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    department: "D123",
    credits: 0,
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const resetCourseForm = () => {
    setCourse({
      _id: "0",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      department: "D123",
      credits: 0,
      image: "/images/reactjs.jpg",
      description: "New Description",
    });
  };

  const onAddNewCourse = async () => {
    if (!course.name.trim() || !course.number.trim()) {
      return;
    }
    try {
      const newCourse = await client.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
      resetCourseForm();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: Enrollment) =>
        enrollment.user === currentUser?._id && enrollment.course === courseId
    );
  };

  const handleEnroll = (courseId: string) => {
    if (currentUser?._id) {
      dispatch(enrollCourse({ user: currentUser._id, course: courseId }));
    }
  };

  const handleUnenroll = (courseId: string) => {
    if (currentUser?._id) {
      dispatch(unenrollCourse({ user: currentUser._id, course: courseId }));
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
    } catch (error) {
      console.error(error);
    }
  };

  const displayedCourses = courses;

  return (
    <div id="wd-dashboard" className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          variant="info"
          id="wd-enrollments-toggle"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show Enrolled Only" : "Show All Courses"}
        </Button>
      </div>
      <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <Button
              className="float-end"
              variant="primary"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </Button>
            <Button
              className="float-end me-2"
              variant="warning"
              id="wd-update-course-click"
              onClick={() => dispatch(updateCourse(course))}
            >
              Update
            </Button>
          </h5>
          <br />

          <FormControl
            value={course.name}
            placeholder="Course Name"
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />

          <FormControl
            value={course.number}
            placeholder="Course Number"
            className="mb-2"
            onChange={(e) => setCourse({ ...course, number: e.target.value })}
          />

          <FormControl
            value={course.description}
            placeholder="Course Description"
            as="textarea"
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "Enrolled Courses"} ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course: Course) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src="/images/reactjs.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>

                    <div className="d-flex justify-content-between align-items-center">
                      <Button variant="primary">Go</Button>

                      <div>
                        {showAllCourses ? (
                          isEnrolled(course._id) ? (
                            <Button
                              variant="danger"
                              className="me-2"
                              id={`wd-unenroll-course-${course._id}`}
                              onClick={(event) => {
                                event.preventDefault();
                                handleUnenroll(course._id);
                              }}
                            >
                              Unenroll
                            </Button>
                          ) : (
                            <Button
                              variant="success"
                              className="me-2"
                              id={`wd-enroll-course-${course._id}`}
                              onClick={(event) => {
                                event.preventDefault();
                                handleEnroll(course._id);
                              }}
                            >
                              Enroll
                            </Button>
                          )
                        ) : currentUser?.role === "FACULTY" ? (
                          <>
                            <Button
                              variant="warning"
                              className="me-2"
                              id="wd-edit-course-click"
                              onClick={(event) => {
                                event.preventDefault();
                                setCourse(course);
                              }}
                            >
                              Edit
                            </Button>

                            <Button
                              variant="danger"
                              id="wd-delete-course-click"
                              onClick={(event) => {
                                event.preventDefault();
                                onDeleteCourse(course._id);
                              }}
                            >
                              Delete
                            </Button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
