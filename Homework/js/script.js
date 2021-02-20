$(document).ready(function() {
    $('.main_btn,.main_btna,a[href="#sheldure"]').on('click', function(){
        console.log('Hello, World!');
        $('.overlay').fadeIn("slow");
        $('.modal').slideDown("slow");
    });

    $('.close').on('click', function() {
        $('.overlay').fadeOut("slow");
        $('.modal').slideUp("slow");
    });
});