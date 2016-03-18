$( document ).ready(function() {
  // Initialize height of the first view
  var window_height = $(window).height();
  $(".firstview").height(window_height);
  
  // Initialize position of search bloc
  var window_width = $(window).width();
  $(".search").css('top', (window_height - $(".search").height()) / 2);
  $(".search").css('left', (window_width - $(".search").width()) / 2);
  
  // Resize height of the first view when the window is resize
  $(window).resize(function() {
    var window_height = $(window).height();
    var window_width = $(window).width();
    $(".firstview").height(window_height);
    $(".search").css('top', (window_height - $(".search").height()) / 2);
    $(".search").css('left', (window_width - $(".search").width()) / 2);
  });
  
  // Add or remove large class on header according to the scroll
  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();    
    if(scroll == 0) {
      $("header").removeClass("band");
    }
    else {
      $("header").addClass("band");
    }
  });
  
  // Go to second view using #gonext
  $("#gonext").click(function() {
    $(document).scrollTop($(".secondview").offset().top); 
  });
});