import secondsToMinutes from "../utils/secondsToMinutes";

type Props = {
  time: number
}

export default function Timer(props: Props): JSX.Element {
  return <div className="timer">{secondsToMinutes(props.time)}</div>
}
