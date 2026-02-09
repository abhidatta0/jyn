#!/usr/bin/env node
import chalkAnimation from 'chalk-animation';
import { sleep } from './utils/timers';
import colors from 'yoctocolors';
import { select, Separator } from '@inquirer/prompts';
import {macAddressGenerator, passwordGenerator,
  ipAddressGenerator,
  emailAddressGenerator,
  slugGenerator,
} from './src';
import clipboard from 'clipboardy';
import type { BaseSelection } from './types';

async function welcome(){
  const title = chalkAnimation.rainbow("I'm Jyn - a random generator toolbelt");
  await sleep();
  title.stop();
  await askBaseSelection();
}


async function askBaseSelection(){
    const answer = await select<BaseSelection>({
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
        {
          name:'Ip address generation (choose ipv4 or ipv6)',
          value:'ip_address_gen',
        },
        {
          name:'Email address generation',
          value:'email_address',
        },
         {
          name:'Slug generation',
          value:'slug',
        },
      ]
       
    });

   let output;
   switch(answer){
    case 'password_gen':{
      output = await passwordGenerator();
      break;
    }
    case 'mac_address_gen':{
      output = await macAddressGenerator();
      break;
    }
    case 'ip_address_gen':{
      output = await ipAddressGenerator();
      break;
    }
    case 'email_address':{
      output = await emailAddressGenerator();
      break;
    }
    case 'slug':{
      output = await slugGenerator();
      break;
    }
    default:{
      console.log("This is a invalid choice !!")
    }
   }

   if(output){
    console.log(colors.bgGreen(colors.bold(output)));
    await clipboard.write(output ?? '');
    console.log("Copied to clipboard!")
   }
}




async function start(){
  try{
    await welcome();
  }catch(e){
    console.log(colors.red("Operation cancelled"));
  }
}

start();