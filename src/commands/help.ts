import { Command, command, metadata } from 'clime';

@command({
  description: 'Displays help information about the CLI',
})
export default class extends Command {
  @metadata
  async execute(): Promise<void> {
    const helpText = `
RedditScraper CLI Help:

  USAGE:
    $ RedditScraperCLI <subcommand> [options]

  SUBCOMMANDS:
    fetch        Fetches stories from specified subreddits.
    info         Fetches information about a subreddit.
    search       Searches for subreddits based on a query.
    sort         Fetches stories from a subreddit based on a sort type.

  OPTIONS:
    For detailed options for each command, use:
    $ RedditScraperCLI <subcommand> --help

  EXAMPLES:
    $ RedditScraperCLI fetch programming,top --hot 10
    $ RedditScraperCLI info programming
    $ RedditScraperCLI search "science"
    $ RedditScraperCLI sort memes new 10

For more information, visit [documentation link or GitHub repository].
    `;

    console.log(helpText);
  }
}