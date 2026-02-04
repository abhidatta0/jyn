import {select} from '@inquirer/prompts';
import generateRandomIPv4 from './ipv4';
import generateRandomIPv6 from './ipv6';


export default async function ipAddressGenerator(){
     const answer = await select({
      message:'Select your choice',
      choices:[
        {
          name:'Ipv4',
          value:'ipv4',
        },
        {
          name:'Ipv6',
          value:'ipv6',
        },
      ]
    });

    let output;
       switch(answer){
        case 'ipv4':{
          output = generateRandomIPv4();
          break;
        }
        case 'ipv6':{
          output = generateRandomIPv6();
          break;
        }
    }

    return output;
}