import * as types from "../constans";

export function getData(payload) {
    return {
        type: types.GET,
        payload,
    };
}
export function addData(payload) {
    return {
        type: types.ADD,
        payload,
    };
}
export function deleteData(payload) {
    return {
        type: types.DELETE,
        payload,
    };
}
export function increase(payload) {
    return {
        type: types.INCREASE,
        payload,
    };
}
export function decrease(payload) {
    return {
        type: types.DECREASE,
        payload,
    };
}
export function clearAll(payload) {
    return {
        type: types.CLEAR_ALL,
        payload,
    };
}
