import "./App.css";
import "./index.css";

import Pomodoro from "./pages/pomodoro/pomodoro.tsx";

function App() {
  return (
    <>
      <Pomodoro
        //Valores tem que ser em segundos
        focus={1800}
        shortBreak={300}
        longBreak={900}
        cycle={4}
      />
    </>
  );
}

export default App;
