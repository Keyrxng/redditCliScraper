import * as fs from 'fs'
import path from 'path'
import { RedditStory, RedditSubreddit } from '../types'

export function writeToFile(
    filename: string,
    data: RedditSubreddit[] | RedditStory[]
): void {
    filename = path.resolve(__dirname, `../../data/${filename}.json`)

    if (data === undefined) throw new Error('No data to write')

    const isStory = (data as RedditStory[])[0].title !== undefined

    if (isStory) {
        const sorted = (data as RedditStory[]).sort((a, b) => {
            return b.score - a.score
        })

        fs.writeFile(filename, JSON.stringify(sorted, null, 4), (error) => {
            if (error) {
                throw new Error('An error occurred while writing to file')
            }
        })
    } else {
        const sorted = (data as RedditSubreddit[]).sort((a, b) => {
            return b.subscribersCount - a.subscribersCount
        })

        fs.writeFile(filename, JSON.stringify(sorted, null, 4), (error) => {
            if (error) {
                throw new Error('An error occurred while writing to file')
            }
        })
    }
}
