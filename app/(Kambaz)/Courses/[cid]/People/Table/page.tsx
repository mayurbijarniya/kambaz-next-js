import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
export default function PeopleTable() {
 return (
  <div id="wd-people-table">
   <Table striped>
        <thead>
     <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
    </thead>
    <tbody>
    <tr>
      <td className="wd-full-name text-nowrap">
        <FaUserCircle className="me-2 fs-1 text-secondary" />
        <span className="wd-first-name">Tony</span>{" "}
        <span className="wd-last-name">Stark</span>
      </td>
      <td className="wd-login-id">001234561S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-10-01</td>
      <td className="wd-total-activity">10:21:32</td>
    </tr>
    <tr>
      <td className="wd-full-name text-nowrap">
        <FaUserCircle className="me-2 fs-1 text-secondary" />
        <span className="wd-first-name">Bruce</span>{" "}
        <span className="wd-last-name">Wayne</span>
      </td>
      <td className="wd-login-id">001234562B</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-10-03</td>
      <td className="wd-total-activity">08:15:10</td>
    </tr>
    <tr>
      <td className="wd-full-name text-nowrap">
        <FaUserCircle className="me-2 fs-1 text-secondary" />
        <span className="wd-first-name">Steve</span>{" "}
        <span className="wd-last-name">Rogers</span>
      </td>
      <td className="wd-login-id">001234563S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-10-05</td>
      <td className="wd-total-activity">12:42:05</td>
    </tr>
    <tr>
      <td className="wd-full-name text-nowrap">
        <FaUserCircle className="me-2 fs-1 text-secondary" />
        <span className="wd-first-name">Natasha</span>{" "}
        <span className="wd-last-name">Romanoff</span>
      </td>
      <td className="wd-login-id">001234564N</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-10-07</td>
      <td className="wd-total-activity">09:33:47</td>
    </tr>
    <tr>
      <td className="wd-full-name text-nowrap">
        <FaUserCircle className="me-2 fs-1 text-secondary" />
        <span className="wd-first-name">Peter</span>{" "}
        <span className="wd-last-name">Parker</span>
      </td>
      <td className="wd-login-id">001234565P</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-10-09</td>
      <td className="wd-total-activity">07:28:19</td>
    </tr>
    <tr>
      <td className="wd-full-name text-nowrap">
        <FaUserCircle className="me-2 fs-1 text-secondary" />
        <span className="wd-first-name">Diana</span>{" "}
        <span className="wd-last-name">Prince</span>
      </td>
      <td className="wd-login-id">001234566D</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">TA</td>
      <td className="wd-last-activity">2020-10-10</td>
      <td className="wd-total-activity">14:05:54</td>
    </tr>
    <tr>
      <td className="wd-full-name text-nowrap">
        <FaUserCircle className="me-2 fs-1 text-secondary" />
        <span className="wd-first-name">Clark</span>{" "}
        <span className="wd-last-name">Kent</span>
      </td>
      <td className="wd-login-id">001234567C</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-10-12</td>
      <td className="wd-total-activity">11:17:02</td>
    </tr>
    </tbody>
   </Table>
  </div> );
}
