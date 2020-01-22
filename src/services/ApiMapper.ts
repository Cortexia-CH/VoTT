import { ITrackingAction } from "../models/trackingAction";
import { IActionRequest } from "./apiService";

export const mapTrackingActionToApiBody = (action: ITrackingAction): IActionRequest => {
    return {
        type: action.type,
        timestamp: `${action.timestamp}`,
        regions: action.regions.map(item => ({
            ...item,
            tags: item.tags.map(tagItem => (tagItem.name ? tagItem.name : tagItem))
        })),
        is_modified: action.isModified,
        user_id: action.userId,
        image_id: parseInt(action.imageId, 10)
    };
};
