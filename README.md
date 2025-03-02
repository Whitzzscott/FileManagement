---
📘 File Management System - TypeScript
---

A powerful, flexible, and chainable file management system for Node.js.


# **📘 File Management System - TypeScript**  
A **powerful, flexible, and chainable file management system** for Node.js.  
This system provides an easy way to **manage files and directories** while supporting:
- **Custom error handling**
- **Custom chainable methods**
- **Advanced file operations like compression, metadata retrieval, and content manipulation**.

---

## **📌 Key Features**
### **🚀 File Operations**
✔ **Rename, Move, Copy, and Delete files**  
✔ **Append content to files**  
✔ **Retrieve compressed file content (`getInfo()`)**  
✔ **Retrieve file metadata (`getMetaInfo()`)**  

### **📂 Directory Operations**
✔ **Create, Delete, and List directories**  
✔ **Check if a file/folder exists (`syncExist()`)**  

### **⚙ Customization & Error Handling**
✔ **Custom error handling** (e.g., auto-create missing files on error)  
✔ **Add custom chainable methods (`addMethod()`)**  
✔ **Invoke custom chain methods dynamically (`invokeMethod()`)**  

---

## **📥 Installation**
To install and use this package, run:
```sh
git clone https://github.com/Whitzzscott/FileManagement.git
cd FileManagement
npm install
```

---

## **🛠 Usage Example**
This example demonstrates:
- **Error handling**: Automatically creating a missing file if an error occurs.
- **Custom chainable methods**: Adding a method that logs the file path.
- **File operations**: Renaming, moving, copying, appending, and deleting a file.

```ts
import { FileWrapper } from "./wrappers/FileWrapper";

const file = new FileWrapper("./testFolder/sample.txt");

// ✅ Custom error handling: Auto-create missing files when they are not found
file.errorOnFound = (error) => {
    if (error.code === "ENOENT") {
        file.sync().writeFile("Default content");
        console.log(`📄 File created: ${file.getPath()}`);
    }
};

// ✅ Add a custom method (e.g., logging the file path)
file.addMethod("logPath", function () {
    console.log("File is at:", this.getPath());
    return this;
});

// ✅ Chainable file operations
(async () => {
    file
        .rename("renamed.txt")  // Renames file
        .invokeMethod("logPath") // Logs new file path
        .move("./testFolder/moved") // Moves file to a new folder
        .copy("./backup")  // Creates a copy in the backup folder
        .append("\nMore content added.") // Appends text to the file
        .delete();  // Deletes the file

    console.log("📄 Compressed File Content:", file.getInfo());
    console.log("📑 File Metadata:", file.getMetaInfo());
    console.log("📂 Files in directory:", file.list());
})();
```

---

## **📜 API Reference**
This file management system offers multiple operations for handling files and folders.

### **📂 File Operations**
| Method | Description | Example |
|--------|------------|---------|
| `rename(newName: string)` | Renames the file | `file.rename("newName.txt")` |
| `move(destination: string)` | Moves the file to a new directory | `file.move("./newFolder")` |
| `copy(destination: string)` | Copies the file to a new location | `file.copy("./backup")` |
| `delete()` | Deletes the file permanently | `file.delete()` |
| `writeFile(content: string)` | Writes new content to the file (overwrites existing content) | `file.writeFile("Hello, world!")` |
| `append(content: string)` | Appends new content to the file | `file.append("\nNew content")` |

### **📁 Directory Operations**
| Method | Description | Example |
|--------|------------|---------|
| `syncExist()` | Checks if a file or folder exists | `if (file.syncExist()) {...}` |
| `sync()` | Ensures the directory exists (creates it if missing) | `file.sync()` |
| `list()` | Lists all files in the directory | `console.log(file.list())` |

### **📊 File Info & Metadata**
| Method | Description | Example |
|--------|------------|---------|
| `getInfo()` | Reads and compresses the entire file content | `console.log(file.getInfo())` |
| `getMetaInfo()` | Retrieves metadata such as size, creation date, and modification date | `console.log(file.getMetaInfo())` |

### **⚙ Customization & Error Handling**
| Method | Description | Example |
|--------|------------|---------|
| `errorOnFound = (error) => {...}` | Custom error handling (e.g., auto-create files) | `file.errorOnFound = (err) => {...}` |
| `addMethod(name, method)` | Adds a custom chainable method | `file.addMethod("customMethod", function () {...})` |
| `invokeMethod(name, ...args)` | Calls a custom method dynamically | `file.invokeMethod("customMethod")` |

---

## **🔧 How to Use This Project**
1. **Install the package**  
   ```sh
   npm install filemanagement
   ```
2. **Run the script**  
   ```sh
   npm run dev
   ```
3. **Modify settings**  
   - **Change file paths** in `src/main.ts` to test different operations.   
   - **Modify core functionality in `src/Wrapper`** if necessary.

---

## **📜 License**
This project is **open-source** and free to use.

---

## **💡 Future Enhancements**
We plan to add:
- 🔹 **File encryption support** (AES, RSA encryption for file security)  
- 🔹 **File versioning** (track changes over time)  
- 🔹 **Logging & monitoring system** (track operations in a log file)  

---

🚀 **Enjoy simplified file management with powerful chaining!**  
Feel free to suggest new features or improvements! 🎯

---

## **👨‍💻 Author**
**WhitzScott** - Developer of the **File Management System**.  
If you have questions or ideas, feel free to reach out!