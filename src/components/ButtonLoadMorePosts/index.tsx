interface ButtonLoadMorePostsProps {
  nextPage: string;
  loadMorePosts: () => Promise<void>;
}
export default function ButtonLoadMorePosts({
  loadMorePosts,
  nextPage,
}: ButtonLoadMorePostsProps): JSX.Element {
  return nextPage ? (
    <button onClick={loadMorePosts}>Carregar mais posts</button>
  ) : (
    <button disabled>Não há mais páginas</button>
  );
}
