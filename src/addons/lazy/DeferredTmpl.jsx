import { h } from 'preact';

/**
 * @description
 * Deferred Component
 * @param {*} props - DeferredComponent Props
 * @returns {JSX} PReact DeferredComponent Component
 */
const DeferredTmpl = props => {
  const { state } = props;
  const { InnerComponent } = state;
  if (!InnerComponent) {
    return null;
  }
  return <InnerComponent {...props} />;
};

export default DeferredTmpl;
