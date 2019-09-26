import { IRegion } from "./applicationState";

export interface ITrackAction {
    type: TrackActionType;
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
 * @enum SignOut - Sign out from the account
 * @enum SignIn - Sign in to the account
 */
export enum TrackActionType {
    ImgIn = "img_in",
    ImgOut = "img_out",
    ImgDelete = "img_delete",
    SignOut = "logout",
    SignIn = "login",
}

class TrackAction implements ITrackAction {
    public timestamp = Date.now();
    public type: TrackActionType;
    public userId: number;
    public imageId: number;
    public regions: IRegion[];

    constructor(type: TrackActionType, userId: number, imageId: number, regions: IRegion[]) {
        this.type = type;
        this.userId = userId;
        this.imageId = imageId;
        this.regions = regions;
    }
}
