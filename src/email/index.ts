import {select,input} from '@inquirer/prompts';
import { NAMES } from '../../data/names';

export default async function emailAddressGenerator(){
     const answer = await select<'custom'|'yahoo'|'outlook'|'rediffmail'|'aol'>({
      message:'Select your email provider',
      choices:[
        {
          name:'Custom - enter your own',
          value:'custom',
        },
        {
          name:'yahoo.com',
          value:'yahoo',
        },
         {
          name:'outlook.com',
          value:'outlook',
        },
        {
          name:'rediffmail.com',
          value:'rediffmail',
        },{
            name:'aol.com',
            value:'aol'
        }
      ]
    });

    const output = answer === 'custom' 
    ? await customProvider() 
    : answer;

    const username = await getUserNameByFormat();
    return `${username}@${output}.com`.toLowerCase();
}


async function customProvider(){
    const domain = await input({message:'Enter your own provider without .com',
      validate: (value)=>{
        if(!value.trim()) return 'Provider cannot be empty';
        if(value.includes('.')) return 'Enter provider name only, without .com';
        return true;
      },theme:{validationFailureMode:'clear'}
    });
    return domain;
}


async function getUserNameByFormat(){
  const answer = await select<'x.y'|'x'>({
      message:'Select your username format',
      choices:[
        {
          name:'Single - X@<DOMAIN>.COM',
          value:'x',
        },
        {
          name:'Splitted - X.Y@<DOMAIN>.COM',
          value:'x.y',
        },
      ]
    });
  let output;
  switch(answer){
    case 'x':{
      output = getSingleUserName();
      break;
    }
    case 'x.y':{
      output = getSplittedUserName();
      break;
    }
  }

  return output;
}

function getSplittedUserName(){
  const names:string[] = [];
  const length = NAMES.length;
  for(let i=0;i<2;){
    const idx = Math.floor(Math.random() * length);
    if(NAMES[idx] && !names.includes(NAMES[idx])){
      names.push( NAMES[idx]);
      i++;
    }else{
      continue;
    }
  }

  return names.join('.');
}


function getSingleUserName(){
  const length = NAMES.length;
  const idx = Math.floor(Math.random() * length);
  return NAMES[idx] || '';
}