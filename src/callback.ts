import { tsImport } from "ts-import";
import { ClassDeclaration,Decorator,MethodDeclaration, SyntaxKind } from "ts-morph"; 
import { isAnnotedBy, useDeclaration } from "./decorator";

export function getCallBack(classDeclaration:ClassDeclaration[]):MethodDeclaration[]{
    let rep=new Array<MethodDeclaration>()
    for(let c of classDeclaration){
        for(let m of c.getChildrenOfKind(SyntaxKind.MethodDeclaration)){
            
            const annoted=isAnnotedBy(m,useDeclaration) 
             
            annoted && rep.push(m)
        }
    }
    return rep;
}





export async function resolveCallBack(decorator:Decorator):Promise<Function>{ 
	const path=tsImport.compile(decorator.getSourceFile().getFilePath())
	let method=decorator.getParentIfKindOrThrow(SyntaxKind.MethodDeclaration);
	let classDecl=method.getParentIfKindOrThrow(SyntaxKind.ClassDeclaration);
    const m=await path;
    let instance=new m[classDecl.getName() as string]()
    return instance[method.getName()].bind(instance) as Function
}