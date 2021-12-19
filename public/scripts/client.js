/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

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
        <p id="new-tweet-text">
        ${escape(tweet.content.text)}
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

  // Protect against XSS
  const escape = function(string) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(string));
    return div.innerHTML;
  };

  // Iterate through the tweets data object and add them to the .tweet-container class
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-outer-container').prepend($tweet);
    }
  };

  // Load tweets from the initial-tweets.JSON file
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweetData) => {
        renderTweets(tweetData);
      },
      error: (error) => {
        console.error(error);
      }
    });
  };

  // Call the function
  loadTweets();

  // Intercept default form submission action and implement our own logic
  const formSubmission = function(event) {
    event.preventDefault();

    const userInput = $("#new-tweet-text").val();

    //Form Validation
    if (!userInput) {
      $(".error").text("Tweet is empty. Please enter some text.").slideDown().delay(2500).hide(500);
      return null;
    }
    if (userInput.length > 140) {
      $(".error").text("You are over the text limit. Please edit your tweet.").slideDown().delay(2500).hide(500);
      return null;
    }

    const serializedInput = $("#new-tweet-text").serialize();

    //Update and post new tweet
    $.post("/tweets", serializedInput)
      .then(() => {
        console.log(serializedInput);
        $("#new-tweet-text").val('');
        $(".tweet-char-counter").val(140);
        loadTweets();
      })

  }
  $('.tweet-form').submit(formSubmission);
});

