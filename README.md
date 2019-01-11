# onejs
An unified Javascript framework for building high performance web application.

## Motivation
Onejs provide an abstract layer over a javascript library. It enables developer/organization to write a vanilla javascript code and bind it with framework you choose to build your application with. In the process with have `react & preact` integration available.

##### It's hard to switch between frameworks if your performance budget does not meet with one
Considering all top javascript library adds considerable amount of initial javascript chunk into your application bundle i.e. react size is ~30kb. For any larger application, switch from one framework to another is relatively complex task and requires a lot of effort and time. onejs try to solve this problem and reduce the time and effort require in switching frameworks.

##### Classical component go polluted over the time and becomes hard to maintain
This has been a common problem that after certain time your class component gets complex and a lot of business login being written into a single javascript file. With function programming approach we are trying to solve some of these problems. Developer needs to create small functions and attach those to your component. This allows you to maximize the usage of vanilla javascript.

### Install
```
npm i -S @js-factory/onejs
```

### APIs
Onejs offers following apis.

- withState
- withStore
- createStore
- actionCreator
- injectStore

#### withState 
**withState** allow you to declare and bind it's properties and methods to a `Component`. 
Please go through the [hoc](https://github.com/js-factory/hoc) documentation once to know more about it's features e.g hooks, state etc.

A typical component looks like this.

```javascript
// FooComponent.js

import { withState } from '@js-factory/onejs';
import componentDidMount from './hooks/componentDidMount';
import onClickHandler from './handlers/onClickHandler';
import FooTmpl from './FooTmpl';

@withState({
    hooks: {
        componentDidMount
    },
    state: {
        x: 0
    },
    instanceProps: {
        y: 0
    },
    eventHandlers: {
        onClickHandler
    },
    template: FooTmpl
})
export default class FooComponent { }

```
**Help: Please refer example section for addition information**

#### withStore 
**withStore** connects your component with application store.
withStore provides two options.
- **watcher** connects your component with given store properties. Any changes to this properties will trigger a re-render.
- **actions** a collection of functions modifies store properties define in the watcher.

```javascript

// ToDoContainer.js
import { withState, withStore } from '@js-factory/onejs';
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
@withState({
    hooks: {
        componentDidMount
    },
    state: {
        x: 0,
    },
    instanceProps: {
        y: 0
    },
    eventHandlers: {
        onClickHandler
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
**Help: Please refer example section for addition information**
### createStore
**createStore** intializes application store. It takes 2 arguments to build the store. 1) initial state of an applicatio, and 2) middlewares to execute before updating the store property

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
**injectStore** binds store with `withState`. It's an important step before your application gets connected with store.
