import { ClassDeclaration, Decorator, MethodDeclaration } from "ts-morph";
export declare function getCallBack(classDeclaration: ClassDeclaration[]): MethodDeclaration[];
export declare function resolveCallBack(decorator: Decorator): Promise<Function>;
