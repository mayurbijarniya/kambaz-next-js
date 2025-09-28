import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
export default function ModuleControlButtons() {
  return (
    <span className="d-flex align-items-center me-2 float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </span> );}