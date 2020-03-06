$("path, circle, .territory").hover(function(e) {
  $('.votes-hover').css('display','block');
  $('.votes-hover').html($(this).data('info'));
});

$("path, circle, .territory").mouseleave(function(e) {
  $('.votes-hover').css('display','none');
});

$(document).mousemove(function(e) {

  var width = $(window).width();

  var top = e.pageY-$('.votes-hover').height()/2 - 10;
  if(top < 0) top = 0;

  if(e.pageX > width / 2){
    var left = e.pageX-($('.votes-hover').width())-60;
  } else{
    var left = e.pageX + 30
  }

  $('.votes-hover').css('top', top);
  $('.votes-hover').css('left', left);

}).mouseover();

// var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
// if(ios) {
//   $('a').on('click touchend', function() {
//     var link = $(this).attr('href');
//     window.open(link,'_blank');
//     return false;
//   });
// }

$('#TX').click(function(){
    candidates[3].delegates += 550;
    var width = (candidates[3].delegates / needed * 100).toFixed(2) + '%';
    $('.c4').animate({
        'width': width
    }, 750)
})