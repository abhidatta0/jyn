#!/usr/bin/env node
import chalkAnimation from 'chalk-animation';
import { sleep } from './utils/timers';

async function welcome(){
    const title = chalkAnimation.rainbow("I'm Gyn - a random generator toolbelt");
    await sleep();
    title.stop();
}


async function start(){
  await welcome();
}

start();