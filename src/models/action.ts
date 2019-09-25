export interface IAction {
    type: ActionType;
    timestamp: number;
    user_id: number;
    image_id: number;
    regions: IRegion[];
}

export interface IRegion {
    tags: string[];
    points: object[];
    type: string;
    id: string;
    boundingBox: IBoundingBox;
}

export interface IBoundingBox {
    top: number;
    width: number;
    height: number;
    left: number;
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
