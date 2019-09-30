import MockFactory from "../../common/mockFactory";
import { reducer } from "./trackingReducer";
import { TrackingAction } from "../../models/trackingAction";
import {
    trackingImgDeleteAction,
    trackingImgInAction,
    ITrackingImgOutAction,
    trackingSignInAction,
    trackingSignOutAction} from "../actions/trackingActions";
import { anyOtherAction } from "../actions/actionCreators";

describe("Tracking Reducer", () => {
    it("Saves tracking with new tracking object", () => {
        const testTracking: TrackingAction = MockFactory.createTestTracking();
        const state: TrackingAction = testTracking;
        const newTracking: TrackingAction = MockFactory.createTestTracking("new_tracking");
        const action = trackingSignInAction(newTracking);

        const result = reducer(state, action);
        expect(result).not.toBe(state);
    });

    it("Updates tracking with the same tracking object", () => {
        const testTracking: ITracking = MockFactory.createTestTracking();
        const state: ITracking = testTracking;
        const updatedTracking: ITracking = { ...testTracking };
        const action = signInAction(updatedTracking);

        const result = reducer(state, action);
        expect(result).not.toBe(state);
        expect(result.accessToken).toEqual(testTracking.accessToken);
    });

    it("Deletes tracking properties from tracking state by signing out", () => {
        const testTracking: ITracking = MockFactory.createTestTracking();
        const state: ITracking = testTracking;
        const action = signOutAction();

        const result = reducer(state, action);
        expect(result.accessToken).toEqual(null);
        expect(result.fullName).toEqual(null);
    });

    it("Unknown action performs a noop", () => {
        const state: ITracking = MockFactory.createTestTracking();
        const action = anyOtherAction();

        const result = reducer(state, action);
        expect(result).toBe(state);
    });
});
