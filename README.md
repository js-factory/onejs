# onejs
A Javascript [framework](https://en.wikipedia.org/wiki/Software_framework) for building a high-performance web application. 

## Motivation
Onejs provides an abstract layer over a javascript library. It enables developer/organization to write a vanilla javascript code and bind it with the framework you choose to build your application with.

##### It's hard to switch between frameworks if your performance budget does not meet with one
Considering all top javascript library adds a considerable amount of initial javascript chunk into your application bundle i.e. react size is ~30kb. For any larger application, switching from one framework to another is a relatively complex task and requires a lot of effort and time. onejs try to solve this problem and reduce the time and effort require in switching frameworks.

##### Classical component go polluted over time and becomes hard to maintain
This has been a common problem that after certain amount of time your class component gets complex and a lot of business logic being written into a single javascript file. With the functional programming approach, we are trying to solve some of these problems. A developer needs to create small functions and attach those to your component. This allows you to maximize the usage of vanilla javascript.

## Installation
```
npm i -S @js-factory/onejs
```

## Dependency 
You need to install preact in the host application.
```
npm i -S preact
```

## APIs
Onejs offers the following APIs.

- Component
- withStore
- createStore
- actionCreator

### Component
**Component** is a higher-level component. It creates a react or preact component and binds all given properties and methods to it.

Please read [hoc](https://www.npmjs.com/package/@js-factory/hoc) documentation for further details.

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
Every frontend application (read SPA) needs a persistent data store. The application should be able to maintain its state during back & forth page transitions. `withStore` connects the component with application's data store. 

Configuring `withStore` is very simple. It has two options. 1) **watcher** , 2) action

#### watcher
Data store of an application is a big JavaScript objects. It holds the application state. **watcher** represents the keys in applications store (read a big javascript object). When you define watcher in `withStore`, onejs connects your component with the application store and any changes to these properties will update (re-render) the component.

// App data store

```js
const appDataStore = {
   todos: [
       // todo
   ],
   counter: 0 // initial value
};
```

#### action
The only way to connect to the store is an `action`. Actions allow you to modify the application state.

**Complete Example**

```javascript

// ToDoContainer.js
import { Component, withStore } from '@js-factory/onejs';
import componentDidMount from './hooks/componentDidMount';
import increment from './actions/increment';
import fetchToDoList from './actions/fetchToDoList';
import onClickHandler from './handlers/onClickHandler';
import TodoTmpl from './ToDoTmpl';

@withStore({
   watcher: ['counter', 'todos'],
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
**createStore** initializes application store. It takes 2 arguments to build the store. 1) initial state of an application, and 2) middleware(s) to execute before updating the store properties.

```javascript
// bootstrap.js

import { createStore } from '@js-factory/onejs';
import middleware from './middleware'

const store = createStore({} , /* optional */ middleware);

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

**Advance features (Add-ons)
Onejs offers some cool feaures out-of-the-box. 

***Lazy
_Lazy_ enables you to implment component level code splitting. Using _Lazy_ would defer the the loading of the component to later.

```javascript
import { h } from 'preact';
import Lazy from '@js-factory/onejs/package/addon/Lazy';

const (props) => {
    const {increment} = props;
    ...
    ...
    ...

    return (
        <div>
            <SomeOtherComponent1 />
            <SomeOtherComponent2 />
            <Lazy getComponent={() => import('./path/to/module')} />
            <SomeOtherComponent3 />
        <div>
    )
}
```
