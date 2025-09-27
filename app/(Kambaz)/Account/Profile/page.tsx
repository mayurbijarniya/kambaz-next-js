import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h1>Profile</h1>
            <FormControl defaultValue="alice" placeholder="username" id="wd-username" className="mb-2"/>
            <FormControl defaultValue="123" placeholder="password" type="password" id="wd-password" className="mb-2"/>
            <FormControl defaultValue="Alice" placeholder="First Name" id="wd-firstname" className="mb-2"/>
            <FormControl defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" className="mb-2"/>
            <FormControl defaultValue="2000-01-01" type="date" id="wd-dob" className="mb-2"/>
            <FormControl defaultValue="alice@wonderland.com" type="email" id="wd-email" className="mb-2"/>
            <FormControl as="select" defaultValue="FACULTY" id="wd-role" className="mb-2">
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
            </FormControl>
            <Link id="wd-signup-btn" href="Signin" className="btn btn-danger w-100"> Sign out </Link>
        </div>
    );
}