import { Middleware } from 'redux';

/**
 * Logs all actions and states after they are dispatched.
 */

export const logger: Middleware<{}, any> = (storeApi) => (next) => (action) => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', storeApi.getState());
  console.groupEnd();
  return result;
};
