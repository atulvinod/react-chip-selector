export function createAction<T, P>(type: T, payload:P ) {
    return { type, payload };
}
