export default function onClickHandler(props, e) {
    e.preventDefault();
    const { getState, increment, onClickAction, setState, getInstanceProps, setInstanceProps } = props;
    const { y } = getInstanceProps();
    setInstanceProps({ y: y + 1 });
    setState({ x: getState().x + 1 });
    increment();
}
