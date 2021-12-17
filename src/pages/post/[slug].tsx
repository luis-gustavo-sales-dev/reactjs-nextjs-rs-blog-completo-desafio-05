import { GetStaticPaths, GetStaticProps } from 'next';
import ShowPost from '../../components/ShowPost';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

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

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  // TODO
  return (
    <>
      <ShowPost post={post} />
    </>
  );
}

export const getStaticPaths = async () => {
//  const prismic = getPrismicClient();
// const posts = await prismic.query(TODO);
  // TODO
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: any ) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response: Post = await prismic.getByUID('posts', String(slug), {});

  // console.log(response);

  // Aqui eu deveria converte os dados vindos do response com o modelo extado do tipo post mas não acho que vale o esforço. (por mais que seja mínimo)
  const post: Post = response as Post;

  // console.log(post.data.content);

  return {
    props: {
      post,
    },
    redirect: 10,
  };
};
