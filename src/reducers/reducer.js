import * as types from "../constans";

const init = {
    data: [],
};

function reducer(state = init, actions) {
    let b = [...state.data];
    switch (actions.type) {
        case types.ADD:
            let a = b.find((item) => item.id === actions.payload.id);
            let newData = [...b, actions.payload];
            if (a) {
                let c = b.map((item) => {
                    if (item.id === actions.payload.id) {
                        return {
                            ...item,
                            num: actions.payload.num + item.num,
                        };
                    } else {
                        return item;
                    }
                });

                newData = c;
            }
            return {
                ...state,
                data: newData,
            };

        case types.INCREASE:
            const id = actions.payload;

            const newTrips = b.map((item) => {
                if (item.id === id) {
                    // Copy other item values into NEW object and return it
                    return { ...item, num: item.num + 1 };
                }
                // If not matched above, just return the old item
                return item;
            });

            return {
                ...state,
                data: newTrips,
            };
        case types.DECREASE:
            const idDecease = actions.payload;
            const decreaseArr = b.map((item) => {
                if (item.id === idDecease) {
                    if (item.num !== 1) {
                        return { ...item, num: item.num - 1 };
                    } else {
                        return { ...item };
                    }
                }
                // If not matched above, just return the old item
                return item;
            });

            return {
                ...state,
                data: decreaseArr,
            };

        case types.DELETE:
            let delData = b.filter((item) => item.id !== actions.payload);
            return {
                ...state,
                data: delData,
            };
        case types.CLEAR_ALL:
            return {
                ...state,
                data: [],
            };
        default:
            return state;
    }
}

export default reducer;
