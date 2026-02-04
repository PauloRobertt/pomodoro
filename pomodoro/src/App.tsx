import "./App.css";
import "./index.css";

import Pomodoro from "./pages/pomodoro/pomodoro.tsx";

function App() {
  return (
    <>
      <Pomodoro
        //Valores tem que ser em segundos
        focus={30}
        shortBreak={40}
        longBreak={60}
        cycle={4}
      />
    </>
  );
}

export default App;
