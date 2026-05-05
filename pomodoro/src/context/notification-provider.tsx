import { useState } from "react";
import { createContext } from "react";

interface NotificationContextType {
  isSound: boolean;
  setIsSound: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: any) {
  const [isSound, setIsSound] = useState(true);

  return (
    <NotificationContext.Provider value={{ isSound, setIsSound }}>
      {children}
    </NotificationContext.Provider>
  );
}
