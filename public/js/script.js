// for navbar shrinking
$(window).scroll(function() {
  if ($(document).scrollTop() > 20) {
    $('nav').addClass('shrink');
  } else {
    $('nav').removeClass('shrink');
  }
});