/*
    ce processeur nous permet de generer des fonction qui  servent à controller les arguments/parameter en entrer d'une fonction.

    exemple:
    export class Person{
        hello(@cast person:Person){
            console.log(person)

        }
    }

    new Person().hello({} as any)
    // output : Person {}
    
    
    
    new Person().hello(2 as any)
    // output : Error :"2 cannot be converted to Person"

*/




import { CodeBlockWriter, Decorator, Project, SourceFile, SyntaxKind } from "ts-morph";
import { processor,use } from "stricttype";



export function cast(target:any,methodName:string,index:number){}

 

//importer les class utilisée dans le fichier "source" qui sera génerer
function imported(source:SourceFile,type:any){ 
    let path=source.getRelativePathTo(type.getSymbol()?.getDeclarations()[0].getSourceFile().getFilePath()).replace(".ts","");
    let imp=`import {${type.getSymbol()?.getEscapedName()}} from "${path}";`
    let b=false;
    for(let d of source.getImportDeclarations())
            if(d.getFullText().endsWith(imp))
                b= true;
    !b && source.addImportDeclaration({
            defaultImport: `{${type.getSymbol()?.getEscapedName()}}`,
            moduleSpecifier: path,
    });

}        

@processor
export class MyFirstProcessor{
    static i=0;
    @use(cast)
    cast(project:Project,d:Decorator ){
        //la paramètre décorer avec @cast;ex:person
        let parameter=d.getParentIfKindOrThrow(SyntaxKind.Parameter);
        //la method dont la paramètre est declarée ;ex:hello  
        let method=parameter?.getParentIfKindOrThrow(SyntaxKind.MethodDeclaration);
        //la method dont la method est declarée ; ex Person
        let classDecl=method?.getParentIfKind(SyntaxKind.ClassDeclaration);
        //l'indice de la parametre :ex 0
        let paramIndex=method?.getParameters().indexOf(parameter);
        // le fichier ou la classe est declarée; ex person.ts
        let sourceClass=classDecl?.getSourceFile()
        

        //le ficier qui va être génerer
        let source=project.getSourceFile("./strict/cast.ts")||project.createSourceFile("./strict/cast.ts",undefined,{overwrite:true});
        
        

        //si le type du paramètre n'est ni une class, ni une tableau de class, les fonction ne seront pas génerer
        if(!(parameter.getType().isClass()||parameter.getType().isArray() && parameter.getType().getArrayElementType()?.isClass()))
            return source.save()
        

        
        MyFirstProcessor.i==0 && source.removeText();
        
        //on importe le classe dans le fichier qui sera generer
        imported(source,classDecl?.getType());

        //on importe le type du parametre dans le fichier qui sera generer
        imported(source,parameter?.getType().isArray()?parameter.getType().getArrayElementType():parameter.getType());

        
        let paramTypeName=parameter.getType().getSymbol()?.getName();



        // creation de la fonction qui sera assurera le "cast" du parametre
        let init=source.addFunction({
            name:"init"+MyFirstProcessor.i,
            returnType:"void",
            isExported:true
        })


        //le corp de la fonction
        let f=(cb:CodeBlockWriter)=>{
            cb.writeLine(`const old${MyFirstProcessor.i}=${classDecl?.getName()}.prototype.${method.getName()};`);
            cb.writeLine(`${classDecl?.getName()}.prototype.${method.getName()}=function(...arg:any[]){`);
            cb.indent();
            if(parameter.getType().isClass()){
                cb.write(`if(typeof arg[${paramIndex}]!=='object')`)
                cb.newLine();
                cb.indent(2);
                cb.write(`throw new Error(JSON.stringify(arg[${paramIndex}]) +" is not assignable to ${paramTypeName}" );`)
                cb.newLine();
                cb.indent()
                cb.write(`else if(!(arg[${paramIndex}] instanceof ${paramTypeName}))`)
                cb.newLine()
                cb.indent(2)
                cb.write(`arg[${paramIndex}]=Object.assign(new ${paramTypeName}(),arg[${paramIndex}]);`);
                cb.newLine();
                cb.indent();
                cb.write(`else`);
                cb.newLine()
                cb.indent(2)
                cb.write(`arg[${paramIndex}]= arg[${paramIndex}];`);
                cb.newLine();
            }
            else{
                cb.write(`if(!(arg[${paramIndex}] instanceof Array))`)
                cb.newLine()
                cb.indent(2)
                cb.write(`throw new Error(JSON.stringify(arg[${paramIndex}])+" is not an Array");`);
                cb.newLine();
                cb.newLine();
                cb.indent(1)
                cb.write(`for (let i=0;i<(arg[${paramIndex}]||[]).length;i++)`)
                cb.newLine();
                cb.indent(2);
                cb.write(`if(typeof arg[${paramIndex}][i]!=='object')`)
                cb.newLine();
                cb.indent(3);
                cb.write(`throw new Error(JSON.stringify(arg[${paramIndex}][i]) +" is not assignable to ${parameter.getType().getArrayElementType()?.getSymbol()?.getName()}" );`)
                cb.newLine();
                cb.indent(2);
                cb.write(`else if(!(arg[${paramIndex}][i] instanceof ${parameter.getType().getArrayElementType()?.getSymbol()?.getName()}))`)
                cb.newLine();
                cb.indent(3);
                cb.write(`arg[${paramIndex}][i]=Object.assign(new ${parameter.getType().getArrayElementType()?.getSymbol()?.getName()}(),arg[${paramIndex}][i]);`)
                cb.newLine();
            }

            cb.newLine();
            cb.indent();
            cb.write(`return (old${MyFirstProcessor.i}.bind(this) as any)(...arg)`);
            cb.writeLine("}");
            
        }
        //on ajoute le method genere dans le fichier qui sera generer
        init.addStatements(f)


        MyFirstProcessor.i++;

        // on enregistre le fichier generer
        return source.save()
    }

}

