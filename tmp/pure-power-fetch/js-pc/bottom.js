// 获取投票列表
// api.getVoteList().then(data => {
//   console.log(data)
// })

// // 提交投票
// api.updateVote(8).then(data => {
//   console.log(data)
// })

// // 抽奖并提交邮箱
// api.lottery().then(async data => {
//   if(data.prizeId > 0) {
//     await api.submitPrize({
//       prizeId: data.prizeId,
//       Email: 'example@email.com'
//     })
//   }
// })

const imgList = [
  { avatar_id: 1, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/image/9-1@4x.png' },
  { avatar_id: 2, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/image/9-2@4x.png' },
  { avatar_id: 3, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/image/9-3@4x.png' },
  { avatar_id: 4, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/image/9-4@4x.png' },
  { avatar_id: 5, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/image/9-5@4x.png' },
  { avatar_id: 6, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/image/9-6@4x.png' },
  { avatar_id: 7, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/image/9-7@4x.png' },
  { avatar_id: 8, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/image/9-8@4x.png' },
  { avatar_id: 9, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/image/9-9@4x.png' },
  { avatar_id: 10, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/image/9-10@4x.png' }
]
// 渲染签名强
async function renderSignature() {
  // 示例数据
  let signatureData = [];
  // 评论列表
  await api.getCommentList().then(res => {
    console.log(res, 'RES');
    // 计算 signatureData
    signatureData = res.map(item => {
      const img = imgList.find(img => img.avatar_id === item.avatar_id);
      return {
        avatar: img ? img.url : 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/image/9-6@4x.png',
        name: item.name
      };
    });
  });

  const container = document.querySelector('.group_39-content .content');
  const maxRows = 6;
  const itemsPerRow = 20;

  // 计算需要的行数
  const totalRows = Math.min(maxRows, Math.ceil(signatureData.length / itemsPerRow));

  // 生成行
  for (let i = 0; i < maxRows; i++) {
    const row = document.createElement('div');
    row.className = 'group_110 flex-row justify-center'; // 使用 justify-center 居中显示

    // 生成每行的元素
    for (let j = 0; j < itemsPerRow; j++) {
      const index = i * itemsPerRow + j;
      if (index < signatureData.length) {
        const item = signatureData[index];
        const itemDiv = document.createElement('div');
        itemDiv.className = 'image-text_41 flex-row justify-between';

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'box_97 flex-col';
        const avatarImg = document.createElement('img');
        
        avatarImg.src = item.avatar;
        avatarDiv.appendChild(avatarImg);

        const nameSpan = document.createElement('span');
        nameSpan.className = 'text-group_84';
        nameSpan.textContent = item.name;

        itemDiv.appendChild(avatarDiv);
        itemDiv.appendChild(nameSpan);
        row.appendChild(itemDiv);
      }
    }

    container.appendChild(row);
  }
// 启动滚动动画
  // const signWallContent = document.querySelector('.group_39-content');
  // signWallContent.style.animation = 'scroll-content 10s linear infinite';
  const clone = container.cloneNode(true);
  container.parentNode.appendChild(clone);
}
// renderSignature();

document.addEventListener('DOMContentLoaded', function () {
  renderSignature();

  const avatarContainer = document.querySelector('.box_17');
  const checkmark = document.querySelector('.thumbnail_6');
  const nameInput = document.querySelector('.text-input');
  const confirmButton = document.querySelector('.text-wrapper_29');
  const signWall = document.querySelector('.group_39-content .content');

  // 获取所有头像元素（第一级子元素）
  const avatars = Array.from(avatarContainer.children);

  // 默认选择第一个头像
  let selectedAvatar = avatars[0];
  updateCheckmarkPosition(selectedAvatar);

  // 为每个头像添加点击事件
  avatars.forEach(avatar => {
    avatar.addEventListener('click', function () {
      selectedAvatar = avatar;
      updateCheckmarkPosition(avatar);
    });
  });

  // 更新选中标记位置的函数
  function updateCheckmarkPosition(selectedAvatar) {
    // 将选中标记移动到选中头像的下方
    selectedAvatar.appendChild(checkmark);
  }

  confirmButton.addEventListener('click', function () {
    const name = nameInput.value.trim();
    if (!name) {
      alert('请输入您的名字');
      return;
    }

    // 获取头像ID（假设头像顺序为1-10）
    const avatarId = avatars.indexOf(selectedAvatar) + 1;

    // 调用提交签名接口
    api.addComment(name, avatarId).then(response => {
      console.log('签名提交成功:', response);
    }).catch(error => {
      console.error('签名提交失败:', error);
    });

    // 创建新的签名元素
    const newSignature = document.createElement('div');
    newSignature.className = 'image-text_41 flex-row justify-between';

    // 复制选中的头像
    const avatarBox = document.createElement('div');
    avatarBox.classList.add('box_97');
    avatarBox.classList.add('flex-col')
    const avatarImg = document.createElement('img');
    avatarImg.src = imgList[avatarId - 1].url
    avatarBox.appendChild(avatarImg)

    const avatarClone = selectedAvatar.cloneNode(true);
    // 移除选中标记
    const checkmarkElement = avatarClone.querySelector('.thumbnail_6');
    if (checkmarkElement) {
      checkmarkElement.remove();
    }

    // 创建名字元素
    const nameSpan = document.createElement('span');
    nameSpan.className = 'text-group_84';
    nameSpan.textContent = name;

    // 组装新的签名元素
    newSignature.appendChild(avatarBox);
    newSignature.appendChild(nameSpan);

    // 将新签名添加到签名墙的中间行
    const rows = signWall.querySelectorAll('.group_110');
    const middleIndex = Math.floor(rows.length / 2);
    if (rows.length > 0) {
      rows[middleIndex].appendChild(newSignature); // 插入到中间行
    } else {
      console.error('没有可用的行，无法插入新签名');
    }

    // 复制新签名到克隆的内容中
    const clonedRows = signWall.nextElementSibling.querySelectorAll('.group_110');
    if (clonedRows.length > 0) {
      clonedRows[middleIndex].appendChild(newSignature.cloneNode(true));
    }

    nameInput.value = '';

    // 触发动画
    requestAnimationFrame(() => {
      newSignature.style.transform = 'translateX(0)';
      newSignature.style.opacity = '1';
    });
  });
});

document.addEventListener('scroll', function() {
  const cardContainer = document.querySelector('.group_104');
  const rect = cardContainer.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 计算卡片的中心位置
  const cardCenter = rect.top + rect.height / 2;

  // 计算视口的中心位置
  const viewportCenter = windowHeight / 2;

  // 当卡片的中心在视口的中心时触发翻页
  if (cardCenter < viewportCenter) {
      if (!cardContainer.classList.contains('paged')) {
          cardContainer.classList.add('paged');
          // 添加翻页效果的逻辑
          cardContainer.style.transition = 'transform 0.5s ease, opacity 0.5s ease'; // 添加过渡效果
          cardContainer.style.transform = 'translateX(100%)'; // 向左翻页
          cardContainer.style.opacity = '0'; // 渐隐
          setTimeout(() => {
              cardContainer.style.visibility = 'hidden'; // 隐藏
          }, 500); // 与过渡时间一致
      }
  } else {
      if (cardContainer.classList.contains('paged')) {
          cardContainer.classList.remove('paged');
          // 恢复原始位置
          cardContainer.style.transition = 'transform 0.5s ease, opacity 0.5s ease'; // 添加过渡效果
          cardContainer.style.transform = 'translateX(0)';
          cardContainer.style.opacity = '1'; // 渐显
          cardContainer.style.visibility = 'visible'; // 显示
      }
  }
});

// document.addEventListener('scroll', function() {
//   const block15 = document.querySelector('.block_15');
//   const rect = block15.getBoundingClientRect();
//   const windowHeight = window.innerHeight;

//   // 计算 block_15 的中心位置
//   const blockCenter = rect.top + rect.height / 2;

//   // 计算视口的中心位置
//   const viewportCenter = windowHeight / 2;

//   // 当 block_15 的中心在视口的中心时触发滚动
//   if (blockCenter < viewportCenter && rect.top > 0) {
//     // 禁用鼠标滚动
//     document.body.style.overflow = 'hidden';

//     // 平滑滚动到 block_15 的顶部
//     block15.scrollIntoView({ behavior: 'smooth', block: 'start' });

//     // 恢复鼠标滚动
//     setTimeout(() => {
//       document.body.style.overflow = '';
//     }, 1000); // 1秒后恢复滚动
//   }

//   // 禁止 block_15 内部的滚动
//   if (rect.bottom > windowHeight) {
//     block15.addEventListener('wheel', preventScroll, { passive: false });
//   } else {
//     block15.removeEventListener('wheel', preventScroll);
//   }
// });

// function preventScroll(event) {
//   event.preventDefault();  // 阻止默认滚动行为
// }