import { ActionTypes } from "../actions/actionTypes";
import { IAuth } from "../../models/applicationState";

export const reducer = (state: IAuth, action: any): IAuth => {
    switch (action.type) {
        case ActionTypes.SIGN_IN_SUCCESS:
            return { ...action.payload };
        case ActionTypes.SIGN_OUT_SUCCESS:
            return { ...action.payload };
        default:
            return state;
    }
};
