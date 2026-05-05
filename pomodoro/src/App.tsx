import "~/App.css";
import "~/index.css";

import Pomodoro from "~/pages/pomodoro/pomodoro.tsx";
import AppProvider from "./context/app-provider";

function App() {
  return (
    <AppProvider>
      <Pomodoro
        //Valores tem que ser em segundos
        focus={1800}
        shortBreak={300}
        longBreak={900}
        cycle={4}
      />
    </AppProvider>
  );
}

export default App;
