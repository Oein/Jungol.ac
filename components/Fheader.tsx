import style from "./Fheader.module.css";

interface Props {
  title: string;
  description: string;
}

export default function FHeader(props: Props) {
  return (
    <>
      <header className={style.header}>
        <h1>{props.title}</h1>
        <h3>{props.description}</h3>
      </header>
    </>
  );
}
