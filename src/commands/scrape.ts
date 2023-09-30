import { Command, command, param} from "clime";
import RedditScraper from "../classes/classes";
import { validSubInput, validateInput } from "../utils/inputValidation";

const redditScraper = new RedditScraper();

@command({
  brief: "Scrape a subreddit",
  skippedArgs: true
})
export default class extends Command {
  async execute(
    @param({
      required: true,
      description: "Subreddit name or sort/search command",
    })
    subredditOrCommand: string,
    @param({
      description: "Filter type or subreddit name",
      default: "hot",
    })
    filterOrSubreddit?: string,
    
    @param({
      description: "Number of stories to fetch",
      default: 10, 
    })
    storyCount?: number,
  ): Promise<any> {

    if(!validateInput(validSubInput, { subredditOrCommand, filterOrSubreddit, storyCount })) {
      throw new Error("Invalid input");
    }
    const fOs = filterOrSubreddit ? filterOrSubreddit : "";
    const count = storyCount ? storyCount : 10;

    switch (subredditOrCommand.toLowerCase()) {
      case "search":
        return await redditScraper.searchSubreddits(fOs);
      case "sort":
        return await redditScraper.fetchSubreddits([fOs], subredditOrCommand, count);
      default:
        return await redditScraper.fetchSubreddits([subredditOrCommand], fOs, count);
    }
  }
}