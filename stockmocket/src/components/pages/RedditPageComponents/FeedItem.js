import "./RedditPage.css"
const FeedItem = ({post}) =>{
    
    //console.log(post.link)
    //Each post should be formatted as follows:
    // Post{
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
        <div className = "itemcontainer">
            <a href = {post.link} style={{textAlign:"left"}}> Link To Post </a>
            <h1 style={{textAlign:"left"}}> {post.title} </h1>
            <p>{post.body}</p>
            {post.post_hint === "image" && 
            <div className="redditimage">
            <img src={post.post_url} width="500" height ="500" alt=""/> 
            </div>}
            {post.is_video && 
            <video id="video_player" src={post.media.reddit_video.fallback_url} width="500" height ="500" controls />

             }
        </div>
    )
}

export default FeedItem