# onejs
An unified Javascript framework for building a high performance web application.

## Motivation
Onejs provides an abstract layer over a javascript library. It enables developer/organization to write a vanilla javascript code and bind it with framework you choose to build your application with.

##### It's hard to switch between frameworks if your performance budget does not meet with one
Considering all top javascript library adds considerable amount of initial javascript chunk into your application bundle i.e. react size is ~30kb. For any larger application, switch from one framework to another is relatively complex task and requires a lot of effort and time. onejs try to solve this problem and reduce the time and effort require in switching frameworks.

##### Classical component go polluted over the time and becomes hard to maintain
This has been a common problem that after certain time your class component gets complex and a lot of business login being written into a single javascript file. With function programming approach we are trying to solve some of these problems. Developer needs to create small functions and attach those to your component. This allows you to maximize the usage of vanilla javascript.

## Installation
```
npm i -S @js-factory/onejs
```

## APIs
Onejs offers following apis.

- Component
- withStore
- createStore
- actionCreator
- injectStore

### Component 
**Component** is a higher level component. It creates react or preact component and binds all given properties and methods to it.

Please read [hoc](https://www.npmjs.com/package/@js-factory/hoc/v/0.2.2) documentation for further details.

A typical component declaration looks like this.

```javascript
// FooComponent.js

import { Component } from '@js-factory/onejs';
import componentDidMount from './hooks/componentDidMount';
import onClickHandler from './handlers/onClickHandler';
import someOtherHandler from './util/someOtherHandler';
import FooTmpl from './FooTmpl';

@Component({
    componentDidMount,
    someOtherHandler,
    onClickHandler,
    state: {
        x: 0
    },
    instanceProps: {
        y: 0
    },
    template: FooTmpl
})
export default class FooComponent { }

```

### withStore 
Every frontend application needs a data store. `withStore` provide a simple data store and wire a newly created `Component` with application store. Your typical store will be a plain javascript object.

```js

const appDataStore = {
    key1: {
        // some data
    },
    key2: {
        // some data
    },
    key3: {
        // some data
    }
};

```

`withStore` configuration is very simple and has two options.

#### watcher
**watcher** is nothing but keys in application store. When you define watcher with `withStore`, onejs connects your component with application store and any changes to these properties will trigger a re-render.

#### action
Action allows you to update store.

```javascript

// ToDoContainer.js
import { Component, withStore } from '@js-factory/onejs';
import componentDidMount from './hooks/componentDidMount';
import increment from './actions/increment';
import fetchToDoList from './actions/fetchToDoList';
import onClickHandler from './handlers/onClickHandler';
import TodoTmpl from './ToDoTmpl';

@withStore({
    watcher: ['home', 'counter', 'todos'],
    actions: {
        increment,
        fetchToDoList
    }
})
@Component({
    componentDidMount,
    onClickHandler,
    state: {
        x: 0,
    },
    instanceProps: {
        y: 0
    },
    template: TodoTmpl
})
export default class ToDoContainer { }

// increment.js
import { actionCreator } from '@js-factory/onejs';

export default actionCreator('INCREMENT', {
    key: 'counter',
    format({ count }) {     // `reducer` middleware setting
        return {
            count: count + 1
        };
    }
});

// fetchTodoList.js

import { actionCreator } from '@js-factory/onejs';

export default actionCreator('FETCH_TODO_LIST', {
    key: 'todos',   // store property
    url: 'https://jsonplaceholder.typicode.com/todos'
});

```

### createStore
**createStore** initializes application store. It takes 2 arguments to build the store. 1) initial state of an application, and 2) middlewares to execute before updating the store properties.

```javascript
// bootstrap.js

import { createStore, injectStore } from '@js-factory/onejs';
import middleware from './middleware'

const store = createStore({} , /* optional */ middleware);
injectStore(store);

export default store;

```
### actionCreator
*action* refers to store handler. The only way to modify a store property is to trigger and action. And action must be created by using `actionCreator`.

```javascript
// fetchTodoList.js
import { actionCreator } from '@js-factory/onejs';

export default actionCreator('FETCH_TODO_LIST', {
    key: 'todos',   // store property
    url: 'https://jsonplaceholder.typicode.com/todos'
});
```

### injectStore
**injectStore** binds store with `Component`. It's an important step before your application is setup.
