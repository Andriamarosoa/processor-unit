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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.removeProject = exports.saveProcessor = exports.projectName = exports.getProject = void 0;
const fs = __importStar(require("fs"));
const get_tsconfig_1 = require("get-tsconfig");
const path = __importStar(require("path"));
const ts_morph_1 = require("ts-morph");
const _1 = require(".");
const p = path.join(__dirname, '../processor.json');
function getProject() {
    const pathList = JSON.parse(fs.readFileSync(p, 'utf8'));
    let rep = new Array();
    for (let c of pathList) {
        try {
            rep.push(new ts_morph_1.Project({
                tsConfigFilePath: c,
            }));
        }
        catch (err) {
            console.warn(err.message);
        }
    }
    rep.push(_1.projectInRuntime);
    return rep;
}
exports.getProject = getProject;
function projectName() {
    const pathList = JSON.parse(fs.readFileSync(p, 'utf8'));
    let rep = new Array();
    for (let c of pathList) {
        try {
            let p = new ts_morph_1.Project({
                tsConfigFilePath: c,
            });
            rep.push(p.getDirectories()[0].getBaseName());
        }
        catch (err) {
            console.warn(err.message);
            rep.push(c);
        }
    }
    return rep;
}
exports.projectName = projectName;
function saveProcessor(path) {
    if (!path.endsWith("tsconfig.json"))
        throw new Error("Path is invalid");
    new ts_morph_1.Project({
        tsConfigFilePath: path,
    });
    const pathList = JSON.parse(fs.readFileSync(p, 'utf8'));
    !pathList.includes(path) && pathList.push(path);
    fs.writeFileSync(p, JSON.stringify(pathList));
    return getProject();
}
exports.saveProcessor = saveProcessor;
function removeProject(name) {
    let i = projectName().indexOf(name);
    if (i < 0)
        return;
    let pathList = JSON.parse(fs.readFileSync(p, 'utf8'));
    pathList.splice(i, 1);
    fs.writeFileSync(p, JSON.stringify(pathList));
}
exports.removeProject = removeProject;
function register() {
    var _a;
    saveProcessor((_a = (0, get_tsconfig_1.getTsconfig)()) === null || _a === void 0 ? void 0 : _a.path);
}
exports.register = register;
//# sourceMappingURL=register.js.map