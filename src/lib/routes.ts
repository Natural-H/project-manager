/**
 * An array of public routes.
 * These routes are accessible to everyone.
 * @type {string[]}
 */
export const publicRoutes = ['/']

/**
 * Array of authentication routes.
 * These routes are used to authenticate users.
 * @type {string[]}
 */
export const authRoutes = [
    '/auth/login',
]

/**
* The prefix for API routes.
* @type {string}
*/
export const apiPrefix = '/api'

/**
 * The prefix for API authentication routes.
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default login redirect path.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/app'
