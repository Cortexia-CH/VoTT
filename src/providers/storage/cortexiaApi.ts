import { IStorageProvider } from "./storageProviderFactory";
import { StorageType, IAsset } from "../../models/applicationState";
import { AssetService } from "../../services/assetService";
import { AssetType } from "vott-react";
import apiService, { IImage } from "../../services/apiService";

export class CortexiaApi implements IStorageProvider {
    /**
     * Storage type
     * @returns - StorageType.Cloud
     */
    public storageType: StorageType = StorageType.Cloud;

    public readText(filePath: string): Promise<string> {
        // const downloadResponse = await blockBlobURL.download(Aborter.none, 0);
        console.log("readText", filePath);
        return Promise.resolve("readText");
    }

    public readBinary(filePath: string): Promise<Buffer> {
        console.log("readBinary");
        return Promise.resolve(Buffer.from(""));
    }

    public deleteFile(filePath: string): Promise<void> {
        console.log("deleteFile");
        return Promise.resolve();
    }

    public async writeText(filePath: string, contents: string): Promise<void> {
        console.log("writeText");
    }

    public writeBinary(filePath: string, contents: Buffer): Promise<void> {
        console.log("writeBinary");
        return Promise.resolve();
    }

    public listFiles(folderPath?: string, ext?: string): Promise<string[]> {
        console.log("listFiles");
        return Promise.resolve(["Not used"]);
    }

    public listContainers(folderPath?: string): Promise<string[]> {
        console.log("listContainers");
        return Promise.resolve(["Not used"]);
    }

    public createContainer(folderPath: string): Promise<void> {
        console.log("createContainer");
        return Promise.resolve();
    }

    public deleteContainer(folderPath: string): Promise<void> {
        console.log("deleteContainer");
        return Promise.resolve();
    }

    public initialize(): Promise<void> {
        return Promise.resolve();
    }

    public async getAssets(containerName?: string): Promise<IAsset[]> {
        const images = await apiService.getUserImages();
        const result: IAsset[] = [];
        console.log(images.data);
        images.data.map((image: IImage) => {
            const url = image.path;
            const id = image.id;
            const asset = AssetService.createAssetFromFilePath(url, this.getFileName(url), id);
            if (asset.type !== AssetType.Unknown) {
                result.push(asset);
            }
        });
        console.log(result);
        return result;
    }

    /**
     *
     * @param url - URL
     */
    private getFileName(url: string) {
        const pathParts = url.split("/");
        return pathParts[pathParts.length - 1].split("?")[0];
    }
}
