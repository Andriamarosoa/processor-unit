#!/usr/bin/env node
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = exports.projectInRuntime = void 0;
const ts_morph_1 = require("ts-morph");
const get_tsconfig_1 = require("get-tsconfig");
const processor_1 = require("./processor");
const callback_1 = require("./callback");
const decorator_1 = require("./decorator");
const register_1 = require("./register");
exports.projectInRuntime = new ts_morph_1.Project({
    tsConfigFilePath: (_a = (0, get_tsconfig_1.getTsconfig)()) === null || _a === void 0 ? void 0 : _a.path,
});
function process(commande) {
    return __awaiter(this, void 0, void 0, function* () {
        const project = (0, register_1.getProject)();
        let classDeclaration = (0, processor_1.findProcessor)(...project);
        let callBack = (0, callback_1.getCallBack)(classDeclaration);
        for (let c of callBack) {
            let use = (0, decorator_1.isAnnotedBy)(c, decorator_1.useDeclaration);
            let declaration = (0, decorator_1.getDeclarationOf)(use.getArguments()[0]);
            for (let d of (0, decorator_1.getDecorator)(...project)) {
                if ((0, decorator_1.getDeclarationOf)(d).getFullText().endsWith(declaration.getFullText()) && (d.getName() == commande || commande == null)) {
                    let f = yield (0, callback_1.resolveCallBack)(use);
                    f(exports.projectInRuntime, d);
                }
            }
        }
    });
}
exports.process = process;
__exportStar(require("./register"), exports);
__exportStar(require("./callback"), exports);
__exportStar(require("./processor"), exports);
__exportStar(require("./decorator"), exports);
//# sourceMappingURL=index.js.map