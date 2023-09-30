import { Command, command, metadata, param } from 'clime'
import RedditScraper from '../../classes/classes'
import { validSortInput, validateInput } from '../../utils/inputValidation'
import { RedditStory } from '../../types'

const redditScraper = new RedditScraper()

@command({
    brief: 'Sort posts from a subreddit',
    skippedArgs: true,
})
export default class extends Command {
    @metadata
    async execute(
        @param({
            required: true,
            description: 'Subreddit name',
        })
        subreddit: string,

        @param({
            required: true,
            description: 'Sort type (hot, new, top, controversial)',
        })
        sortType: string,

        @param({
            description: 'Number of stories to fetch',
            default: 10,
        })
        storyCount: number
    ): Promise<RedditStory[]> {
        if (
            !validateInput(validSortInput, { subreddit, sortType, storyCount })
        ) {
            throw new Error('Invalid input')
        }
        const count = storyCount ? storyCount : 10
        const results = await redditScraper.fetchSubreddits(
            [subreddit],
            sortType,
            count
        )

        if (results.length === 0) {
            throw new Error('No results found')
        }

        return results
    }
}
