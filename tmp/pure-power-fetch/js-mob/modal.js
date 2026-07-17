// 获取弹窗
const modal = document.getElementById("myModal");
// console.log('modal: ', modal);
const ruleModal = document.getElementById('rule-modal');
// console.log('ruleModal: ', ruleModal);
// 获取弹窗遮罩层
const cover = document.getElementById("cover");
// 获取关闭按钮
// const closeBtn = document.querySelector("#close-btn-1");
// const ruleCloseBtn = document.querySelector("#close-btn-2");
const step1 = document.querySelector("#step-1")
const step2 = document.querySelector("#step-2")
const step3 = document.querySelector("#step-3")
const step4 = document.querySelector("#step-4")
const step5 = document.querySelector("#step-5")
const noPrize = document.querySelector("#no-prized")


// 打开弹窗
// window.onload = function() {
//     modal.classList.add("show");
//     document.body.classList.add("no-scroll"); // 禁止页面滚动
// }
function showModal() {
  modal.classList.add("show");
  cover.classList.add("show");
  document.body.classList.add("no-scroll");
}
function showRuleModal() {
  ruleModal.classList.add("show");
  cover.classList.add("show");
  document.body.classList.add("no-scroll");
}
function closeModal() {
  step1.style.display = 'block'
  step2.style.display = 'none'
  step3.style.display = 'none'
  step4.style.display = 'none'
  step5.style.display = 'none'
  noPrize.style.display = 'none'
  modal.classList.remove("show");
  cover.classList.remove("show");
  voteBtn.style.display = "block"
  drawBtn.style.display = "none"
  setTimeout(() => {
      // modal.style.display = "none"; // 等待动画结束后隐藏
      document.body.classList.remove("no-scroll"); // 恢复页面滚动
  }, 500); // 动画时间与 CSS 中的 transition 相同
}
function closeRuleModal() {
  ruleModal.classList.remove("show");
    cover.classList.remove("show");
    gsap.to('#draw-btn ', {
        display: 'none',
        opacity: 0,
        ease: "power1.in",
    })
    gsap.to('#vote-btn', {
        display: 'block',
        opacity: 1,
        ease: "power1.in",
    },'>')
    setTimeout(() => {
        // modal.style.display = "none"; // 等待动画结束后隐藏
        document.body.classList.remove("no-scroll"); // 恢复页面滚动
        
    }, 500); // 动画时间与 CSS 中的 transition 相同
}
// // 点击关闭按钮关闭弹窗
// closeBtn.onclick = function() {
//     modal.classList.remove("show");
//     cover.classList.remove("show");
//     setTimeout(() => {
//         // modal.style.display = "none"; // 等待动画结束后隐藏
//         document.body.classList.remove("no-scroll"); // 恢复页面滚动
//     }, 500); // 动画时间与 CSS 中的 transition 相同
// }

// 点击弹窗外部区域也可以关闭弹窗
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove("show");
        cover.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none"; // 等待动画结束后隐藏
            document.body.classList.remove("no-scroll"); // 恢复页面滚动
        }, 500);
    }
}

// 获取 span 和 img 元素
const textToCopy = document.getElementById('textToCopy');
const copyButton = document.getElementById('copyButton');

// 为 img 元素添加点击事件监听器
copyButton.addEventListener('click', () => {
  // 使用 clipboard API 复制文本
  navigator.clipboard.writeText(textToCopy.textContent).then(() => {
    console.log('Text copied to the clipboard');
    // 这里可以添加一些用户反馈，比如改变图片的 src 来显示一个“已复制”的状态
    alert('copy success !')
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
});

