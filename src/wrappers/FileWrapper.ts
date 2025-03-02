import { FileComponent } from "../components/FileComponent";
import * as fs from "fs";
import * as path from "path";
import * as zlib from "zlib";

type CustomMethod = (this: FileWrapper, ...args: any[]) => FileWrapper;

export class FileWrapper {
    private file: FileComponent;
    public errorOnFound?: (error: NodeJS.ErrnoException) => void;
    private customMethods: Map<string, CustomMethod> = new Map();

    constructor(filePath: string) {
        this.file = new FileComponent(filePath);
    }

    rename(newName: string): FileWrapper {
        try {
            this.file.rename(newName);
        } catch (error) {
            this.handleError(error);
        }
        return this;
    }

    move(destination: string): FileWrapper {
        try {
            this.file.move(destination);
        } catch (error) {
            this.handleError(error);
        }
        return this;
    }

    copy(destination: string): FileWrapper {
        try {
            fs.copyFileSync(this.file.getPath(), path.join(destination, path.basename(this.file.getPath())));
        } catch (error) {
            this.handleError(error);
        }
        return this;
    }

    delete(): void {
        try {
            this.file.delete();
        } catch (error) {
            this.handleError(error);
        }
    }

    writeFile(content: string): FileWrapper {
        try {
            fs.writeFileSync(this.file.getPath(), content);
        } catch (error) {
            this.handleError(error);
        }
        return this;
    }

    append(content: string): FileWrapper {
        try {
            fs.appendFileSync(this.file.getPath(), content);
        } catch (error) {
            this.handleError(error);
        }
        return this;
    }

    syncExist(): boolean {
        return fs.existsSync(this.file.getPath());
    }

    sync(): FileWrapper {
        try {
            const dir = path.dirname(this.file.getPath());
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        } catch (error) {
            this.handleError(error);
        }
        return this;
    }

    list(): string[] {
        try {
            return fs.readdirSync(path.dirname(this.file.getPath()));
        } catch (error) {
            this.handleError(error);
            return [];
        }
    }

    getInfo(): string {
        try {
            const content = fs.readFileSync(this.file.getPath(), "utf-8");
            return zlib.deflateSync(content).toString("base64");
        } catch (error) {
            this.handleError(error);
            return "";
        }
    }

    getMetaInfo(): object {
        try {
            const stats = fs.statSync(this.file.getPath());
            return {
                name: path.basename(this.file.getPath()),
                size: `${(stats.size / 1024).toFixed(2)} KB`,
                createdAt: stats.birthtime,
                modifiedAt: stats.mtime,
            };
        } catch (error) {
            this.handleError(error);
            return {};
        }
    }

    getPath(): string {
        return this.file.getPath();
    }

    addMethod(name: string, method: CustomMethod): FileWrapper {
        this.customMethods.set(name, method);
        return this;
    }

    invokeMethod(name: string, ...args: any[]): FileWrapper {
        const method = this.customMethods.get(name);
        if (method) {
            return method.apply(this, args);
        } else {
            console.error(`Method ${name} not found`);
            return this;
        }
    }

    private handleError(error: unknown) {
        if (error instanceof Error) {
            const err = error as NodeJS.ErrnoException;
            if (this.errorOnFound) {
                this.errorOnFound(err);
            } else {
                console.error("Error:", err.message);
            }
        }
    }
}
