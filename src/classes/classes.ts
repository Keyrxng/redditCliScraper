import axios, { AxiosResponse } from 'axios'
import { RedditPost, RedditStory, RedditSubreddit } from '../types'
import { validAuthInput, validateInput } from '../utils/inputValidation'

class RedditScraper {
    private username?: string
    private password?: string
    // private subreddits: string[] = [];
    // private sortType?: string;
    // private storiesCount?: number;

    constructor() {}

    async authenticate(username: string, password: string): Promise<boolean> {
        this.username = username
        this.password = password

        if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
            throw new Error(
                'Missing CLIENT_ID or CLIENT_SECRET environment variable'
            )
        }

        if (!this.username || !this.password) {
            throw new Error('Missing username or password')
        }

        if (
            !validateInput(validAuthInput, {
                username: this.username,
                password: this.password,
            })
        ) {
            throw new Error('Invalid username or password')
        }

        const response: AxiosResponse = await axios.post(
            'https://www.reddit.com/api/v1/access_token',
            {
                grant_type: 'password',
                username: this.username,
                password: this.password,
            },
            {
                auth: {
                    username: process.env.CLIENT_ID,
                    password: process.env.CLIENT_SECRET,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )

        if (response.status === 200) {
            return true
        } else {
            return false
        }
    }

    async fetchSubredditInfo(
        subreddit: string
    ): Promise<RedditSubreddit | undefined> {
        const response: AxiosResponse = await axios.get(
            `https://www.reddit.com/r/${subreddit}/about.json`
        )

        const subredditInfo: RedditSubreddit = {
            name: response.data.data.display_name,
            description: response.data.data.public_description,
            subscribersCount: response.data.data.subscribers,
        }
        return subredditInfo
    }

    async searchSubreddits(query: string): Promise<RedditSubreddit[]> {
        const response: AxiosResponse = await axios.get(
            `https://www.reddit.com/subreddits/search.json`,
            {
                params: { q: query },
            }
        )

        const subreddits: RedditSubreddit[] = []

        response.data.data.children.forEach(
            (child: {
                data: {
                    display_name: string
                    public_description: string
                    subscribers: number
                }
            }) => {
                const subreddit: RedditSubreddit = {
                    name: child.data.display_name,
                    description: child.data.public_description,
                    subscribersCount: child.data.subscribers,
                }
                subreddits.push(subreddit)
            }
        )

        return subreddits
    }

    async fetchSubreddits(
        subreddits: string[],
        sortType: string,
        storiesCount: number
    ): Promise<RedditStory[]> {
        const stories: RedditStory[] = []
        for (const subreddit of subreddits) {
            const response: AxiosResponse = await axios.get(
                `https://www.reddit.com/r/${subreddit}/${sortType}.json?sort=${sortType}`,
                {
                    params: { limit: storiesCount },
                }
            )

            console.log('====================================')
            console.log(response.data.data.children[0].data)
            console.log('====================================')
            console.log(response.data.data)
            console.log('====================================')
            console.log(response.data)
            console.log('====================================')

            response.data.data.children.forEach(
                (child: {
                    data: {
                        selftext: string
                        num_comments: number
                        comments: string[]
                        title: string
                        url: string
                        subreddit: string
                        score: number
                    }
                }) => {
                    const post: RedditPost = {
                        content: child.data.selftext,
                        comments: child.data.comments,
                    }

                    const story: RedditStory = {
                        title: child.data.title,
                        url: child.data.url,
                        subreddit: child.data.subreddit,
                        score: child.data.score,
                        commentsCount: child.data.num_comments,
                        post: post,
                    }
                    stories.push(story)
                }
            )
        }
        return stories
    }
}

export default RedditScraper
