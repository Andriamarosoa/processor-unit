"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeclaration = exports.processorDeclaration = exports.getDecorator = exports.isAnnotedBy = exports.getDeclarationOf = void 0;
const ts_morph_1 = require("ts-morph");
function getDeclarationOf(decorator) {
    var _a, _b;
    if (!(decorator instanceof ts_morph_1.Decorator))
        return decorator.getType().getCallSignatures()[0].getDeclaration();
    for (let r of (_a = decorator.getNameNode()) === null || _a === void 0 ? void 0 : _a.findReferences())
        for (let rs of r.getReferences())
            for (let decl of ((_b = rs.getNode().getSymbol()) === null || _b === void 0 ? void 0 : _b.getDeclarations()) || [])
                if (decl.isKind(ts_morph_1.SyntaxKind.FunctionDeclaration))
                    return decl;
    throw new Error(`cannot find declaration of ${decorator.getName()}`);
}
exports.getDeclarationOf = getDeclarationOf;
function isAnnotedBy(classDeclaration, decorator) {
    let declaration = decorator instanceof ts_morph_1.Decorator ? getDeclarationOf(decorator).getFullText() : decorator;
    for (let d of classDeclaration.getDecorators())
        if (getDeclarationOf(d).getFullText().endsWith(declaration))
            return d;
    return null;
}
exports.isAnnotedBy = isAnnotedBy;
function getDecorator(...project) {
    let rep = new Array();
    for (let p of project)
        for (let s of p.getSourceFiles())
            for (let d of s.getDescendantsOfKind(ts_morph_1.SyntaxKind.Decorator))
                rep.push(d);
    return rep;
}
exports.getDecorator = getDecorator;
exports.processorDeclaration = "export declare function processor(target: any): void;";
exports.useDeclaration = "export declare function use(deorator: Function): (target: any, methodName: string, desriptor: PropertyDescriptor) => void;";
//# sourceMappingURL=decorator.js.map