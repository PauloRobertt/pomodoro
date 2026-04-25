export function useNotification() {
  const askNotification = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    if (Notification.permission === "default") {
      alert(
        "The popup notification is blocked by the browser. Please allow it by clicking the bell icon on the URL bar.",
      );
      Notification.requestPermission();
    }
    console.log(Notification.permission);
  };

  const sendNotification = (textBody: string) => {
    if (Notification.permission === "granted") {
      new Notification("Notificação Pomodoro", {
        body: textBody,
      });
    }
  };

  return { sendNotification, askNotification };
}
