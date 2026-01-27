#!/usr/bin/env node
import chalkAnimation from 'chalk-animation';
import { sleep } from './utils/timers';
import { select, Separator } from '@inquirer/prompts';
import passwordGenerator from './src/password';

async function welcome(){
  const title = chalkAnimation.rainbow("I'm Gyn - a random generator toolbelt");
  await sleep();
  title.stop();
  await askBaseSelection();
}


async function askBaseSelection(){
    const answer = await select({
      message:'Select your choice',
      choices:[
        {
          name:'Password generation',
          value:'password_gen',
        },
        new Separator(),
      ]
       
    });

   let output;
   switch(answer){
    case 'password_gen':{
      output = await passwordGenerator();
    }
   }

   console.log({output});
}




async function start(){
  await welcome();
}

start();