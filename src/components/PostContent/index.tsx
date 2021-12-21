/* eslint-disable prettier/prettier */
import styled from "./styles.module.scss"

interface Content {
  heading: string;
  body: {
    text: string;
  }[];
}

interface PostContentProps {
  content: Content;
}
export default function PostContent ({ content }: PostContentProps): JSX.Element {
  return (
    <div className={styled.postContent}>
      <h2>{content.heading}</h2>
      {content.body.map(b => {
        return <p key={b.text.slice(0, 10)}>{b.text}</p>;
      })}
    </div>
  );
}
