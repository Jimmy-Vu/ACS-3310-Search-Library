import type { Post } from './types'

export type { Post, PostStatus } from './types'

function tokenize(text: string): string[] {
  return text.toLowerCase().trim().split(/\s+/).filter(Boolean);
}

export function buildSearchableText(post: Post): string {
  const fields = [
    post.title,
    post.body,
    post.author,
    Array.isArray(post.tags) ? post.tags.join(' ') : '',
    post.category,
  ]
  return fields.join(' ').toLowerCase().replace(/\s+/g, ' ').trim();
}

export function matchesQuery(post: Post, query: string): boolean {
  const trimmed = query.trim();
  if (trimmed === '') return true;

  const postTokens = tokenize(buildSearchableText(post));
  const queryTokens = tokenize(trimmed);

  return queryTokens.every((qToken) =>
    postTokens.some((pToken) => pToken.includes(qToken))
  )
}

export function searchPosts(posts: Post[], query: string): Post[] {
  return posts.filter((post) => {
    if (
      !post ||
      typeof post !== 'object' ||
      typeof post.title !== 'string' ||
      typeof post.body !== 'string'
    ) {
      return false;
    }
    return matchesQuery(post, query);
  })
}
