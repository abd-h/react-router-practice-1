import { lazy } from 'react';

export const BlogPage = lazy(() => import("../pages/Blog"));
export const PostPage = lazy(() => import('../pages/Post'));

// Using async await
export const postsLoader = async () => {
  const module = await import("../pages/Blog");
  return module.loader();
};

export const postLoader = async () => {
  const module = await import('../pages/Post');
  return module.loader();
}

