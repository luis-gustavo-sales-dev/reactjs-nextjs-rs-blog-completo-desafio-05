/* eslint-disable react/button-has-type */
import styled from './styles.module.scss';

interface ButtonLoadMorePostsProps {
  nextPage: string;
  loadMorePosts: () => Promise<void>;
}
export default function ButtonLoadMorePosts({
  loadMorePosts,
  nextPage,
}: ButtonLoadMorePostsProps): JSX.Element {
  return nextPage ? (
    <button className={styled.ButtonLoadMorePosts} onClick={loadMorePosts}>
      Carregar mais posts
    </button>
  ) : (
    <button className={styled.ButtonLoadMorePosts} disabled>
      Não há mais páginas
    </button>
  );
}
