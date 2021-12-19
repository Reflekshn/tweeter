$(document).ready(function() {
  $('.new-tweet-text').on("input", function() {
    const length = $(this).val().length;

    $('.tweet-char-counter').html(140 - length);

    if (length >= 140) {
      $('.tweet-char-counter').css('color', 'red');
    } else
      $('.tweet-char-counter').css('color', 'black');
  });
});