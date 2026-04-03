# Post Search

## Purpose
Search post content.
## Exports
For each:
name
inputs
output
description

**buildSearchableText**
- Input: (`Post`)
- Output: (`string`)
- **Description**: combine searchable fields into one search string

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
# example code
```
## Edge Cases
## Design Notes
explain key decisions
