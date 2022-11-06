import * as fs from 'fs';
import { getTsconfig } from 'get-tsconfig';
import * as path from 'path';
import { Project } from 'ts-morph';
import { projectInRuntime } from '.';

const p=path.join(__dirname, '../processor.json');



export function getProject():Array<Project>{
    const pathList:Array<string>=JSON.parse(fs.readFileSync(p, 'utf8'));
    let rep=new Array<Project>()
    for(let c of pathList){
        try{
            rep.push(new Project({
                tsConfigFilePath: c,
            }));
        }
        catch(err:any){
            console.warn(err.message)
        }
    } 
    rep.push(projectInRuntime);
    return rep;
}

export function projectName(){
    const pathList:Array<string>=JSON.parse(fs.readFileSync(p, 'utf8'));
    let rep=new Array<string>()
    for(let c of pathList){
        try{
            let p=new Project({
                tsConfigFilePath: c,
            })
            rep.push(p.getDirectories()[0].getBaseName());
        }
        catch(err:any){
            console.warn(err.message);
            rep.push(c)
        }
    } 
    return rep;
}

export function saveProcessor(path:string){
    if(!path.endsWith("tsconfig.json")) throw new Error("Path is invalid");
    new Project({
        tsConfigFilePath: path,
    })
    const pathList:Array<string>=JSON.parse(fs.readFileSync(p, 'utf8'));
    !pathList.includes(path) && pathList.push(path);
    fs.writeFileSync(p,JSON.stringify(pathList));
    return getProject();
}

export function removeProject(name:string){
    let i=projectName().indexOf(name);
  
    if(i<0) return;
    let pathList:Array<string>=JSON.parse(fs.readFileSync(p, 'utf8'));
    pathList.splice(i,1);
  
    
    fs.writeFileSync(p,JSON.stringify(pathList));
}

export function register(){
    saveProcessor(getTsconfig()?.path as string)
}
