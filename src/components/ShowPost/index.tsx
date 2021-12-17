import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { RichText } from "prismic-dom";
import PostContent from "../PostContent";

interface Content {
  heading: string;
  body: {
    text: string;
  }[];
}

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: Content[];
  };
}


interface ShowPostProps {
  post: Post;
}
export default function ShowPost({ post }: ShowPostProps): JSX.Element {

  function estimatedTimeToRead(postContent: Content[]): string {
    const countWordsOnText = postContent.reduce<number>( (acc, currentValue) => {
      const text = RichText.asText(currentValue.body);
      return acc + text.split(' ').length;
    }, 0);

    const minutes = countWordsOnText / 200;
    return `${String(Math.ceil(minutes))}  min`;
  }

  return (
    <div>
      <h2>{post.data.title}</h2>
      <div>{post.data.author}</div>
      <div>{estimatedTimeToRead(post.data.content)}</div>
      <div>
        {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
          locale: ptBR,
        })}
      </div>
      <img src={post.data.banner.url} alt={post.data.title} />
      {post.data.content.map(content => {
        return <PostContent key={content.heading} content={content} />;
      })}
    </div>
  );
}
