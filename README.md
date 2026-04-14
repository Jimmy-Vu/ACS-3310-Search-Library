# Post Search

## Purpose
Search post content.
## Exports

**buildSearchableText**
- **Input**: (`Post`)
- **Description**: combines the searchable fields (`title`, `body`, `author`, `tags`, `category`) into a single string for matching
- **Output**: (`string`)

**matchesQuery**
- **Input**: (`Post`, `query string`)
- **Output**: (`boolean`)
- **Description**: returns whether a post matches the query. Matching is case-insensitive and fuzzy — query tokens are compared against post tokens using Levenshtein distance, so minor typos and partial matches are tolerated

**searchPosts**
- **Input**: (an array of `Post` objects, `query string`)
- **Output**: (an array of `Post` objects)
- **Description**: filters the array to only posts that match the query. Uses `matchesQuery` internally — the returned posts are those for which `matchesQuery` returns `true`

## Example Usage (hypothetical code)
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

// buildSearchableText example
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

## Design Notes
Search is case-insensitive and whitespace normalized via `.toLowerCase()` and `.trim()`. Post fields are tokenized into individual words for matching.

Matching is fuzzy: each word in the query is compared against each word in the post, allowing for small typos. The allowed number of character differences scales with word length, so short words require a closer match than longer ones. This prevents unrelated words from matching just because they share a few characters.
