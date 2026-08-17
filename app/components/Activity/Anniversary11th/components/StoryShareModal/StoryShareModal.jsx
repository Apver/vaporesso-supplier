import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {createPortal} from 'react-dom';
import {toBlob} from 'html-to-image';

import {
  STORY_SHARE_MODAL_OPEN_EVENT,
} from './storyShareModalEvents';

import './StoryShareModal.scss';


/**
 * 表单初始数据
 */
const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  country: '',
  comment: '',
};


/**
 * Receipt 模板
 */
const RECEIPT_TYPES = [
  {
    id: 'black-green',
    className: 'story-receipt--black-green',
    image:
      'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-13.webp',
  },
  {
    id: 'pink-black',
    className: 'story-receipt--pink-black',
    image:
      'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-14.webp',
  },
  {
    id: 'purple-color',
    className: 'story-receipt--purple-color',
    image:
      'https://cdn.shopify.com/s/files/1/0999/4249/8609/files/anniversary-11th-06-15.webp',
  },
];


/**
 * 弹窗焦点控制
 */
const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  'a[href]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');


/**
 * 随机选择 Receipt
 */
function getRandomReceipt() {
  const randomIndex = Math.floor(
    Math.random() * RECEIPT_TYPES.length,
  );

  return RECEIPT_TYPES[randomIndex];
}


/**
 * 等待浏览器完成两帧渲染
 */
function waitForRender() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(resolve);
    });
  });
}


/**
 * 等待 Receipt 中字体 / 图片加载完成
 */
async function waitForReceiptAssets(element) {
  if (!element) {
    return;
  }

  /**
   * 等待字体
   */
  if (document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch (error) {
      console.warn(
        '[StoryShareModal] Font loading warning:',
        error,
      );
    }
  }


  /**
   * 等待所有图片
   */
  const images = Array.from(
    element.querySelectorAll('img'),
  );


  await Promise.all(
    images.map(async (image) => {
      /**
       * 图片还没有加载完成
       */
      if (!image.complete) {
        await new Promise((resolve) => {
          const handleDone = () => {
            image.removeEventListener(
              'load',
              handleDone,
            );

            image.removeEventListener(
              'error',
              handleDone,
            );

            resolve();
          };


          image.addEventListener(
            'load',
            handleDone,
            {
              once: true,
            },
          );


          image.addEventListener(
            'error',
            handleDone,
            {
              once: true,
            },
          );
        });
      }


      /**
       * 等待图片解码
       */
      if (
        typeof image.decode === 'function'
      ) {
        try {
          await image.decode();
        } catch {
          /**
           * Safari / WebView 某些情况下
           * decode 会 reject。
           *
           * 不阻塞导出。
           */
        }
      }
    }),
  );


  /**
   * 等布局稳定
   */
  await waitForRender();
}


/**
 * Blob 下载 fallback
 */
function downloadBlob(
  blob,
  fileName,
) {
  const url =
    URL.createObjectURL(blob);


  const link =
    document.createElement('a');


  link.href = url;
  link.download = fileName;
  link.rel = 'noopener';
  link.style.display = 'none';


  document.body.appendChild(link);


  link.click();


  link.remove();


  /**
   * Safari / WebView 下不要过早 revoke
   */
  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 5000);
}


/**
 * Story Share Modal
 */
