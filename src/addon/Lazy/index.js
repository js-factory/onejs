import { withState } from '../../index';
import DeferredTmpl from './DeferredTmpl';

const state = () => ({ InnerComponent: null });

/**
 * @description
 * Deferred Component Wrapper
 * @param {function} fetchComponent - DeferredComponent import statement
 * @returns {JSX} PReact DeferredComponent Componentimport DeferredTmpl from './DeferredTmpl';
 */
export default withState({
  state,
  componentDidMount({ setState, getComponent }) {
    getComponent().then(comp => {
      const { default: InnerComponent } = comp;
      return setState({
        InnerComponent
      });
    });
  },
  template: DeferredTmpl
})();
