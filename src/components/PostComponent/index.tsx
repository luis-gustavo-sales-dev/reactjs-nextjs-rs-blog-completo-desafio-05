import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import styled from './styles.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostComponentProps {
  post: Post;
}

export default function PostComponent({ post }: PostComponentProps): JSX.Element {
  return (
    <Link href={`/post/${post.uid}`}>
      <div className={styled.PostComponent}>
        <h1>{post.data.title}</h1>
        <span className={styled.subtitle}>{post.data.subtitle}</span>
        <span className={styled.icons}>
          <FiCalendar />
        </span>
        <span className={styled.date}>
          {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
            locale: ptBR,
          })}
        </span>
        <span className={styled.icons}>
          <FiUser />
        </span>
        <span className={styled.author}>{post.data.author}</span>
      </div>
    </Link>
  );
}
