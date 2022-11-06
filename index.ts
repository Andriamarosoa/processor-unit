#!/usr/bin/env node
export * from "./src"
import pck from "./package.json"
import tsconfig from "./tsconfig.json";
import processor from "./processor.json";


import chalk from "chalk"; 
import figlet from 'figlet';
import { prompt } from 'enquirer';    
import { process,register, projectName, removeProject, getDecorator, getProject } from "./src";





 






function font(){
  console.log(
    chalk.bold.hex("#3f8dce")(figlet.textSync('bla-bla', { font: "Bloody" })),
    );
    console.log(
    chalk.hex("#fffa00")('⚡️'),
    chalk.hex("#3f8dce")('author  : '),
    chalk.hex("fffa00")(pck.author)
  )
  console.log(
    chalk.hex("#fffa00")('⚡️'),
    chalk.hex("#3f8dce")('version : '),
    chalk.hex("fffa00")(pck.version)
  )

}


async function response(commande:string){
  if(commande==="welcome"){
    console.log(chalk.hex("#fffa00")("WELCOME !! ") )
  }
  else if(commande==="help")
    console.log(chalk.hex("#fffa00")("> "),"Ask to",chalk.hex("#13aa52")("Tina Andriamarosoa"),"!!")
  else if(commande==="save as Processor"){
    register();
    console.log(chalk.hex("#fffa00")("> "),"Project",chalk.hex("#13aa52")("added successFully"),"!!")
  }
  else if(commande=="quit"){}
  else if(commande=="all"){
    console.log(chalk.hex("#fffa00")("success"),"!!")
    return process(null).then().catch(console.log);
  }
  else if(commande=="remove Processor"){
    
    let project=projectName();

    
    if(project.length==0)console.log(chalk.hex("#13aa52")("there is no Project"),"!!")
    else{
      let value:any=await prompt({
        type:"autocomplete",
        name:"project",
        message:"select one to remove",
        choices:project,      
      })

      console.clear();
      font();
      removeProject(value.project)
      console.log("\n",chalk.hex("#fffa00")("> "),value.project,chalk.hex("#13aa52")("deleted successFully"),"!!")

    }

  }
  else {
    process(commande).then().catch(console.log)
    console.log(chalk.hex("#13aa52")("> "),commande,chalk.hex("#fffa00")("successFully"),"!!")
  }
}



async function run (value?:any){
  console.clear();
  font();

  console.log("\n")
  await response(value.commande)
  console.log("\n")

  var commande = new Array()
  let callback=getDecorator(...getProject())
  for(let c of callback)
    c.getName()!="processor"&& c.getName()!="use" && !commande.includes(c.getName()) &&commande.push(c.getName())
  commande.push("save as Processor","remove Processor","help","quit")    
  
  value.commande!="quit" && prompt({
      type:'autocomplete',
      choices:commande,
      message: 'Enter a commande?',
      name:"commande",
      initial:value?.commande||0
  }).then(async (v)=>await run(v))
  
  
}

  
  
run({commande:"welcome"}).then()