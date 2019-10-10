import { IStorageProvider } from "./storageProviderFactory";
import { StorageType, IAsset } from "../../models/applicationState";

export class CortexiaApi implements IStorageProvider {
    /**
     * Storage type
     * @returns - StorageType.Cloud
     */
    public storageType: StorageType = StorageType.Cloud;

 

    readText(filePath: string): Promise<string> {
        return Promise.resolve("asd");
    }
    readBinary(filePath: string): Promise<Buffer> {
        throw new Error("Method not implemented.");
    }
    deleteFile(filePath: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    writeText(filePath: string, contents: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    writeBinary(filePath: string, contents: Buffer): Promise<void> {
        throw new Error("Method not implemented.");
    }
    listFiles(folderPath?: string, ext?: string): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    listContainers(folderPath?: string): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    createContainer(folderPath: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteContainer(folderPath: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    initialize?(): Promise<void> {
        return Promise.resolve();
    }
    getAssets(containerName?: string): Promise<IAsset[]> {
        throw new Error("Method not implemented.");
    }
}