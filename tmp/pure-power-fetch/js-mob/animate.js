// use a script tag or an external JS file
 document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger)
  // gsap code here!
    /**
    * fromTo里第一个对象是开始的状态第二个动画是你要执行的状态
    * '<' 上一个动画开始，我也开始
    * '>' 上一个动画结束，我在开始 默认 
    * '1' 一秒后执行可以2也可以3.... 
    * '+=1'上一个动画结束后一秒我在执行 可以2也可以3.... 
    * ‘-=1'’上一个动画结束前一秒我在执行 可以2也可以3.... 
    *
    */

    // 视频放大动画start
    let o = gsap.timeline({
      scrollTrigger: {
        trigger: ".slides-wrapper", //当前动画触发的元素
        start: "top-=200px",
        end: "200px",
        //once: true, // 只执行一次
        pin: ".slides-wrapper", //钉住元素的位置
        scrub: true, //是否将动画效果链接到滚动条，随着滚动条平滑处理；如果是false（默认），随着元素出现在视窗内，直接触发动画，如果是true，则平滑动画
        markers: false//是否进行标记
      }
    })
    o.from(".team-background", {
        scale: .3,
        ease: "power1.in"
    }),
    o.to(".team-background", {
        scale: 1,
        ease: "power1.in",
    })
    o.to(".text_31", {
      opacity: 0,
      ease: "power1.in",
      onComplete: ()=>{
        const videoBg = document.querySelector("#video-bg")
        videoBg.play()
      }
    }, '>')
    o.from(".text_28", {
      opacity: 0,
      ease: "power1.in"
    }, '>'),
    o.to(".text_28", {
      opacity: 1,
      ease: "power1.in"
    }, '>')
    // 视频放大动画end
    
    // 图片抽取动画start
    const pageNumEl = document.querySelector('.page-num')
    let imgGsap = gsap.timeline({
      scrollTrigger: {
        trigger: ".img-slide-wrapper", //当前动画触发的元素
        start: "top top",
        end: "bottom",
        pin: ".img-slide-layout", //钉住元素的位置
        scrub: true, //是否将动画效果链接到滚动条，随着滚动条平滑处理；如果是false（默认），随着元素出现在视窗内，直接触发动画，如果是true，则平滑动画
        markers: false //是否进行标记
      }
    })
    imgGsap.to(".img-slide-item-01", {
        ease: "power1.in",
        scale: 1,
        scaleY: 1.1,
        rotate: 40,
        translateX: 0, // 无水平移动
        translateY: -1000,
        duration: 6,
        onStart: () => {
          const video = document.querySelector(".img-slide-item-01 video")
          video.play()
        },
        onComplete: () => {
          pageNumEl.innerHTML = '02'
          console.log("the tween is complete")
        },
        onReverseComplete:() => {
          pageNumEl.innerHTML = '01'
        },
    })
    imgGsap.to(".img-slide-item-02", {
      ease: "power1.in",
      scale: 1,
      duration: 6,
    },"<")
    imgGsap.to(".img-slide-item-02", {
      ease: "power1.in",
      scale: 1,
      scaleY: 1.1,
      rotate: 40,
      translateY: -1000,
      duration: 6,
      onStart: () => {
        const video = document.querySelector(".img-slide-item-02 video")
        video.play()
      },
      onComplete: () => {
        pageNumEl.innerHTML = '03'
      },
      onReverseComplete:() => {
        pageNumEl.innerHTML = '02'
      },
    },">")
    imgGsap.to(".img-slide-item-03", {
      ease: "power1.in",
      scale: 1,
      duration: 6,
    },"<")
    imgGsap.to(".img-slide-item-03", {
      ease: "power1.in",
      scale: 1,
      scaleY: 1.1,
      rotate: 40,
      translateY: -1000,
      duration: 6,
      onStart: () => {
        const video = document.querySelector(".img-slide-item-03 video")
        video.play()
      },
      onComplete: () => {
        pageNumEl.innerHTML = '04'
      },
      onReverseComplete:() => {
        pageNumEl.innerHTML = '03'
      },
    },">")
    imgGsap.to(".img-slide-item-04", {
      ease: "power1.in",
      scale: 1,
      translateY: -15,
      duration: 6,
    },"<")
    imgGsap.to(".img-slide-item-04", {
      ease: "power1.in",
      scale: 1,
      scaleY: 1.1,
      rotate: 40,
      translateY: -1000,
      duration: 6,
      onStart: () => {
        const video = document.querySelector(".img-slide-item-04 video")
        video.play()
      },
      onComplete: () => {
        pageNumEl.innerHTML = '05'
      },
      onReverseComplete:() => {
        pageNumEl.innerHTML = '04'
      },
    },">")
    imgGsap.to(".img-slide-item-05", {
      ease: "power1.in",
      scale: 1,
      translateY: -29,
      duration: 6,
    },"<")
  // 图片抽取动画end

  // 第二屏文字淡入淡出动效start
  let t = gsap.timeline({
    scrollTrigger: {
      trigger: ".block_1", //当前动画触发的元素
      start: "top-=200px",
      once: true,
    }
  })
  t.from('.text_9', {
    opacity: 0,
    ease: "power1.in",
  }, '<')
  t.to('.text_9', {
    opacity: 1,
    ease: "power1.in",
  }, '<')
  t.from('.text_10', {
    opacity: 0,
    ease: "power1.in",
  }, '<')
  t.to('.text_10', {
    opacity: 1,
    ease: "power1.in",
  }, '<')
  t.from('.text_11', {
    opacity: 0,
    ease: "power1.in",
  }, '<')
  t.to('.text_11', {
    opacity: 1,
    ease: "power1.in",
  }, '<')
  t.from('.group_4', {
    opacity: 0,
    ease: "power1.in",
  }, '<')
  t.to('.group_4', {
    opacity: 1,
    ease: "power1.in",
  }, '<')
  t.from('.group_4-text', {
    opacity: 0,
    ease: "power1.in",
  }, '<')
  t.to('.group_4-text', {
    opacity: 1,
    ease: "power1.in",
  }, '<')
  // 第二屏文字淡入淡出动效end

 });

