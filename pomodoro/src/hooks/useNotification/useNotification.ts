import { OrganizarImgs } from "../../assets/OrganizarImgs";

export function useNotification() {
  if ("Notification" in window) {
    Notification.requestPermission();
  }

  const sendNotification = (textBody: string) => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Notificação Pomodoro", {
          icon: OrganizarImgs.pomodoroDefault,
          body: textBody,
        });
      } else if (permission === "denied") {
        throw new Error("Permissão de notificação");
      }
    });
  };

  return { sendNotification };
}
