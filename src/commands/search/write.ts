import { Command, command, metadata, param } from 'clime'
import RedditScraper from '../../classes/classes'
import { validSearchInput, validateInput } from '../../utils/inputValidation'
import { RedditSubreddit } from '../../types'
import { writeToFile } from '../../utils/writeToFile'

const redditScraper = new RedditScraper()

@command({
    brief: 'Search for subreddits',
    skippedArgs: true,
})
export default class extends Command {
    @metadata
    async execute(
        @param({
            required: true,
            description: 'Search query',
        })
        query: string
    ): Promise<RedditSubreddit[]> {
        if (!validateInput(validSearchInput, { query })) {
            throw new Error('Invalid input')
        }
        const results = await redditScraper.searchSubreddits(query)

        if (results.length === 0) {
            throw new Error('No results found')
        }

        writeToFile(`Search-${query}`, results)

        return results
    }
}
