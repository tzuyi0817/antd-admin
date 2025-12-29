import { createContext, useContext, useState, type Dispatch, type PropsWithChildren, type SetStateAction } from 'react';

export type FormMode = 'login' | 'register' | 'forgotPassword';

interface FormContext {
  formMode: FormMode;
  setFormMode: Dispatch<SetStateAction<FormMode>>;
}

const FormModeContext = createContext<FormContext>({
  formMode: 'login',
  setFormMode: () => {},
});

export function FormModeProvider({ children }: PropsWithChildren) {
  const [formMode, setFormMode] = useState<FormMode>('login');

  return <FormModeContext.Provider value={{ formMode, setFormMode }}>{children}</FormModeContext.Provider>;
}

export const useFormMode = () => useContext(FormModeContext);
