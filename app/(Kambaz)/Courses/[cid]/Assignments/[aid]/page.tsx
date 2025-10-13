"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Container, Row, Col, Form } from "react-bootstrap";
import * as db from "../../../../Database";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatDateTime = (value?: string | null) => {
  if (!value) {
    return "TBD";
  }
  const [datePart, timePart] = value.split("T");
  if (!datePart || !timePart) {
    return value;
  }
  const [year, month, day] = datePart.split("-").map(Number);
  const [hourRaw, minuteRaw] = timePart.split(":").map(Number);
  if ([year, month, day, hourRaw, minuteRaw].some((num) => Number.isNaN(num))) {
    return value;
  }

  const period = hourRaw >= 12 ? "pm" : "am";
  const hour12 = ((hourRaw + 11) % 12) + 1;
  const monthLabel = MONTHS[month - 1] ?? month.toString();
  const minuteLabel = minuteRaw.toString().padStart(2, "0");

  return `${monthLabel} ${day} at ${hour12}:${minuteLabel}${period}`;
};

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const assignment = db.assignments.find(
    (item) => item.course === cid && item._id === aid
  );

  if (!assignment) {
    return (
      <Container fluid id="wd-assignments-editor" className="py-4">
        <p className="fs-4">Assignment not found.</p>
        <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary">
          Back to Assignments
        </Link>
      </Container>
    );
  }

  return (
    <Container fluid id="wd-assignments-editor" className="py-2">
      <Form>
        {/* Assignment name */}
        <Row className="g-3 mb-4">
          <Col sm={12} md={8} lg={7}>
            <Form.Group controlId="wd-name">
              <Form.Label className="fw-semibold">Assignment Name</Form.Label>
              <Form.Control defaultValue={assignment.title} />
            </Form.Group>
          </Col>
        </Row>

        {/* Description */}
        <Row className="g-3 mb-4">
          <Col sm={12} md={8} lg={7}>
            <div className="border rounded p-3">
              <p className="mb-2">
                The assignment <span className="fw-semibold">{assignment.title}</span> is <span className="text-danger">available online</span>.
              </p>
              <p className="mb-2">
                Available <strong>{formatDateTime(assignment.availableOn)}</strong> &nbsp;|&nbsp; Due{" "}
                <strong>{formatDateTime(assignment.dueOn)}</strong>
              </p>
              <p className="mb-2">Make sure to review the course syllabus and submit the required materials before the deadline.</p>
              <p className="mb-2">The landing page should include the following:</p>
              <ul className="mb-2">
                <li>Your full name and section</li>
                <li>Links to each of the lab assignments</li>
                <li>
                  Link to the{" "} Kambaz application
                </li>
                <li>Links to all relevant source code repositories</li>
              </ul>
              <p className="mb-0">
                The Kambaz application should include a link to navigate back to the landing page.
              </p>
            </div>
          </Col>
        </Row>

        {/* Points */}
        <Row className="align-items-center g-3 mb-3">
          <Col sm={3} md={2} className="text-sm-end">
            <Form.Label htmlFor="wd-points">Points</Form.Label>
          </Col>
          <Col sm={9} md={6} lg={5}>
            <Form.Control id="wd-points" type="number" defaultValue={assignment.points ?? 0} />
          </Col>
        </Row>

        {/* Assignment group */}
        <Row className="align-items-center g-3 mb-3">
          <Col sm={3} md={2} className="text-sm-end">
            <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
          </Col>
          <Col sm={9} md={6} lg={5}>
            <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
              <option>ASSIGNMENTS</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Display grade */}
        <Row className="align-items-center g-3 mb-3">
          <Col sm={3} md={2} className="text-sm-end">
            <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
          </Col>
          <Col sm={9} md={6} lg={5}>
            <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
              <option>Percentage</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Submission type */}
        <Row className="g-3 mb-4">
          <Col sm={3} md={2} className="text-sm-end">
            <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
          </Col>
          <Col sm={9} md={6} lg={5}>
            <div className="border rounded p-3">
              <Form.Select
                id="wd-submission-type"
                className="mb-3"
                defaultValue="Online"
              >
                <option>Online</option>
              </Form.Select>

              <div className="fw-semibold mb-2">Online Entry Options</div>

              <Form.Check
                id="wd-text-entry"
                className="mb-2"
                label="Text Entry"
              />
              <Form.Check
                id="wd-website-url"
                className="mb-2"
                label="Website URL"
                defaultChecked
              />
              <Form.Check
                id="wd-media-recordings"
                className="mb-2"
                label="Media Recordings"
              />
              <Form.Check
                id="wd-student-annotation"
                className="mb-2"
                label="Student Annotation"
              />
              <Form.Check id="wd-file-upload" label="File Uploads" />
            </div>
          </Col>
        </Row>

        {/* Assign section */}
        <Row className="g-3 mb-4">
          <Col sm={3} md={2} className="text-sm-end">
            <Form.Label className="pt-2">Assign</Form.Label>
          </Col>
          <Col sm={9} md={6} lg={5}>
            <div className="border rounded p-3">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-assign-to" className="fw-semibold">
                  Assign to
                </Form.Label>
                <Form.Control id="wd-assign-to" defaultValue="Everyone" />
              </Form.Group>
              
              <Row className="g-3">
                <Col xs={12}>
                  <Form.Group controlId="wd-due-date">
                    <Form.Label className="fw-semibold">Due</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      step="60"
                      defaultValue={assignment.dueOn?.slice(0, 16) ?? ""}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="wd-available-from">
                    <Form.Label className="fw-semibold">Available from</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      step="60"
                      defaultValue={assignment.availableOn?.slice(0, 16) ?? ""}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="wd-available-until">
                    <Form.Label className="fw-semibold">Until</Form.Label>
                    <Form.Control type="datetime-local" defaultValue="2025-05-20T23:59" />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={8} lg={7}>
          <hr className="my-4" />
          </Col>
        </Row>

        {/* Actions */}
        <Row>
          <Col sm={3} md={2} />
          <Col
            sm={9}
            md={6}
            lg={5}
            className="d-flex justify-content-end gap-2"
          >
            <Link
              href={`/Courses/${cid}/Assignments`}
              className="btn btn-light"
            >
              Cancel
            </Link>
            <Link
              href={`/Courses/${cid}/Assignments`}
              className="btn btn-danger"
            >
              Save
            </Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
