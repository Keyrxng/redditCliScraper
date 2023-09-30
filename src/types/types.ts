import { Type, Static } from '@sinclair/typebox'

const RedditPost = Type.Object({
    content: Type.String(),
    comments: Type.Array(Type.String()),
})

export type RedditPost = Static<typeof RedditPost>

const RedditStory = Type.Object({
    title: Type.String(),
    url: Type.String(),
    subreddit: Type.String(),
    score: Type.Number(),
    commentsCount: Type.Number(),
    post: RedditPost,
})

export type RedditStory = Static<typeof RedditStory>

const RedditSubreddit = Type.Object({
    name: Type.String(),
    description: Type.String(),
    subscribersCount: Type.Number(),
})

export type RedditSubreddit = Static<typeof RedditSubreddit>
