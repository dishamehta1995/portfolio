$("body").prepend('<div id="preloader"><span class="loader"><span class="loader-inner"></span></span></div>');
$(document).ready(function() {
    $("#preloader").remove();
	$(this).scrollTop(0);
	var sH = $(window).height();
	var sW = $(window).width();
	var controller = new ScrollMagic.Controller();

	var lastId,
	    topMenu = $(".about-nav"),
	    topMenuHeight = topMenu.outerHeight() + 15,
	    menuItems = topMenu.find("a"),
	    scrollItems = menuItems.map(function(){
	      var item = $($(this).attr("href"));
	      if (item.length) { return item; }
	    });

	menuItems.click(function(e){
	  var href = $(this).attr("href"),
	      offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + sH  + 1;
	  $('html, body').stop().animate({ 
	      scrollTop: offsetTop
	  }, 300);
	  e.preventDefault();
	});

	$(window).scroll(function(){
	   var fromTop = $(this).scrollTop() + topMenuHeight - 300;
	   var cur = scrollItems.map(function(){
	     if ($(this).offset().top < fromTop)
	       return this;
	   });
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "";
	   
	   if (lastId !== id) {
	       lastId = id;
	       menuItems
	         .parent().removeClass("active")
	         .end().filter("[href='#"+id+"']").parent().addClass("active");
	   }                   
	});

	if($(window).width() > 1100){
		$headingAlignmnet = '-610';
	}else if($(window).width() > 768){
		$headingAlignmnet = -($(window).width()/2) + 20;
	}else{
		$headingAlignmnet = -($(window).width() - 160)/2 - 68;

	}
		// -------------------------------------------------------------------------------------------
	var page1 	   = new TimelineMax()
						.from(".full-stop",0.6,{bottom:'0',right:'0',width:'100vw',height:'100vh'},'shrink-fullstop')
						.to(".social svg path",0.6,{fill:'#111'},'shrink-fullstop')
						.to(".scroll",0.6,{color:'#111',opacity:0,display:'none'},'shrink-fullstop')
					    .to(".full-stop",0.6,{display:'none'},'shrink-fullstop')
						.to(".home .heading",0.6,{color:'#111'},'shrink-fullstop')
						.to(".home .heading",0.6,{fontSize:'25px',left:'50%',marginLeft:$headingAlignmnet,color:'#111'},'ani-2')
				   		.to(".text-2,.home .title",0.6,{width:0,minWidth:0,opacity:-1,display:'none'},'ani-2')
				   		.to(".about-nav li",0.6,{opacity:0},'ani-02')
		       			.to(".home .heading",0.5,{fontSize:'25px',left:'50%',scale:1,bottom:'92vh'},'ani-02')

	if($(window).width() > 599){
		var page1_scene =  new ScrollMagic.Scene({
				triggerElement: ".home",
				duration: '100%',
				reverse:5,
				triggerHook:0
			})
			// .addIndicators()
			.setPin(".home")
			.setTween(page1)
	}else{

		var page1_scene =  new ScrollMagic.Scene({
				triggerElement: ".home",
				duration: '15%',
				reverse:5,
				triggerHook:0
			})
			// .addIndicators()
			.setPin(".home")
			.setTween(page1)

	}


		// -------------------------------------------------------------------------------------------

	var page3 	   = new TimelineMax()
					    .to("body", 0.1, {overflow:'hidden'})
					    .to(window, 1,{scrollTo:{y:$('.about-me')}})
					    .from(".about-me .hv-right", 1.5, {height:0},'ani-4')
					    .from(".about-me .hv-left", 0.5, {top:'100vh'},'ani-4')
					    .staggerFrom(".about-nav li", 1, {ease: Back.easeOut.config(1.4), y: '-100vh',opacity:0 }, 0.35, "ani-5")
					    .from("#about-me .heading", 1, {opacity:0,x:-100},'ani-5')
					    .from("#about-me .wrapper", 1, {opacity:0,y:-100},'ani-5')
					    .from("#about-me .am-img", 1, {opacity:0,x:100},'ani-5')
					    .to("body", 1, {overflow:'auto'})

	var page3_scene =  new ScrollMagic.Scene({
			triggerElement: ".about-me-wrap",
			triggerHook:1,
		})
		.on('start', function (event) {
		  // page3.time(0)
		})
		.on('start progess', function (event) {
			// console.log(event);
			if (event.scrollDirection == 'FORWARD') {
		  		page3.time(0);
		  		page3.resume();
			}else if (event.scrollDirection == 'REVERSE') {
		  		page3.pause();
		  		// page8.time(0);
			}
		})
		.setTween(page3)

		// -------------------------------------------------------------------------------------------

	var page4 	   = new TimelineMax()
					    .from("#education .heading", 1, {y:50,opacity:0})
					    .from("#education .title-2", 1, {x:-50,opacity:0},'ani-5','+=1')
					    .from("#education .description", 2, {y:50,opacity:0},'ani-5','+=1')

	var page4_scene =  new ScrollMagic.Scene({
			triggerElement: "#education",
			triggerHook:0.5,
			duration:'80%'
		})
		.on('start', function (event) {
		  // page4.time(0)
		})
		// .addIndicators()
		.setTween(page4)

		// -------------------------------------------------------------------------------------------

	var page5 	   = new TimelineMax()
					    .from("#experience .heading", 1.5, {y:20,opacity:0})
					    .from("#experience .title-2", 1, {x:-20,opacity:0},'ani-5')
					    .from("#experience .title-3", 1, {x:-20,opacity:0},'ani-5')
					    .from("#experience .description",1, {y:20,opacity:0},'ani-5')

	var page5_scene =  new ScrollMagic.Scene({
			triggerElement: "#experience",
			duration:'50%'
			// triggerHook:0,
		})
		.on('start', function (event) {
		  // page5.time(0)
		})
		// .addIndicators({name:'experience'})
		.setTween(page5)

		// -------------------------------------------------------------------------------------------

	var page6 	   = new TimelineMax({delay:0.2})
					    .to("body", 0.1, {overflow:'hidden'},'ani-6')
					    .to(window, 1,{scrollTo:{y:$('.projects')}})
					    .to(".about-nav", 1, {display:'none'},'ani-6')
					    // .to(".projects", 1, {top:'-100vh',opacity:1})
					    .from(".projects .hv-right", 2.5, {height:0},'ani-7')
					    .from(".projects .hv-left", 1.25, {top:'100vh'},'ani-7')
					    .from(".projects .heading", 1, {opacity:0,x:-100},'ani-8')
					    .from(".projects .description", 1, {opacity:0,y:-30},'ani-8')
						.staggerFrom(".projects .title-2", 1, { x: -275}, 1, "ani-8")
						.to(".projects .img-wrap.left-right img", 1, {rotationY:180,opacity:1}, "ani-8")
						.to(".projects .img-wrap.top-bottom img", 1, {rotationX:180,opacity:1}, "ani-8")
					    .to("body", 1, {overflow:'auto'})

	var page6_scene =  new ScrollMagic.Scene({
			triggerElement: ".projects",
			triggerHook:0.8,
		})
		// .on('start', function (event) {
		//   page6.time(0)

		// })

		.on('start progess', function (event) {
			// console.log(event);
			if (event.scrollDirection == 'FORWARD') {
		  		page6.resume();
		  		page6.time(0);
			}else if (event.scrollDirection == 'REVERSE') {
		  		page6.pause();
		  		// page8.time(0);
			}
		})

		// .addIndicators({name:'projects'})
		.setTween(page6)

		// -------------------------------------------------------------------------------------------

	var page7 	   = new TimelineMax({delay:1})
	
	var page7_scene =  new ScrollMagic.Scene({
			triggerElement: ".projects .wrapper",
			triggerHook:0.4,
			duration: '100%',
		})
		// .addIndicators({name:'projects images'})
		.setTween(page7)

		// -------------------------------------------------------------------------------------------

	var page8 	   = new TimelineMax()
					    .to("body", 0.1, {overflow:'hidden'})
					    .to(window, 1,{scrollTo:{y:$('.contact-us')}})
					    .from(".contact-us .hv-right", 1, {height:0},'ani-9')
					    .from(".contact-us .hv-left", 1, {top:'100vh'},'ani-9')
					    .to(".home .heading", 0.1, {color:'#fff'})
					    .from(".contact-us .heading", 2.5, {opacity:0,x:-30},'ani-10')
					    .from(".contact-us .title-2", 2.5, {opacity:0,x:-30},'ani-10')
					    .from(".contact-us .description", 2.5, {opacity:0,x:-30},'ani-10')
					    .from(".contact-us .btn-primary,.contact-us .title", 2.5, {opacity:0},'ani-10')
					    .to("body", 0.1, {overflow:'auto'})
	
	var page8_scene =  new ScrollMagic.Scene({
			triggerElement: ".contact-us",
			triggerHook:0.9,
			// duration: '100%',
		})
		.on('start progess', function (event) {
			// console.log(event);
			if (event.scrollDirection == 'FORWARD') {
		  		page8.resume();
		  		page8.time(0);
			}else if (event.scrollDirection == 'REVERSE') {
		  		page8.pause();
		  		// page8.time(0);
			}
		})
		// .addIndicators({name:'contact us'})
		.setTween(page8)

		// -------------------------------------------------------------------------------------------
		controller.addScene([page1_scene, page3_scene, page4_scene, page5_scene, page6_scene, page7_scene, page8_scene])
});
