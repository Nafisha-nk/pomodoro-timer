import { useState, useEffect, useRef } from 'react';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import SessionType from './components/SessionType';
import SessionTracker from './components/SessionTracker';
import Settings from './components/Settings';
import alarmSound from './assets/alarm.mp3';
import './App.css';

const DEFAULTS = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

function App() {
  const [settings, setSettings] = useState(DEFAULTS);
  const [timeLeft, setTimeLeft] = useState(settings.work);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState('Work');
  const [workSessions, setWorkSessions] = useState(0);
  const audioRef = useRef(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  
  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem('pomodoro-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
  }, [settings]);
  
  useEffect(() => {
    let timer;
    const handleSessionEnd = () => {
      audioRef.current.play();

      if (sessionType === 'Work') {
        const newCount = workSessions + 1;
        setWorkSessions(newCount);

        if (newCount % 4 === 0) {
          setSessionType('Long Break');
          setTimeLeft(settings.longBreak);
        } else {
          setSessionType('Short Break');
          setTimeLeft(settings.shortBreak);
        }
      } else {
        setSessionType('Work');
        setTimeLeft(settings.work);
      }

      setIsRunning(false);
    };

    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, sessionType, workSessions, settings]);

  const resetTimer = () => {
  if (sessionType === 'Work') {
    setTimeLeft(settings.work);
  } else if (sessionType === 'Short Break') {
    setTimeLeft(settings.shortBreak);
  } else if (sessionType === 'Long Break') {
    setTimeLeft(settings.longBreak);
  }
  setIsRunning(false);
};

  return (
    <main>
      <TimerDisplay timeLeft={timeLeft} />
      <SessionType type={sessionType} />
      <Controls isRunning={isRunning} setIsRunning={setIsRunning} />
      <SessionTracker count={workSessions} />
      <Settings settings={settings} setSettings={setSettings} />
      <audio ref={audioRef} src={alarmSound} />
      <button onClick={() => stopAlarm()}>
        Stop Alarm
      </button>
      <button onClick={() => {
        resetTimer(); // sync timer with updated settings
        setIsRunning(true); // start the timer
      }}>
        Start
      </button>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </main>
  );
}

export default App;