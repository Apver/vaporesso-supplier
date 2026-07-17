// Virtual entry point for the app
import {storefrontRedirect} from '@shopify/hydrogen';
import {createRequestHandler} from '@shopify/hydrogen/oxygen';
import {createHydrogenRouterContext} from '~/lib/context';

/**
 * Check if an error is a retryable network error
 * @param {Error} error
 * @returns {boolean}
 */
function isRetryableError(error) {
  const retryableCodes = [
    'ECONNRESET',
    'ETIMEDOUT',
    'ECONNREFUSED',
    'ENOTFOUND',
  ];
  const retryableMessages = [
    'fetch failed',
    'ECONNRESET',
    'ETIMEDOUT',
    'ECONNREFUSED',
    'network',
    'timeout',
    'connection',
  ];

  const errorCode = error?.cause?.code || error?.code;
  const errorMessage = error?.message || '';

  return (
    retryableCodes.includes(errorCode) ||
    retryableMessages.some((msg) =>
      errorMessage.toLowerCase().includes(msg.toLowerCase()),
    )
  );
}

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {Object} options - Retry options
 * @param {number} options.maxRetries - Maximum number of retries (default: 3)
 * @param {number} options.baseDelay - Base delay in milliseconds (default: 1000)
 * @param {Function} options.shouldRetry - Function to determine if error is retryable
 * @returns {Promise<any>}
 */
async function retryWithBackoff(fn, options = {}) {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    shouldRetry = isRetryableError,
  } = options;

  let lastError;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry if error is not retryable or we've exhausted retries
      if (!shouldRetry(error) || attempt >= maxRetries) {
        throw error;
      }

      attempt++;
      const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff

      console.warn(
        `Retry attempt ${attempt}/${maxRetries} after ${delay}ms. Error: ${error.message}`,
      );

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Get user-friendly error message
 * @param {Error} error
 * @returns {Object} Error response details
 */
function getErrorResponse(error) {
  const isNetworkError = isRetryableError(error);
  const errorCode = error?.cause?.code || error?.code;
  const errorMessage = error?.message || 'Unknown error';

  if (isNetworkError) {
    const isDevelopment = process.env.NODE_ENV === 'development';
    return {
      status: 503,
      message: isDevelopment
        ? `Network connection error. Please check your internet connection and try again.\n\nError: ${errorMessage}\nCode: ${errorCode || 'N/A'}`
        : 'Service temporarily unavailable. Please try again later.',
      headers: {'Content-Type': 'text/plain'},
    };
  }

  // Handle other specific errors
  if (errorMessage.includes('SESSION_SECRET')) {
    return {
      status: 500,
      message: 'Server configuration error',
      headers: {'Content-Type': 'text/plain'},
    };
  }

  // Generic error
  return {
    status: 500,
    message:
      process.env.NODE_ENV === 'development'
        ? `An unexpected error occurred: ${errorMessage}`
        : 'An unexpected error occurred',
    headers: {'Content-Type': 'text/plain'},
  };
}

/**
 * Export a fetch handler in module format.
 */
export default {
  /**
   * @param {Request} request
   * @param {Env} env
   * @param {ExecutionContext} executionContext
   * @return {Promise<Response>}
   */
  async fetch(request, env, executionContext) {
    try {
      // Retry context creation for network errors
      const hydrogenContext = await retryWithBackoff(
        () => createHydrogenRouterContext(request, env, executionContext),
        {
          maxRetries: 3,
          baseDelay: 1000,
        },
      );

      /**
       * Create a Remix request handler and pass
       * Hydrogen's Storefront client to the loader context.
       */
      const handleRequest = createRequestHandler({
        build: await import('virtual:react-router/server-build'),
        mode: process.env.NODE_ENV,
        getLoadContext: () => hydrogenContext,
      });

      // Retry request handling for network errors
      const response = await retryWithBackoff(() => handleRequest(request), {
        maxRetries: 2, // Fewer retries for request handling
        baseDelay: 500,
      });

      if (hydrogenContext.session.isPending) {
        try {
          response.headers.set(
            'Set-Cookie',
            await hydrogenContext.session.commit(),
          );
        } catch (sessionError) {
          console.warn('Failed to commit session:', sessionError.message);
          // Don't fail the request if session commit fails
        }
      }

      if (response.status === 404) {
        /**
         * Check for redirects only when there's a 404 from the app.
         * If the redirect doesn't exist, then `storefrontRedirect`
         * will pass through the 404 response.
         */
        try {
          return await storefrontRedirect({
            request,
            response,
            storefront: hydrogenContext.storefront,
          });
        } catch (redirectError) {
          // If redirect fails, log but return original 404
          console.warn('Storefront redirect failed:', redirectError.message);
          return response;
        }
      }

      return response;
    } catch (error) {
      // Enhanced error logging
      const errorDetails = {
        message: error?.message,
        code: error?.cause?.code || error?.code,
        stack:
          process.env.NODE_ENV === 'development' ? error?.stack : undefined,
        url: request.url,
        method: request.method,
        timestamp: new Date().toISOString(),
      };

      console.error('Request failed:', errorDetails);

      const errorResponse = getErrorResponse(error);
      return new Response(errorResponse.message, {
        status: errorResponse.status,
        headers: errorResponse.headers,
      });
    }
  },
};
