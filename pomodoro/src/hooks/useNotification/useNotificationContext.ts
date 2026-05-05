import { useContext } from "react";
import { NotificationContext } from "~/context/notification-provider";

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("Context Null");
  }
  return context;
}
