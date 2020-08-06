$(document).ready(function(){
    $('.pop-up').on('click', function(){
        $('#overlay').fadeIn(300); 
        $('.calendar').fadeIn(300); 
        let clickedbutton = $("input",$(this).parent()).attr('id');
        $('.dates').data('type',clickedbutton);
    });
    
    $('table').on('click', function(event){
      let that=$(event.target);
       if(that.is('td') && !that.hasClass('notCurMonth') && !that.hasClass('holiday') && !that.hasClass('curDay')){
           $('td.curDay').toggleClass('curDay');
           that.toggleClass('curDay');
       }
   }); 
   
   $('#add_event').on('click', function(){
       let value= $('td.curDay').html();
       $('#overlay').fadeOut(300);
        $('.calendar').fadeOut(300);
        let id=($('.dates').data()).type;
        $('#' + id).val(value+" May, 2014");
   }); 
   
   $('#search').on('click', function(e){
       $('.booking').addClass('is-sent');
       e.preventDefault();
   });

// When the user scrolls the page, execute myFunction
    window.onscroll = function() {myFunction()};

// Get the navbar
    var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}



$.fn.jQuerySimpleCounter = function( options ) {
  var settings = $.extend({
      start:  0,
      end:    100,
      easing: 'swing',
      duration: 400,
      complete: ''
  }, options );

  var thisElement = $(this);

  $({count: settings.start}).animate({count: settings.end}, {
  duration: settings.duration,
  easing: settings.easing,
  step: function() {
    var mathCount = Math.ceil(this.count);
    thisElement.text(mathCount);
  },
  complete: settings.complete
});
};


$('#number1').jQuerySimpleCounter({end: 12,duration: 3000});
$('#number2').jQuerySimpleCounter({end: 55,duration: 3000});
$('#number3').jQuerySimpleCounter({end: 359,duration: 2000});
$('#number4').jQuerySimpleCounter({end: 246,duration: 2500});



/* AUTHOR LINK */
 $('.about-me-img').hover(function(){
        $('.authorWindowWrapper').stop().fadeIn('fast').find('p').addClass('trans');
    }, function(){
        $('.authorWindowWrapper').stop().fadeOut('fast').find('p').removeClass('trans');
    });
});	
   