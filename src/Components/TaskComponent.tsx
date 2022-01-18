import { Task } from "../Interfaces";

type Props = {
  task: Task;
  editTask: (id: string) => void;
  deleteTask: (id: string) => void;
};

const TaskComponent = ({ task, editTask, deleteTask }: Props) => {
  return (
    <li className="list-group-item">
      <span className="lead">{ task.name }</span>
      <button
        className="btn btn-danger btn-sm float-end"
        onClick={ () => deleteTask( task.id ?? "" ) }
      >Delete</button>

      <button
        className="btn btn-warning btn-sm float-end me-2"
        onClick={ () => editTask( task.id ?? "") }
      >Edit</button>
    </li>
  );
};

export default TaskComponent;
