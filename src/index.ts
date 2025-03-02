import { FileWrapper } from "./wrappers/FileWrapper";

const file = new FileWrapper("./testFolder/sample.txt");

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

(async () => {
    if (!file.syncExist() && file.errorOnFound) {
        file.errorOnFound({ code: "ENOENT" } as NodeJS.ErrnoException);
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
})();
