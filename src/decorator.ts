import { Decorator, FunctionDeclaration, SyntaxKind, ClassDeclaration, MethodDeclaration, Project } from "ts-morph";


export function getDeclarationOf(decorator:Decorator|FunctionDeclaration ):FunctionDeclaration{
    if(!(decorator instanceof Decorator))
        return decorator .getType().getCallSignatures()[0].getDeclaration() as FunctionDeclaration;
    for(let r of decorator.getNameNode()?.findReferences())
        for(let rs of r.getReferences())
            for(let decl of rs.getNode().getSymbol()?.getDeclarations()||[])
                if(decl.isKind(SyntaxKind.FunctionDeclaration))    
                    return decl;
    throw new Error(`cannot find declaration of ${decorator.getName()}`);
}
export function isAnnotedBy(classDeclaration:ClassDeclaration|MethodDeclaration,decorator:Decorator|string){
    let declaration=decorator instanceof Decorator?getDeclarationOf(decorator).getFullText():decorator;
    for(let d of classDeclaration.getDecorators())
        if(getDeclarationOf(d).getFullText().endsWith(declaration))
            return d;

    
    
    return null;
}



export function getDecorator(...project:Project[]):Decorator[]{
    let rep=new Array<Decorator>();
    for(let p of project)
        for(let s of p.getSourceFiles()) 
            for(let d of s.getDescendantsOfKind(SyntaxKind.Decorator))
                rep.push(d);
    return rep;
}
export const processorDeclaration="export declare function processor(target: any): void;";
export const useDeclaration="export declare function use(deorator: Function): (target: any, methodName: string, desriptor: PropertyDescriptor) => void;";