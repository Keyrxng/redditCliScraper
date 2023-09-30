import { Command, command, metadata } from 'clime'

@command({
    description: 'Displays help information about the CLI',
})
export default class extends Command {
    @metadata
    async execute(): Promise<void> {
        const helpText = `
r/Scraped CLI Help:

  USAGE:
    $ r/Scraped <subcommand> [options]

  SUBCOMMANDS:
    search       Searches for subreddits based on a query.
    sort         Fetches stories from a subreddit based on a sort type.
    info         Displays version information.
    help         Displays this help message.

  OPTIONS:
    For detailed options for each command, use:
    $ r/Scraped <subcommand> --help

  EXAMPLES:
    $ r/Scraped search programming
    $ r/Scraped sort programming hot 10
    $ r/Scraped info
    `

        console.log(helpText)
    }
}
