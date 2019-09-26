import { IRegion } from "./applicationState";

export interface IAction {
    type: ActionType;
    timestamp: number;
    userId: number;
    imageId: number;
    regions: IRegion[];
}

/**
 * Actions which are tracked
 * @enum ImgIn - Enters on the image
 * @enum ImgOut - Leaves the image
 * @enum ImgDelete - Deletes the image
 * @enum Logout - Sign out from the account
 * @enum Login - Sign in to the account
 */
export enum ActionType {
    ImgIn = "img_in",
    ImgOut = "img_out",
    ImgDelete = "img_delete",
    Logout = "logout",
    Login = "login",
}

class Action implements IAction {
    public timestamp = Date.now();
    public type: ActionType;
    public userId: number;
    public imageId: number;
    public regions: IRegion[];

    constructor(type: ActionType, userId: number, imageId: number, regions: IRegion[]) {
        this.type = type;
        this.userId = userId;
        this.imageId = imageId;
        this.regions = regions;
    }
}
