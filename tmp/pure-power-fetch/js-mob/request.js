const api = 'https://brand.vaporesso.com/vaporesso/java/data/activity';

let voteCount = 0
const totalAmount = 3000000; // 总量
const incrementValue = 100; // 每次增加的值
// let incrementCount = 0; // 每次增加的次数
// let prizeId = 1
let prizeId 

let voteBtnDisable = false
let lotteryBtnDisable = false
let comfirBtnDisable = false
const voteBtn = document.querySelector("#vote-btn")
const drawBtn = document.querySelector("#draw-btn")


function fetchData(url, method, params = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (params) {
        options.body = JSON.stringify(params);
    }

    return fetch(`${api}${url}`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // 解析 JSON 数据
        });
}

// 获取投票数
function getVoteList() {
    return fetchData('/vote/list', 'POST', { activityType: 'care_2024' })
        .then(data => {
            const res = data.data[0]
            voteCount = res.num
            progress(true) // 页面进入时获取数据
            console.log('获取投票数响应:', data, res.num);
        })
        .catch(error => {
            console.error('获取投票数请求出现问题:', error);
        });
}
getVoteList()

// 进度条
function progress(isFirst){
    // incrementCount++; // 每次增加的次数
    // console.log('incrementCount: ', incrementCount);
    const voteValue = voteCount*incrementValue //默认vote总值
    let addVoteValue = voteValue //实际要增加的总值

    const progressTrack = document.getElementById("progress-track");
    const progressBar = document.getElementById("progress-bar");
    const currenProgress = document.getElementById("current-progress");
    const power1Progress = document.querySelector(".text_85");
    const power2Progress = document.querySelector(".text_98");
    const power3Progress = document.querySelector(".text_107");

   // 获取 progressTrack 和 progressBar 的宽度
    const trackWidth = progressTrack.offsetWidth;
    const currentBarWidth = progressBar.offsetWidth;

    // 计算增加的宽度
    let increaseWidth = (voteValue / totalAmount) * trackWidth;

    if(!isFirst) {
        addVoteValue = addVoteValue + incrementValue
        console.log('addVoteValue: ',addVoteValue);
        increaseWidth = (incrementValue / totalAmount) * trackWidth;
    }
    currenProgress.innerText = addVoteValue + 6000 + 2200
    power1Progress.innerText = addVoteValue
    // power2Progress.innerText = addVoteValue
    // power3Progress.innerText = addVoteValue
    
    // 实际要增加的宽度
    let width = increaseWidth

    // 检查边界条件
    if (trackWidth - currentBarWidth < increaseWidth ) {
        width = trackWidth - currentBarWidth
    }
    if (trackWidth - currentBarWidth == increaseWidth ) {
        alert("进度条已满，无法继续增加！");
        return; // 退出函数
    }

    // 使用 GSAP 动画将 progressBar 的宽度增加
    gsap.to(progressBar, {
        width: `+=${width}px`, // 增加计算得到的宽度
        duration: 0.5, // 动画持续时间
        ease: "power1.out", // 动画缓动效果
    });

}

// 投票
function vote(id, isAdd) {
    if(voteBtnDisable) return
    voteBtnDisable = true
    progress()
    return fetchData('/vote/update', 'POST', {
        id: 1001,
        isAdd: true,
      })
        .then(data => {
            voteCount++
            voteBtnDisable = false
            console.log('投票响应:', data);
            // 出现抽奖按钮
            voteBtn.style.display = 'none'
            drawBtn.style.display = 'block'
            // gsap.to('#vote-btn', {
            //     display: 'none',
            //     opacity: 0,
            //     ease: "power1.in",
            // })
            // gsap.to('#draw-btn', {
            //     display: 'block',
            //     opacity: 1,
            //     ease: "power1.in",
            // },'>')
        })
        .catch(error => {
            voteBtnDisable = false
            console.error('投票请求出现问题:', error);
        });
}

// 抽奖
function lottery() {
    if(lotteryBtnDisable) return
    lotteryBtnDisable = true
    if(localStorage.getItem('mob-vaporesso-lucy-people')) {
        step1.style.display = 'none'
        noPrize.style.display = 'block'
        lotteryBtnDisable = false
        return
    }
    return fetchData('/vote/lottery', 'POST', {
        activityType: 'care_2024',
    })
    .then(data => {
        // 0-未中奖 4-折扣码，1-一等奖，2-二等奖，3-三等奖
        console.log('抽奖响应:', data,data.data);
        lotteryBtnDisable = false
        prizeId = data.data.prizeId
        token =  data.data.token
        
        // 中奖流程测试 START
        // prizeId = JSON.parse(localStorage.getItem('test_prize_id')).id
        // token =  data.data.token || 'TEST_token'
        // 中奖流程测试 END
        if(prizeId == 0) {
            step1.style.display = 'none'
            noPrize.style.display = 'block'
        }
        if(prizeId == 1) {
            step1.style.display = 'none'
            step3.style.display = 'block'
            localStorage.setItem("mob-vaporesso-lucy-people", true)
            localStorage.setItem("mob-vaporesso-lucy-token", data.data.token)
        }
        if(prizeId == 2) {
            step1.style.display = 'none'
            step4.style.display = 'block'
            localStorage.setItem("mob-vaporesso-lucy-people", true)
            localStorage.setItem("mob-vaporesso-lucy-token", data.data.token)
        }
        if(prizeId == 3) {
            step1.style.display = 'none'
            step5.style.display = 'block'
            localStorage.setItem("mob-vaporesso-lucy-people", true)
            localStorage.setItem("mob-vaporesso-lucy-token", data.data.token)
        }
        if(prizeId == 4) {
            step1.style.display = 'none'
            step2.style.display = 'block'
            const token = document.querySelector('#textToCopy')
            token.innerText = 'VPCARE20'
            localStorage.setItem("mob-vaporesso-lucy-people", true)
            localStorage.setItem("mob-vaporesso-lucy-token", data.data.token)
        }
        
    })
    .catch(error => {
        lotteryBtnDisable = false
        console.error('抽奖请求出现问题:', error);
    });
}

