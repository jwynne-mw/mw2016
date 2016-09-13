$(function() {
    	
	var $win = $(window),
			$doc = $(document),
			winWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
			$nav = $('nav'),
			currScrollTop=0,
			tempCount,
			tempCurr=1,
			tempPrev,
			tempTop=75,
			isSlower;

  $(this).scrollTop(0);
	setSlideMenu();
	setHomeHero();
	
	$('.input-cont input').val('');

	// start the HH Show
	setTimeout(function(){ 
		$('.hc-copy .perm').addClass('in');
		//setTimeout(slideTemps, 2500);
	}, 500);



	$('.menu-icon').click(function(){
		$('.main-nav').removeClass('notransition');
		$('html').toggleClass('open');
	});

	// Already visible modules
	$(".sq-layout .sq-single").each(function(i, el) {
	  var el = $(el);
	  if (el.visible(true)) {
	    el.addClass("already-visible"); 
	  } 
	});

	$('.hc-copy .temp').each(function(i){
		tempCount = i+1;
		$(this).attr('data-count', tempCount);
	});


	// input add class if has value for label placement
		$('.input-cont input').change(function(){
			var $label = $("label[for='"+$(this).attr('id')+"']");
			if ($(this).val().length != ''){
				$label.addClass('filled-out');
			}else{
				$label.removeClass('filled-out');
			}
		});


	function slideTemps(){
		if(tempCurr<tempCount){

			var slideUpTemp = tempCurr*tempTop;
			$('.temp[data-count="'+tempCurr+'"]').removeClass('show');
			tempCurr=tempCurr+1;
			$('.temp[data-count="'+tempCurr+'"]').addClass('show');
			$('.temp-holder').css('margin-top','-'+slideUpTemp+'px');
			$('.hi-single').removeClass('show');
			$('.hi-single[data-tempword="'+tempCurr+'"]').addClass('show');

			if($('.hi-single[data-tempword="'+tempCurr+'"]').hasClass('show')){
				runShow(5000);
			}else{
				runShow(2500);
			}
			
		}
		
	};

	function runShow(t) {
			setTimeout(slideTemps, t);
	}

   


	function setSlideMenu(){
		var $mn= $('.main-nav');
		$mn.css({'width':winWidth+'px', 'height':winHeight+'px', 'left':winWidth+'px'});
	}

	function setHomeHero(){
		var heroHeight = winHeight - 150;
		if(heroHeight>700 ){
			heroHeight=700;
		}else if(heroHeight<400){
			heroHeight=400;
		}
		$('.hh-cont, .hero-copy-cont, .hi-single').css('height',heroHeight+'px');
	}

	function scrollWords(){
		var scrollTop = 
		$('.temp-holder').css('margin-top')
	}

	// scroll detector and get scrolling position
		$win.scroll(function(event) {
			screenTop = $doc.scrollTop();
			//for main nav 
			if(winWidth<=768 && screenTop >= 75 && currScrollTop < screenTop){
				$nav.addClass('nav-hide');
			}else if( (winWidth<=768 && screenTop < 75) || (winWidth<=768 && currScrollTop > screenTop)){
				$nav.removeClass('nav-hide');
			} else if (winWidth > 768 && screenTop >= 125 && currScrollTop < screenTop){
				$nav.addClass('min-nav');
			} else if ((winWidth > 768 && screenTop < 125) || (winWidth > 768 && currScrollTop > screenTop)){
				$nav.removeClass('min-nav');
			}

			// for sq-up class
			$('.sq-layout .scroll-in').each(function(i, el) {
		    var el = $(el);
		    var elTop = el.offset().top;
		    var elTopReal = elTop - screenTop;
		    if (el.visible(true)) {
		      el.addClass("come-in"); 
		    }else if(elTopReal>winHeight){
		    	el.removeClass("come-in");
		    }
		  });

			currScrollTop = screenTop;
			
		});

	// on resize events 
		$win.resize(function() {
			winWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			$('.main-nav').addClass('notransition');
			setSlideMenu();
			setHomeHero();

		});
});
