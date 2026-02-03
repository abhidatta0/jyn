#!/usr/bin/env node
import chalkAnimation from 'chalk-animation';
import { sleep } from './utils/timers';
import colors from 'yoctocolors';
import { select, Separator } from '@inquirer/prompts';
import {macAddressGenerator, passwordGenerator} from './src';

async function welcome(){
  const title = chalkAnimation.rainbow("I'm Jyn - a random generator toolbelt");
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
        {
          name:'Mac address generation',
          value:'mac_address_gen',
        },
      ]
       
    });

   let output;
   switch(answer){
    case 'password_gen':{
      output = await passwordGenerator();
    }
    case 'mac_address_gen':{
      output = await macAddressGenerator();
    }
   }

   console.log("Result: ", output);
}




async function start(){
  try{
    await welcome();
  }catch(e){
    console.log(colors.red("Operation cancelled"));
  }
}

start();