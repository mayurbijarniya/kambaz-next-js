"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import * as db from "../../../Database";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
export default function Assignments() {
    const params = useParams();
    const cid = params.cid;
    const assignments = db.assignments;
    return (
      <div id="wd-assignments">
        <div className="clearfix mb-4">
          <ModulesControls />
        </div>
        <ListGroup className="rounded-0" id="wd-assignments">
          <ListGroupItem className="wd-assignments-title p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" /> <BsFillCaretDownFill className="me-2 fs-5" />
                ASSIGNMENTS{" "}
              </div>
              <div className="d-flex align-items-center">
                <span className="badge rounded-pill border border-black bg-secondary text-black fw-semibold px-3 py-2">
                  40% of Total
                </span>
                <AssignmentControlButtons />
              </div>
            </div>
            <ListGroup
              className="wd-assignment-list rounded-0"
              id="wd-assignment-list"
            >
              {assignments
                .filter((assignment) => assignment.course === cid)
                .map((assignment) => (
                  <ListGroupItem
                    key={assignment._id}
                    className="wd-assignment-list-item list-group-item-action p-3 ps-1 d-flex justify-content-between align-items-center"
                  >
                    <span className="d-flex align-items-center me-2">
                      <BsGripVertical className="fs-3" />
                      <BsPencilSquare className="text-success me-2 fs-4" />
                    </span>
                    <Link
                      href={`/Courses/${cid}/Assignments/${assignment._id}`}
                      className="d-flex text-decoration-none flex-grow-1 me-3"
                    >
                      <span>
                        <span className="wd-assignment-link fw-semibold text-decoration-none fs-5">
                          {assignment._id}
                        </span>
                        <div className="wd-assignment-details text-body-secondary">
                          <span className="text-danger">{assignment.title}</span>{" "}
                          | <strong>Not available until</strong> {assignment.availableOn ?? "TBD"} |{" "}
                          <strong>Due</strong> {assignment.dueOn ?? "TBD"} | {assignment.points ?? 0} pts
                        </div>
                      </span>
                    </Link>
                    <ModuleControlButtons />
                  </ListGroupItem>
                ))}
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
