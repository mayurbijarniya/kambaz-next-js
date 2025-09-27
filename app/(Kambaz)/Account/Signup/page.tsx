import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h1>Sign up</h1>
            <FormControl defaultValue="alice" placeholder="username" id="wd-username" className="mb-2"/>
            <FormControl defaultValue="123" placeholder="password" type="password" id="wd-password" className="mb-2"/>
            <FormControl defaultValue="123" placeholder="verify password" type="password" id="wd-password-verify" className="mb-2"/>
            <Link id="wd-signup-btn"
            href="Profile"
            className="btn btn-primary w-100 mb-2">
            Sign up </Link>
            <Link id="wd-signin-link" href="Signin"> Sign in </Link>
        </div>
    );
}