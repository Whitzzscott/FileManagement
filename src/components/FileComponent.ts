import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

// Convert callback-based functions to promises
const renameAsync = promisify(fs.rename);
const unlinkAsync = promisify(fs.unlink);
const existsAsync = (filePath: string): Promise<boolean> =>
    new Promise((resolve) => fs.access(filePath, fs.constants.F_OK, (err) => resolve(!err)));

export class FileComponent {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = path.resolve(filePath);
    }

    async rename(newName: string): Promise<void> {
        try {
            const newPath = path.join(path.dirname(this.filePath), newName);
            await renameAsync(this.filePath, newPath);
            this.filePath = newPath;
        } catch (error) {
            console.error(`Error renaming file: ${error}`);
        }
    }

    async move(destination: string): Promise<void> {
        try {
            const newPath = path.join(destination, path.basename(this.filePath));
            await renameAsync(this.filePath, newPath);
            this.filePath = newPath;
        } catch (error) {
            console.error(`Error moving file: ${error}`);
        }
    }

    async delete(): Promise<void> {
        try {
            if (await existsAsync(this.filePath)) {
                await unlinkAsync(this.filePath);
            } else {
                console.warn(`File not found: ${this.filePath}`);
            }
        } catch (error) {
            console.error(`Error deleting file: ${error}`);
        }
    }

    getPath(): string {
        return this.filePath;
    }
}
