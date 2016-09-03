$(function() {
    	
	var $win = $(window),
			winWidth = $win.width(),
			winHeight = $win.height();

	console.log(winWidth+","+winHeight);

	$('.menu-icon').click(function(){
		$('nav').toggleClass('open');
	});




	// on resize events 
		$win.resize(function() {
			winWidth = $win.width();
			winHeight = $win.height();

		});
});
