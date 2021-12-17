import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';

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
      <div>
        <h1>{post.data.title}</h1>
        <span>{post.data.subtitle}</span>
        <span>{post.data.author}</span>
        <span>
          {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
            locale: ptBR,
          })}
        </span>
      </div>
    </Link>
  );
}
