import { Type, Static } from "@sinclair/typebox";

const RedditStory = Type.Object({
  title: Type.String(),
  url: Type.String(),
  subreddit: Type.String(),
  score: Type.Number(),
  commentsCount: Type.Number(),
});

export type RedditStory = Static<typeof RedditStory>;

const RedditSubreddit = Type.Object({
  name: Type.String(),
  description: Type.String(),
  subscribersCount: Type.Number(),
});

export type RedditSubreddit = Static<typeof RedditSubreddit>;