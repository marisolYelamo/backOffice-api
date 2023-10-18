/**
 * This file contain Success and Error response for sending to client / user
 */

/**
 * Send any success response
 *
 * @param   {string} message
 * @param   {number} status
 * @param   {object | array} content
 */
export const success = (status, message, content?) => ({
  status,
  message,
  content,
});

/**
 * Send any error response
 *
 * @param   {string} message
 * @param   {number} status
 * @param   {object | array} error
 */
export const error = (status, message, error) => ({
  status,
  message,
  error,
});
