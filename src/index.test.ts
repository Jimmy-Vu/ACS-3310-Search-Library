import { buildSearchableText, matchesQuery, searchPosts } from './index'
import type { Post } from './index'

const makePost = (overrides: Partial<Post> = {}): Post => ({
  id: '1',
  title: 'Hello World',
  body: 'This is a test post about dogs',
  author: 'Jane Doe',
  tags: ['animals', 'pets'],
  category: 'nature',
  status: 'published',
  createdAt: '2026-01-01',
  updatedAt: '2026-01-01',
  ...overrides,
})

describe('buildSearchableText', () => {
  it('combines title, body, author, tags, and category into one string', () => {
    const post = makePost()
    const text = buildSearchableText(post)
    expect(text).toContain('hello world')
    expect(text).toContain('dogs')
    expect(text).toContain('jane doe')
    expect(text).toContain('animals')
    expect(text).toContain('pets')
    expect(text).toContain('nature')
  })

  it('returns a lowercase string', () => {
    const post = makePost({ title: 'UPPERCASE TITLE' })
    expect(buildSearchableText(post)).not.toMatch(/[A-Z]/)
  })

  it('handles tags as an array', () => {
    const post = makePost({ tags: ['foo', 'bar'] })
    const text = buildSearchableText(post)
    expect(text).toContain('foo')
    expect(text).toContain('bar')
  })
})

describe('matchesQuery', () => {
  it('returns true for an exact match', () => {
    const post = makePost()
    expect(matchesQuery(post, 'dogs')).toBe(true)
  })

  it('is case-insensitive', () => {
    const post = makePost()
    expect(matchesQuery(post, 'DOGS')).toBe(true)
  })

  it('returns true for a partial word match', () => {
    const post = makePost()
    expect(matchesQuery(post, 'dog')).toBe(true)
  })

  it('returns false for a non-matching query', () => {
    const post = makePost()
    expect(matchesQuery(post, 'javascript')).toBe(false)
  })

  it('returns true for an empty query', () => {
    const post = makePost()
    expect(matchesQuery(post, '')).toBe(true)
  })

  it('matches across multiple query tokens (all must match)', () => {
    const post = makePost()
    expect(matchesQuery(post, 'dogs jane')).toBe(true)
    expect(matchesQuery(post, 'dogs javascript')).toBe(false)
  })
})

describe('searchPosts', () => {
  const posts = [
    makePost({ id: '1', title: 'Dogs are great', body: 'I love dogs' }),
    makePost({ id: '2', title: 'Cats rule', body: 'Cats are independent' }),
    makePost({ id: '3', title: 'Pet care tips', body: 'Feed your pets daily' }),
  ]

  it('returns only matching posts', () => {
    const results = searchPosts(posts, 'dogs')
    expect(results).toHaveLength(1)
    expect(results[0]?.id).toBe('1')
  })

  it('returns all posts for an empty query', () => {
    expect(searchPosts(posts, '')).toHaveLength(3)
  })

  it('returns an empty array when nothing matches', () => {
    expect(searchPosts(posts, 'javascript')).toHaveLength(0)
  })

  it('ignores malformed items in the array', () => {
    const mixed = [...posts, null, undefined, { id: '99' }] as Post[]
    const results = searchPosts(mixed, 'dogs')
    expect(results).toHaveLength(1)
    expect(results[0]?.id).toBe('1')
  })

  it('is case-insensitive', () => {
    expect(searchPosts(posts, 'CATS')).toHaveLength(1)
  })
})
