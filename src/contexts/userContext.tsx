import { createContext, useState } from 'react';
import { User, UserContextProps } from '../types/user';

const userInitialState: User = {
  email: null,
  password: null,
  token: null,
};

export const userContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(userInitialState);
  return (
    <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>
  );
};

// Para que funcione el contexto es necesario aplicar el UserProvider en algún componente
