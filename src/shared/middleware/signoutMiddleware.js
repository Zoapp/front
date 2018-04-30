import { FETCH_FAILURE } from "../actions/constants";
import { signOut } from "../actions/auth";

const middleware = (store) => (next) => (action) => {
  const result = next(action);

  const regex = new RegExp(`^.*${FETCH_FAILURE}$`);
  if (
    regex.test(action.type) &&
    Object.prototype.hasOwnProperty.call(action, "error") &&
    Object.prototype.hasOwnProperty.call(action.error, "response") &&
    action.error.response.status === 401
  ) {
    console.log(action);
    store.dispatch(signOut({ provider: store.getState().auth.provider }));
  }

  return result;
};

export default middleware;
