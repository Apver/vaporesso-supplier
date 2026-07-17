/**
 * Spec 区块图文混排中的响应式图片配置。
 * @param {string} pc PC 端图片 URL
 * @param {string} [mobile] 移动端图片 URL，为空时移动端使用 PC 图
 * @returns {{ pc: string, mobile: string }}
 */
export function specImg(pc, mobile = '') {
  return {pc, mobile};
}
