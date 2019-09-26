import { AnyAction } from "../actions/actionCreators";
import { ActionTypes } from "../actions/actionTypes";
import { ITrackAction } from "../../models/trackAction";

export const reducer = (state: ITrackAction = null, action: AnyAction): ITrackAction[] => {
    switch (action.type) {
        case ActionTypes.TRACK_SIGN_IN_SUCCESS:
            return [state, action.payload];
        case ActionTypes.TRACK_SIGN_OUT_SUCCESS:
            return [state, action.payload];
        case ActionTypes.TRACK_IMG_IN_SUCCESS:
            return [state, action.payload];
        case ActionTypes.TRACK_IMG_OUT_SUCCESS:
            return [state, action.payload];
        case ActionTypes.TRACK_IMG_DELETE_SUCCESS:
            return [state, action.payload];
        default:
            return [];
    }
};
