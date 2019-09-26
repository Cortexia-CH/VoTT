import { Dispatch, Action } from "redux";
import { createAction } from "./actionCreators";
import { ActionTypes } from "./actionTypes";

/**
 * Actions which manage tracking
 * @member signIn - Tracks user signs in to the app
 * @member signOut - Tracks user signs out from the app
 * @member imgIn - Tracks user enters on the image
 * @member imgOut - Tracks user leaves the image
 * @member imgDelete - Tracks user deletes the image
 */
export default interface ITrackActions {
    trackSignIn(): Promise<void>;
    trackSignOut(): Promise<void>;
    trackImgIn(): Promise<void>;
    trackImgOut(): Promise<void>;
    trackImgDelete(): Promise<void>;
}

/**
 * Tracks user signs in to the application
 */
export function trackSignIn(): (dispatch: Dispatch) => Promise<void> {
    return (dispatch: Dispatch) => {
        dispatch(trackSignInAction());
        return Promise.resolve();
    };
}

/**
 * Tracks user signs out from the application
 */
export function trackSignOut(): (dispatch: Dispatch) => Promise<void> {
    return (dispatch: Dispatch) => {
        dispatch(trackSignOutAction());
        return Promise.resolve();
    };
}

/**
 * Tracks user enters on the image
 */
export function trackImgIn(): (dispatch: Dispatch) => Promise<void> {
    return (dispatch: Dispatch) => {
        dispatch(trackImgInAction());
        return Promise.resolve();
    };
}

/**
 * Tracks user leaves the image
 */
export function trackImgOut(): (dispatch: Dispatch) => Promise<void> {
    return (dispatch: Dispatch) => {
        dispatch(trackImgOutAction());
        return Promise.resolve();
    };
}

/**
 * Tracks user deletes the image
 */
export function trackImgDelete(): (dispatch: Dispatch) => Promise<void> {
    return (dispatch: Dispatch) => {
        dispatch(trackImgDeleteAction());
        return Promise.resolve();
    };
}

export interface ITrackSignInAction extends Action<string> {
    type: ActionTypes.TRACK_SIGN_IN_SUCCESS;
}

export interface ITrackSignOutAction extends Action<string> {
    type: ActionTypes.TRACK_SIGN_OUT_SUCCESS;
}

export interface ITrackImgInAction extends Action<string> {
    type: ActionTypes.TRACK_IMG_IN_SUCCESS;
}

export interface ITrackImgOutAction extends Action<string> {
    type: ActionTypes.TRACK_IMG_OUT_SUCCESS;
}

export interface ITrackImgDeleteAction extends Action<string> {
    type: ActionTypes.TRACK_IMG_DELETE_SUCCESS;
}

const trackSignInAction = createAction<ITrackSignInAction>(ActionTypes.TRACK_SIGN_IN_SUCCESS);
const trackSignOutAction = createAction<ITrackSignOutAction>(ActionTypes.TRACK_SIGN_OUT_SUCCESS);
const trackImgInAction = createAction<ITrackImgInAction>(ActionTypes.TRACK_IMG_IN_SUCCESS);
const trackImgOutAction = createAction<ITrackImgOutAction>(ActionTypes.TRACK_IMG_OUT_SUCCESS);
const trackImgDeleteAction = createAction<ITrackImgDeleteAction>(ActionTypes.TRACK_IMG_DELETE_SUCCESS);
