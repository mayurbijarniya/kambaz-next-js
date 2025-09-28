"use client";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <Container fluid id="wd-assignments-editor" className="py-2">
      <Form>
        {/* Assignment name */}
        <Row className="g-3 mb-4">
          <Col sm={12} md={8} lg={6}>
            <Form.Group controlId="wd-name">
              <Form.Label className="fw-semibold">Assignment Name</Form.Label>
              <Form.Control defaultValue="A1" />
            </Form.Group>
          </Col>
        </Row>

        {/* Description */}
        <Row className="g-3 mb-4">
          <Col sm={12} md={8} lg={6}>
            <div className="border rounded p-3">
              <p className="mb-2">
                The assignment is{" "}
                <span className="text-danger">
                  available online
                </span>
              </p>
              <p className="mb-2">
                Submit a link to the landing page of your Web application running on Vercel.
              </p>
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
          <Col sm={9} md={6} lg={4}>
            <Form.Control id="wd-points" type="number" defaultValue={100} />
          </Col>
        </Row>

        {/* Assignment group */}
        <Row className="align-items-center g-3 mb-3">
          <Col sm={3} md={2} className="text-sm-end">
            <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
          </Col>
          <Col sm={9} md={6} lg={4}>
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
          <Col sm={9} md={6} lg={4}>
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
          <Col sm={9} md={6} lg={4}>
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
          <Col sm={9} md={6} lg={4}>
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
                    <Form.Control type="date" defaultValue="2024-05-13" />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="wd-available-from">
                    <Form.Label className="fw-semibold">Available from</Form.Label>
                    <Form.Control type="date" defaultValue="2024-05-06" />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="wd-available-until">
                    <Form.Label className="fw-semibold">Until</Form.Label>
                    <Form.Control type="date" defaultValue="2024-05-20" />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={8} lg={6}>
          <hr className="my-4" />
          </Col>
        </Row>

        {/* Actions */}
        <Row>
          <Col sm={3} md={2} />
          <Col
            sm={9}
            md={6}
            lg={4}
            className="d-flex justify-content-end gap-2"
          >
            <Button variant="light">Cancel</Button>
            <Button variant="danger">Save</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
