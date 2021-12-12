import React, { useState, useEffect } from 'react';
import RedditFeed from './RedditPageComponents/RedditFeed';
import RedditFeedFilters from './RedditPageComponents/RedditFeedFilters';
import "./RedditPageComponents/RedditPage.css"
const snoowrap = require ("snoowrap")

function RedditPage() {

  const [uAgent, setUAgent] = useState("")
  const [postsArray, setPostsArray] = useState([])

  useEffect (()=>{
    const random_num = generateRandomString()
    console.log("my random string is: ", random_num)
    setUAgent(random_num)
    getTop()
  },[])


  const generateRandomString = function(length=16){
    return Math.random().toString(20).substr(2, length)
  }

  const getNew = async() =>{
    console.log("scope: GetNew")
    const r = new snoowrap({
      userAgent: uAgent,
      clientId: 'gCHVXjyHJ2Cd4UegdeBZfA',
      clientSecret: 'Ocujd7XhNtTHgG4TW3HFrDq8PKi4_Q',
      refreshToken: '1353206505591-fAP1B3k2vHc5d0tuNXv6Wpbl4fq_BA'
    })
  
    const subreddit = await r.getSubreddit('wallstreetbets');
    const NewPosts = await subreddit.getNew({limit: 10});
  
    let data = [];
  
    NewPosts.forEach((post) => {
  
      //console.log(post)
      data.push({
        link: ("https://www.reddit.com" + post.permalink),
        post_domain: post.domain,
        post_url: post.url,
        title: post.title,
        body: post.selftext,
        media: post.media,
        is_video: post.is_video,
        post_hint: post.post_hint,
      })
    });
    
    //console.log(data);
    setPostsArray(data)
  
  }


const getHot = async() =>{
  console.log("scope: GetHot")
  const r = new snoowrap({
    userAgent: uAgent,
    clientId: 'gCHVXjyHJ2Cd4UegdeBZfA',
    clientSecret: 'Ocujd7XhNtTHgG4TW3HFrDq8PKi4_Q',
    refreshToken: '1353206505591-fAP1B3k2vHc5d0tuNXv6Wpbl4fq_BA'
  })

  const subreddit = await r.getSubreddit('wallstreetbets');
  const hotPosts = await subreddit.getHot({limit: 10});

  let data = [];

  hotPosts.forEach((post) => {

    //console.log(post)
    data.push({
      link: ("https://www.reddit.com" + post.permalink),
      post_domain: post.domain,
      post_url: post.url,
      title: post.title,
      body: post.selftext,
      media: post.media,
      is_video: post.is_video,
      post_hint: post.post_hint,
    })
  });
  
  //console.log(data);
  setPostsArray(data)

}


const getTop = async() =>{
  console.log("scope: GetTop")
  const r = new snoowrap({
    userAgent: uAgent,
    clientId: 'gCHVXjyHJ2Cd4UegdeBZfA',
    clientSecret: 'Ocujd7XhNtTHgG4TW3HFrDq8PKi4_Q',
    refreshToken: '1353206505591-fAP1B3k2vHc5d0tuNXv6Wpbl4fq_BA'
  })

  const subreddit = await r.getSubreddit('wallstreetbets');
  const topPosts = await subreddit.getTop({time:"month", limit: 10});

  let data = [];

  topPosts.forEach((post) => {

    //console.log(post)
    data.push({
      link: ("https://www.reddit.com" + post.permalink),
      post_domain: post.domain,
      post_url: post.url,
      title: post.title,
      body: post.selftext,
      media: post.media,
      is_video: post.is_video,
      post_hint: post.post_hint,
    })
  });
  
  //console.log(data);
  setPostsArray(data)

}

const getSearch = async(searchText) =>{
  const r = new snoowrap({
    userAgent: uAgent,
    clientId: 'gCHVXjyHJ2Cd4UegdeBZfA',
    clientSecret: 'Ocujd7XhNtTHgG4TW3HFrDq8PKi4_Q',
    refreshToken: '1353206505591-fAP1B3k2vHc5d0tuNXv6Wpbl4fq_BA'
  })

  const subreddit = await r.getSubreddit('wallstreetbets');
  const topPosts = await subreddit.search({query: searchText, limit: 10});

  let data = [];

  topPosts.forEach((post) => {

    //console.log(post)
    data.push({
      link: ("https://www.reddit.com" + post.permalink),
      post_domain: post.domain,
      post_url: post.url,
      title: post.title,
      body: post.selftext,
      media: post.media,
      is_video: post.is_video,
      post_hint: post.post_hint,
    })
  });
  
  //console.log(data);
  setPostsArray(data)


}



  return (
    <div >
        <RedditFeedFilters OnSearch={getSearch} OnHot={getHot} OnNew={getNew} OnTop={getTop}/>
        <RedditFeed postArray = {postsArray}/>
    </div>
  );
}

export default RedditPage;
