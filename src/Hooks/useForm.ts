import { useState, ChangeEvent } from "react";

export const useForm = <T>(initialState: T) => {
  const [ formValues, setFormValues ] = useState<T>( initialState );

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = target;

    setFormValues({
      ...formValues,
      [ name ]: value
    });
  }

  const reset = ( newState = initialState ) => {
    setFormValues( newState );
  };

  return { formValues, handleInputChange, reset, ...formValues };
};
