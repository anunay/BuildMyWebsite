var dmcc = {

	animateTO: null,

	tiles : null,

	count: {
		desktop: 0,
		tablet: 0,
		mobile: 0
	},

	init: function(){
		this.primaryNavClick();
		this.sliderNavigation();
		this.readmoreHover();
		this.masonryGrid();
		this.removeGrid();
		this.stickyScroll();
		this.IESecondaryMenu();
		this.commoditiesClick();
		this.tabletSecondaryMenu();
		this.vacancyHover();
		this.settingClick();
		this.getHomeTiles();
		this.showMoreHomeNews();
		this.showDesktopSearch();
		this.mobileSearchClick();
		this.getNewsTiles();
		this.showMoreNews();
		this.locationMap();
		this.showRecaptcha();
		//this.initializeTooltip();
		//this.createTooltip();
		this.notification();
		this.login();
		this.mobileLogin();
		this.showNextMenu();
		this.onResize();

	},

	onResize: function(){
		$(window).resize(function(){
			dmcc.stickyScroll();
			dmcc.masonryGrid();
			dmcc.getHomeTiles();
			dmcc.getNewsTiles();
		});
	},

	primaryNavClick: function(){
		$('.primary-nav	.top-bar-section ul > li > a').click(function(){

			//clear all active state
			$('.primary-nav	.top-bar-section > ul > li').each(function(){
					if($(this).children('a').hasClass('active')) $(this).children('a').removeClass('active');
			});


			if(!$(this).hasClass('search')){
				//hide desktop search
				dmcc.hideDesktopSearch();
			}

			if($(this).hasClass('.active')){
				$(this).removeClass('active');
			}else{
				$(this).addClass('active');
			}
		});
	},

	sliderNavigation: function(){
		$('.orbit-nav a.orbit-prev-custom').on('click', function() {
		    $('.orbit-prev span').trigger('click');
		    return false;
		});

		$('.orbit-nav a.orbit-next-custom').on('click', function() {
		    $('.orbit-next span').trigger('click');
		    return false;
		});
	},

	IESecondaryMenu: function(){

		if($('html').hasClass('lt-ie9')){
			$('.secondary-menu .top-bar-section > ul > li.has-dropdown').click(function(){
				$(this).toggleClass('hover');
			});
		}
	},

	tabletSecondaryMenu: function(){
		$('.tablet-secondary-nav .top-bar-section > ul > li.has-dropdown > a').click(function(e){

			e.preventDefault();

			$(this).toggleClass('expanded');

			if($(this).hasClass('expanded')){
				$(this).siblings('.dropdown').css({'visibility':'visible'});
			}else{
				$(this).siblings().css({'visibility':'hidden'});
			}


		});
	},

	readmoreHover: function(){
		$('body').on('mouseenter','.hoverable', function(){

			$(this).toggleClass('hovered');

			if($(this).hasClass('hovered')){
				$(this).children('.hover-link').animate({
					bottom:'0px'
				},100);

				$(this).children('.content').animate({
					'padding-bottom':'35px'
				},100);

			}

		}).on('mouseleave','.hoverable', function(){

			var _self = $(this);

			if($(this).hasClass('hovered')){
				$(this).children('.hover-link').animate({
					bottom:'-40px'
				},100, function(){
					_self.removeClass('hovered');
				});

				$(this).children('.content').animate({
					'padding-bottom':'5px'
				},100);
			}
		});
	},

	commoditiesClick: function(){
		$('.secondary-menu .top-bar-section ul li.has-dropdown a').click(function(e){
			e.preventDefault();

			$(this).toggleClass('clicked');

			if($(this).hasClass('clicked')){
				$('.secondary-menu').addClass('clicked');
			}else{
				$('.secondary-menu').removeClass('clicked');
			}
		});
	},

	masonryGrid: function(isLoadMore){

		//if($('#main-content').length){
			var $container = $('#main-content'),
				windowWidth = $(window).width();

			if(isLoadMore == undefined && windowWidth < 940){
				$container.masonry({
					columnWidth:10,
					itemSelector: '.box:not(.hidden-grid)',
		        	isAnimated: !Modernizr.csstransitions,
		        	isFitWidth: true
				});

				//data filter
				$container.filteredMasonry({
					itemSelector: '.box',
					filtersGroupSelector: '.filter'
				});


			}else{
				$container.masonry('destroy').masonry();
				$container.masonry({
					columnWidth:10,
					itemSelector: '.box',
		        	isAnimated: !Modernizr.csstransitions,
		        	isFitWidth: true
				});

				//data filter
				$container.filteredMasonry({
					itemSelector: '.box',
					filtersGroupSelector: '.filter'
				});

				$container.masonry('reloadItems');
			}


		//}

	},

	removeGrid: function(){
		if($('#main-content').length){

			var $container = $('#main-content');

			$('body').on('click','span.remove', function(){

				var element = $(this).parent('.box');

				element.fadeOut(500, function(){
					$container.masonry('remove', element);
					$container.masonry('reload');
				});

			});
		}
	},

	stickyScroll: function(){

		if($('#sticky-social').length){
			var targetTop = $('#sticky-social'),
				upperLimit = $('#main-content, #main-content-news, .about, .contact-desc');

			setTimeout(function(){
				targetTop.stop(true, true).animate({
					top: (upperLimit.offset().top + 5 ) + 'px'
				},{duration:1000, queue: false});
			},1000);

			$(window).scroll(function(){
				var wScroll = $(window).scrollTop();
				if(wScroll > upperLimit.offset().top){
					targetTop.css({
						top: '10px',
						position: 'fixed'
					});
				}else{
					targetTop.stop(true, true).css({'position':'absolute','top':(upperLimit.offset().top + 5) + 'px'});
				}
			});
		}

	},

	vacancyHover: function(){
		if($('.vacancy').length){
			$('.vacancy ul li').mouseenter(function(){
				$(this).children('.block-content').animate({
					bottom:'40px'
				},100);
				$(this).children('.hover-link').animate({
					bottom:'40px'
				},100);


			}).mouseleave(function(){
				$(this).children('.block-content').animate({
					bottom:'0'
				},100);
				$(this).children('.hover-link').animate({
					bottom:'0'
				},100);
			});
		}
	},

	settingClick: function(){
		$('nav.top-bar ul li.settings > a').click(function(e){

			e.preventDefault();

			$(this).parent('.settings').toggleClass('clicked');
		});
	},

	showDesktopSearch: function(){
		$('.primary-nav .top-bar-section ul > li.desktop-search a').click(function(e){

			e.preventDefault();

			var wiWidth = $(window).width();

			$(this).toggleClass('showed').parent('li.desktop-search').toggleClass('search-open');

			if($(this).hasClass('showed')){

				$(this).siblings('form').children(':text').val("");

				if((wiWidth + 17) >= 1280){
					$(this).siblings('form').css({'margin-right':'10px','display':'inline'}).children(':text').css({
						'height': '2em',
						'padding': '0 10px',
						'border': 'solid 1px #ccc'
					});

					$(this).siblings('form').animate({
						'width':'230px'
					},300);

				}

			}else{
				dmcc.hideDesktopSearch();
			}

		});
	},

	hideDesktopSearch: function(){

		var search = $('.primary-nav .top-bar-section ul > li.desktop-search');

		$(search).children('form').css({'margin-right':'0px'}).children(':text').css({
			'padding': '0',
			'border': 'none',
			'height': '0px'
		});

		$(search).children('form').animate({
			'width':'0'
		},300, function(){
			$(this).css('display','none');
		});

		$(search).children('a.showed').removeClass('showed');
		$(search).removeClass('search-open');

	},

	mobileSearchClick: function(){
		$('.mobile-primary-nav ul.title-area li.mobile-search a.search').click(function(e){
			e.preventDefault();

			$('.mobile-primary-nav').removeClass('expanded');

			$(this).toggleClass('active').parent('.mobile-search').toggleClass('search-open');

			if($(this).hasClass('active')){
				$('.mobile-primary-nav').css({
					'overflow':'visible'
				});
			}else{
				$('.mobile-primary-nav').css({
					'overflow':'hidden'
				});
			}

		});
	},

	getHomeTiles: function(){
		if($('body.home').length){

			var windowsWidth = $(window).width() + 17;
			var $container = $('#main-content');

			if(windowsWidth >= 1280){

				var a = $('#main-content').find('.box');

				$(a[a.length-1]).remove();
				$(a[a.length-1]).addClass('last');

				dmcc.reinitNewsTiles('#main-content', '.box');

			}else if(windowsWidth >= 1024){

				var a = $('#main-content').find('.box');

				$(a[a.length-2]).addClass('last');

				dmcc.reinitNewsTiles('#main-content', '.box');

			}else if(windowsWidth > 767 && windowsWidth < 1025){

				var curr = $($container).find('.box:lt(10)').clone();

				$(curr[curr.length-1]).addClass('last');

				$container.empty().append(curr);

				dmcc.reinitNewsTiles('#main-content', '.box');

			}else{
				var curr = $($container).find('.box:lt(6)').clone();

				$(curr[curr.length-1]).addClass('last');

				$container.empty().append(curr);

				dmcc.reinitNewsTiles('#main-content', '.box');
			}
		}
	},

	showMoreHomeNews: function(){
		if($('body.home').length){

			dmcc.tiles = $('#main-content').find('.box');

			$('a.show-more-tiles-home').click(function(e){
				e.preventDefault();

				var a = $('#main-content').find('.box');

				var windowsWidth = $(window).width() + 17;
				var $container = $('#main-content');

				if(windowsWidth >= 1024){

					dmcc.count.desktop++;
					var curr = $(a).clone();

					$(curr[curr.length-1]).addClass('last-'+dmcc.count.desktop);

					$($container).append(curr);


					setTimeout(function(){
						var top = $('#main-content .last-'+dmcc.count.desktop).offset().top;

						$('html,body').animate({
							'scrollTop': (top/2) +'px'
						},800);

					},1000);




				}else if(windowsWidth > 767 && windowsWidth < 1025){

					dmcc.count.tablet++;

					var curr = $(a).clone();

					$(curr[curr.length-1]).addClass('last-'+dmcc.count.tablet);

					$($container).append(curr);


					setTimeout(function(){
						var top = $('#main-content .last-'+dmcc.count.tablet).offset().top,
							b = $(document).height() - top;

						$('html,body').animate({
							'scrollTop': (top/2) +'px'
						},800);

					},1000);


				}else{
					dmcc.count.mobile++;
					var curr = $(a).clone();

					$(curr[curr.length-1]).addClass('last-'+dmcc.count.mobile);

					$($container).append(curr);


					setTimeout(function(){
						var top = $('#main-content .last-'+dmcc.count.mobile).offset().top;

						$('html,body').animate({
							'scrollTop': (top/2) +'px'
						},800);

					},1000);
				}

				dmcc.reinitNewsTiles('#main-content','.box');


			});

		}
	},

	getNewsTiles: function(){
		if($('body.news').length){

			var windowsWidth = $(window).width() + 17;
			var $container = $('#main-content-news');

			if(windowsWidth >= 1280){

				var a = $('#main-content-news').find('.box');

				$(a[a.length-1]).remove();
				$(a[a.length-1]).addClass('last');

				dmcc.reinitNewsTiles('#main-content-news', '.box');

			}else if(windowsWidth >= 1024 && windowsWidth < 1280){

				var a = $('#main-content-news').find('.box');
				$(a[a.length-1]).addClass('last');

				dmcc.reinitNewsTiles('#main-content-news', '.box');

			}else if(windowsWidth > 767 && windowsWidth < 1025){

				var curr = $($container).find('.box:lt(10)').clone();

				$(curr[curr.length-1]).addClass('last');

				$container.empty().append(curr);

				dmcc.reinitNewsTiles('#main-content-news', '.box');

			}else{
				var curr = $($container).find('.box:lt(6)').clone();

				$(curr[curr.length-1]).addClass('last');

				$container.empty().append(curr);

				dmcc.reinitNewsTiles('#main-content-news', '.box');
			}
		}
	},

	reinitNewsTiles: function(element, tiles){

		var $container = $(element);

		$container.masonry('destroy').masonry();
		$container.masonry({
			columnWidth:10,
			itemSelector: tiles,
        	isAnimated: !Modernizr.csstransitions,
        	isFitWidth: true
		});

		//data filter
		$container.filteredMasonry({
			itemSelector: tiles,
			filtersGroupSelector: '.filter'
		});

		$container.masonry('reloadItems');
	},

	showMoreNews: function(){
		if($('body.news').length){

			dmcc.tiles = $('#main-content-news').find('.box');

			$('a.show-more-news').click(function(e){
				e.preventDefault();

				var a = $('#main-content-news').find('.box');

				var windowsWidth = $(window).width() + 17;
				var $container = $('#main-content-news');

				if(windowsWidth >= 1024){

					dmcc.count.desktop++;
					var curr = $(a).clone();

					$(curr[curr.length-1]).addClass('last-'+dmcc.count.desktop);

					$($container).append(curr);


					setTimeout(function(){
						var top = $('#main-content-news .last-'+dmcc.count.desktop).offset().top;

						$('html,body').animate({
							'scrollTop': (top/2) +'px'
						},800);

					},1000);




				}else if(windowsWidth > 767 && windowsWidth < 1025){

					dmcc.count.tablet++;

					var curr = $(a).clone();

					$(curr[curr.length-1]).addClass('last-'+dmcc.count.tablet);

					$($container).append(curr);


					setTimeout(function(){
						var top = $('#main-content-news .last-'+dmcc.count.tablet).offset().top,
							b = $(document).height() - top;

						$('html,body').animate({
							'scrollTop': (top/2) +'px'
						},800);

					},1000);


				}else{
					dmcc.count.mobile++;
					var curr = $(a).clone();

					$(curr[curr.length-1]).addClass('last-'+dmcc.count.mobile);

					$($container).append(curr);


					setTimeout(function(){
						var top = $('#main-content-news .last-'+dmcc.count.mobile).offset().top;

						$('html,body').animate({
							'scrollTop': (top/2) +'px'
						},800);

					},1000);
				}

				dmcc.reinitNewsTiles('#main-content-news','.box');


			});

		}
	},

	locationMap: function(){
		if($('body.contact').length){
			$('#map').gmap3({
				 map: {
				    options: {
				      center: [25.201951, 55.268219],
				      zoom: 13
				    }
				 },
				 marker:{
				    latLng: [25.201951, 55.268219],
				    options: {
				     icon: new google.maps.MarkerImage(
				       "http://erwin.idreamofbali.com/images/icon-marker.png",
				       new google.maps.Size(28, 40, "px", "px")
				     )
				    }
				 }
			});
		}
	},

	showRecaptcha: function(){

		if($('body.contact').length){

			var element = document.getElementById('recaptcha_div');

	       Recaptcha.create("6LfKv9MSAAAAAKLYkFpJ-B7h9qN3NDVFFeIRbp2i", element, {
	         theme: "clean",
	         callback: Recaptcha.focus_response_field});
	    }
	},

	initializeTooltip: function(){
		var tooltips = $(document).find('[data-ctooltip]');

		if(tooltips.length){
			$('body').append('<div class="ctooltip"/>');
		}
	},

	createTooltip: function(){
		var tooltips = $(document).find('[data-ctooltip]');

		tooltips.each(function(){

			var _self = $(this),
				eventListener = $(this).data('ctooltip'),
				tipPosition = $(this).data('pos'),
				tooltipContainer = $('.ctooltip'),
				tooltipContent = _self.attr('title');

			$(this).attr('title',"");

			if(eventListener == "hover"){
				$(this).on('mouseenter', function(){
					var target = $(this).offset();

					tooltipContainer.css({'width':'auto'}).empty().append(tooltipContent).append('<span class="arrow"/>');

					var tooltipWidth = parseInt($(tooltipContainer).outerWidth());

					if(tipPosition == 'bottom-right'){
						tooltipContainer.addClass('bottom-right').css({
							'left':(target.left + $(this).width()) - tooltipWidth + 'px',
							'top':(target.top + $(this).height()) + 10 + 'px',
							'bottom':'auto',
							'right': 'auto',
							'display':'inline'
						});
					}

				}).on('mouseleave', function(){
					tooltipContainer.hide();
				});
			}

			if(eventListener == "click"){
				$(this).on('click', function(e){

					e.preventDefault();

					//add class as state
					$(this).toggleClass('tooltip-clicked');

					var target = $(this).offset();

					tooltipContainer.empty().append(tooltipContent).append('<span class="arrow"/>');

					var tooltipWidth = parseInt($(tooltipContainer).outerWidth());

					if($(this).hasClass('tooltip-clicked')){
						if(tipPosition == 'bottom-right'){
							tooltipContainer.addClass('bottom-right').css({
								'left':(target.left + $(this).width()) - tooltipWidth + 'px',
								'top':(target.top + $(this).height()) + 10 + 'px',
								'bottom':'auto',
								'right': 'auto',
								'display':'inline',
								'width':'auto'
							});
						}
					}else{
						tooltipContainer.hide();
					}

				});
			}


		});
	},

	login: function(){
		$('a.btn-login').click(function(){

			$('form.login .icon-checklist').fadeIn();
			$('form.login .icon-delete').fadeIn();
			$('form .password-error').fadeIn();

			setTimeout(function(){
				$('form.login .icon-checklist').fadeOut();
				$('form.login .icon-delete').fadeOut();
				$('form .password-error').fadeOut();
			},5000);


		});
	},

	notification: function(){
		$('a.notification').click(function(){

			$(this).toggleClass('show-tooltip');

			if($(this).hasClass('show-tooltip')){
				$(this).siblings('.ctooltip').fadeIn();
			}else{
				$(this).siblings('.ctooltip').fadeOut();
			}


		});
	},

	mobileLogin: function(){
		$('.mobile-submit a').click(function(){

			$('form.login .icon-checklist').fadeIn();
			$('form.login .icon-delete').fadeIn();

			setTimeout(function(){
				$('form.login .icon-checklist').fadeOut();
				$('form.login .icon-delete').fadeOut();
			},5000);


		});
	},

	showNextMenu: function(){
		if($('body.news').length){
			$('.secondary-menu .top-bar-section ul.next-menu li a').click(function(e){
				e.preventDefault();

				$('.secondary-menu').toggleClass('show-next-menu');


			});
		}
	}

};

$(document).ready(function(){
	dmcc.init();
});
