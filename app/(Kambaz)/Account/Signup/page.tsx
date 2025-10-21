"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";

export default function Signup() {
  const [user, setUser] = useState<any>({
    username: "",
    password: "",
    verifyPassword: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = () => {
    // Validate passwords match
    if (user.password !== user.verifyPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Validate fields not empty
    if (!user.username || !user.password) {
      alert("Please fill in all fields!");
      return;
    }

    // Create new user object (just for Redux, not saved to DB)
    const newUser = {
      _id: new Date().getTime().toString(), // Temporary ID
      username: user.username,
      password: user.password,
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      role: "STUDENT", // Default role
    };

    // Sign in the new user immediately
    dispatch(setCurrentUser(newUser));
    
    // Navigate to Profile
    router.push("/Account/Profile");
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        id="wd-username"
        className="mb-2"
      />
      <FormControl
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        type="password"
        id="wd-password"
        className="mb-2"
      />
      <FormControl
        value={user.verifyPassword}
        onChange={(e) => setUser({ ...user, verifyPassword: e.target.value })}
        placeholder="verify password"
        type="password"
        id="wd-password-verify"
        className="mb-2"
      />
      <Button
        id="wd-signup-btn"
        onClick={signup}
        className="btn btn-primary w-100 mb-2"
      >
        Sign up
      </Button>
      <Link id="wd-signin-link" href="Signin">
        Sign in
      </Link>
    </div>
  );
}
