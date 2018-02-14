/*
http://redux.js.org/docs/recipes/ReducingBoilerplate.html
Modified for ESlint and ES6
*/

/*
Why this code isn't working ?

const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};
export { createReducer };
*/

export default function createReducer(initialState, handlers) {
  return (state = initialState, action) => {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
