import { Decorator, FunctionDeclaration, ClassDeclaration, MethodDeclaration, Project } from "ts-morph";
export declare function getDeclarationOf(decorator: Decorator | FunctionDeclaration): FunctionDeclaration;
export declare function isAnnotedBy(classDeclaration: ClassDeclaration | MethodDeclaration, decorator: Decorator | string): Decorator | null;
export declare function getDecorator(...project: Project[]): Decorator[];
export declare const processorDeclaration = "export declare function processor(target: any): void;";
export declare const useDeclaration = "export declare function use(deorator: Function): (target: any, methodName: string, desriptor: PropertyDescriptor) => void;";
