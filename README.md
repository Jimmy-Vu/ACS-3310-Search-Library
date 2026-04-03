# Post Search

## Purpose
Search post content.
## Exports

**buildSearchableText**
- **Input**: (`Post`)
- **Description**: combine searchable fields into one search string
- **Output**: (`string`)

**matchesQuery**
- **Input**: (`Post`, `query string`)
- **Output**: (`boolean`)
- **Description**: return whether the post matches the search query

**searchPosts**
- **Input**: (an array of `Post` objects, `query string`)
- **Output**: (an array of `Post` objects)
- **Description**: return only matching posts

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
Search is case-insensitive and whitespace normalized via . Post fields are tokenized into individual words for matching.

Levenshtein distance is applied between query tokens and post tokens, not against the full concatenated post text. A maximum edit distance threshold is enforced based on token length to prevent overly permissive matches.
