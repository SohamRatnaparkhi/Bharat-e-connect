import { useEffect, useState } from "react";

export const useGetStore = (store, callBack) => {
    const result = store(callBack);
    const [state, setState] = useState();
    useEffect(() => {
        setState(result);
    }, [result])
    return state;
}