"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProcessor = void 0;
const ts_morph_1 = require("ts-morph");
const decorator_1 = require("./decorator");
function findProcessor(...project) {
    let rep = new Array();
    for (let p of project) {
        for (let s of p.getSourceFiles()) {
            for (let c of s.getDescendantsOfKind(ts_morph_1.SyntaxKind.ClassDeclaration)) {
                (0, decorator_1.isAnnotedBy)(c, decorator_1.processorDeclaration) && rep.push(c);
            }
        }
    }
    return rep;
}
exports.findProcessor = findProcessor;
//# sourceMappingURL=processor.js.map