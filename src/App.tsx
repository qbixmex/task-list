import { useState, FormEvent } from "react";
import { useForm } from './Hooks/useForm';
import { Anime } from "./Interfaces";

const App = (): JSX.Element => {

  const { formValues, handleInputChange, reset } = useForm<Anime>({});
  
  const [ animes, setAnimes ] = useState<Anime[]>([]);
  const { title } = formValues;

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setAnimes([
      ...animes,
      {
        id: animes.length + 1,
        title
      }
    ])
    reset();
  };

  return (
    <>
      <h1 className="text-center text-primary display-1">ReactJs</h1>
      <hr />

      <form onSubmit={ handleSubmit }>
        <input
          id="title"
          className="form-control mb-4"
          type="text"
          name="title"
          placeholder="anime title"
          onChange={ handleInputChange }
          value={ title ?? "" }
        />
        
        <div className="d-grid">
          <button
            id="submitBtn"
            type="submit"
            className="btn btn-primary"
          >Add</button>
        </div>
      </form>

      <ul className="mt-5">
        {animes.map((anime) => (
          <li key={anime.id}>{anime?.title?.toUpperCase()}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
