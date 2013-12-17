/**
 * small plugin to click anywhere
 * bind click event to the document
 */
;(function($){
    $.fn.outside = function(ename, cb){
        return this.each(function(){
            var $this = $(this),
                self = this;

            $(document).bind(ename, function tempo(e){
                if(e.target !== self && !$.contains(self, e.target)){
                    cb.apply(self, [e]);
                    if(!self.parentNode) $(document.body).unbind(ename, tempo);
                }
            });
        });
    };
}(this.jQuery || this.Zepto));

/**
 * small plugin to fix browser behavior on window resize
 */
 
 ;(function ($) {
    var on = $.fn.on, debounce;
    $.fn.on = function () {
        var args = Array.apply(null, arguments);
        var first = args[0];
        var last = args[args.length - 1];
        var isObj = typeof first === 'object';


        if (!isObj && isNaN(last) || (last === 1 && args.pop())) return on.apply(this, args);

        if (isObj) {
            for (var event in first) {
                this.on(event, last, first[event], args[1]);
            }
            return this;
        }

        var delay = args.pop();
        var fn = args.pop();

        args.push(function () {
            var self = this, params = arguments;
            clearTimeout(debounce);
            debounce = setTimeout(function () {
                fn.apply(self, params);
            }, delay);
        });

        return on.apply(this, args);
    };
}(this.jQuery || this.Zepto));


