import {
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import {createPortal} from 'react-dom';

import './StoreLocationsModal.scss';

const OPEN_EVENT = 'store-locations-modal:open';
const CLOSE_EVENT = 'store-locations-modal:close';

export const openStoreLocationsModal = () => {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new Event(OPEN_EVENT));
};

export const closeStoreLocationsModal = () => {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new Event(CLOSE_EVENT));
};

const LOCATIONS = [
  {
    country: 'United States',
    store: 'Discount Vape',
    address:
      '586 South Jefferson Avenue, Suite N, Cookeville, TN 38501, USA',
  },
  {
    country: 'United Kingdom',
    store: 'Premium Vapor Store Ilford',
    address:
      '837 High Road, Ilford IG3 8TG, UK',
  },
  {
    country: 'France',
    store: 'Le Coin de la Vape',
    address:
      '25 Rue de la Croix Nivert, 75015 Paris, France',
  },
];

const StoreLocationsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const titleId = useId();

  const closeButtonRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    const handleOpen = () => {
      setIsOpen(true);
    };

    const handleClose = () => {
      setIsOpen(false);
    };

    window.addEventListener(
      OPEN_EVENT,
      handleOpen,
    );

    window.addEventListener(
      CLOSE_EVENT,
      handleClose,
    );

    return () => {
      window.removeEventListener(
        OPEN_EVENT,
        handleOpen,
      );

      window.removeEventListener(
        CLOSE_EVENT,
        handleClose,
      );
    };
  }, []);

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') {
      return undefined;
    }

    previousActiveElementRef.current =
      document.activeElement;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown,
    );

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(focusTimer);

      window.removeEventListener(
        'keydown',
        handleKeyDown,
      );

      document.body.style.overflow =
        previousOverflow;

      previousActiveElementRef.current?.focus?.();
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isMounted || !isOpen) {
    return null;
  }

return createPortal(
  <div className="store-locations-modal-scope">
    <div className="store-locations-modal">
      <button
        type="button"
        className="store-locations-modal__backdrop"
        aria-label="Close participating store locations"
        tabIndex={-1}
        onClick={handleClose}
      />

      <div
        className="store-locations-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="story-share-modal__close"
          aria-label="Close modal"
          onClick={handleClose}
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-12.webp"
            alt=""
            aria-hidden="true"
          />
        </button>

        <div className="store-locations-modal__content">
          <h2
            id={titleId}
            className="store-locations-modal__title"
          >
            Participating Store Locations
          </h2>

          <p className="store-locations-modal__description">
            Our Pop-Up AI Station will be available at the
            following participating stores. Visit a location
            during the event period to experience the
            interactive AI installation and join the activity.
          </p>

          <div className="store-locations-modal__list">
            {LOCATIONS.map(location => (
              <div
                key={`${location.country}-${location.store}`}
                className="store-locations-modal__item"
              >
                <h3 className="store-locations-modal__country">
                  {location.country}
                </h3>

                <p className="store-locations-modal__store">
                  {location.store}
                </p>

                <p className="store-locations-modal__address">
                  {location.address}
                </p>
              </div>
            ))}
          </div>
        </div>



 <picture className="store-locations-modal__bg">
        <source
          media="(min-width: 2440px)"
          srcSet="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-11-new3.svg?v=1786002017"
        />
        <source
          media="(min-width: 1024px)"
          srcSet="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-11-new3.svg?v=1786002017"
        />
        <source
          media="(max-width: 1023px)"
          srcSet="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-Mob-06-11-new3.svg?v=1786002016"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-11-new3.svg?v=1786002017"
          className=""
          alt=""
        />
      </picture>



      </div>
    </div>
  </div>,
  document.body,
);
};

export default StoreLocationsModal;