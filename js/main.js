$(function() {
    	
	var $win = $(window),
			$doc = $(document),
			winWidth = $win.width(),
			winHeight = $win.height(),
			$nav = $('nav'),
			currScrollTop=0;

	console.log(winWidth+","+winHeight);

	setSlideMenu();


	$('.menu-icon').click(function(){
		$('.main-nav').removeClass('notransition');
		$('html').toggleClass('open');
	});



	function setSlideMenu(){
		var $mn= $('.main-nav');
		$mn.css({'width':winWidth+'px', 'height':winHeight+'px', 'left':winWidth+'px'});

	}

	// scroll detector and get scrolling position
		$win.scroll(function() {
			screenTop = $doc.scrollTop();
			if(winWidth<=768 && screenTop >= 75 && currScrollTop < screenTop){
				$nav.addClass('nav-hide');
			}else if( (winWidth<=768 && screenTop < 75) || (winWidth<=768 && currScrollTop > screenTop)){
				$nav.removeClass('nav-hide');
			} else if (winWidth > 768 && screenTop >= 125){
				$nav.addClass('min-nav');
			} else if (winWidth > 768 && screenTop < 125){
				$nav.removeClass('min-nav');
			}

			currScrollTop = screenTop;
			
		});

	// on resize events 
		$win.resize(function() {
			winWidth = $win.width();
			winHeight = $win.height();
			$('.main-nav').addClass('notransition');
			setSlideMenu();

		});
});
