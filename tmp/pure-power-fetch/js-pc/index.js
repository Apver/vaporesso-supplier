function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId)
  const activeTag = document.getElementById('pure-menu-tag')
  // const menuItems = document.querySelectorAll('#pure-menu span')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    const activeItem = document.getElementById('menu-' + sectionId)
    if (activeItem) {
      console.log('activeItem: ', activeItem.offsetTop);
      // 2.19 = (martinTop)1.46+0.73(height)
      activeTag.style.transform = `translateY(${(activeItem.dataset.id - 1) * 2.19}vw)`
    }
  }
}

window.addEventListener('scroll', () => {

  const end = document.getElementById('product-box-end')
  const menu = document.getElementById('pure-menu')
  const part2 = document.getElementById('part_2')

  const endRect = end.getBoundingClientRect()
  const rect = part2.getBoundingClientRect()

  if (rect.top <= 0) {
    menu.classList.add('menu-fixed') // 显示菜单
  } else {
    menu.classList.remove('menu-fixed') // 显示菜单
  }

  if(endRect.top < 100) {
    menu.classList.remove('menu-fixed') // 显示菜单
  }
})

const textArea = document.querySelector('.text_12');

textArea.addEventListener('mousemove', (e) => {
    const rect = textArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    textArea.style.background = `radial-gradient(circle at ${x}px ${y}px, #FFC990 10%, #000 50%)`;
    textArea.style.color = 'transparent';
    textArea.style.backgroundClip = 'text';
    textArea.style.webkitBackgroundClip = 'text';
});

textArea.addEventListener('mouseleave', () => {
    textArea.style.color = 'black'; // 恢复默认文字颜色
    textArea.style.background = 'none';
});