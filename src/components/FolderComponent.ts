import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

const mkdirAsync = promisify(fs.mkdir);
const rmAsync = promisify(fs.rm);
const existsAsync = (folderPath: string): Promise<boolean> =>
    new Promise((resolve) => fs.access(folderPath, fs.constants.F_OK, (err) => resolve(!err)));

export class FolderComponent {
    private folderPath: string;

    constructor(folderPath: string) {
        this.folderPath = path.resolve(folderPath);
    }

    async create(): Promise<void> {
        try {
            if (!(await existsAsync(this.folderPath))) {
                await mkdirAsync(this.folderPath, { recursive: true });
            } else {
                console.warn(`Folder already exists: ${this.folderPath}`);
            }
        } catch (error) {
            console.error(`Error creating folder: ${error}`);
        }
    }

    async delete(): Promise<void> {
        try {
            if (await existsAsync(this.folderPath)) {
                await rmAsync(this.folderPath, { recursive: true, force: true });
            } else {
                console.warn(`Folder not found: ${this.folderPath}`);
            }
        } catch (error) {
            console.error(`Error deleting folder: ${error}`);
        }
    }

    getPath(): string {
        return this.folderPath;
    }
}
