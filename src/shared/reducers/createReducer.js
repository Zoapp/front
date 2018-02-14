/* eslint arrow-body-style: 0 */

// Based on: http://redux.js.org/docs/recipes/ReducingBoilerplate.html
const createReducer = (initialState, handlers) => {
  return (state = initialState, action = {}) => {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
};

export default createReducer;