function handleEmail(inputEl, tipEl,) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // 简单的邮箱格式验证
    if (inputEl.value.trim() === '') {
        // errorTip.textContent = 'Email cannot be empty';
        tipEl.style.display = 'block';
        comfirBtnDisable = false
        return false;
    } else if (!regex.test(inputEl.value)) {
        // errorTip.textContent = 'Invalid email';
        tipEl.style.display = 'block';
        comfirBtnDisable = false
        return false;
    }
    tipEl.style.display = 'none';
    return true;
}

// 提交中奖接口
function submitEmail(el) {
    if(comfirBtnDisable) return 
    comfirBtnDisable = true
    // 验证邮箱
    const emailInput = document.querySelector(`#${el} .input-box input`);
    const errorTip = document.querySelector(`#${el} .input-box .err-tip`);
    const successTip = document.querySelector(`#${el} .input-box .success-tip`);

    let state = handleEmail(emailInput, errorTip)
    if(!state) return

    return fetchData('/vote/email/add', 'POST', { 
        prizeId: prizeId, 
        Email: emailInput.value, 
        token: token,
        activityType: 'care_2024' })
        .then(data => {
            comfirBtnDisable = false
            console.log('提交中奖接口响应:', data);
            if(el == 'step-2') {
                const sendContent = document.querySelector('#send-content')
                const sendSuccess = document.querySelector('#send-success')
                sendContent.style.display = 'none'
                sendSuccess.style.display = 'block'
            }else{
                successTip.style.display = 'block'
            }
        })
        .catch(error => {
            errorTip.innerHTML = error
            comfirBtnDisable = flase
            console.error('提交中奖接口请求出现问题:', error);
        })
        .finally(() => {
            const sendContent = document.querySelector('#send-content')
                const sendSuccess = document.querySelector('#send-success')
                sendContent.style.display = 'none'
                sendSuccess.style.display = 'block'
        });
}

// 签名列表
function getCommentList() {
    const imgList = [
        { avatar_id: 1, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/img-mob/9-1@4x.png' },
        { avatar_id: 2, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/img-mob/9-2@4x.png' },
        { avatar_id: 3, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/img-mob/9-3@4x.png' },
        { avatar_id: 4, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/img-mob/9-4@4x.png' },
        { avatar_id: 5, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/img-mob/9-5@4x.png' },
        { avatar_id: 6, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/img-mob/9-6@4x.png' },
        { avatar_id: 7, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/img-mob/9-7@4x.png' },
        { avatar_id: 8, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/img-mob/9-8@4x.png' },
        { avatar_id: 9, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/img-mob/9-9@4x.png' },
        { avatar_id: 10, url: 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/img-mob/9-10@4x.png' }
      ]
        // 示例数据
    let signatureData = [];
    return fetchData('/vote/comment/list', 'POST', { activityType: 'care_2024' })
        .then(res => {
            signatureData = res.data.map(item => {
                const img = imgList.find(img => img.avatar_id === item.avatar_id);
                return {
                  avatar: img ? img.url : 'https://www.vaporesso.com/hubfs/imgs/2024/activity/pure_power/img-mob/9-8@4x.png',
                  name: item.name
                };
              });
              
            const container = document.querySelector('.mob-scroll-content');
            const maxRows = 9;
            const itemsPerRow = 12;
          
            // 计算需要的行数
            const totalRows = Math.min(maxRows, Math.ceil(signatureData.length / itemsPerRow));
          
            // 生成行
            for (let i = 0; i < totalRows; i++) {
              const row = document.createElement('div');
              row.className = 'scroll-item flex-row justify-center'; // 使用 justify-center 居中显示
          
              // 生成每行的元素
              for (let j = 0; j < itemsPerRow; j++) {
                const index = i * itemsPerRow + j;
                if (index < signatureData.length) {
                  const item = signatureData[index];
                  const itemDiv = document.createElement('div');
                  itemDiv.className = 'item-div flex-row justify-between'; // 使用类名设置样式
          
                  const avatarDiv = document.createElement('div');
                  avatarDiv.className = 'item-avatar flex-col'; // 使用类名设置样式
                  const avatarImg = document.createElement('img');
                  avatarImg.src = item.avatar;
                  avatarDiv.appendChild(avatarImg);
          
                  const nameSpan = document.createElement('span');
                  nameSpan.className = 'item-text'; // 使用类名设置样式
                  nameSpan.textContent = item.name;
          
                  itemDiv.appendChild(avatarDiv);
                  itemDiv.appendChild(nameSpan);
                  row.appendChild(itemDiv);
                }
              }
          
              container.appendChild(row);
            }
            const clone = container.cloneNode(true);
            container.parentNode.appendChild(clone);
        })
        .catch(error => {
            console.error('签名列表请求出现问题:', error);
        });
}
getCommentList()

// 提交签名
function submitComment(name, avatarId) {
    return fetchData('/vote/comment/add', 'POST', { name, avatar_id: avatarId, activityType: 'care_2024' })
        .then(data => {
            console.log('提交签名响应:', data);
        })
        .catch(error => {
            console.error('提交签名请求出现问题:', error);
        });
}