var dmcc = {

	animateTO: null,

	tiles : null,

	counter: 0,

	init: function(){
		this.sliderNavigation();
		this.readmoreHover();
		this.removeGrid();
		this.stickyScroll();
		this.IESecondaryMenu();
		this.commoditiesClick();
		this.tabletSecondaryMenu();
		this.vacancyHover();
		this.settingClick();
		this.showDesktopSearch();
		this.mobileSearchClick();
		this.getNews('main-content-news', false, false, false);
		this.getNews('main-content', true, false, false);
		this.loadMoreNews();
		this.locationMap();
		this.showRecaptcha();
		this.notification();
		this.login();
		this.mobileLogin();
		this.showNextMenu();
		this.formTooltip();
		this.clickOutside();
		
	},

	clickOutside: function(){
	
		//click outside
		$('nav.top-bar ul li.settings > a').outside('click', function(){
			$(this).parent('.settings').removeClass('clicked');
		});
		
		$('.primary-nav ul.right li.has-dropdown > a').outside('click', function(e){
			$(this).parent('li.has-dropdown').removeClass('hover').children('#drop1').removeClass('open');
		});
		
		$('.secondary-menu ul.left li.has-dropdown > a').outside('click', function(e){
			$(this).parent('li.has-dropdown').removeClass('hover');
		});
		
		//click to open
		$('.primary-nav ul.right li.has-dropdown > a').click(function(){
			dmcc.hideDesktopSearch();
			$('nav.top-bar ul li.settings').removeClass('clicked');
			$('.secondary-menu ul.left li.has-dropdown').removeClass('hover');
		});
		
		$('.secondary-menu ul.left li.has-dropdown > a').click(function(){		
			
			$(this).parent('li.has-dropdown').siblings().removeClass('hover');
			$('nav.top-bar ul li.settings').removeClass('clicked');
			$('.primary-nav ul.right li.has-dropdown').removeClass('hover').children('#drop1').removeClass('open');
		});
	},
	
	primaryNavClick: function(){
		$('.primary-nav	.top-bar-section ul > li > a').click(function(e){
			//e.stopPropagation();
			//clear all active state
			//$('.primary-nav	.top-bar-section > ul > li').each(function(){
			//		if($(this).children('a').hasClass('active')) $(this).children('a').removeClass('active');
			//});
			$(this).toggleClass('active').parent('li').siblings().children('a.active').removeClass('active');

			if(!$(this).hasClass('search')){
				//hide desktop search
				dmcc.hideDesktopSearch();
			}
		
		});
	},

	sliderNavigation: function(){
		$('.orbit-nav a.orbit-prev-custom').on('click', function(e) {
			e.preventDefault();
		    $('.orbit-prev span').trigger('click');
		    return false;
		});

		$('.orbit-nav a.orbit-next-custom').on('click', function(e) {
			e.preventDefault();
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

			var windowWidth = $(window).innerWidth();

			if(windowWidth > 1024){
				$(this).toggleClass('hovered');
			
				if($(this).hasClass('hovered')){
					$(this).children('.hover-link').animate({
						bottom:'0px'
					},100);

					$(this).children().children('.content').animate({
						'padding-bottom':'35px'
					},100);
					
				}
			}
			
			
		}).on('mouseleave','.hoverable', function(){
			
			var _self = $(this);

			var windowWidth = $(window).innerWidth();
			if(windowWidth >= 1024){

				if($(this).hasClass('hovered')){
					$(this).children('.hover-link').animate({
						bottom:'-40px'
					},100, function(){
						_self.removeClass('hovered');
					});
					
					$(this).children().children('.content').animate({
						'padding-bottom':'5px'
					},100);
				}
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
				upperLimit = $('.secondary-menu');
				
			setTimeout(function(){
				targetTop.stop(true, true).animate({
					top: (upperLimit.offset().top + 55 ) + 'px'
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
					targetTop.stop(true, true).css({'position':'absolute','top':(upperLimit.offset().top + 55) + 'px'});
				}
			});
		}
		
	},

	vacancyHover: function(){
		if($('.vacancy').length){
			$('.vacancy ul li').mouseenter(function(){
			
				var windowWidth = $(window).innerWidth();

				if(windowWidth > 1024){
				
					$(this).children('a').children('.block-content').animate({
						bottom:'40px'
					},100);
					$(this).children('.hover-link').animate({
						bottom:'40px'
					},100);
				}


			}).mouseleave(function(){
				
				var windowWidth = $(window).innerWidth();

				if(windowWidth > 1024){
			
					$(this).children('a').children('.block-content').animate({
						bottom:'0'
					},100);
					$(this).children('.hover-link').animate({
						bottom:'0'
					},100);
				}
			});
		}
	},

	settingClick: function(){
		$('nav.top-bar ul li.settings > a').click(function(e){
			e.preventDefault();
			$('.primary-nav ul.right li.has-dropdown').removeClass('hover').children('#drop1').removeClass('open');
			$('.secondary-menu ul.left li.has-dropdown').removeClass('hover');
			$(this).parent('.settings').toggleClass('clicked');
		});		
	},

	showDesktopSearch: function(){
		$('.primary-nav .top-bar-section ul > li.desktop-search a').click(function(e){

			e.preventDefault();
			
			$('.primary-nav	.top-bar-section ul > li.has-dropdown').removeClass('hover');

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


	getNews: function(container, isHome, onResize, isMore){

		if($('#'+container).length){

			var windowsWidth = $(window).innerWidth() + 17;

			if(windowsWidth >= 1280){
				if(isHome){
					dmcc.renderTiles(container, 16, isHome, isMore);
				}else{
					dmcc.renderTiles(container, 18, isHome, isMore);
				}
				

			}else if(windowsWidth >= 1024 && windowsWidth < 1280){

				if(isHome){
					dmcc.renderTiles(container, 9, isHome, isMore);
				}else{
					dmcc.renderTiles(container, 11, isHome, isMore);
				}

			}else if(windowsWidth > 767 && windowsWidth < 1024){

				if(isHome){
					dmcc.renderTiles(container, 8, isHome, isMore);
				}else{
					dmcc.renderTiles(container, 10, isHome, isMore);
				}

			}else if(windowsWidth <= 767){
				if(isHome){
					dmcc.renderTiles(container, 6, isHome, isMore);
				}else{
					dmcc.renderTiles(container, 8, isHome, isMore);
				}
			}
		}

	},

	renderTiles: function(container, limit, isHome, isMore){

		var isMore = isMore || false;

		if(!isMore){
			$('#'+container).empty();
		}else{
			dmcc.counter++;
		}

		//$.getJSON('http://dxb.mblm.com/dmcc/js/data/news.json', function(data){
		$.getJSON('js/data/news.json', function(data){
			
			$.each(data.newsJSON, function(i, news){

				if(isHome && news.category == "notif"){
					var notif = $('<div class="box col3 hoverable" data-filter-class="other"/>');

					var tileNotif = '<a href="#">'+
										'<img src="'+news.image+'" />'+
										'<span class="remove"><i class="icon icon-remove"></i></span>'+
										'<div class="content bg-light-grey gradient">'+
											'<p>'+(news.title).substr(0, 80)+'</p>'+
											'<div class="ct-info">'+
												'<span class="ct-left">'+news.postdate+'</span>'+
												'<span class="ct-right">'+news.categoryText+'</span>'+
												'<span class="bottom-icon notif"><i class="icon icon-alert"></i></span>'+
											'</div>	'+									
										'</div>'+
									'</a>';

					notif.append(tileNotif);

					notif.append('<a href="#" class="hover-link bg-dark-blue gradient">'+news.linkText+'...</a>');

					$('#'+container).append(notif);

				}else if(news.category != "notif"){

					if((i + 1) <= limit){

						var lastTile = ((i + 1) == limit) ? " last-tile-" + dmcc.counter : "";

						var template = $('<div class="box col3 hoverable'+lastTile+'" data-filter-class="' + news.dataFilter + '"/>');

						var templateLink = $('<a href="#"></a>');

						if(news.mediaType == "" || news.mediaType != "gallery"){
							templateLink.append('<img src="' + news.image + '" />');

							switch(news.mediaType){
								case "video":
									templateLink.append('<span class="bg-video"></span>');
									break;
								case "audio":
									templateLink.append('<span class="bg-audio"></span>');
									break;
								case "photo":
									templateLink.append('<span class="bg-images"></span>');
									break;
								case "event":
									templateLink.append('<span class="bg-calendar"></span>');
									break;
							}

							if(news.isFav){
								templateLink.append('<span class="star"><i class="icon icon-star"></i></span>');
							}

							var tileContent = $('<div class="content bg-light-grey gradient" />'),
								tileInfo = $('<div class="ct-info" />');


							tileContent.append('<p>' + (news.title).substr(0, 80) + '</p>');

							if(news.postdate != ""){
								tileInfo.append('<span class="ct-left">' + news.postdate +'</span>');
							}else{
								tileInfo.append('<span class="ct-left">' + news.categoryText +'</span>');
							}

							tileInfo.append('<span class="ct-right">' + news.subCategory + '</span>');

							var hoverColor, tileIcon;

							switch(news.category){
								case "commodities":
									hoverColor = " bg-tosca gradient";
									tileIcon = " icon-commodities-hover";
									break;
								case "dmcc":
									hoverColor = " bg-dark-blue gradient";
									tileIcon = " icon-dmcc";
									break;
								case "tea":
									hoverColor = " bg-purple gradient";
									tileIcon = " icon-tea-hover";
									break;
								case "gold":
									hoverColor = " bg-tosca gradient";
									tileIcon = " icon-gold-hover";
									break;
								case "diamond":
									hoverColor = " bg-light-blue gradient";
									tileIcon = " icon-diamond-hover";
									break;
								case "freezone":
									hoverColor = " bg-purple gradient";
									tileIcon = " icon-reload";
									break;

							}

							tileInfo.append('<span class="bottom-icon"><i class="icon' + tileIcon + '"></i></span>');
							tileContent.append(tileInfo);
							templateLink.append(tileContent);
							template.append(templateLink);
							template.append('<a href="#" class="hover-link' + hoverColor + '">' + news.linkText + '...</a>');



						}else{
							//if gallery
							var tileSlider = $('<div class="tile-slider" />'),
								tileList = $('<ul data-orbit data-options="bullets:false;slide_number:false;timer:false;" />');

								tileSlider.append('<div class="preloader"></div>');

								$(news.image).each(function(idx, image){
									tileList.append('<li><img src="' + image + '"/></li>');
								});

								tileSlider.append(tileList);
								tileSlider.append('<div class="orbit-nav">'+
										            '<a class="orbit-prev-custom" href="#">Prev</a>'+
										            '<a class="orbit-next-custom" href="#">Next</a>'+
										          '</div>');
								template.append(tileSlider);

								//template.append('<a href="#" class="hover-link bg-dark-blue gradient">' + news.linkText + '...</a>');

						}

						$('#'+container).append(template);


					}

				}

			});	//loop news

			dmcc.reinitNewsTiles('#'+container, '.box');
			$(document).foundation('orbit').init();
			dmcc.sliderNavigation();
			$('.loadmore-loader').hide();

			if(!$('a.loadmore').is(':visible')){
				$('a.loadmore').show();
			}


			if(isMore){

				setTimeout(function(){
					var scrollTop = $('#' + container + ' .last-tile-'+dmcc.counter).offset().top;
					//scroll to the new tiles
					$('html,body').stop().delay(100).animate({
						'scrollTop': (scrollTop-840)+'px'
					},800);
				},500);
				
			}

		});//get jSON
		

		
	},

	reinitNewsTiles: function(element, tiles){

		var $container = $(element);

		$container.imagesLoaded( function() {
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

		});		
		
	},

	
	loadMoreNews: function(){
		$('body').on('click', 'a.loadmore', function(e){
			e.stopPropagation();

			var windowsWidth = $(window).innerWidth() + 17;
			
			$(this).hide();
			$('.loadmore-loader').show();

			if($(this).hasClass('loadmore-news')){

				var container = 'main-content-news';

				if(windowsWidth >= 1280){					

					dmcc.renderTiles(container, 18, false, true);					

				}else if(windowsWidth >= 1024 && windowsWidth < 1280){

					dmcc.renderTiles(container, 11, false, true);

				}else if(windowsWidth > 767 && windowsWidth < 1024){

					dmcc.renderTiles(container, 10, false, true);

				}else if(windowsWidth <= 767){

					dmcc.renderTiles(container, 8, false, true);

				}
				

			}else{

				var container = 'main-content';

				if(windowsWidth >= 1280){					

					dmcc.renderTiles(container, 16, true, true);					

				}else if(windowsWidth >= 1024 && windowsWidth < 1280){

					dmcc.renderTiles(container, 9, true, true);

				}else if(windowsWidth > 767 && windowsWidth < 1024){

					dmcc.renderTiles(container, 8, true, true);

				}else if(windowsWidth <= 767){

					dmcc.renderTiles(container, 6, true, true);

				}
			}
			
		});
	},
	

	locationMap: function(){
		if($('.contact .office-map').length){
			$('#map').gmap3({
				 map: {
				    options: {
				      center: [25.069293,55.141025],
				      zoom: 17 
				    }  
				 },
				 marker:{
				    latLng: [25.069293,55.141025],
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
	         theme: "clean"});
	    }
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
	},

	formTooltip: function(){
		$('form.custom i.icon').click(function(e){
			e.preventDefault();

			$(this).toggleClass('show-tooltip');
			if($(this).hasClass('show-tooltip')){
				$(this).parent().siblings('.ctooltip').fadeIn();
			}else{
				$(this).parent().siblings('.ctooltip').fadeOut();
			}
		});
	},

	randomTiles: function(array){
		var currentIndex = array.length,
			temporaryValue,
	    	randomIndex;


		  while (0 !== currentIndex) {

		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		  }

		  return array;
	}

};

$(document).ready(function(){
	dmcc.init();
	
	$(window).on('resize', function(e) {
		dmcc.stickyScroll();
		dmcc.getNews('main-content-news', false, true, false);
		dmcc.getNews('main-content', true, true, false);
	}, 200);

	//Text limit for About us boxes
	$(".vacancy li p").text(function(index, text) {
        return text.substr(0, 55);
    });

});

