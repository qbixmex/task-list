import { Task } from "../Interfaces";
import TaskComponent from "./TaskComponent";

type Props = {
  tasks: Task[];
  editTask: (id: string) => void;
  deleteTask: (id: string) => void;
};

const TasksComponent = ({ tasks, editTask, deleteTask }: Props) => {
  return (
    ( tasks.length === 0 )
      ?
        (
          <div className="alert alert-info text-center">
            <b>There's no tasks yet</b>
          </div>
        )
      :
      (
        <ul className="list-group mb-4 mb-md-0">
        {
          tasks.map( ( task ) => (
            <TaskComponent
              key={ task.id }
              task={ task }
              editTask={ editTask }
              deleteTask={ deleteTask }
            />
          ))
        }
        </ul>
      )
  );
};

export default TasksComponent;
