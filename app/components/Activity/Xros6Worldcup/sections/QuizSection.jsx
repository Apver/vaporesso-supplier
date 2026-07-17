export function QuizSection() {
  return (
    <div data-xwc="quiz-scroll-section">
      <div className="quiz-section">
        <div className="quiz-section-stick">
          <div className="quiz-wrapper">
            <div className="quize-md-lt">
              <div className="quize-md-lt-wrapper to-top">
                <div data-xwc="lazy-video" className="quize-md-lt-video">
                  <video className="quize-md-lt-bgvdo" muted loop playsInline>
                    <source
                      src="https://cdn.shopify.com/videos/c/o/v/22be871f71c547959ba3dc8d57eb418a.mp4"
                      type="video/mp4"
                      media="(min-width: 992px)"
                    />
                    <source
                      src="https://cdn.shopify.com/videos/c/o/v/487252d369284f5a9ebdd85855d1e877.mp4"
                      type="video/mp4"
                      media="(max-width: 991px)"
                    />
                  </video>
                </div>
                <div className="quize-md-lt-cnt-box">
                  <div className="quize-md-lt-cnt">
                    <h3>VAPORESSO</h3>
                    <h4>XROS 6</h4>
                  </div>
                  <div className="quize-md-lt-p">
                    With 60s Smart Prime, the coil is properly saturated in just
                    one minute. Fast saturation, instant satisfaction—get ready
                    to fuel your World Cup hype without the wait!
                  </div>
                </div>
                <div className="quize-md-lt-cnt-box1">
                  <div className="cnt-box1-cnt1">
                    <h3>VAPORESSO</h3>
                    <h4>XROS 6</h4>
                  </div>
                  <div className="mb-cnt-box1-timer">
                    <div className="cnt-box1-timer-container">
                      <svg className="timer-svg" viewBox="0 0 100 100">
                        <circle
                          className="timer-bg"
                          cx="50"
                          cy="50"
                          r="45"
                        ></circle>
                        <circle
                          className="timer-progress"
                          cx="50"
                          cy="50"
                          r="45"
                        ></circle>
                      </svg>
                      <div className="cnt-box1-timer-text">
                        <span id="timeLeft">60</span>S
                      </div>
                    </div>
                    <div className="timer-status-text">
                      COUNTDOWN: <span id="statusText">3S</span>
                    </div>
                  </div>

                  <div className="cnt-box1-txt1">Priming in progress...</div>
                  <div className="cnt-box1-txt2">
                    Please wait until the <br /> countdown reaches zero.
                  </div>
                  <div className="quiz-start-button" id="quiz-start-button">
                    <svg viewBox="0 0 26 26" fill="none">
                      <path
                        d="M9.44824 6.42969C9.87623 6.14248 10.4307 5.97756 11 6.37891C11.4827 6.71941 11.7257 7.3107 11.7275 7.90137L11.75 14.6211C11.7755 14.5867 13.548 12.2156 15.6289 14.792C15.6289 14.792 17.1999 12.1499 19.4111 14.918C19.4204 14.8999 20.9811 11.8724 22.5518 15.1846V19.7051C22.5517 21.1167 22.1195 22.4948 21.3145 23.6543C20.8125 24.3772 20.143 24.9678 19.3633 25.376C18.5834 25.7842 17.7162 25.9977 16.8359 25.998L12.6182 26C11.835 26.0006 11.0615 25.8252 10.3555 25.4863C9.64942 25.1474 9.02846 24.6534 8.53906 24.042L3.97559 18.3398C3.97559 18.3398 3.66476 15.4813 6.42676 16.6855C8.00751 17.3944 8.58036 18.881 8.58887 18.9033L8.64062 8.01172C8.64349 7.38602 8.92892 6.77825 9.44824 6.42969ZM10.2246 0C14.3247 9.0992e-05 17.6602 3.33525 17.6602 7.43457C17.6603 9.20947 17.0252 10.9258 15.8701 12.2734C15.7741 12.3807 15.6398 12.4466 15.4961 12.4561C15.3525 12.4655 15.2109 12.4179 15.1016 12.3242C14.9922 12.2305 14.9237 12.0976 14.9111 11.9541C14.8986 11.8107 14.9428 11.6679 15.0342 11.5566C16.0181 10.4086 16.5586 8.94653 16.5586 7.43457C16.5586 3.94206 13.7171 1.1007 10.2246 1.10059C6.73205 1.10059 3.88965 3.94123 3.88965 7.43457C3.89147 8.43762 4.13096 9.4264 4.58789 10.3193C5.04478 11.212 5.70628 11.9841 6.51855 12.5723C6.57818 12.6143 6.62914 12.6678 6.66797 12.7295C6.70674 12.7911 6.73307 12.8598 6.74512 12.9316C6.75713 13.0035 6.75491 13.0775 6.73828 13.1484C6.72164 13.2194 6.69115 13.2866 6.64844 13.3457C6.6057 13.4048 6.55148 13.4551 6.48926 13.4932C6.42718 13.5311 6.35802 13.5562 6.28613 13.5674C6.2141 13.5785 6.14008 13.5751 6.06934 13.5576C5.99855 13.5401 5.9316 13.5083 5.87305 13.4648C4.91957 12.7742 4.14348 11.8675 3.60742 10.8193C3.07135 9.77107 2.79082 8.61097 2.78906 7.43359C2.78906 3.33424 6.12447 0 10.2246 0ZM10.2246 2.5957C12.8066 2.5957 14.9062 4.69564 14.9062 7.27734C14.9083 7.98454 14.7483 8.68262 14.4385 9.31836C14.3747 9.44978 14.2611 9.55083 14.123 9.59863C13.9851 9.64629 13.8335 9.63699 13.7021 9.57324C13.5711 9.50948 13.4708 9.39642 13.4229 9.25879C13.3749 9.12075 13.3836 8.96846 13.4473 8.83691C13.6845 8.35133 13.8071 7.81776 13.8057 7.27734C13.8057 5.30294 12.1982 3.69629 10.2246 3.69629C8.25107 3.69638 6.64453 5.303 6.64453 7.27734C6.64407 7.9191 6.81652 8.54938 7.14355 9.10156C7.18174 9.16368 7.20747 9.23265 7.21875 9.30469C7.23001 9.3768 7.22642 9.45061 7.20898 9.52148C7.19154 9.59227 7.16056 9.65918 7.11719 9.71777C7.07374 9.77636 7.01873 9.82598 6.95605 9.86328C6.89325 9.9006 6.82332 9.92538 6.75098 9.93555C6.67867 9.9457 6.6048 9.9414 6.53418 9.92285C6.46364 9.90429 6.39777 9.87147 6.33984 9.82715C6.28184 9.78274 6.23265 9.72743 6.19629 9.66406C5.76846 8.94151 5.54342 8.11705 5.54395 7.27734C5.54395 4.69569 7.64272 2.59579 10.2246 2.5957Z"
                        fill="white"
                      />
                    </svg>
                    <span>Click to Prime</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="quize-md-rt">
              <div className="quize-md-rt-wrapper">
                <div className="quize-md-rt-header">
                  <h3>Answer correctly to move the ball!</h3>
                  <div className="quize-md-rt-process">
                    <span>
                      QUESTION <span id="currentQNum">1</span>/6
                    </span>
                    <div className="dots" id="progressDots"></div>
                  </div>
                </div>
                <div className="quize-md-rt-content">
                  <div className="quize-cnt-lt">
                    <div className="quize-cnt-lt-field-container">
                      <img
                        src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-5.webp"
                        className="quize-cnt-lt-field-bg"
                        id="quize-cnt-lt-field-bg"
                        alt="Football Field"
                      />

                      <img
                        id="player-character"
                        src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-8-1.webp"
                        className="player-fixed"
                        alt="Player"
                      />

                      <img
                        id="player-bast-img"
                        src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-6.webp"
                        className="player-bast-img"
                        alt="Football"
                      />
                      <div id="player-box-shadow" className="player-box-shadow">
                        <svg width="" height="" viewBox="0 0 24 6" fill="none">
                          <ellipse
                            cx="11.8221"
                            cy="2.81479"
                            rx="11.8221"
                            ry="2.81479"
                            fill="#222B53"
                            fillOpacity="0.86"
                          />
                        </svg>
                      </div>
                      <div id="men--box-shadow" className="men--box-shadow">
                        <svg width="" height="" viewBox="0 0 97 8" fill="none">
                          <ellipse
                            cx="48.0647"
                            cy="3.68196"
                            rx="48.0647"
                            ry="3.68196"
                            fill="#222B53"
                            fillOpacity="0.86"
                          />
                        </svg>
                      </div>
                      <img
                        id="goalkeeper-img"
                        src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros6-worldcup-04-7.webp"
                        className="goalkeeper-img"
                        alt="goalkeeper"
                      />
                    </div>
                  </div>
                  <div className="quize-cnt-rt">
                    <div className="quize-cnt-rt-wrapper">
                      <div className="quize-rt-question-title">
                        <div className="q-number" id="qNumberBadge">
                          01
                        </div>
                        <div className="q-text" id="questionText">
                          Loading question...
                        </div>
                      </div>
                      <div className="options-grid" id="optionsContainer"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
