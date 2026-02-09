import { words } from "../../data/slugs";
import {number, select} from '@inquirer/prompts';

function generateSlug(count = 3) {
  const shuffled = words.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).join('-');
}

export default async function slugGenerator(){
    const count = await number({message:'Enter number of words'});
    const choice = await select<'yes'|'no'>({message:"Add random id at the end ?",choices:[
        {
            name:"Yes",
            value:"yes"
        },
        {
            name:"No",
            value:"no"
        }
    ]})
    let append = '';
    if(choice === 'yes'){
       append = Math.floor(Math.random() *100)+"";
    }
    const slug = generateSlug(count);
    return append.length > 0 ? slug+"-"+append : slug;
}
