"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderWrapper = void 0;
const FolderComponent_1 = require("../components/FolderComponent");
class FolderWrapper {
    constructor(folderPath) {
        this.folder = new FolderComponent_1.FolderComponent(folderPath);
    }
    create() {
        try {
            this.folder.create();
        }
        catch (error) {
            this.handleError(error);
        }
        return this;
    }
    delete() {
        try {
            this.folder.delete();
        }
        catch (error) {
            this.handleError(error);
        }
    }
    getPath() {
        return this.folder.getPath();
    }
    handleError(error) {
        if (error instanceof Error) {
            const err = error;
            if (this.errorOnFound) {
                this.errorOnFound(err);
            }
            else {
                console.error("Error:", err.message);
            }
        }
    }
}
exports.FolderWrapper = FolderWrapper;
