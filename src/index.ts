#!/usr/bin/env node
import { Project,Decorator } from "ts-morph";
import { getTsconfig } from 'get-tsconfig';  
import { findProcessor } from "./processor"; 
import { getCallBack, resolveCallBack } from "./callback";
import { getDeclarationOf, getDecorator, isAnnotedBy, useDeclaration } from "./decorator";
import { getProject } from "./register";

export const projectInRuntime = new Project({
    tsConfigFilePath: getTsconfig()?.path,
});








export async function process(commande:string|null){
	const project=getProject();
	
	let classDeclaration=findProcessor(...project);
	let callBack=getCallBack(classDeclaration);
	for(let c of callBack){
		let use=isAnnotedBy(c,useDeclaration) as Decorator;
		let declaration=getDeclarationOf(use.getArguments()[0] as any);
		for(let d of getDecorator(...project)){
			 
			if(getDeclarationOf(d).getFullText().endsWith(declaration.getFullText()) && (d.getName()==commande ||commande==null)){
				let f=await resolveCallBack(use ) as any;
				f(projectInRuntime,d)
			}
		
		}
		
	}
	
} 






export * from "./register"
export * from "./callback"
export * from "./processor"
export * from "./decorator"



	

