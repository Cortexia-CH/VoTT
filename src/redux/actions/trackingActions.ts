import { Dispatch } from "redux";
import { createPayloadAction, IPayloadAction } from "./actionCreators";
import { ActionTypes } from "./actionTypes";
import { ITrackingAction, TrackingActionType } from "../../models/trackingAction";

/**
 * Actions which manage tracking
 * @member trackingSignIn - Tracks user signs in to the app
 * @member trackingSignOut - Tracks user signs out from the app
 * @member trackingImgIn - Tracks user enters on the image
 * @member trackingImgOut - Tracks user leaves the image
 * @member trackingImgDelete - Tracks user deletes the image
 */
export default interface ITrackingActions {
    trackingSignIn(trackingAction: ITrackingAction): Promise<void>;
    trackingSignOut(trackingAction: ITrackingAction): Promise<void>;
    trackingImgIn(trackingAction: ITrackingAction): Promise<void>;
    trackingImgOut(trackingAction: ITrackingAction): Promise<void>;
    trackingImgDelete(trackingAction: ITrackingAction): Promise<void>;
}

/**
 * Tracks user signs in to the application
 */
export function trackingSignIn(trackingAction: ITrackingAction): (dispatch: Dispatch) => Promise<void> {
    return (dispatch: Dispatch) => {
        dispatch(trackingSignInAction(trackingAction));
        return Promise.resolve();
    };
}

/**
 * Tracks user signs out from the application
 */
export function trackingSignOut(trackingAction: ITrackingAction): (dispatch: Dispatch) => Promise<void> {
    return (dispatch: Dispatch) => {
        trackingAction.type = TrackingActionType.SignOut;
        dispatch(trackingSignOutAction(trackingAction));
        return Promise.resolve();
    };
}

/**
 * Tracks user enters on the image
 */
export function trackingImgIn(trackingAction: ITrackingAction): (dispatch: Dispatch) => Promise<void> {
    return (dispatch: Dispatch) => {
        trackingAction.type = TrackingActionType.ImgIn;
        dispatch(trackingImgInAction(trackingAction));
        return Promise.resolve();
    };
}

/**
 * Tracks user leaves the image
 */
export function trackingImgOut(trackingAction: ITrackingAction): (dispatch: Dispatch) => Promise<void> {
    return (dispatch: Dispatch) => {
        trackingAction.type = TrackingActionType.ImgOut;
        dispatch(trackingImgOutAction(trackingAction));
        return Promise.resolve();
    };
}

/**
 * Tracks user deletes the image
 */
export function trackingImgDelete(trackingAction: ITrackingAction): (dispatch: Dispatch) => Promise<void> {
    return (dispatch: Dispatch) => {
        trackingAction.type = TrackingActionType.ImgDelete;
        dispatch(trackingImgDeleteAction(trackingAction));
        return Promise.resolve();
    };
}

export interface ITrackingSignInAction extends IPayloadAction<string, ITrackingAction> {
    type: ActionTypes.TRACK_SIGN_IN_SUCCESS;
}

export interface ITrackingSignOutAction extends IPayloadAction<string, ITrackingAction> {
    type: ActionTypes.TRACK_SIGN_OUT_SUCCESS;
}

export interface ITrackingImgInAction extends IPayloadAction<string, ITrackingAction> {
    type: ActionTypes.TRACK_IMG_IN_SUCCESS;
}

export interface ITrackingImgOutAction extends IPayloadAction<string, ITrackingAction> {
    type: ActionTypes.TRACK_IMG_OUT_SUCCESS;
}

export interface ITrackingImgDeleteAction extends IPayloadAction<string, ITrackingAction> {
    type: ActionTypes.TRACK_IMG_DELETE_SUCCESS;
}

const trackingSignInAction = createPayloadAction<ITrackingSignInAction>(ActionTypes.TRACK_SIGN_IN_SUCCESS);
const trackingSignOutAction = createPayloadAction<ITrackingSignOutAction>(ActionTypes.TRACK_SIGN_OUT_SUCCESS);
const trackingImgInAction = createPayloadAction<ITrackingImgInAction>(ActionTypes.TRACK_IMG_IN_SUCCESS);
const trackingImgOutAction = createPayloadAction<ITrackingImgOutAction>(ActionTypes.TRACK_IMG_OUT_SUCCESS);
const trackingImgDeleteAction = createPayloadAction<ITrackingImgDeleteAction>(ActionTypes.TRACK_IMG_DELETE_SUCCESS);
