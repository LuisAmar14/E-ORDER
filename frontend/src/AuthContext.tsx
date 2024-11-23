import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define el tipo del usuario
interface User {
  username: string;
  password: string;
  email?: string;
  country?: string; // Opcional si no siempre está presente
  address?: string;
 
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null; // Puede ser null si no hay usuario autenticado
  login: (user: User) => void; // Función de login que toma un objeto User
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Estado para almacenar el usuario

  // Función para iniciar sesión
  const login = (user: User) => {
    setUser(user); // Guarda el usuario
    setIsAuthenticated(true); // Marca como autenticado
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null); // Elimina el usuario
    setIsAuthenticated(false); // Marca como no autenticado
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
