gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();



























var btn = document.querySelector(".ri-menu-3-line");
var menu = document.querySelector("#full-scr-nav");
let sign = 0;

btn.addEventListener("click",function(){
    if(sign%2 == 0){
        menu.style.top = "0%";
        document.querySelector("#nav").style.backgroundColor = "bisque";
        document.querySelector("#nav h2").style.color = "#222";
        document.querySelector("#nav h3").style.color = "#222";
        document.querySelector("#nav i").style.color = "#222";

        sign++;
    }
    else{
        menu.style.top = "-100%";
        document.querySelector("#nav").style.backgroundColor = "#222";
        document.querySelector("#nav h2").style.color = "#dadada";
        document.querySelector("#nav h3").style.color = "#dadada";
        document.querySelector("#nav i").style.color = "#dadada";
        sign++;
    }
})


var tline = gsap.timeline();

tline.from("#page1 h1",{
    opacity:0,
    duration:0.5,
    y:80,
})
.from("#page1 h2",{
    opacity:0,
    y:50,
    duration:0.4,
})
.from("#page1 h3",{
    opacity:0,
    y:50,
    duration:0.4,
})

gsap.to("#page2 img",{
    scale:0.98,
    // duration:0.8,
    // opacity:0,
    scrollTrigger:{
        trigger:"#page2 img",
        scroller:"#main",
        start:"top 50%",
        end:"top 0%",
        scrub:2,
    }
})

gsap.from("#page2 h1",{
    scale: 1,
    rotateX:"180deg",
    y:80,
    // opacity:1,
    scrollTrigger:{
        trigger:"#h-one",
        scroller:"#main",
        start:"top 70%",
        end:"top 70%",
        scrub: 4,
        makers: "true",
    }
})


var slide1h1 = document.querySelectorAll("#page6 .slide1-of-h1 h1");
var slide2h1 = document.querySelectorAll("#page6 .slide2-of-h1 h1");

slide1h1.forEach(function(elem){
    gsap.to(elem,{
        transform:'translateX(-100%)',
        duration:6,
        scrollTrigger:{
            trigger: "#page6",
            scroller:"#main",
            scrub: 3,
            makers:true,
        }
    })
})

slide2h1.forEach(function(elem){
    gsap.to(elem,{
        transform:'translateX(0%)',
        duration:4,
        scrollTrigger:{
            trigger: "#page6",
            scroller:"#main",
            scrub: 3,
        }
    })
})

document.querySelector("#page7-elems").addEventListener("mousemove",function(dets){
    document.querySelector("#elem1 img").style.opacity = 1;
    document.querySelector("#elem1 img").style.left = `${dets.x-230}px`;
    document.querySelector("#elem1 img").style.top = `${dets.y-530}px`;

})

document.querySelector("#page7-elems").addEventListener("mouseleave",function(dets){
    document.querySelector("#elem1 img").style.opacity = 0;
})