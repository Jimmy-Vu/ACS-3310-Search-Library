# Post Search

## Purpose
Search post content.
## Exports

**`buildSearchableText(post: Post): string`**
- **Description**: combines the searchable fields (`title`, `body`, `author`, `tags`, `category`) into a single string for matching

**`matchesQuery(post: Post, query: string): boolean`**
- **Description**: returns whether a post matches the query. Matching is case-insensitive and fuzzy — query tokens are compared against post tokens, so minor typos and partial matches are tolerated

**`searchPosts(posts: Post[], query: string): Post[]`**
- **Description**: filters the array to only posts that match the query. Uses `matchesQuery` internally — the returned posts are those for which `matchesQuery` returns `true`

## Example Usage
```ts
export type PostStatus = 'draft' | 'review' | 'published'

export type Post = {
  id: string
  title: string
  body: string
  author: string
  tags: string[]
  category: string
  status: PostStatus
  createdAt: string
  updatedAt: string
}

const postArray: Post[] = [...];
const query = "hot dog";

// buildSearchableText example — searches title, body, author, tags, and category
const searchableText = buildSearchableText(post);

// searchPosts example
const searchReturnArray = searchPosts(postArray, query);

// matchesQuery example
const firstPost = searchReturnArray[0];
const queryMatches = matchesQuery(firstPost, query);


```

## Edge Cases
### Malformed input items
If the input array contains items that do not conform to the Post type, searchPosts should ignore those items or handle them safely without crashing.

### Empty query string
If the query is an empty string (`""`), `searchPosts` returns all posts in the array, since every post trivially matches an empty search.

## Design Notes
Search is case-insensitive and whitespace normalized via `.toLowerCase()` and `.trim()`. Post fields are tokenized into individual words for matching.
