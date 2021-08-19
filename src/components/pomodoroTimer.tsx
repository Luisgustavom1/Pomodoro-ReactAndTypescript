import { useEffect } from 'react';
import { useState } from 'react'

import useInterval from '../hooks/useIterval';
import secondsToTime from '../utils/secondsToTime';

import Button from './button';
import Timer from './timer';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  LongRestTime: number;
  cycles: number
}

export default function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false)
  const [working, setWorking] = useState(false)
  const [restTime, setRestTime] = useState(false)
  const [cyclesQtdManager, setCyclesQtdManager] = useState(new Array(props.cycles - 1).fill(true))

  const [completedCycles, setCompletedCycles] = useState(0)
  const [numbersOfPomodoros ,setNumbersOfPomodoros] = useState(0)
  const [fullHoursWorked, setFullHoursWorked] = useState(0)

  useInterval(() => {
    setMainTime(mainTime - 1)
    if(working) setFullHoursWorked(fullHoursWorked + 1)
  }, timeCounting ? 1000 : null);

  const configureWork = (): void => {
    setTimeCounting(true)
    setWorking(true)
    setRestTime(false)
    setMainTime(props.pomodoroTime)
  }

  const configureRest = (long: boolean): void => {
    setTimeCounting(true)
    setWorking(false)
    setRestTime(true)

    if(long){
      setMainTime(props.LongRestTime)
    } else {
      setMainTime(props.shortRestTime)
    }
  }

  useEffect(() => {

    if(working) document.body.classList.add('working');
    if(restTime) document.body.classList.remove('working');

    if(mainTime > 0) return;

    if(working && cyclesQtdManager.length > 0){
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0){
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }
    if(working) setNumbersOfPomodoros(numbersOfPomodoros + 1);
    if(restTime) configureWork();
  }, [
    working,
    restTime,
    mainTime,
    cyclesQtdManager,
    completedCycles,
    numbersOfPomodoros,
    configureWork,
    configureRest,
  ])

  return(
    <div className='pomodoro'>
      <h2>You are: {working ? 'Working' : 'Resting'}</h2>
      <Timer time={mainTime}/>
      <div className="controls">
        <Button text={'Work'} onClick={() => configureWork()} className='button'></Button>
        <Button text={'Rest'} onClick={() => configureRest(false)} className='button'></Button>
        <Button text={timeCounting ? 'Pause' : 'Play'} onClick={() => setTimeCounting(!timeCounting)} className={!working && !restTime ? 'hidden' : ''}></Button>
      </div>
      <div className="details">
        <p>Cycles: {completedCycles}</p>
        <p>Hours worked: {secondsToTime(fullHoursWorked)}</p>
        <p>Numbers of pomodoros: {numbersOfPomodoros}</p>
      </div>
    </div>
  )
}

