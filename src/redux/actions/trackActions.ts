import { Dispatch } from "redux";
import { createPayloadAction, IPayloadAction } from "./actionCreators";
import { ActionTypes } from "./actionTypes";
import { ITrackAction, TrackActionType } from "../../models/trackAction";

/**
 * Actions which manage tracking
 * @member trackSignIn - Tracks user signs in to the app
 * @member trackSignOut - Tracks user signs out from the app
 * @member trackImgIn - Tracks user enters on the image
 * @member trackImgOut - Tracks user leaves the image
 * @member trackImgDelete - Tracks user deletes the image
 */
export default interface ITrackActions {
    trackSignIn(trackAction: ITrackAction): Promise<void>;
    trackSignOut(trackAction: ITrackAction): Promise<void>;
    trackImgIn(trackAction: ITrackAction): Promise<void>;
    trackImgOut(trackAction: ITrackAction): Promise<void>;
    trackImgDelete(trackAction: ITrackAction): Promise<void>;
}

/**
 * Tracks user signs in to the application
 */
export function trackSignIn(trackAction: ITrackAction): (dispatch: Dispatch) => Promise<void> {
    return (dispatch: Dispatch) => {
        trackAction.type = TrackActionType.SignIn;
        dispatch(trackSignInAction(trackAction));
        return Promise.resolve();
    };
}

/**
 * Tracks user signs out from the application
 */
export function trackSignOut(trackAction: ITrackAction): (dispatch: Dispatch) => Promise<void> {
    return (dispatch: Dispatch) => {
        trackAction.type = TrackActionType.SignOut;
        dispatch(trackSignOutAction(trackAction));
        return Promise.resolve();
    };
}

/**
 * Tracks user enters on the image
 */
export function trackImgIn(trackAction: ITrackAction): (dispatch: Dispatch) => Promise<void> {
    return (dispatch: Dispatch) => {
        trackAction.type = TrackActionType.ImgIn;
        dispatch(trackImgInAction(trackAction));
        return Promise.resolve();
    };
}

/**
 * Tracks user leaves the image
 */
export function trackImgOut(trackAction: ITrackAction): (dispatch: Dispatch) => Promise<void> {
    return (dispatch: Dispatch) => {
        trackAction.type = TrackActionType.ImgOut;
        dispatch(trackImgOutAction(trackAction));
        return Promise.resolve();
    };
}

/**
 * Tracks user deletes the image
 */
export function trackImgDelete(trackAction: ITrackAction): (dispatch: Dispatch) => Promise<void> {
    return (dispatch: Dispatch) => {
        trackAction.type = TrackActionType.ImgDelete;
        dispatch(trackImgDeleteAction(trackAction));
        return Promise.resolve();
    };
}

export interface ITrackSignInAction extends IPayloadAction<string, ITrackAction> {
    type: ActionTypes.TRACK_SIGN_IN_SUCCESS;
}

export interface ITrackSignOutAction extends IPayloadAction<string, ITrackAction> {
    type: ActionTypes.TRACK_SIGN_OUT_SUCCESS;
}

export interface ITrackImgInAction extends IPayloadAction<string, ITrackAction> {
    type: ActionTypes.TRACK_IMG_IN_SUCCESS;
}

export interface ITrackImgOutAction extends IPayloadAction<string, ITrackAction> {
    type: ActionTypes.TRACK_IMG_OUT_SUCCESS;
}

export interface ITrackImgDeleteAction extends IPayloadAction<string, ITrackAction> {
    type: ActionTypes.TRACK_IMG_DELETE_SUCCESS;
}

const trackSignInAction = createPayloadAction<ITrackSignInAction>(ActionTypes.TRACK_SIGN_IN_SUCCESS);
const trackSignOutAction = createPayloadAction<ITrackSignOutAction>(ActionTypes.TRACK_SIGN_OUT_SUCCESS);
const trackImgInAction = createPayloadAction<ITrackImgInAction>(ActionTypes.TRACK_IMG_IN_SUCCESS);
const trackImgOutAction = createPayloadAction<ITrackImgOutAction>(ActionTypes.TRACK_IMG_OUT_SUCCESS);
const trackImgDeleteAction = createPayloadAction<ITrackImgDeleteAction>(ActionTypes.TRACK_IMG_DELETE_SUCCESS);
