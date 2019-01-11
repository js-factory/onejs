export default function onClickHandler(props, e) {
    e.preventDefault();
    const { getState, setState, getInstanceProps, setInstanceProps } = props;
    const { y } = getInstanceProps();
    const { x } = getState();
    setInstanceProps({ y: y + 1 });
    setState({ x: x + 1 });
}
