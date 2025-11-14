"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FormControl } from "react-bootstrap";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { uid } = useParams();

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [uid]);

  return (
    <div>
      <h3>Users</h3>
      <div className="d-flex gap-2 mb-3">
        <FormControl
          onChange={(e) => filterUsersByName(e.target.value)}
          placeholder="Search people"
          className="wd-filter-by-name"
          value={name}
          style={{ width: "300px" }}
        />
        <select
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="form-select wd-select-role"
          style={{ width: "300px" }}
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
      </div>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}

