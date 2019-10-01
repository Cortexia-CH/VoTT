import { AnyAction } from "../actions/actionCreators";
import { ActionTypes } from "../actions/actionTypes";
import { ITrackingAction } from "../../models/trackingAction";

export const reducer = (state: ITrackingAction[] = [], action: AnyAction): ITrackingAction[] => {
    switch (action.type) {
        case ActionTypes.TRACK_SIGN_IN_SUCCESS:
            return state.concat(action.payload);
        case ActionTypes.TRACK_SIGN_OUT_SUCCESS:
            return state.concat(action.payload);
        case ActionTypes.TRACK_IMG_IN_SUCCESS:
            return state.concat(action.payload);
        case ActionTypes.TRACK_IMG_OUT_SUCCESS:
            return state.concat(action.payload);
        case ActionTypes.TRACK_IMG_DELETE_SUCCESS:
            return state.concat(action.payload);
        default:
            return state;
    }
};
