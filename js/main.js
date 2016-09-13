$(function() {
    	
	var $win = $(window),
			$doc = $(document),
			winWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
			$nav = $('nav'),
			currScrollTop=0,
			tempCount,
			tempCurr=0,
			tempPrev=0,
			tempTop=75,
			isSlower;

  $(this).scrollTop(0);
	setSlideMenu();
	setHomeHero();
	
	$('.input-cont input').val('');

	// start the HH Show
	setTimeout(function(){ 
		$('.hc-copy .perm').addClass('in');
		setTimeout(slideTemps, 2500);
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
		console.log(tempCurr);
		$('.temp').removeClass('out');
		if(tempCurr<tempCount){
			$('.temp[data-count="'+tempCurr+'"]').removeClass('in');
			tempPrev = tempCurr;
			tempCurr = tempCurr+1;
			$('.temp[data-count="'+tempPrev+'"]').addClass('out');
			$('.temp[data-count="'+tempCurr+'"]').addClass('in');
			$('.hi-single').removeClass('in');
			$('.hc-links, .hc-links a').removeClass('in');
			$('.hi-single[data-img="'+tempCurr+'"]').addClass('in');
			$('.hc-links a[data-link="'+tempCurr+'"]').parent('.hc-links').addClass('in');
			$('.hc-links a[data-link="'+tempCurr+'"]').addClass('in');


			if($('.hi-single[data-img="'+tempCurr+'"]').hasClass('in')){
				runShow(5000);
			}else{
				runShow(2500);
			}
			
		}else{
			$('.temp[data-count="'+tempCurr+'"]').removeClass('in').addClass('out');
			resetShow();
		}
		
	};

	function runShow(t) {
			setTimeout(slideTemps, t);
	}

	function resetShow(){
		tempCurr=0;
		tempPrev=0;
		setTimeout(slideTemps, 1500);
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
