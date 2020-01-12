# hoc 

hoc provide a simple apis to create javascript reusable components. It provide an abstraction from underlying framework, helps reuse the same component for different libraries with minimum code changes. 

## Install

```
npm i -S @js-factory/hoc 

```

## Motivation
Modern frontend applications are getting complex day by day. It has to manage core business logic, even more complex layouts, and data. This is extremely important that frontend application architecture follows core software design principles. 

### Separation of concern

In [computer science](https://en.wikipedia.org/wiki/Computer_science), separation of concerns (SoC) is a design principle for separating a computer program into distinct sections, such that each section addresses a separate [concern](https://en.wikipedia.org/wiki/Concern_%28computer_science%29).


## Getting Started
```js
// ExampleComponent.js

import { withPreact as withState } from '@js-factory/hoc';
import componentDidMount from './hooks/afterRender';
import componentShouldUpdate from './hooks/afterUpdate';
import componentWillMount from './hooks/beforeRender';
import componentWillUpdate from './hooks/beforeUpdate';
import componentWillUnmount from './hooks/beforeUnmount';
import onClickHanlder from './handlers/onClickHanlder';
import onScrollHanlder from './handlers/onScrollHanlder';
import ExampleComponentTmpl from './templates/ExampleComponentTmpl';

const state = {
    salutation: 'Dear'
};

const instanceProps = {
    counter: 0
};

@withState({
    state,
    instanceProp,
    componentDidMount,
    componentWillMount,
    componentWillUpdate,
    componentWillUnmount,
    componentShouldUpdate,
    onClickHanlder,
    onScrollHanlder,
    template: ExampleComponentTmpl
})
export default class ExampleComponent {}
```

```js
// ExampleComponentTmpl.js
// This is preact functional component

import { h } from 'preact';

const ExampleComponentTmpl = (props) => {
    const { state, instanceProp, onClickHander } = props;
    const { salutation } = state;
    return(
        <div>
            <p> {salutation} user! </p>
            <button onClick={onClickHander}>Say Hello </button>
        </div>
    );
}
```

## Overview
`HOC` offers four major components e.g. `state`, `template`, `instanceProps`, `methods`.

### state
The state is a plain JavaScript object that represents your component local state. Please read about [React state](https://reactjs.org/docs/state-and-lifecycle.html) if you are not aware about what a component state is all about. `hoc` exposes a it's own `setState` to update component state.

```js
const state = {
    ...
    count: 0,
    ...
};

const increment = ({ state, state }) => {
    const { count } = state;
    return state({
        count: count + 1
    });
};
```

### instanceProps
The instanceProps is same as *state* unlike state any update to it will not trigger component re-rendering. You can update instanceProps using `setInstanceProps` method.

```js
const instanceProps = {
    ...
    count: 0,
    ...
};

const increment = ({ instanceProps, setInstanceProps }) => {
    const { count } = instanceProps;
    return setInstanceProps({
        count: count + 1
    });
};

```

### template
A template is functional component represents presentation layer.

### methods
You can add as many functions as you need to manage your component state and handle user interactions. These methods could be lifecycle hooks of underlying framework like componentDidMount, componentWillUpdate or simple event handlers.

#### life cycle hooks
hoc allows developer to use underlying library hooks like componentDidMount, componentWillMount etc. Please refer above component definition.

**Note:** Unlike react or preact you will not have access to `this`. `hoc` will inject all component properties and methods in run time.


#### event handlers
You can define any dom event handler and bind it with component. Event handlers are plain javascript functions and surely not tightly coupled with any underlying library. 

```js
const onClickHandler = (props, e) => {
  e.preventDefault();
  const { state, setState, getInstanceProp } = props;
  const state = getState();
  return setState({
    ...state,
    updateMsg: 'I am updated'
  });
}
```

**props** contains component state, methods etc. 
**e** is a dom event instance.

#### Other methods
Usually any component has a lot of helper methods. You can define these method as part of component definition.

```js
function foo(props, ...args){
    // function body goes here
}
```

**props** contains component state, methods etc. 
**...args** are runtime arguments supplied


 
 
