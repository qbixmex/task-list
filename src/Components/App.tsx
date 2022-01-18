import { useState, FormEvent, ChangeEvent } from "react";
import shortid from "shortid";

import { Task } from '../Interfaces';
import TasksComponent from "./TasksComponent";

const App = (): JSX.Element => {

  const initialState = { name: "" };

  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [ task, setTask ] = useState<Task>( initialState);
  const [ taskId, setTaskId ] = useState<string>("");
  const [ editMode, setEditMode ] = useState<boolean>( false );
  const [ error, setError ] = useState<string>("");

  const handleInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    setTask({ name: event.target.value });
  };

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!task.name.trim()) {
      setError("Task can not be empty !");
      return undefined;
    }

    setTasks([{
      id: shortid.generate(),
      name: task.name
    }, ...tasks ]);

    setTask( initialState );
    setEditMode( false );
    setError("");
  };

  const editTask = ( id: string ) => {
    setEditMode( true );
    const task = tasks.find( task => task.id === id);
    setTask({ name: task?.name! });
    setTaskId( id );
  };

  const updateTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!task.name.trim()) {
      setError("Task can not be empty !");
      return undefined;
    }

    const tasksUpdated: Task[] = tasks.map( oldTask => 
       ( oldTask.id === taskId )
        ? { id: taskId, name: task.name }
        : oldTask
    );

    setTasks( tasksUpdated );
    setEditMode( false );
    setTask( initialState );
    setTaskId("");
    setError("");
  };

  const deleteTask = ( id: string ) => {
    const tasksFiltered = tasks.filter( task => task.id !== id );
    setTasks( tasksFiltered );    
  };

  return (
    <>
      <h1 className="text-center text-primary display-1">Crud Simple</h1>
      <hr />

      <div className="row">
        <div className="col-12 col-md-8">
          <h2 className="text-center display-2 green">
            Task List
          </h2>

          <TasksComponent
            tasks={ tasks }
            editTask={ editTask }
            deleteTask={ deleteTask }
          />
        </div>
        <div className="col-12 col-md-4">
          <h2 className={`text-center display-2 ${ editMode ? "orange" : "purple" }`}>
            { editMode ? "Edit Task" : "Add Task" }
          </h2>

          {
            error &&
            <div className="alert alert-danger text-center fw-bold fst-italic">
              { error }
            </div>
          }

          <form onSubmit={ editMode ? updateTask : addTask }>
            <input
              name="name"
              type="text"
              className="form-control mb-3"
              placeholder="Type a task"
              autoComplete="off"
              autoSave="off"
              value={ task.name }
              onChange={ handleInputChange }
            />
            <div className="d-grid gap-3 d-md-flex justify-content-md-end">
              <button type="submit" className={`btn btn-${ editMode ? "warning" : "primary" }`}>
                { editMode ? "Update" : "Save" }
              </button>
              {
                editMode &&
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={ () => setEditMode( false ) }
                >
                  Cancel
                </button>
              }
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default App;
