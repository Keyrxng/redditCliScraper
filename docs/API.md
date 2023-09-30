# Reddit Scraper CLI Documentation

This document provides an overview of the Reddit Scraper CLI, its commands and how to use them.

## Authentication
Before using the scraper, you need to authenticate using your Reddit credentials. The CLI will check for environment variables for your username, password, client ID, and client secret. If not found, it will prompt you to input these details.

## Commands

### 1. Fetching Stories from a Subreddit

Command Syntax: `scraper <subreddit name> <filter type> <story count>`

- `<subreddit name>`: Name of the subreddit you want to scrape.
- `<filter type>`: The type of filter to apply. Options include "hot", "new", "rising", "controversial", and "top". Default is "hot" if not provided.
- `<story count>`: The number of stories to fetch. Default is 10 if not provided.

Example: `scraper programming hot 20` - This will fetch 20 hot stories from the `programming` subreddit.

### 2. Searching Subreddits

Command Syntax: `scraper search <query>`

- `<query>`: The search query to find subreddits.

Example: `scraper search horror` - This will search for subreddits related to horror.

### 3. Sorting Subreddits

Command Syntax: `scraper sort <sort type> <subreddit name> <story count>`

- `<sort type>`: The type of sort to apply. Options include "popular", "new", "gold", and "default".
- `<subreddit name>`: Name of the subreddit you want to scrape.
- `<story count>`: The number of stories to fetch. Default is 10 if not provided.

Example: `scraper sort popular memes 15` - This will fetch 15 popular stories from the `memes` subreddit.

## Error Handling
The CLI includes input validation to ensure the correctness of the provided arguments. If an invalid input is detected, an error message will be displayed, indicating what went wrong.

## Output
The output of each command will be displayed in the console. Additionally, the fetched stories and subreddit information can be written to text files for further analysis.