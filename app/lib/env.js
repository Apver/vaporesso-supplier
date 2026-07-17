/**
 * @param {Env} env
 */
export function getCheckoutDomain(env) {
  return env.PUBLIC_CHECKOUT_DOMAIN || env.PUBLIC_STORE_DOMAIN;
}
