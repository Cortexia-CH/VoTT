import { ActionTypes } from "./actionTypes";
import { IPayloadAction, createPayloadAction } from "./actionCreators";
import { IAuth } from "../../models/applicationState";
import { Dispatch } from "redux";
import { IpcRendererProxy } from "../../common/ipcRendererProxy";

/**
 * Actions which manage users auth
 * @member signIn - Allows to sign in to the application
 */
export default interface IAuthActions {
    signIn(accessToken: IAuth): Promise<void>;
}

/**
 * Sign in to the application
 * @param accessToken - Auth to the application
 */
export function signIn(accessToken: string): (disptach: Dispatch) => Promise<void> {
    return (dispatch: Dispatch) => {
        return IpcRendererProxy.send("SIGN_IN", accessToken)
        .then(() => {
            dispatch(signInAction(accessToken));
        });
    };
}

/**
 * Sign in action type
 */
export interface ISignInAction extends IPayloadAction<string, string> {
    type: ActionTypes.SIGN_IN_SUCCESS;
}

/**
 * Sign out action type
 */
export interface ISignOutAction extends IPayloadAction<string, string> {
    type: ActionTypes.SIGN_OUT_SUCCESS;
}

/**
 * Instance of sign in action
 */
export const signInAction = createPayloadAction<ISignInAction>(ActionTypes.SIGN_IN_SUCCESS);
/**
 * Instance of sign out action
 */
export const signOutAction = createPayloadAction<ISignOutAction>(ActionTypes.SIGN_OUT_SUCCESS);
