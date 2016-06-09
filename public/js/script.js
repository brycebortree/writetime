// for navbar shrinking
$(window).scroll(function() {
  if ($(document).scrollTop() > 25) {
    $('nav').addClass('shrink');
  } else {
    $('nav').removeClass('shrink');
  }
});