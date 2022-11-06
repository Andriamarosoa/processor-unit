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
exports.resolveCallBack = exports.getCallBack = void 0;
const ts_import_1 = require("ts-import");
const ts_morph_1 = require("ts-morph");
const decorator_1 = require("./decorator");
function getCallBack(classDeclaration) {
    let rep = new Array();
    for (let c of classDeclaration) {
        for (let m of c.getChildrenOfKind(ts_morph_1.SyntaxKind.MethodDeclaration)) {
            const annoted = (0, decorator_1.isAnnotedBy)(m, decorator_1.useDeclaration);
            annoted && rep.push(m);
        }
    }
    return rep;
}
exports.getCallBack = getCallBack;
function resolveCallBack(decorator) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = ts_import_1.tsImport.compile(decorator.getSourceFile().getFilePath());
        let method = decorator.getParentIfKindOrThrow(ts_morph_1.SyntaxKind.MethodDeclaration);
        let classDecl = method.getParentIfKindOrThrow(ts_morph_1.SyntaxKind.ClassDeclaration);
        const m = yield path;
        let instance = new m[classDecl.getName()]();
        return instance[method.getName()].bind(instance);
    });
}
exports.resolveCallBack = resolveCallBack;
//# sourceMappingURL=callback.js.map