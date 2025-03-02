"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileWrapper = void 0;
const FileComponent_1 = require("../components/FileComponent");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const zlib = __importStar(require("zlib"));
class FileWrapper {
    constructor(filePath) {
        this.customMethods = new Map();
        this.file = new FileComponent_1.FileComponent(filePath);
    }
    rename(newName) {
        try {
            this.file.rename(newName);
        }
        catch (error) {
            this.handleError(error);
        }
        return this;
    }
    move(destination) {
        try {
            this.file.move(destination);
        }
        catch (error) {
            this.handleError(error);
        }
        return this;
    }
    copy(destination) {
        try {
            fs.copyFileSync(this.file.getPath(), path.join(destination, path.basename(this.file.getPath())));
        }
        catch (error) {
            this.handleError(error);
        }
        return this;
    }
    delete() {
        try {
            this.file.delete();
        }
        catch (error) {
            this.handleError(error);
        }
    }
    writeFile(content) {
        try {
            fs.writeFileSync(this.file.getPath(), content);
        }
        catch (error) {
            this.handleError(error);
        }
        return this;
    }
    append(content) {
        try {
            fs.appendFileSync(this.file.getPath(), content);
        }
        catch (error) {
            this.handleError(error);
        }
        return this;
    }
    syncExist() {
        return fs.existsSync(this.file.getPath());
    }
    sync() {
        try {
            const dir = path.dirname(this.file.getPath());
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        }
        catch (error) {
            this.handleError(error);
        }
        return this;
    }
    list() {
        try {
            return fs.readdirSync(path.dirname(this.file.getPath()));
        }
        catch (error) {
            this.handleError(error);
            return [];
        }
    }
    getInfo() {
        try {
            const content = fs.readFileSync(this.file.getPath(), "utf-8");
            return zlib.deflateSync(content).toString("base64");
        }
        catch (error) {
            this.handleError(error);
            return "";
        }
    }
    getMetaInfo() {
        try {
            const stats = fs.statSync(this.file.getPath());
            return {
                name: path.basename(this.file.getPath()),
                size: `${(stats.size / 1024).toFixed(2)} KB`,
                createdAt: stats.birthtime,
                modifiedAt: stats.mtime,
            };
        }
        catch (error) {
            this.handleError(error);
            return {};
        }
    }
    getPath() {
        return this.file.getPath();
    }
    addMethod(name, method) {
        this.customMethods.set(name, method);
        return this;
    }
    invokeMethod(name, ...args) {
        const method = this.customMethods.get(name);
        if (method) {
            return method.apply(this, args);
        }
        else {
            console.error(`Method ${name} not found`);
            return this;
        }
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
exports.FileWrapper = FileWrapper;
