/**
 * It's a higher order component provides a wrapper around given preact component `InnerComponent`
 */

import { h, Component } from 'preact';
import getProps from '../util/getProps';

const isObject = target =>
  Object.prototype.toString.call(target) === '[object Object]';
let store = {};

function attachInstanceProps(instanceProps) {
  this.instanceProps = instanceProps || {};
  this.getInstanceProps = () => this.instanceProps;
  this.setInstanceProps = newVal => {
    if (!isObject(newVal)) {
      return {};
    }
    const currentVal = this.instanceProps;
    return (this.instanceProps = { ...currentVal, ...newVal });
  };
}

function bindHandler(handlers, modifier) {
  handlers &&
    Object.keys(handlers).map(key => {
      const fn = handlers[key];
      if (typeof fn === 'function') {
        this[key] = modifier(fn, this);
      }
    });
}

export default function component(options = {}) {
  const {
    state,
    template,
    instanceProps,
    componentDidMount,
    componentWillUnmount,
    componentWillReceiveProps,
    ...rest
  } = options;
  let { actions, watcher } = options;
  return function wrapper(InnerComponent) {
    return class Wrapper extends Component {
      constructor(props, context = {}) {
        super(props, context);
        const setState = newState => this.setState({ ...newState });
        const getState = () => this.state;
        const _self = this;
        this.state = typeof state === 'function' ? state(props) : {};
        this.__store__ = Wrapper.__store__;

        if (this.__store__) {
          watcher = this.__store__.watcher;
          actions = this.__store__.actions;
        }

        const pluck = getProps(watcher);
        const instancePropsClone = { ...instanceProps };
        // Attach handlers
        bindHandler.call(this, actions, store.action);
        bindHandler.call(this, rest, this.proxy);
        attachInstanceProps.call(this, instancePropsClone);

        let globalState = this.__store__
          ? pluck(store ? store.getState() : {})
          : {};

        const updateStore = () => {
          if (!this.__store__) {
            return;
          }
          let localState = pluck(store ? store.getState() : {});
          // if store value does change, do not call update
          for (let i in localState)
            if (localState[i] !== globalState[i]) {
              globalState = localState;
              return this.setState({});
            }
          // if above condition fails & store contains additional props
          // update & cause re-render
          for (let i in globalState)
            if (!(i in localState)) {
              globalState = localState;
              return this.setState({});
            }
        };

        this.mergeProps = () => ({
          ..._self,
          ...props,
          ...this.props,
          setState,
          getState,
          ...globalState
        });

        this.componentDidMount = () => {
          if (this.__store__) {
            store.subscribe(updateStore);
          }
          componentDidMount && componentDidMount.call(null, this.mergeProps());
        };

        this.componentWillUnmount = () => {
          if (this.__store__) {
            store.unsubscribe(updateStore);
          }
          componentWillUnmount &&
            componentWillUnmount.call(null, this.mergeProps());
        };

        this.componentWillReceiveProps = nxtProps => {
          componentWillReceiveProps &&
            componentWillReceiveProps.call(null, nxtProps, this.mergeProps());
        };

        this.render = props => {
          const view = template || InnerComponent;
          return h(view, this.mergeProps());
        };
      }

      proxy(func, context) {
        return (
          func &&
          function hook() {
            func.apply(null, [this.mergeProps(), ...arguments]);
          }.bind(context)
        );
      }
    };
  };
}

export function injectStore(appStore) {
  store = appStore;
}
