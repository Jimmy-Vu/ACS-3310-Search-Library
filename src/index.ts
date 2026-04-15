import type { Post } from './types'

export type { Post, PostStatus } from './types'

function tokenize(text: string): string[] {
  return text.toLowerCase().trim().split(/\s+/).filter(Boolean);
}

/**
 * Combines the searchable fields of a post (title, body, author, tags, category)
 * into a single normalized lowercase string.
 * @param post - The post to extract searchable text from
 * @returns A lowercased, whitespace normalized string of all searchable fields
 */
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

/**
 * Returns true if every word in the query appears  within
 * the post's searchable text. Returns true for an empty query.
 * @param post - The post to test against the query
 * @param query - The search string; each word must appear in the post
 * @returns `true` if the post matches, `false` otherwise
 */
export function matchesQuery(post: Post, query: string): boolean {
  const trimmed = query.trim();
  if (trimmed === '') return true;

  const postTokens = tokenize(buildSearchableText(post));
  const queryTokens = tokenize(trimmed);

  return queryTokens.every((qToken) =>
    postTokens.some((pToken) => pToken.includes(qToken))
  )
}

/**
 * Filters an array of posts to those matching the query string.
 * @param posts - The array of posts to search
 * @param query - The search string to match against each post
 * @returns A new array containing only the posts that match the query
 */
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
