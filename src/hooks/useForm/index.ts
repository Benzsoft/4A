import { useState, useCallback, FormEvent, ChangeEvent } from 'react';

interface UseFormProps<T> {
  initialValues: T;
  validate: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => void | Promise<void>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }, [validate, values]);

  const handleSubmit = useCallback((e?: FormEvent) => {
    e?.preventDefault();
    
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
      setValues(initialValues);
      setTouched({});
    }
  }, [initialValues, onSubmit, validate, values]);

  const isValid = Object.keys(errors).length === 0 && 
                 Object.keys(touched).length === Object.keys(values).length;

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid
  };
}