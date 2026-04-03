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

// buildSearchbleText example
const searchableText = buildSearchableText(post);

// searchPosts example
const searchReturnArray = searchPosts(postArray, query);

// matchesQuery example
const firstPost = searchReturnArray[0];
const queryMatches = matchesQuery(firstPost, query);


```
## Edge Cases
## Design Notes
explain key decisions
