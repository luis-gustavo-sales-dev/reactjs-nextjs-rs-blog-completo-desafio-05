/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
import { GetStaticProps } from 'next';
import { useState } from 'react';
import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';
import ListPostsComponent from '../components/ListPostsComponent/ListPostsComponent';
import ButtonLoadMorePosts from '../components/ButtonLoadMorePosts';
import commonStyled from '../styles/common.module.scss'


interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {

  const [posts, setPosts] = useState<Post[]>(postsPagination.results)

  // console.log(postsPagination)
  // console.log(posts)
  async function handleClick () {
    if (postsPagination.next_page) {
      // TEM QUE DAR UM POST COM O FETCH PASSANDO A URL DO NEXT_PAGE
      const response = await fetch('api/posts/',{
        method: 'POST',
        body: JSON.stringify({
          url: postsPagination.next_page,
        })
      })
      // const data: PostPagination = await response.json();
      const data = await response.json()
      setPosts([...posts, ...data.results]);
    }
    // console.log(posts)
    // setPosts([])
  }

  return (
    <div className={commonStyled.centralizePage}>
      <ListPostsComponent posts={posts} />
      <ButtonLoadMorePosts loadMorePosts={handleClick} nextPage={postsPagination.next_page}/>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
    pageSize: 1,
  });

  // console.log(postsResponse)

  // console.log(JSON.stringify(postsResponse.results, null, 4))
  const posts = postsResponse.results.map( (post: Post) => {
    return  {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author
      }
    }
  })

  // console.log(posts[0].first_publication_date)

  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: [...posts]
  }

  // console.log(postsPagination)

  return {
    props: {
      postsPagination,
    },
  };
  // TODO
};
