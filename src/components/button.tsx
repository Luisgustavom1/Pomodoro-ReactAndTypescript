interface Props {
  text: string;
  onClick?: () => void;
  className: string;
};

export default function Button(props: Props): JSX.Element {
  return <button className={props.className} onClick={props.onClick}>{props.text}</button>
}
