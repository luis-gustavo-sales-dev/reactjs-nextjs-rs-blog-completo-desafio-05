/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Prismic from '@prismicio/client';
import ShowPost from '../../components/ShowPost';
import { getPrismicClient } from '../../services/prismic';
import commonStyles from '../../styles/common.module.scss';

import styles from './post.module.scss';
import { RichText } from 'prismic-dom';

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

  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }
  // TODO
  return (
    <>
      <ShowPost post={post} />
    </>
  );
}

export const getStaticPaths = async () => {
  const prismic = getPrismicClient();
  //const posts = await prismic.query([

  const posts = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
    pageSize: 1,
  });

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid
      }
    }
  })
  // TODO
  return {
    paths: [...paths],
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: any ) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response: Post = await prismic.getByUID('posts', String(slug), {});

  // console.log(response);

  // Aqui eu deveria converte os dados vindos do response com o modelo extado do tipo post mas não acho que vale o esforço. (por mais que seja mínimo)
  const post: Post = response as Post;

  console.log(RichText.asHtml(post.data.content[0].body));
  //console.log(RichText.asText(post.data.content[0].body));

  return {
    props: {
      post,
    },
    redirect: 10,
  };
};
