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
 * @example
 * const post = { id: '1', title: 'Hello World', body: 'A test', author: 'Jane', tags: ['a'], category: 'misc', status: 'published', createdAt: '', updatedAt: '' }
 * buildSearchableText(post) // 'hello world a test jane a misc'
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
 * Returns true if every word in the query appears within
 * the post's searchable text. Returns true for an empty query.
 * @param post - The post to test against the query
 * @param query - The search string; each word must appear in the post
 * @returns `true` if the post matches, `false` otherwise
 * @example
 * matchesQuery(post, 'dogs')      // true  (if 'dogs' is in the post)
 * matchesQuery(post, 'dogs cats') // false (both tokens must match)
 * matchesQuery(post, '')          // true  (empty query always matches)
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
 * @example
 * const results = searchPosts(posts, 'dogs')
 * // returns only posts whose searchable text contains 'dogs'
 *
 * searchPosts(posts, '') // returns all posts
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
