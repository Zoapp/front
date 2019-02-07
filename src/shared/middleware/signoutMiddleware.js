import { FETCH_FAILURE } from "../actions/constants";
import { signOut } from "../actions/auth";

const middleware = (store) => (next) => (action) => {
  const result = next(action);
  const regex = new RegExp(`^.*${FETCH_FAILURE}$`);
  if (regex.test(action.type) && action.error && action.error.status === 401) {
    const { isSignedIn } = store.getState().user;
    if (isSignedIn) {
      store.dispatch(signOut({ provider: store.getState().auth.provider }));
    }
  }

  return result;
};

export default middleware;
