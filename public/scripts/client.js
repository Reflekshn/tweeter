/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {

  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
    console.log(tweets.length);
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
    }
  };

  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <article class="tweet-container">
      <header class="tweet-header">
        <div class="tweet-icon-and-name">
          <img src="${tweet.user.avatars}">
          <span>${tweet.user.name}</span>
        </div>
        <p class="tweeter-handle">${tweet.user.handle}</p>
      </header>
      <p class="tweet-text">
      ${tweet.content.text}
      </p>
      <hr size="5" width="95%" color="black">
      <footer class="tweet-footer">
        <p class="tweet-timestamp">${timeago.format(tweet.created_at)}</p>
        <div class="tweet-footer-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`
    );
    return $tweet;
  }
  renderTweets(tweetData);
});

