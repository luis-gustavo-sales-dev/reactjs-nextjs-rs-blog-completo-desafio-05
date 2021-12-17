import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import PostContent from "../PostContent";

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}
interface ShowPostProps {
  post: Post;
}
export default function ShowPost({ post }: ShowPostProps): JSX.Element {
  return (
    <div>
      <h2>{post.data.title}</h2>
      <div>{post.data.author}</div>
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
