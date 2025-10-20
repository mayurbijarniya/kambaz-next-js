import { useState } from "react";
import { useSelector} from "react-redux";
import { ListGroup} from "react-bootstrap";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const { todos } = useSelector((state: any) => state.todosReducer);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables">
      <h2 className="fw-bold">Array State Variable</h2>
      <button className="btn btn-success mb-3" onClick={addElement}>
        Add Element
      </button>
      <ul className="list-group">
        {array.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{item}</span>
            <button
              className="btn btn-danger"
              onClick={() => deleteElement(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <hr />

      <h3>Todos from Redux</h3>
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroup.Item key={todo.id}>
            {todo.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}