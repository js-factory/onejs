import { h } from 'preact';

/**
 * @description
 * Deferred Component
 * @param {*} props - DeferredComponent Props
 * @returns {JSX} PReact DeferredComponent Component
 */
const DeferredTmpl = props => {
  const { state, ...rest } = props;
  const { InnerComponent } = state;
  if (!InnerComponent) {
    return null;
  }
  return h(InnerComponent, { ...rest });
};

export default DeferredTmpl;
