/* eslint-disable prettier/prettier */
import PostComponent from "../PostComponent";
import styles from './styles.module.scss';

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
  posts: Post[];
}

export default function ListPostsComponent({ posts }: PostComponentProps): JSX.Element {

  return (
    <div className={styles.postComponent}>
      {
        posts.map (post => {
          return <PostComponent key={post.uid} post={post} />
        })
      }
    </div>
  )
}
