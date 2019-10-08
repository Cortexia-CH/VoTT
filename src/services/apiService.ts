import axios, { AxiosInstance, AxiosPromise } from "axios";
import qs from "qs";
import { Env } from "../common/environment";
import { ITrackingAction } from "../models/trackingAction";
import { Api } from "./ApiEnum";

export interface ILoginRequestPayload {
    username: string;
    password: string;
}

export interface IApiService {
    loginWithCredentials(data: ILoginRequestPayload): AxiosPromise<IUserCredentials>;
    testToken(): AxiosPromise<IUser>;
    getCurrentUser(): AxiosPromise<IUser>;
}

interface IUserCredentials {
    access_token: string;
    token_type: string;
}

interface IUser {
    email: string;
    full_name: string;
    is_active: boolean;
    is_superuser: boolean;
    city_id: number;
    id: number;
    created_at: string;
    updated_at: string;
  }

export class ApiService implements IApiService {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: Env.getApiUrl(),
            timeout: 10 * 1000,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        this.client.interceptors.request.use(
            (config) => {
                const token = JSON.parse(localStorage.getItem("auth")).accessToken;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

    }

    public loginWithCredentials = (data: ILoginRequestPayload): AxiosPromise<IUserCredentials> => {
        return this.client.post(Api.LoginAccessToken, qs.stringify(data));
    }

    public testToken = (): AxiosPromise<IUser> => {
        return this.client.post(Api.LoginTestToken);
    }

    public getCurrentUser = (): AxiosPromise<IUser> => {
        return this.client.get(Api.UsersMe);
    }

    public createAction = (action: ITrackingAction) => {
        return this.client.post(Api.Actions, {
            type: action.type,
            timestamp: action.timestamp,
            regions: action.regions,
            is_modified: action.isModified,
            user_id: action.userId,
            image_id: action.imageId
        });
    };
}

const apiService = new ApiService();

export default apiService;
