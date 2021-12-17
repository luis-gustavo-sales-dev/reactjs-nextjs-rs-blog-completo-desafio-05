/* eslint-disable prettier/prettier */
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
    <div>
      <h2>{content.heading}</h2>
      {content.body.map(b => {
        return <p key={b.text.slice(0, 10)}>{b.text}</p>;
      })}
    </div>
  );
}
