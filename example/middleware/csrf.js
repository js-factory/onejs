export default function csrf(_, res) {
    const { csrfToken = '' } = res;
    return {
        ...res,
        csrfToken
    };
}
