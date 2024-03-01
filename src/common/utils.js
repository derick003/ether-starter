import fs from "fs";
import path from "path"

export function readDirJson(dirPath) {
    const files = fs.readdirSync(dirPath);
    const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');
    return jsonFiles;
}

export function writeFileSync(filePath, content) {
    fs.writeFileSync(filePath, content);
}

export function readFileSync(filePath) {
    return fs.readFileSync(filePath, "utf-8");
}

export function writeJson(filePath, content) {
    const jsonContent = JSON.stringify(content, null, "\t");
    writeFileSync(filePath, jsonContent);
}

export function readJson(filePath) {
    const rawdata = readFileSync(filePath);
    const json = JSON.parse(rawdata);
    return json;
}