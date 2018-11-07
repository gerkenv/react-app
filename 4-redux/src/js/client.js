import { createStore } from "redux";

const reducer = function(action, state) {
    if (action.type === "INC") {
        return state + 1;
    }
    if (action.type === "DEC") {
        return state - 1;
    }
    return state;
}

const store = createStore(reducer, 0);

store.subscribe(() => {
    console.log("Store is changed", store.getState());
});

store.dispatch({type: "INC", payload: 1});
store.dispatch({type: "INC", payload: 1});
store.dispatch({type: "INC", payload: 1});

store.dispatch({type: "DEC", payload: 1});