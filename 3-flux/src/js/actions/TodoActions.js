import dispatcher from "../dispatcher";

export function createTodo(text) {
  dispatcher.dispatch({
    type: "CREATE_TODO",
    text
  });
}

export function deleteTodo(id) {
  dispatcher.dispatch({
    type: "DELETE_TODO",
    id
  });
}

export function reloadTodos() {
  dispatcher.dispatch({
    type: "RELOAD_TODOS_REQUEST",
  });
  setTimeout(function() {
    let error = false;
    if (error) {
      dispatcher.dispatch({
        type: "RELOAD_TODOS_RESPONSE_ERROR",
        err: "request failed"
      });
    } else {
      dispatcher.dispatch({
        type: "RELOAD_TODOS_RESPONSE",
        todos: [
          {
            id: 755864464,
            text: "Go Shopping Again",
            complete: false
          },
          {
            id: 866666589,
            text: "Hug Wife",
            complete: false
          },
        ] 
      });
    }
    
  }, 2000);
}