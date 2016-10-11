$(function() {
    	
	var $win = $(window),
			$doc = $(document),
			docHeight = $doc.height(),
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
	runSlideShow();

	setTimeout(function(){ 
		$('#scroll-arrow').addClass('on');
	}, 700);

	$('.input-cont input').val('');

	$('.menu-icon').click(function(){
		$('.main-nav').removeClass('notransition');

		$('html').toggleClass('open');
		if ($('html').hasClass('open')){
			$('.nav-back').css('height', winHeight+'px');
		}else{
			//backOffNav();
		}
	});

	$('#scroll-arrow').click(function(){

		if($(this).hasClass('down')){
			var firstEl = ($(".sweet-spot").offset().top)-50;
			$('html, body').animate({
			    scrollTop: firstEl
			}, 500);
		}else{
			$('html, body').animate({
			    scrollTop: $("body").offset().top
			}, 1200);
		}
	});

	function backOffNav(){
		setTimeout(function(){ 
			$('.nav-back').attr('style','');
			$('nav').removeClass('no-color');
		},500);
	}

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


	function runSlideShow(){
		//reset temp class to repeat slideshow
		$('.temp').removeClass('out');

		if(tempCurr==0){
			$('.hc-copy .perm').addClass('in');
			runShow(1000);
		}else if(tempCurr!=0 && tempCurr<=tempCount){

			$('.temp[data-count="'+tempPrev+'"]').removeClass('in').addClass('out');
			$('.temp[data-count="'+tempCurr+'"]').addClass('in');
			$('.hi-single, .hc-links, .hc-links a').removeClass('in');
			$('.hi-single[data-img="'+tempCurr+'"]').addClass('in');
			$('.hc-links a[data-link="'+tempCurr+'"]').parent('.hc-links').addClass('in');
			$('.hc-links a[data-link="'+tempCurr+'"]').addClass('in');

			if($('.hi-single[data-img="'+tempCurr+'"]').hasClass('in')){
				runShow(3500);
				barMove(3500);
				$('#progress-bar').addClass('on');
			}else{
				runShow(1250);
				$("#bar").css('width', '0%');
				$('#progress-bar').removeClass('on');
				// barMove(2500);
			}

		}else if(tempCurr>tempCount){
			$('.perm').removeClass('in').addClass('out');
			$('.temp[data-count="'+tempPrev+'"]').removeClass('in').addClass('out');
			resetShow();
		}
	}

	function runShow(t) {
		tempPrev = tempCurr;
		tempCurr = tempCurr+1;
		setTimeout(runSlideShow, t);
	}

	function resetShow(){
		tempCurr=0;
		tempPrev=0;
		setTimeout(function(){ 
			$('.perm').removeClass('out');
			setTimeout(runSlideShow, 1000);
		}, 500);	
	}

	function barMove(time) {
		var $bar = $("#bar"); 
		var barTime = time;
		var width = 1;
		var barPer = 0;
		var intTime = barTime/100;
		$bar.css('width',barPer+'%');
		var id = setInterval(frame, intTime);
	    function frame() {
	        if (width >= 100) {
	          clearInterval(id);
	        } else {
	            width++; 
	            barPer = barTime/width;
	            $bar.css('width',width+'%'); 
	        }
	    }
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
		if(winWidth>=768){
			$('.hh-cont, .hero-copy-cont, .hi-single').css('height',heroHeight+'px');
		}else{
			$('.hero-copy-cont, .hi-single').css('height','400px');
			$('.hh-cont').css('height','600px');
		}
	}


	// scroll detector and get scrolling position
		$win.scroll(function(event) {
			var screenTop = $doc.scrollTop();
			var screenBottom = winHeight+screenTop;
			var topPercent = parseInt((screenTop/docHeight)*100);
			var btmPercent = parseInt((screenBottom/docHeight)*100);
			var csTopHeight = $('#cs-top').outerHeight();
			csTopHeight = parseInt((csTopHeight*.7));
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

			//fade out nav background at top of screen 
			if(screenTop < 250){
				$('nav').addClass('no-color');
			}else{
				$('nav').removeClass('no-color');
			}

			// for sq-up class
			$('.scroll-in').each(function(i, el) {
		    var el = $(el);
		    var elTop = el.offset().top;
		    var elTopReal = elTop - screenTop;
		    if (el.visible(true)) {
		      el.addClass("come-in"); 
		    }else if(elTopReal>winHeight){
		    	el.removeClass("come-in");
		    }
		  });

		  if(btmPercent>80){
		  	$('#scroll-arrow').removeClass('down').addClass('on');
		  }else if (topPercent<10) {
		  	$('#scroll-arrow').addClass('down').addClass('on');
		  }else {
		  	$('#scroll-arrow').removeClass('on');
		  }

		  if($("#case-study").length > 0 && screenTop>=csTopHeight){
		  	$('nav').removeClass('logo-white');
		  }else if($("#case-study").length > 0 && screenTop<csTopHeight){
		  	$('nav').addClass('logo-white');
		  }





		 
			currScrollTop = screenTop;
			
		});

	// on resize events 
		$win.resize(function() {
			winWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			$('.main-nav').addClass('notransition');
			$nav.removeClass('min-nav nav-hide');
			setSlideMenu();
			setHomeHero();

		});
});
