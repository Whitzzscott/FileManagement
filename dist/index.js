"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileWrapper_1 = require("./wrappers/FileWrapper");
const file = new FileWrapper_1.FileWrapper("./testFolder/sample.txt");
file.errorOnFound = (error) => {
    if (error.code === "ENOENT") {
        file.sync().writeFile("Default content");
        console.log(`📄 File created: ${file.getPath()}`);
    }
};
file.addMethod("logPath", function () {
    console.log("File is at:", this.getPath());
    return this;
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (!file.syncExist() && file.errorOnFound) {
        file.errorOnFound({ code: "ENOENT" });
    }
    file
        .rename("renamed.txt")
        .invokeMethod("logPath")
        .move("./testFolder/moved")
        .copy("./backup")
        .append("\nMore content added.")
        .delete();
    console.log("📄 Compressed File Content:", file.getInfo());
    console.log("📑 File Metadata:", file.getMetaInfo());
    console.log("📂 Files in directory:", file.list());
}))();
