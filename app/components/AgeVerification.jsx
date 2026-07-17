import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {getCookie, setCookie} from '~/lib/cookies';

const AGE_VERIFIED_COOKIE = 'ageVerified';

export function AgeVerification() {
  const [shouldRender, setShouldRender] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [underage, setUnderage] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (getCookie(AGE_VERIFIED_COOKIE) === 'true') return;

    setShouldRender(true);
    const showTimer = window.setTimeout(() => setOverlayVisible(true), 10);

    return () => window.clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!underage) return undefined;

    const redirectTimer = window.setTimeout(() => {
      window.location.href = 'https://www.google.com/';
    }, 3000);

    return () => window.clearTimeout(redirectTimer);
  }, [underage]);

  const handleUnderage = () => {
    setUnderage(true);
  };

  const handleVerified = () => {
    setCookie(AGE_VERIFIED_COOKIE, 'true');
    setModalVisible(false);

    window.setTimeout(() => {
      setDismissed(true);
    }, 500);
  };

  if (!shouldRender || dismissed) return null;

  return (
    <div
      id="age_check"
      className="age-check"
      style={{
        opacity: overlayVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div
        id="age_check_modal"
        className="age-check-cnt"
        style={{
          opacity: modalVisible ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        {underage ? (
          <p>
            Sorry, but you have not <br /> reached the legal age of vaping.
          </p>
        ) : (
          <>
            <h3 className="f-d-bold">AGE VERIFICATION</h3>
            <p>
              To use the VAPORESSO website you must be aged 21 years or over.
              Please verify your age before entering the site. We use cookies to
              improve our website and your experience browsing it. By continuing
              to browse our website you accept our{' '}
              <Link to="/privacy-policy">Cookie Policy</Link>.
            </p>
            <a
              className="age-check-btn age-check-under f-d-bold"
              role="button"
              tabIndex={0}
              onClick={handleUnderage}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleUnderage();
                }
              }}
            >
              under 21
            </a>
            <a
              className="age-check-btn age-check-over f-d-bold"
              role="button"
              tabIndex={0}
              onClick={handleVerified}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleVerified();
                }
              }}
            >
              21+
            </a>
            <span className="age-check-warning">
              WARNING:
              <br /> This product contains nicotine. Nicotine is an addictive
              chemical.
            </span>
          </>
        )}
      </div>
    </div>
  );
}
