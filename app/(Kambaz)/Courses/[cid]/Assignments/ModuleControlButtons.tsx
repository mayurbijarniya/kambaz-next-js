import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({
  onDelete,
}: {
  onDelete?: () => void;
}) {
  return (
    <span className="d-flex align-items-center me-2 float-end">
      {onDelete && (
        <FaTrash
          className="text-danger me-3 mb-1"
          onClick={onDelete}
          style={{ cursor: "pointer" }}
          title="Delete assignment"
        />
      )}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </span>
  );
}