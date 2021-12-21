import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { RichText } from "prismic-dom";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";
import PostContent from "../PostContent";
import styled from "./styles.module.scss";

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
      <img
        className={styled.postImage}
        src={post.data.banner.url}
        alt={post.data.title}
      />
      <div className={styled.showPost}>
        <h2 className={styled.postTitle}>{post.data.title}</h2>
        <div className={styled.postMetadata}>
          <span>
            <FiCalendar className={styled.postIcon} />
            {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
              locale: ptBR,
            })}
          </span>
          <span>
            <FiUser className={styled.postIcon} />
            {post.data.author}
          </span>
          <span>
            <FiClock className={styled.postIcon} />
            {estimatedTimeToRead(post.data.content)}
          </span>
        </div>

        {post.data.content.map(content => {
          return <PostContent key={content.heading} content={content} />;
        })}
      </div>
    </div>
  );
}
