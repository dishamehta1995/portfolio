
//  =============  xxxxx  ==========================	

TweenMax.set(".centered, nav, h1", {autoAlpha: 1, xPercent:-50, yPercent:-50, force3D:true});	
TweenMax.set(".go", {autoAlpha: 1, yPercent:-50});	

//Forked from [Chrysto](http://codepen.io/bassta/)'s Pen [Fullscreen slides with TweenLite, CSSPlugin and ScrollToPlugin](http://codepen.io/bassta/pen/kDvmC/).  Optimized with the help of Blake Owen

  //First the variables our app is going to use need to be declared

  //References to DOM elements
  var $window = $(window);
  var $document = $(document);
  
  var $navButtons = $("nav span");
  var $navGoPrev = $(".go-prev");
  var $navGoNext = $(".go-next");
  var $slidesContainer = $(".slides-container");
  var $allSlides = $(".slide");
  var $currentSlide = $allSlides.first();
  var slideControl = $("nav a")


  //Animating flag - is our app animating
  var isAnimating = false;

  //The height of the window
  var pageHeight = $window.innerHeight();

  //Key codes for up and down arrows on keyboard. We'll be using this to navigate change slides using the keyboard
  var keyCodes = {
    UP  : 38,
    DOWN: 40
  };

// individual animations per slide
var currentIndex = 0;

var timeline1 = new TimelineMax()
.set('.go-prev',{autoAlpha:0}) 
.from('.slide01 h1',1,{rotationX:'-90',  transformOrigin:'center bottom'})
.reverse();


var timeline2 = new TimelineMax()
.from('.slide02 h1',0.1,{y:-1500})
.reverse();


var timeline3 = new TimelineMax()
//.set('.slide03 h1',{x:-200})
.from('.slide03 h1',0.1,{x:-1500})   
.reverse();    


var timeline4 = new TimelineMax()
.from('.slide04 h1',0.1,{y:1000})   
.reverse();



var timeline5 = new TimelineMax()
.set('.go-next',{autoAlpha:0})  // always in last slide / timeline !!
.from('.slide05 h1',0.1,{y:-1000})

.reverse();

//every timeline has to be listed in this array here !!!
var timelines = [timeline1, timeline2, timeline3, timeline4, timeline5];
  
  //Going to the first slide
  goToSlide($currentSlide);
  //TweenLite.set($currentSlide, {className: "+=active"});

  /*
	*   Adding event listeners
	* */

	$window.on("resize", onResize).resize();
	$window.on("mousewheel DOMMouseScroll", onMouseWheel);
	$document.on("keydown", onKeyDown);
	$navButtons.on("click", onNavButtonClick);
	$navGoPrev.on("click", goToPrevSlide);
	$navGoNext.on("click", goToNextSlide);
	



  /* == Internal functions == */


  /*  When a button is clicked - first get the button href, and then slide to the container, if there's such a container */

  function onNavButtonClick(event)
  {
    //The clicked button
    var $button = $(this);

    //The slide the button points to
    var $slide = $($button.attr("id"));

    //If the slide exists, we go to it
    if($slide.length)
    {
      goToSlide($slide);
      event.preventDefault();
    }
  }

  /*  Getting the pressed key. Only if it's up or down arrow, we go to prev or next slide and prevent default behaviour */

  function onKeyDown(event)
  {

    var PRESSED_KEY = event.keyCode;

    if(PRESSED_KEY == keyCodes.UP)
    {
      goToPrevSlide();
      event.preventDefault();
    }
    else if(PRESSED_KEY == keyCodes.DOWN)
    {
      goToNextSlide();
      event.preventDefault();
    }

  }

  /*
	*   When user scrolls with the mouse, we have to change slides
	* */
  function onMouseWheel(event)
  {
    //Normalize event wheel delta
    var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

    //If the user scrolled up, it goes to previous slide, otherwise - to next slide
    if(delta < -1)
    {
      goToNextSlide();
    }
    else if(delta > 1)
    {
      goToPrevSlide();
    }
    event.preventDefault();
  }

  /*
	*   If there's a previous slide, slide to it
	* */
  function goToPrevSlide()
  {
    if($currentSlide.prev().length)
    {
      goToSlide($currentSlide.prev());
    }
  }

  /*
	*   If there's a next slide, slide to it
	* */
  function goToNextSlide()
  {
    if($currentSlide.next().length)
    {
      goToSlide($currentSlide.next());
    }
  }


  /*
	*   Actual transition between slides
	* */
  function goToSlide($slide)
  {
    //If the slides are not changing and there's such a slide
    if(!isAnimating && $slide.length)
    {
      //setting animating flag to true
      isAnimating = true;
      $currentSlide = $slide;
      currentID = $currentSlide.attr('id');
      NextSlide = $currentSlide.next()           

      //Sliding to current slide
      TweenLite.to($slidesContainer, 1, {scrollTo: {y: pageHeight * $currentSlide.index() }, onComplete: onSlideChangeEnd, onCompleteScope: this});

      //Definig slide status
      TweenLite.to($allSlides.filter(".active"), 0.1, {className: "-=active"});
      TweenLite.to($allSlides.filter($currentSlide), 0.1, {className: "+=active"});

      //Animating menu items
      TweenLite.to($navButtons.filter(".active"), 0.5, {className: "-=active"});
      TweenLite.to($navButtons.filter("." + currentID), 0.5, {className: "+=active"});

    }
  }

  /*
	*   Once the sliding is finished, we need to restore "isAnimating" flag.
	*   You can also do other things in this function, such as changing page title
	* */
  function onSlideChangeEnd() {
    isAnimating = false;
    
    // Reverse the timeline for the previous slide
    timelines[currentIndex].reversed(true).progress(0);
    
    // Change the index
    currentIndex = $currentSlide.index();
    
    // Play the timeline for the current slide
    timelines[currentIndex].reversed(false);
  }

  /*
	*   When user resize it's browser we need to know the new height, so we can properly align the current slide
	* */
  function onResize(event)
  {

    //This will give us the new height of the window
    var newPageHeight = $window.innerHeight();

    /*
		*   If the new height is different from the old height ( the browser is resized vertically ), the slides are resized
		* */
    if(pageHeight !== newPageHeight)
    {
      pageHeight = newPageHeight;

      //This can be done via CSS only, but fails into some old browsers, so I prefer to set height via JS
      TweenLite.set([$slidesContainer, $allSlides], {height: pageHeight + "px"});

      //The current slide should be always on the top
      TweenLite.set($slidesContainer, {scrollTo: {y: pageHeight * $currentSlide.index() }});
    }

  }