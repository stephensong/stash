# Stash

[![Travis (.org)](https://img.shields.io/travis/z0al/stash.svg)](https://travis-ci.org/z0al/stash)
[![npm (scoped)](https://img.shields.io/npm/v/@stash/core.svg)](https://npm.im/@stash/core)

> A tiny state container for JavaScript apps

- **Tiny** footprint (`@stash/core` + `@stash/react` = way less than 1kb)
- **Familiar** names and ideas from Redux
- **Thunks** support with no additional packages
- **TypeScript** first class support (stash is written in TS ❤️)
- **DevTools** support (soon)

## Usage


### Creating the store object

```javascript
import { createStore } from "@stash/core";

// create store and set initial state
const store = createStore({ todos: [], loading: false });
```

### Adding actions and thunks

```javascript
import { createAction, createThunk } from "@stash/core";

// An action is just a reducer
const AddTodo = createAction("Add todo", (state, todo) => {
  return { ...state, todos: [...state.todos, todo] };
});

// The first param (e.g. "Set loading") is used for logging
const SetLoading = createAction("Set loading", (state, loading) => {
  return { ...state, loading };
});

// A thunk may dispatch actions asynchronously
const LoadTodos = createThunk("Load todos", (state, payload, dispatch) => {
  dispatch(SetLoading, true);

  setTimeout(() => {
    dispatch(AddTodo, "3. Third todo");
    dispatch(SetLoading, false);
  }, 3000);
});
```

### Accessing the store inside a component

> **NOTE:** You need to use React v16.8.0 (or later) to run this code since `useStore` is a [custom hook](https://reactjs.org/docs/hooks-intro.html).

```javascript
import React from 'react';
import { useStore } from "@stash/react";

import { AddTodo, LoadTodos } from './actions';

function Todos() {
  // useStore also accepts a selector e.g.
  // const [loading, dispatch] = useStore(state => state.loading)
  const [state, dispatch] = useStore();

  React.useEffect(() => {
    // Load some todos
    dispatch(AddTodo, "1. First todo");
    dispatch(AddTodo, "2. Second todo");

    // Load more async
    dispatch(LoadTodos, {});
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {state.todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      {state.loading && "Loading ..."}
    </div>
  );
}
```

### Providing the store

To be able to use `useStore` we must wrap our `<Todos>` inside the `<Provider>` component provided by `@stash/react` package. For example:

```javascript
import { Provider } from "@stash/react";
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Todos />
  </Provider>,
  document.getElementById("root")
);
```

## Logging

Install `@stash/logger` package:

```sh
$ npm add -D @stash/logger
```

Then:

```javascript
const store = createStore(/* initial state */);

// Add logging
createLogger()(store);
```

## Packages

| Name            | Version                                                                                         | Size                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `@stash/core`   | [![npm (scoped)](https://img.shields.io/npm/v/@stash/core.svg)](https://npm.im/@stash/core)     | [![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@stash/core.svg)](https://npm.im/@stash/core)     |
| `@stash/react`  | [![npm (scoped)](https://img.shields.io/npm/v/@stash/react.svg)](https://npm.im/@stash/react)   | [![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@stash/react.svg)](https://npm.im/@stash/react)   |
| `@stash/logger` | [![npm (scoped)](https://img.shields.io/npm/v/@stash/logger.svg)](https://npm.im/@stash/logger) | [![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@stash/logger.svg)](https://npm.im/@stash/logger) |

## Examples

See [examples](./examples).

## License

MIT © Ahmed T. Ali
