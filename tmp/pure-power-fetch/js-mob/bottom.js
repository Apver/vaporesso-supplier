// 初始化默认ID为1
let selectedProfileId = 1;

// 为每个头像添加点击事件监听器
document.querySelectorAll('.thumb-box').forEach((img, index) => {
  img.addEventListener('click', () => {
    // 更新选中的ID
    selectedProfileId = index + 1;
    // console.log('Selected Profile ID:', selectedProfileId);
  });
});

let confirmButton = null;

document.addEventListener('DOMContentLoaded', function () {
  const imgList = [
    {
      avatar_id: 1,
      url: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/pure-power-image-mob-9-1@4x.png',
    },
    {
      avatar_id: 2,
      url: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/pure-power-image-mob-9-2@4x.png',
    },
    {
      avatar_id: 3,
      url: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/pure-power-image-mob-9-3@4x.png',
    },
    {
      avatar_id: 4,
      url: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/pure-power-image-mob-9-4@4x.png',
    },
    {
      avatar_id: 5,
      url: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/pure-power-image-mob-9-5@4x.png',
    },
    {
      avatar_id: 6,
      url: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/pure-power-image-mob-9-6@4x.png',
    },
    {
      avatar_id: 7,
      url: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/pure-power-image-mob-9-7@4x.png',
    },
    {
      avatar_id: 8,
      url: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/pure-power-image-mob-9-8@4x.png',
    },
    {
      avatar_id: 9,
      url: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/pure-power-image-mob-9-9@4x.png',
    },
    {
      avatar_id: 10,
      url: 'https://cdn.shopify.com/s/files/1/0703/9873/8521/files/pure-power-image-mob-9-10@4x.png',
    },
  ];
  const signWall = document.querySelector('.mob-scroll-content');
  confirmButton = document.querySelector('.p-text-wrapper_4');
  confirmButton.addEventListener('click', function () {
    const nameInput = document.querySelector('.mob-text-input');
    const name = nameInput.value.trim();
    if (!name) {
      alert('请输入您的名字');
      return;
    }

    // 获取头像ID（假设头像顺序为1-10）
    const avatarId = selectedProfileId;

    // 调用提交签名接口
    submitComment(name, avatarId)
      .then((response) => {
        // console.log('签名提交成功:', response);
      })
      .catch((error) => {
        // console.error('签名提交失败:', error);
      });

    // 创建新的签名元素
    const newSignature = document.createElement('div');
    newSignature.className = 'item-div flex-row justify-center';

    // 复制选中的头像
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'item-avatar flex-col';
    const avatarImg = document.createElement('img');
    avatarImg.src = imgList.find(
      (img) => img.avatar_id === selectedProfileId,
    ).url;
    avatarDiv.appendChild(avatarImg);

    // 创建名字元素
    const nameSpan = document.createElement('span');
    nameSpan.className = 'item-text';
    nameSpan.textContent = name;

    // 组装新的签名元素
    newSignature.appendChild(avatarDiv);
    newSignature.appendChild(nameSpan);

    // 将新签名添加到签名墙的中间行
    const rows = signWall.querySelectorAll('.scroll-item');
    const middleIndex = Math.floor(rows.length / 2);
    if (rows.length > 0) {
      rows[middleIndex].appendChild(newSignature); // 插入到中间行
    } else {
      // console.error('没有可用的行，无法插入新签名');
    }

    // 复制新签名到克隆的内容中
    const clonedRows =
      signWall.nextElementSibling.querySelectorAll('.scroll-item');
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
