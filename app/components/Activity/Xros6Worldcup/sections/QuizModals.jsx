export function QuizModals() {
  return (
    <>
      <div className="qes-modal-dlo qes-error-modal-content">
        <div className="qes-modal-dlo-wrapper">
          <button className="qes-close-btn">
            <img
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-10-Close.png"
              alt=""
            />
          </button>
          <div className="qes-error-modal-fx-scroll">
            <div className="qes-error-modal-cnt">
              <picture className="qes-error-pic">
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-Mob-04-10-WrongAnwser.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-10-WrongAnwser.webp"
                />
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-10-WrongAnwser.webp"
                  className=""
                  alt=""
                />
              </picture>
              <div className="qes-error-modal-rt">
                <h3>Wrong Answer. Challenge Failed.</h3>
                <div className="qes-modal-txt">
                  So close! You didn’t complete this round.Give it another shot,
                  or share a photo of your World Cup match-day moment with XROS
                  devices on social media for another chance to win.
                </div>
                <a
                  href="https://www.instagram.com/vaporesso_global/"
                  target="_blank"
                  rel="noreferrer"
                  className="qes-modal-btn"
                >
                  <span>Go to Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="15"
                    viewBox="0 0 28 15"
                    fill="none"
                  >
                    <path
                      d="M25.3 7.47502L26.0084 8.38094L27.1669 7.47502L26.0084 6.56911L25.3 7.47502ZM17.9197 0.244109C17.4194 -0.147124 16.6967 -0.0586891 16.3054 0.441634C15.9142 0.941958 16.0026 1.66471 16.503 2.05594L17.2114 1.15002L17.9197 0.244109ZM16.503 12.8941C16.0026 13.2853 15.9142 14.0081 16.3054 14.5084C16.6967 15.0087 17.4194 15.0972 17.9197 14.7059L17.2114 13.8L16.503 12.8941ZM12.5052 7.47502V6.32502H12.5052L12.5052 7.47502ZM17.2114 1.15002L16.503 2.05594L24.5916 8.38094L25.3 7.47502L26.0084 6.56911L17.9197 0.244109L17.2114 1.15002ZM25.3 7.47502L24.5916 6.56911L16.503 12.8941L17.2114 13.8L17.9197 14.7059L26.0084 8.38094L25.3 7.47502ZM0 7.47518L1.45738e-05 8.62518L12.5052 8.62502L12.5052 7.47502L12.5052 6.32502L-1.45738e-05 6.32518L0 7.47518ZM12.5052 7.47502V8.62502H25.3V7.47502V6.32502H12.5052V7.47502Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="qes-modal-dlo time-end-modal-content">
        <div className="qes-modal-dlo-wrapper">
          <button className="qes-close-btn">
            <img
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-10-Close.png"
              alt=""
            />
          </button>
          <div className="qes-error-modal-fx-scroll">
            <div className="qes-error-modal-cnt">
              <picture className="qes-error-pic">
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-Mob-04-10-TimesUp.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-10-TimesUp.webp"
                />
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-10-TimesUp.webp"
                  className=""
                  alt=""
                />
              </picture>
              <div className="qes-error-modal-rt">
                <h3>
                  Time’s Up. <br /> Challenge Over.
                </h3>
                <div className="qes-modal-txt">
                  The 60-second countdown has ended.Give it another shot, or
                  share a photo of your World Cup match-day moment with XROS
                  devices on social media for another chance to win.
                </div>
                <a
                  href="https://www.instagram.com/vaporesso_global/"
                  target="_blank"
                  rel="noreferrer"
                  className="qes-modal-btn"
                >
                  <span>Go to Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="15"
                    viewBox="0 0 28 15"
                    fill="none"
                  >
                    <path
                      d="M25.3 7.47502L26.0084 8.38094L27.1669 7.47502L26.0084 6.56911L25.3 7.47502ZM17.9197 0.244109C17.4194 -0.147124 16.6967 -0.0586891 16.3054 0.441634C15.9142 0.941958 16.0026 1.66471 16.503 2.05594L17.2114 1.15002L17.9197 0.244109ZM16.503 12.8941C16.0026 13.2853 15.9142 14.0081 16.3054 14.5084C16.6967 15.0087 17.4194 15.0972 17.9197 14.7059L17.2114 13.8L16.503 12.8941ZM12.5052 7.47502V6.32502H12.5052L12.5052 7.47502ZM17.2114 1.15002L16.503 2.05594L24.5916 8.38094L25.3 7.47502L26.0084 6.56911L17.9197 0.244109L17.2114 1.15002ZM25.3 7.47502L24.5916 6.56911L16.503 12.8941L17.2114 13.8L17.9197 14.7059L26.0084 8.38094L25.3 7.47502ZM0 7.47518L1.45738e-05 8.62518L12.5052 8.62502L12.5052 7.47502L12.5052 6.32502L-1.45738e-05 6.32518L0 7.47518ZM12.5052 7.47502V8.62502H25.3V7.47502V6.32502H12.5052V7.47502Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="qes-modal-dlo que-sucess-modal-content">
        <div className="qes-modal-dlo-wrapper">
          <button className="qes-close-btn">
            <img
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-10-Close.png"
              alt=""
            />
          </button>

          <div className="qes-error-modal-fx-scroll">
            <div className="qes-error-modal-cnt">
              <div className="weight-ses-bbx">
                <div className="weight-wheel-wrapper">
                  <div className="weight-wheel-inner">
                    <div className="weight-wheel-content">
                      <div className="weight-wheel-wrap">
                        <div
                          className="wheel-wrap"
                          role="application"
                          aria-label="抽奖转盘"
                        >
                          <div className="pointer-base" aria-hidden="true">
                            <svg
                              width=""
                              height=""
                              viewBox="0 0 93 48"
                              fill="none"
                            >
                              <path
                                d="M92.792 23.7744C92.7919 36.9045 82.1477 47.5488 69.0176 47.5488C66.8028 47.5488 64.6591 47.2443 62.625 46.6777V46.707L62.2461 46.5674C61.2933 46.2847 60.3656 45.9446 59.4668 45.5498L0 23.7744L59.4668 1.99805C60.3655 1.60331 61.2933 1.26309 62.2461 0.980469L62.625 0.841797V0.871094C64.6592 0.30454 66.8028 0 69.0176 0C82.1477 1.59324e-05 92.792 10.6443 92.792 23.7744Z"
                                fill="#D6B15E"
                              />
                              <circle
                                cx="70.0777"
                                cy="23.9836"
                                r="16.4096"
                                transform="rotate(90 70.0777 23.9836)"
                                fill="white"
                              />
                            </svg>
                          </div>

                          <svg
                            className="wheel"
                            viewBox="0 0 1000 1000"
                            role="img"
                            aria-label="转盘"
                          >
                            <g
                              id="wheel-group"
                              transform="rotate(0 500 500)"
                            ></g>
                          </svg>
                          <img
                            src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-06-11.svg"
                            className="wheel-bg wheel-bg-top2"
                            alt=""
                          />

                          <div
                            className="weighing-plate-center-btn"
                            id="centerBtn"
                          >
                            <svg
                              width="139"
                              height="139"
                              viewBox="0 0 139 139"
                              fill="none"
                            >
                              <path
                                d="M121.09 69.045C121.09 97.7887 97.7887 121.09 69.045 121.09C40.3013 121.09 17 97.7887 17 69.045C17 40.3013 40.3013 17 69.045 17C97.7887 17 121.09 40.3013 121.09 69.045Z"
                                fill="white"
                              />
                              <path
                                d="M121.09 69.0449C121.09 40.3013 97.7886 17 69.0449 17C40.3013 17 17 40.3013 17 69.0449C17 97.7886 40.3013 121.09 69.0449 121.09C97.7886 121.09 121.09 97.7886 121.09 69.0449ZM138.09 69.0449C138.09 107.177 107.177 138.09 69.0449 138.09C30.9125 138.09 0 107.177 0 69.0449C3.91761e-05 30.9125 30.9125 3.9171e-05 69.0449 0C107.177 0 138.09 30.9125 138.09 69.0449Z"
                                fill="black"
                              />
                              <path
                                d="M101.493 42.739H89.0532L83.3987 52.5247L64.9582 84.4668V47.2626C60.8039 48.1165 57.0881 50.1475 54.2031 53.0094V106H64.9582L101.493 42.739Z"
                                fill="black"
                              />
                              <path
                                d="M100.481 76.666C102.674 68.4959 101.497 60.2565 97.8503 53.3096L92.3343 62.8645C93.2113 66.5572 93.2113 70.5269 92.1727 74.4273C90.0033 82.5052 83.7949 88.6443 76.1094 90.9753L70.5703 100.553C84.3257 99.9994 96.7425 90.6522 100.481 76.666Z"
                                fill="black"
                              />
                              <path
                                d="M69.2918 44.6087C71.3458 44.6087 73.423 44.8856 75.4309 45.4164C78.2235 46.155 80.7392 47.4013 82.9779 48.9707L87.2938 41.516C84.4319 39.5773 81.2008 38.0541 77.6696 37.1078C74.877 36.3693 72.0613 36 69.2918 36C55.0286 36 41.9656 45.5088 38.1113 59.9335C34.3494 73.9427 40.4193 88.252 52.0744 95.6144V84.5131C50.8281 83.1976 49.7203 81.7436 48.7971 80.128C45.6352 74.6582 44.8044 68.2652 46.443 62.1491C49.2126 51.8095 58.6059 44.5856 69.2918 44.5856"
                                fill="black"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="qes-error-modal-rt">
                <h3>
                  Challenge <br /> Complete. <br /> You’re In!
                </h3>
                <div className="qes-modal-txt qes-modal-txt2">
                  Enter your email and spin the lucky wheel to see if today’s
                  your day.
                </div>
                <div className="qes-modal-txt qes-modal-txt1">
                  <span>You’re Eligible to Draw!</span> Enter your email to spin
                  the wheel and try your luck.
                </div>
                <div className="email-wrapper">
                  <div className="email-valid-ces">Email Already Used</div>
                  <div className="email-wrapper-controls">
                    <input
                      id="email"
                      className="que-sucess-email-input"
                      placeholder="Email Start"
                      type="email"
                      aria-label="Email"
                    />
                    <button id="startBtn" className="start-btn">
                      <svg width="" height="" viewBox="0 0 36 36" fill="none">
                        <rect width="" height="" fill="black" />
                        <path
                          d="M30 18L30.7084 18.9059L31.8669 18L30.7084 17.0941L30 18ZM23.0354 11.0941C22.535 10.7029 21.8123 10.7913 21.4211 11.2916C21.0298 11.7919 21.1183 12.5147 21.6186 12.9059L22.327 12L23.0354 11.0941ZM21.6186 23.0941C21.1183 23.4853 21.0298 24.2081 21.4211 24.7084C21.8123 25.2087 22.535 25.2971 23.0354 24.9059L22.327 24L21.6186 23.0941ZM17.8627 18V16.85H17.8627L17.8627 18ZM22.327 12L21.6186 12.9059L29.2916 18.9059L30 18L30.7084 17.0941L23.0354 11.0941L22.327 12ZM30 18L29.2916 17.0941L21.6186 23.0941L22.327 24L23.0354 24.9059L30.7084 18.9059L30 18ZM6 18.0002L6.00001 19.1502L17.8627 19.15L17.8627 18L17.8627 16.85L5.99999 16.8502L6 18.0002ZM17.8627 18V19.15H30V18V16.85H17.8627V18Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="email-tip-txt" id="email-tip-txt">
                    *The email will only be used for winners contact
                  </div>
                </div>
                <a
                  href="https://www.instagram.com/vaporesso_global/"
                  target="_blank"
                  rel="noreferrer"
                  className="qes-modal-btn"
                >
                  <span>Go to Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="15"
                    viewBox="0 0 28 15"
                    fill="none"
                  >
                    <path
                      d="M25.3 7.47502L26.0084 8.38094L27.1669 7.47502L26.0084 6.56911L25.3 7.47502ZM17.9197 0.244109C17.4194 -0.147124 16.6967 -0.0586891 16.3054 0.441634C15.9142 0.941958 16.0026 1.66471 16.503 2.05594L17.2114 1.15002L17.9197 0.244109ZM16.503 12.8941C16.0026 13.2853 15.9142 14.0081 16.3054 14.5084C16.6967 15.0087 17.4194 15.0972 17.9197 14.7059L17.2114 13.8L16.503 12.8941ZM12.5052 7.47502V6.32502H12.5052L12.5052 7.47502ZM17.2114 1.15002L16.503 2.05594L24.5916 8.38094L25.3 7.47502L26.0084 6.56911L17.9197 0.244109L17.2114 1.15002ZM25.3 7.47502L24.5916 6.56911L16.503 12.8941L17.2114 13.8L17.9197 14.7059L26.0084 8.38094L25.3 7.47502ZM0 7.47518L1.45738e-05 8.62518L12.5052 8.62502L12.5052 7.47502L12.5052 6.32502L-1.45738e-05 6.32518L0 7.47518ZM12.5052 7.47502V8.62502H25.3V7.47502V6.32502H12.5052V7.47502Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="qes-modal-dlo no-win-modal-content">
        <div className="qes-modal-dlo-wrapper">
          <button className="qes-close-btn">
            <img
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-10-Close.png"
              alt=""
            />
          </button>
          <div className="qes-error-modal-fx-scroll">
            <div className="qes-error-modal-cnt">
              <picture className="qes-error-pic">
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-Mob-no-win.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-no-win.webp"
                />
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-no-win.webp"
                  className=""
                  alt=""
                />
              </picture>
              <div className="qes-error-modal-rt">
                <h3>
                  So Close! <br />
                  Not This Time.
                </h3>
                <div className="qes-modal-txt">
                  Luck just missed you today. You can also share a photo of your
                  World Cup match-day moment with XROS devices on social media
                  for another chance to win.
                </div>
                <a
                  href="https://www.instagram.com/vaporesso_global/"
                  target="_blank"
                  rel="noreferrer"
                  className="qes-modal-btn"
                >
                  <span>Go to Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="15"
                    viewBox="0 0 28 15"
                    fill="none"
                  >
                    <path
                      d="M25.3 7.47502L26.0084 8.38094L27.1669 7.47502L26.0084 6.56911L25.3 7.47502ZM17.9197 0.244109C17.4194 -0.147124 16.6967 -0.0586891 16.3054 0.441634C15.9142 0.941958 16.0026 1.66471 16.503 2.05594L17.2114 1.15002L17.9197 0.244109ZM16.503 12.8941C16.0026 13.2853 15.9142 14.0081 16.3054 14.5084C16.6967 15.0087 17.4194 15.0972 17.9197 14.7059L17.2114 13.8L16.503 12.8941ZM12.5052 7.47502V6.32502H12.5052L12.5052 7.47502ZM17.2114 1.15002L16.503 2.05594L24.5916 8.38094L25.3 7.47502L26.0084 6.56911L17.9197 0.244109L17.2114 1.15002ZM25.3 7.47502L24.5916 6.56911L16.503 12.8941L17.2114 13.8L17.9197 14.7059L26.0084 8.38094L25.3 7.47502ZM0 7.47518L1.45738e-05 8.62518L12.5052 8.62502L12.5052 7.47502L12.5052 6.32502L-1.45738e-05 6.32518L0 7.47518ZM12.5052 7.47502V8.62502H25.3V7.47502V6.32502H12.5052V7.47502Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="qes-modal-dlo win-sucess-modal-content">
        <div className="qes-modal-dlo-wrapper">
          <button className="qes-close-btn">
            <img
              src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-10-Close.png"
              alt=""
            />
          </button>
          <div className="qes-error-modal-fx-scroll">
            <div className="qes-error-modal-cnt">
              <picture className="qes-error-pic">
                <source
                  media="(max-width: 1023px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-pop-prize1.webp"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-pop-prize1.webp"
                />
                <img
                  src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-pop-prize1.webp"
                  className=""
                  alt=""
                />
              </picture>
              <div className="qes-error-modal-rt">
                <h3 className="js-sucess-tip-h3">
                  Congratulations! <br />
                  You won the <span className="js-sucess-tip-num">Grand</span>
                  Prize —{' '}
                  <span className="js-sucess-tip">AFA Signed Jersey</span>!
                </h3>
                <div className="qes-modal-txt qes-modal-txt2">
                  Thanks for joining the campaign. We’ll contact you via email
                  after the event ends with prize details. Final rewards are
                  subject to official confirmation.
                </div>
                <div className="qes-modal-txt qes-modal-txt1">
                  Want more chances? Share a photo of your World Cup match-day
                  moment with XROS devices on social media for another chance to
                  win.
                </div>
                <a
                  href="https://www.instagram.com/vaporesso_global/"
                  target="_blank"
                  rel="noreferrer"
                  className="qes-modal-btn"
                >
                  <span>Go to Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="15"
                    viewBox="0 0 28 15"
                    fill="none"
                  >
                    <path
                      d="M25.3 7.47502L26.0084 8.38094L27.1669 7.47502L26.0084 6.56911L25.3 7.47502ZM17.9197 0.244109C17.4194 -0.147124 16.6967 -0.0586891 16.3054 0.441634C15.9142 0.941958 16.0026 1.66471 16.503 2.05594L17.2114 1.15002L17.9197 0.244109ZM16.503 12.8941C16.0026 13.2853 15.9142 14.0081 16.3054 14.5084C16.6967 15.0087 17.4194 15.0972 17.9197 14.7059L17.2114 13.8L16.503 12.8941ZM12.5052 7.47502V6.32502H12.5052L12.5052 7.47502ZM17.2114 1.15002L16.503 2.05594L24.5916 8.38094L25.3 7.47502L26.0084 6.56911L17.9197 0.244109L17.2114 1.15002ZM25.3 7.47502L24.5916 6.56911L16.503 12.8941L17.2114 13.8L17.9197 14.7059L26.0084 8.38094L25.3 7.47502ZM0 7.47518L1.45738e-05 8.62518L12.5052 8.62502L12.5052 7.47502L12.5052 6.32502L-1.45738e-05 6.32518L0 7.47518ZM12.5052 7.47502V8.62502H25.3V7.47502V6.32502H12.5052V7.47502Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
