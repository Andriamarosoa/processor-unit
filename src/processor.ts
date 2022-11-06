import { ClassDeclaration,Project, SyntaxKind } from "ts-morph";
import { isAnnotedBy, processorDeclaration } from "./decorator";



export function findProcessor(...project:Project[]):ClassDeclaration[]{
    let rep=new Array<ClassDeclaration>();
    for(let p of project){
        for(let s of p.getSourceFiles()){
            for(let c of s.getDescendantsOfKind(SyntaxKind.ClassDeclaration)){
                isAnnotedBy(c,processorDeclaration) && rep.push(c);
            }

        }
    }
    return rep;
}

