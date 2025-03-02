import { FolderComponent } from "../components/FolderComponent";

export class FolderWrapper {
    private folder: FolderComponent;
    public errorOnFound?: (error: NodeJS.ErrnoException) => void;

    constructor(folderPath: string) {
        this.folder = new FolderComponent(folderPath);
    }

    create(): FolderWrapper {
        try {
            this.folder.create();
        } catch (error) {
            this.handleError(error);
        }
        return this;
    }

    delete(): void {
        try {
            this.folder.delete();
        } catch (error) {
            this.handleError(error);
        }
    }

    getPath(): string {
        return this.folder.getPath();
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