export default function StoryShareModal() {
  const dialogRef =
    useRef(null);

  const receiptRef =
    useRef(null);

  const closeButtonRef =
    useRef(null);

  const previousActiveElementRef =
    useRef(null);


  /**
   * 提前生成好的 PNG Blob
   */
  const exportBlobRef =
    useRef(null);


  const [
    portalElement,
    setPortalElement,
  ] = useState(null);


  const [
    isOpen,
    setIsOpen,
  ] = useState(false);


  const [
    step,
    setStep,
  ] = useState('form');


  const [
    formData,
    setFormData,
  ] = useState(
    INITIAL_FORM_DATA,
  );


  const [
    selectedReceipt,
    setSelectedReceipt,
  ] = useState(null);


  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);


  const [
    isExporting,
    setIsExporting,
  ] = useState(false);


  const [
    isExportReady,
    setIsExportReady,
  ] = useState(false);


  const [
    errorMessage,
    setErrorMessage,
  ] = useState('');


  /**
   * Portal
   */
  useEffect(() => {
    setPortalElement(
      document.body,
    );
  }, []);


  /**
   * 重置 Modal
   */
  const resetModal =
    useCallback(() => {
      setStep('form');

      setFormData(
        INITIAL_FORM_DATA,
      );

      setSelectedReceipt(null);

      setIsSubmitting(false);

      setIsExporting(false);

      setIsExportReady(false);

      setErrorMessage('');

      exportBlobRef.current =
        null;
    }, []);


  /**
   * 打开 Modal
   */
  const handleOpen =
    useCallback(() => {
      previousActiveElementRef.current =
        document.activeElement;


      resetModal();


      setIsOpen(true);
    }, [
      resetModal,
    ]);


  /**
   * 关闭 Modal
   */
  const handleClose =
    useCallback(() => {
      setIsOpen(false);


      window.requestAnimationFrame(
        () => {
          previousActiveElementRef
            .current
            ?.focus?.();
        },
      );
    }, []);


  /**
   * 监听打开事件
   */
  useEffect(() => {
    window.addEventListener(
      STORY_SHARE_MODAL_OPEN_EVENT,
      handleOpen,
    );


    return () => {
      window.removeEventListener(
        STORY_SHARE_MODAL_OPEN_EVENT,
        handleOpen,
      );
    };
  }, [
    handleOpen,
  ]);


  /**
   * Modal 打开后：
   *
   * 1. 禁止背景滚动
   * 2. 停止 Lenis
   * 3. ESC 关闭
   * 4. Tab 焦点锁定
   */
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }


    const htmlElement =
      document.documentElement;

    const bodyElement =
      document.body;


    const previousHtmlOverflow =
      htmlElement.style.overflow;

    const previousBodyOverflow =
      bodyElement.style.overflow;

    const previousBodyPaddingRight =
      bodyElement.style.paddingRight;


    const scrollbarWidth =
      window.innerWidth -
      htmlElement.clientWidth;


    htmlElement.style.overflow =
      'hidden';

    bodyElement.style.overflow =
      'hidden';


    if (scrollbarWidth > 0) {
      bodyElement.style.paddingRight =
        `${scrollbarWidth}px`;
    }
    window.lenis?.stop?.();
    const focusTimer =
      window.setTimeout(() => {
        closeButtonRef.current
          ?.focus();
      }, 0);
    const handleKeyDown =
      (event) => {
        if (
          event.key ===
          'Escape'
        ) {
          handleClose();

          return;
        }
        if (
          event.key !== 'Tab' ||
          !dialogRef.current
        ) {
          return;
        }


        const focusableElements =
          Array.from(
            dialogRef.current
              .querySelectorAll(
                FOCUSABLE_SELECTOR,
              ),
          );


        if (
          !focusableElements.length
        ) {
          event.preventDefault();

          return;
        }


        const firstElement =
          focusableElements[0];


        const lastElement =
          focusableElements[
            focusableElements.length - 1
          ];
        if (
          event.shiftKey &&
          document.activeElement ===
            firstElement
        ) {
          event.preventDefault();

          lastElement.focus();

          return;
        }
        if (
          !event.shiftKey &&
          document.activeElement ===
            lastElement
        ) {
          event.preventDefault();

          firstElement.focus();
        }
      };


    window.addEventListener(
      'keydown',
      handleKeyDown,
    );


    return () => {
      window.clearTimeout(
        focusTimer,
      );


      window.removeEventListener(
        'keydown',
        handleKeyDown,
      );


      htmlElement.style.overflow =
        previousHtmlOverflow;


      bodyElement.style.overflow =
        previousBodyOverflow;


      bodyElement.style.paddingRight =
        previousBodyPaddingRight;


      window.lenis?.start?.();
    };
  }, [
    isOpen,
    handleClose,
  ]);


  /**
   * Input Change
   */
  const handleInputChange =
    (event) => {
      const {
        name,
        value,
      } = event.target;


      setFormData(
        (
          currentFormData,
        ) => ({
          ...currentFormData,

          [name]: value,
        }),
      );


      if (errorMessage) {
        setErrorMessage('');
      }
    };


  /**
   * 表单校验
   */
  const validateForm = () => {
    const emailRegExp =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
      !formData.name.trim()
    ) {
      return (
        'Please enter your full name.'
      );
    }


    if (
      !formData.email.trim()
    ) {
      return (
        'Please enter your email address.'
      );
    }


    if (
      !emailRegExp.test(
        formData.email.trim(),
      )
    ) {
      return (
        'Please enter a valid email address.'
      );
    }


    if (
      !formData.country.trim()
    ) {
      return (
        'Please enter your country.'
      );
    }


    if (
      !formData.comment.trim()
    ) {
      return (
        'Please share your story.'
      );
    }


    return '';
  };


  /**
   * 提交 Story
   */
  const submitStory =
    async (submitData) => {
      console.log(
        'Story submit data:',
        submitData,
      );


      const response =
        await fetch(
          'https://brand.vaporesso.com/vaporesso/java/data/comment/addComment',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body:
              JSON.stringify(
                submitData,
              ),
          },
        );


      if (!response.ok) {
        throw new Error(
          'Story submission failed.',
        );
      }


      return response.json();
    };


  /**
   * Submit
   */
  const handleSubmit =
    async (event) => {
      event.preventDefault();


      if (isSubmitting) {
        return;
      }


      const validationMessage =
        validateForm();


      if (validationMessage) {
        setErrorMessage(
          validationMessage,
        );

        return;
      }
      /**
       * 随机选择 Receipt
       */
      const receipt =
        getRandomReceipt();
      const submitData = {
        name:
          formData.name.trim(),

        email:
          formData.email.trim(),

        country:
          formData.country.trim(),

        comment:
          formData.comment.trim(),

        url:
          window.location.href,

        type:
          '20260818',
      };


      setIsSubmitting(true);

      setErrorMessage('');


      try {
        await submitStory(
          submitData,
        );
        setSelectedReceipt(
          receipt,
        );
        setStep(
          'complete',
        );
      } catch (error) {
        console.error(
          '[StoryShareModal] Submit failed:',
          error,
        );


        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Submission failed. Please try again.',
        );
      } finally {
        setIsSubmitting(false);
      }
    };

  const handlePreviousStep =
    () => {
      setStep('form');

      setErrorMessage('');

      setIsExportReady(false);

      exportBlobRef.current =
        null;
    };
  useEffect(() => {
    if (
      step !== 'complete' ||
      !selectedReceipt
    ) {
      exportBlobRef.current =
        null;

      setIsExportReady(false);

      return undefined;
    }


    let cancelled = false;


    const prepareExportImage =
      async () => {
        exportBlobRef.current =
          null;


        setIsExportReady(false);


        try {
          await waitForRender();


          const receiptElement =
            receiptRef.current;


          if (
            !receiptElement ||
            cancelled
          ) {
            return;
          }
          await waitForReceiptAssets(
            receiptElement,
          );

          await new Promise(resolve => setTimeout(resolve, 300));
          if (cancelled) {
            return;
          }
          const blob =
            await toBlob( receiptElement,{
                cacheBust: true,
                pixelRatio: 3,
                style: {transform: 'none' }
              },
            );


          if (!blob) {
            throw new Error(
              'Image blob generation failed.',
            );
          }


          if (cancelled) {
            return;
          }
          exportBlobRef.current =
            blob;
          setIsExportReady(true);
        } catch (error) {
          console.error(
            '[StoryShareModal] Prepare export failed:',
            error,
          );


          if (!cancelled) {
            setErrorMessage(
              'The image could not be generated. Please try again.',
            );
          }
        }
      };

    prepareExportImage();

    return () => {
      cancelled = true;

      exportBlobRef.current =
        null;
    };
  }, [
    step,
    selectedReceipt,
  ]);
  const handleDownloadAndShare =
    async () => {
      if (isExporting) {
        return;
      }
      const blob =
        exportBlobRef.current;
      if (!blob) {
        setErrorMessage(
          'The image is still being prepared. Please try again.',
        );

        return;
      }

      setIsExporting(true);
      setErrorMessage('');
      const fileName = `extraordinary-story-${Date.now()}.png`;
      try {
        const file =
          new File(
            [
              blob,
            ],
            fileName,
            {
              type:
                blob.type ||
                'image/png',
            },
          );


        const shareData = {
          title:
            'My Extraordinary Story',

          files: [
            file,
          ],
        };
        if (
          typeof navigator.share ===
            'function' &&
          typeof navigator.canShare ===
            'function' &&
          navigator.canShare(
            shareData,
          )
        ) {
          await navigator.share(
            shareData,
          );


          return;
        }
        downloadBlob(
          blob,
          fileName,
        );
      } catch (error) {
        if (
          error instanceof Error &&
          error.name ===
            'AbortError'
        ) {
          return;
        }


        console.error(
          '[StoryShareModal] Share failed:',
          error,
        );
        try {
          downloadBlob(
            blob,
            fileName,
          );
        } catch (
          downloadError
        ) {
          console.error(
            '[StoryShareModal] Download fallback failed:',
            downloadError,
          );


          setErrorMessage(
            'The image could not be downloaded. Please try again.',
          );
        }
      } finally {
        setIsExporting(false);
      }
    };
  if (
    !portalElement ||
    !isOpen
  ) {
    return null;
  }


  return createPortal(
    <div
      className="story-share-modal"
    >
      <button
        type="button"
        className="story-share-modal__backdrop"
        aria-label="Close modal"
        onClick={handleClose}
      />


      <div
        ref={dialogRef}
        className="story-share-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-share-modal-title"
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
        {step === 'form' && (
          <form
            className="story-share-modal__form"
            onSubmit={handleSubmit}
          >
            <div
              className="story-share-modal__intro"
            >
              <h2
                id="story-share-modal-title"
                className="story-share-modal__title"
              >
                <span>
                  Share
                </span>
                Your
                <br />
                Extraordinary
                <br />
                Story
              </h2>
              <p
                className="story-share-modal__description"
              >
                Share your story below to enter the
                anniversary lucky draw.
              </p>
              <button
                type="submit"
                className="story-share-modal__button story-share-modal__button--desktop"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? 'Submitting...'
                  : 'Submit'}
              </button>
              {errorMessage && (
                <p
                  className="story-share-modal__error story-share-modal__error--desktop"
                  role="alert"
                >
                  {errorMessage}
                </p>
              )}
            </div>


            <div
              className="story-share-modal__fields"
            >
              <div
                className="story-share-modal__field"
              >
                <label
                  className="story-share-modal__sr-only"
                  htmlFor="story-name"
                >
                  Full Name
                </label>


                <input
                  id="story-name"
                  type="text"
                  name="name"
                  value={
                    formData.name
                  }
                  placeholder="Full Name"
                  autoComplete="name"
                  onChange={
                    handleInputChange
                  }
                />
              </div>
              <div
                className="story-share-modal__field"
              >
                <label
                  className="story-share-modal__sr-only"
                  htmlFor="story-email"
                >
                  Email Address
                </label>


                <input
                  id="story-email"
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  placeholder="Email Address"
                  autoComplete="email"
                  onChange={
                    handleInputChange
                  }
                />
              </div>
              <div
                className="story-share-modal__field"
              >
                <label
                  className="story-share-modal__sr-only"
                  htmlFor="story-country"
                >
                  Country
                </label>


                <input
                  id="story-country"
                  type="text"
                  name="country"
                  value={
                    formData.country
                  }
                  placeholder="Country"
                  autoComplete="country-name"
                  onChange={
                    handleInputChange
                  }
                />
              </div>
              <div
                className="story-share-modal__field story-share-modal__field--story"
              >
                <label
                  className="story-share-modal__sr-only"
                  htmlFor="story-comment"
                >
                  Share Your Story
                </label>


                <textarea
                  id="story-comment"
                  name="comment"
                  value={
                    formData.comment
                  }
                  placeholder="Share Your Story"
                  maxLength={400}
                  onChange={
                    handleInputChange
                  }
                />
              </div>
              <button
                type="submit"
                className="story-share-modal__button story-share-modal__button--mobile"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? 'Submitting...'
                  : 'Submit'}
              </button>
              {errorMessage && (
                <p
                  className="story-share-modal__error story-share-modal__error--mobile"
                  role="alert"
                >
                  {errorMessage}
                </p>
              )}
            </div>
          </form>
        )}
        {step === 'complete' &&
          selectedReceipt && (
            <div
              className="story-share-modal__complete"
            >
              <div
                className="story-share-modal__complete-content"
              >
                <h2
                  id="story-share-modal-title"
                  className="story-share-modal__complete-title"
                >
                  <span>
                    Thank you
                  </span>


                  <strong>
                    for sharing your

                    <br />

                    extraordinary journey.
                  </strong>
                </h2>


                <p
                  className="story-share-modal__complete-description"
                >
                  Your story may inspire others to

                  <br />

                  move beyond ordinary.
                </p>
                <div
                  className="story-share-modal__actions"
                >
                  <button
                    type="button"
                    className="story-share-modal__button story-share-modal__button--secondary"
                    onClick={
                      handlePreviousStep
                    }
                  >
                    Previous Step
                  </button>


                  <button
                    type="button"
                    className="story-share-modal__button"
                    disabled={
                      isExporting ||
                      !isExportReady
                    }
                    onClick={
                      handleDownloadAndShare
                    }
                  >
                    {!isExportReady
                      ? 'Preparing...'
                      : isExporting
                        ? 'Sharing...'
                        : 'Download & Share'}
                  </button>
                </div>


                {errorMessage && (
                  <p
                    className="story-share-modal__error"
                    role="alert"
                  >
                    {errorMessage}
                  </p>
                )}
              </div>
              <div
                className="story-share-modal__receipt-preview"
              >
                <div
                  className={[
                    'story-share-modal__receipt-rotate',

                    `story-share-modal__receipt-rotate--${selectedReceipt.id}`,
                  ].join(' ')}
                >
                  <div
                    ref={receiptRef}
                    className={[
                      'story-receipt',

                      selectedReceipt.className,
                    ].join(' ')}
                  >
                    <img
                      className="story-receipt__background"
                      src={`${selectedReceipt.image}?v=${Date.now()}`}
                      alt=""
                      crossOrigin="anonymous"
                    />


                    <div
                      className="story-receipt__overlay"
                    >
                      <div
                        className="story-receipt__story"
                      >
                        <span
                          className="story-receipt__story__span1"
                        >
                          Story
                        </span>


                        <span
                          className="story-receipt__story__span2"
                        >
                          Receipt
                        </span>
                      </div>
                      <p
                        className="story-receipt__name"
                      >
                        {formData.comment}
                      </p>

                      <p
                        className="story-receipt__country"
                      >
                        {formData.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="story-share-modal__mobile-actions"
              >
                <button
                  type="button"
                  className="story-share-modal__button story-share-modal__button--secondary"
                  onClick={
                    handlePreviousStep
                  }
                >
                  Previous Step
                </button>


                <button
                  type="button"
                  className="story-share-modal__button"
                  disabled={
                    isExporting ||
                    !isExportReady
                  }
                  onClick={
                    handleDownloadAndShare
                  }
                >
                  {!isExportReady
                    ? 'Preparing...'
                    : isExporting
                      ? 'Sharing...'
                      : 'Download & Share'}
                </button>
              </div>
            </div>
          )}
      </div>
    </div>,

    portalElement,
  );
}