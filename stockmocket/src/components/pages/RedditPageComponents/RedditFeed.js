import FeedItem from "./FeedItem"

const RedditFeed = ({postArray}) => {

    // PostArray Should Be Formatted as follows:
    // PostArray{
    //     link: ("https://www.reddit.com" + post.permalink),
    //     post_domain: post.domain,
    //     post_url: post.url,
    //     title: post.title,
    //     body: post.selftext,
    //     media: post.media,
    //     is_video: post.is_video,
    //     post_hint: post.post_hint,
    //   }


    return(
        <div>
            {postArray.map((post, index) => (
                <FeedItem key = {index} post = {post}/>
            ))}
        </div>

    );

}

export default RedditFeed;