import PomodoroTimer from "./components/pomodoroTimer";
import './styles/global.css';

function App() {
  return (
    <div className='container'>
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        LongRestTime={1500}
        cycles={4}
        />
    </div>
  );
}

export default App;
