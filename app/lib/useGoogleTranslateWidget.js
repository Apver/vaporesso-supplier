import {useEffect} from 'react';
import {
  GOOGLE_TRANSLATE_CONFIG,
  getLangCodeFromUrl,
  getLanguageName,
  getNavigatorLanguage,
  setCookie,
  deleteCookie,
  isDesktop,
} from './googleTranslate';

/**
 * Custom hook for managing Google Translate widget
 * @param {function} onLanguageChange - Callback function when language changes
 * @returns {void}
 */
export function useGoogleTranslateWidget(onLanguageChange) {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return undefined;
    }

    const updateLanguageLabel = (langCode) => {
      const currentLangEl = document.getElementById('currentLang');
      if (!currentLangEl || !langCode) return;
      const langName = getLanguageName(langCode);
      // Update immediately without waiting for Google Translate
      currentLangEl.textContent = langName;
    };

    const updateLanguageLabelFromUrl = () => {
      const langCode = getLangCodeFromUrl(window.location.pathname);
      if (langCode) {
        updateLanguageLabel(langCode);
      }
    };

    const syncCurrentLanguageLabel = () => {
      const currentLangEl = document.getElementById('currentLang');
      if (!currentLangEl) return;
      const selectedOption =
        document.querySelector('.goog-te-combo option:checked') ||
        document.querySelector('.goog-te-combo option');
      if (selectedOption?.value) {
        // Use our mapping for immediate update
        updateLanguageLabel(selectedOption.value);
      } else if (selectedOption?.textContent) {
        // Fallback to textContent if value not available
        currentLangEl.textContent = selectedOption.textContent;
      }
    };

    const handleComboChange = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLSelectElement)) return;
      if (!target.classList.contains('goog-te-combo')) return;
      const option = target.options[target.selectedIndex];

      // First: Update URL (language identifier) before translation starts
      // This ensures the URL changes first, then translation happens
      if (onLanguageChange && option?.value) {
        const langCode = option.value;
        // Call immediately (synchronously) to update URL first
        // The onLanguageChange function will handle the navigation
        onLanguageChange(langCode);
      }

      // Second: Update language label after URL update
      if (option?.value) {
        updateLanguageLabel(option.value);
      } else if (option?.textContent) {
        // Fallback if value not available
        const currentLangEl = document.getElementById('currentLang');
        if (currentLangEl) {
          currentLangEl.textContent = option.textContent;
        }
      }

      // Google Translate will automatically translate the page after the select change
      // This happens after our URL and label updates
    };

    // Move widget to correct position before initialization
    const moveGoogleTranslateWidget = () => {
      const widgetRoot = document
        .getElementById('google_translate_element_pc')
        ?.closest('.pop-lang');
      if (!widgetRoot) return;
      const pcMount = document.getElementById('footer-lang-pc-mount');
      const mobileMount = document.getElementById('footer-lang-mobile-mount');
      if (!pcMount || !mobileMount) return;
      const targetMount = isDesktop() ? pcMount : mobileMount;
      if (!targetMount.contains(widgetRoot)) {
        targetMount.appendChild(widgetRoot);
      }
    };

    // Setup widget position and target attribute before initialization
    const setupWidgetForCurrentScreen = () => {
      const pcTarget = document.getElementById('google_translate_element_pc');
      const mobileMount = document.getElementById('footer-lang-mobile-mount');

      if (!pcTarget) return false;

      // Move widget to correct position
      moveGoogleTranslateWidget();

      // Only enable data-google-translate-target on the container that should be visible
      if (isDesktop()) {
        // Desktop: enable PC target, ensure it's in PC mount
        pcTarget.setAttribute('data-google-translate-target', 'true');
        const pcMount = document.getElementById('footer-lang-pc-mount');
        const widgetRoot = pcTarget.closest('.pop-lang');
        if (widgetRoot && pcMount && !pcMount.contains(widgetRoot)) {
          pcMount.appendChild(widgetRoot);
        }
      } else {
        // Mobile: enable PC target (it will be moved to mobile mount), ensure it's in mobile mount
        pcTarget.setAttribute('data-google-translate-target', 'true');
        const widgetRoot = pcTarget.closest('.pop-lang');
        if (widgetRoot && mobileMount && !mobileMount.contains(widgetRoot)) {
          mobileMount.appendChild(widgetRoot);
        }
      }
      return true;
    };

    // Don't auto-set cookie based on browser language here
    // Cookie should be set by the page component based on locale and manual translation availability
    // This prevents conflicts with the manual translation logic

    // Setup widget position before initialization, wait for DOM if needed
    let setupRetryCount = 0;
    const maxSetupRetries = 20; // Max 1 second wait (20 * 50ms)
    const trySetupWidget = () => {
      if (setupWidgetForCurrentScreen()) {
        return; // Success
      }
      if (setupRetryCount < maxSetupRetries) {
        setupRetryCount++;
        // Retry if elements not ready yet
        if (typeof requestAnimationFrame === 'function') {
          requestAnimationFrame(trySetupWidget);
        } else {
          setTimeout(trySetupWidget, 50);
        }
      }
    };
    trySetupWidget();

    const initializeTargets = () => {
      const translateElement = window.google?.translate?.TranslateElement;
      if (typeof translateElement !== 'function') {
        return;
      }

      // Only initialize the target that should be visible
      const target = document.getElementById('google_translate_element_pc');
      if (!target) return;

      if (target.dataset.googleTranslateReady === 'true') {
        return;
      }

      new translateElement(GOOGLE_TRANSLATE_CONFIG, target.id);

      target.dataset.googleTranslateReady = 'true';
      syncCurrentLanguageLabel();

      // After initialization, check cookie and apply translation if needed
      setTimeout(() => {
        const cookieValue = document.cookie
          .split('; ')
          .find((row) => row.startsWith('googtrans='));
        if (cookieValue) {
          const cookieLang = cookieValue.split('=')[1];
          // Cookie format: /en/zh-CN, extract target language
          const match = cookieLang.match(/\/[^/]+\/([^/]+)/);
          if (match) {
            const targetLang = decodeURIComponent(match[1]);
            const translateSelect = document.querySelector('.goog-te-combo');
            if (translateSelect && translateSelect.value !== targetLang) {
              translateSelect.value = targetLang;
              translateSelect.dispatchEvent(
                new Event('change', {bubbles: true}),
              );
            }
          }
        }
      }, 500); // Wait a bit for Google Translate to fully initialize
    };

    const comboChangeListener = (event) => handleComboChange(event);
    document.addEventListener('change', comboChangeListener, true);

    // Listen to URL changes to update language label immediately
    const handleUrlChange = () => {
      updateLanguageLabelFromUrl();
    };

    // Listen to popstate (browser back/forward)
    window.addEventListener('popstate', handleUrlChange);

    // Override pushState and replaceState to catch programmatic navigation
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(history, args);
      // Use queueMicrotask to ensure DOM is updated
      queueMicrotask(handleUrlChange);
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args);
      // Use queueMicrotask to ensure DOM is updated
      queueMicrotask(handleUrlChange);
    };

    // Initialize language label from current URL
    updateLanguageLabelFromUrl();

    const previousInit = window.googleTranslateElementInit;
    window.googleTranslateElementInit = () => {
      previousInit?.();
      initializeTargets();
    };

    // Always load Google Translate script on both PC and mobile.
    const shouldSkipScript = false;
    let scriptNode = document.querySelector(
      'script[data-google-translate="true"]',
    );

    if (!shouldSkipScript && !scriptNode) {
      scriptNode = document.createElement('script');
      scriptNode.src = `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit&t=${Date.now()}`;
      scriptNode.async = true;
      scriptNode.setAttribute('data-google-translate', 'true');
      document.head.appendChild(scriptNode);
    } else if (!shouldSkipScript) {
      initializeTargets();
    }

    return () => {
      document.removeEventListener('change', comboChangeListener, true);
      window.removeEventListener('popstate', handleUrlChange);
      // Restore original methods
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [onLanguageChange]);
}
