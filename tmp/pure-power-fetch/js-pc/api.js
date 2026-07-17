/** 基础请求URL */
const baseURL = 'https://brand.vaporesso.com/vaporesso/java/data/activity'

/** 创建axios实例 */
 const request = axios.create({
   baseURL,
   timeout: 10000
 })

/** 响应拦截器 */
 request.interceptors.response.use(
   response => {
     const res = response.data
     if (res.status === 200) {
       return res.data
     }
     return Promise.reject(res.message || 'Error')
   },
   error => {
     return Promise.reject(error)
   }
 )

/** API对象 */
 window.api = {
   /** 测试接口 */
   getTest() {
     return request({
       url: '/vote/get_test',
       method: 'get'
     })
   },

   /** 获取投票数列表
    * @returns {Promise<{list: Array<{id: number, num: string, activityType: string, description: string}>}>}
   */
   getVoteList() {
     return request({
       url: '/vote/list',
       method: 'post',
       data: {
         activityType: 'care_2024'
       }
     })
   },

   /** 投票
    * @param {number} id - 投票ID
    * @param {boolean} isAdd - 是否增加票数
    * @returns {Promise<{id: number, num: string, activityType: string, description: string}>}
    */
   updateVote(id, isAdd = true) {
     return request({
       url: '/vote/update',
       method: 'post',
       data: {
         id,
         isAdd
       }
     })
   },

   /** 抽奖
    * @returns {Promise<{prizeId: number}>} prizeId: 0-折扣码，1-一等奖，2-二等奖，3-三等奖
    */
   lottery() {
     return request({
       url: '/vote/lottery',
       method: 'post',
       data: {
         activityType: 'care_2024'
       }
     })
   },

   /** 提交中奖信息
    * @param {Object} data
    * @param {number} data.prizeId - 奖品ID
    * @param {string} data.Email - 邮箱
    */
   submitPrize(data) {
     return request({
       url: '/vote/email/add',
       method: 'post',
       data: {
         ...data,
         activityType: 'care_2024'
       }
     })
   },

   /** 获取签名列表
    * @returns {Promise<{list: Array<{name: string, avatar_id: number, activeType: string}>}>}
    */
   getCommentList() {
     return request({
       url: '/vote/comment/list',
       method: 'post',
       data: {
         activityType: 'care_2024'
       }
     })
   },

   /** 提交签名
    * @param {string} name - 名字
    * @param {number} avatar_id - 头像ID
    */
   addComment(name, avatar_id) {
     return request({
       url: '/vote/comment/add',
       method: 'post',
       data: {
         name,
         avatar_id,
         activityType: 'care_2024'
       }
     })
   }
 }
