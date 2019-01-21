export default function onClickHandler(props, e) {
    e.preventDefault();
    const { state, setState, instanceProps, setInstanceProps } = props;
    const { y } = instanceProps;
    const { x } = state;
    setInstanceProps({ y: y + 1 });
    setState({ x: x + 1 });
}
