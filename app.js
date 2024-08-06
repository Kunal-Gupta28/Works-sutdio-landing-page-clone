// loader Animation
function loader(){
    const tl = gsap.timeline();
tl.to("#loader1",{
        y: "-100%",
        duration: 0.3,
    }).to("#loader video",{
        display:"none",
        duration: 0.7,
    });
    gsap.to("#loader",{
        y: "-100%",
        delay: 1,
        duration: 0.3,
    });
}
loader();

// locomotive 
function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
    });
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
}
locomotive()

// navbar animation
function navbar(){
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#menu",
            scroller: "main", 
            start: "top top",
            end: "bottom bottom",
            scrub: 1, 
            toggleActions: "play none none reverse"
        }
    });

    tl.to("#about p", {
        padding: "0px 0px 0px 100%",
        opacity: 0,
        duration: 4, 
    })
    .to("#studies p", {
        padding: "0px 0px 0px 100%",
        opacity: 0,
        delay: 1,
        duration: 4, 
    })
    .to("#menu div", {
        padding: "0px 0px 0px 52%",
        delay: 5,
        duration: 6, 
    })
    .to("#cross", {
        rotation: 180,
        duration: 3, 
    })
    .to("#menu", {
        y: -10,
        duration: 2, 
    });
}

navbar();

// function page2_animation(){
//     gsap.to(".loop",{
//         x: "-50%",
//         duration: 10,
//         repeat: Infinity,
//     })
// }
// page2_animation();