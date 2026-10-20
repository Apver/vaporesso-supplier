import {useEffect, useRef, useState} from 'react';

const ASSET =
  'https://cdn.shopify.com/s/files/1/0703/9873/8521/files';
const FADE_MS = 280;

const NOW = 'xros6-mini-battery-remove__nowrap';

const REMOVE_STEPS = [
  {
    id: 1,
    text: 'Use a tool to remove the screws on both sides.',
    pc: `${ASSET}/xros6-mini-remove-step-1.webp`,
    mob: `${ASSET}/xros6-mini-mob-remove-step-1.webp`,
  },
  {
    id: 2,
    text: (
      <>
        Disconnect the{' '}
        <span className={NOW}>positive and negative</span> tabs.
      </>
    ),
    warnLead: 'DO NOT USE',
    warnRest: 'METAL OBJECTS',
    pc: `${ASSET}/xros6-mini-remove-step-2.webp`,
    mob: `${ASSET}/xros6-mini-mob-remove-step-2.webp`,
  },
  {
    id: 3,
    text: <span className={NOW}>Remove the battery.</span>,
    pc: `${ASSET}/xros6-mini-remove-step-3.webp`,
    mob: `${ASSET}/xros6-mini-mob-remove-step-3.webp`,
  },
];

/**
 * XROS 6 MINI R — How to remove the battery
 * tab 切换时三张卡片渐隐渐显
 */
export function Xros6MiniBatteryRemoveSection() {
  const [tab, setTab] = useState('remove');
  const [panelTab, setPanelTab] = useState('remove');
  const [fadeIn, setFadeIn] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const switchTab = (next) => {
    if (next === tab || timerRef.current) return;
    setTab(next);
    setFadeIn(false);
    timerRef.current = setTimeout(() => {
      setPanelTab(next);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFadeIn(true);
          timerRef.current = null;
        });
      });
    }, FADE_MS);
  };

  return (
    <section className="xros6-mini-battery-remove">
      <div className="custom__container1">
        <p className="xros6-mini-battery-remove__eyebrow to-top">
          How to remove the battery
        </p>
        <div className="xros6-mini-battery-remove__title to-top">
          XROS 6 MINI R Version
        </div>
        <p className="xros6-mini-battery-remove__note to-top">
          (Only Available in Europe)
        </p>

        <div className="xros6-mini-battery-remove__tabs to-top" data-tab={tab}>
          <span
            className="xros6-mini-battery-remove__tabs-thumb"
            aria-hidden="true"
          />
          <button
            type="button"
            className={`xros6-mini-battery-remove__tab${
              tab === 'remove' ? ' is-active' : ''
            }`}
            onClick={() => switchTab('remove')}
          >
            REMOVE
          </button>
          <button
            type="button"
            className={`xros6-mini-battery-remove__tab${
              tab === 'reinstall' ? ' is-active' : ''
            }`}
            onClick={() => switchTab('reinstall')}
          >
            REINSTALL
          </button>
        </div>

        <div
          className={`xros6-mini-battery-remove__panel${
            fadeIn ? ' is-in' : ''
          }`}
        >
          {panelTab === 'remove' ? (
            <div className="xros6-mini-battery-remove__steps">
              {REMOVE_STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className="xros6-mini-battery-remove__step"
                  style={{transitionDelay: fadeIn ? `${index * 60}ms` : '0ms'}}
                >
                  <div className="xros6-mini-battery-remove__step-copy">
                    <div className="xros6-mini-battery-remove__step-num">
                      {step.id}
                    </div>
                    <div className="xros6-mini-battery-remove__step-text">
                      <p>{step.text}</p>
                      {step.warnLead ? (
                        <p className="xros6-mini-battery-remove__step-warn">
                          <span className={NOW}>
                            <span
                              className="xros6-mini-battery-remove__warn-icon"
                              aria-hidden="true"
                            >
                              <svg
                                width="16"
                                height="14"
                                viewBox="0 0 16 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.134.87a1 1 0 0 1 1.732 0l6.268 10.856A1 1 0 0 1 14.268 13H1.732a1 1 0 0 1-.866-1.274L7.134.87Z"
                                  fill="#F5A623"
                                />
                                <path
                                  d="M8 4.2v4.2M8 10.2h.01"
                                  stroke="#000"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </span>
                            {step.warnLead}
                          </span>{' '}
                          {step.warnRest}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <picture className="xros6-mini-battery-remove__step-pic">
                    <source media="(max-width: 1023px)" srcSet={step.mob} />
                    <img src={step.pc} alt={`Step ${step.id}`} />
                  </picture>
                </div>
              ))}
            </div>
          ) : (
            <div className="xros6-mini-battery-remove__reinstall">
              <div className="xros6-mini-battery-remove__reinstall-copy">
                <div className="xros6-mini-battery-remove__step-num">1</div>
                <div className="xros6-mini-battery-remove__reinstall-text">
                  <p className="reinstall-title">
                    Reinstall in reverse order.
                  </p>
                  <p className="xros6-mini-battery-remove__reinstall-note">
                    NOTE: Ensure correct polarity when reconnecting the tabs, red
                    to positive (+) and black to negative (-).
                  </p>
                </div>
              </div>
              <picture className="xros6-mini-battery-remove__reinstall-pic">
                <source
                  media="(max-width: 1023px)"
                  srcSet={`${ASSET}/xros6-mini-mob-reinstall.webp`}
                />
                <img
                  src={`${ASSET}/xros6-mini-reinstall.webp`}
                  alt="Reinstall battery polarity"
                />
              </picture>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
