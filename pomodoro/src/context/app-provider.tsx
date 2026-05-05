import { NotificationProvider } from "./notification-provider";

export default function AppProvider({ children }: any) {
  return <NotificationProvider>{children}</NotificationProvider>;
}
