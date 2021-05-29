#!/usr/bin/env node
const { Select, Toggle, NumberPrompt, StringPrompt } = require('enquirer');
const chalk = require('chalk');
const { randomNumber, dialog, nameInsulter, waitFor } = require('./util.js');

console.clear();
const text_marriage = `Marry a Nigerian princess. (Hurry! Only ${randomNumber(
  1000,
  500,
)} remaining...)`;
const text_lottery = 'Win a lottery.';
const text_quit = `No, I'm happy being lonely. 👓 `;
const king = 'Nigerian king';
let userName = '';

console.log(`Hey 🖖,

We are legit guys 🌚 from your friendly firebass team!
We are glad to inform you that today is your lucky day.
Such a lucky person you are, you got to meet the Nigerian king himself.

`);

let virgin_user = true;

const runPrompt = async () => {
  console.clear();
  virgin_user = false;
  const prompt = new Select({
    name: 'color',
    message: `${dialog(king, 'Pick one')} ${virgin_user ? '😜' : '😂 '}`,
    choices: [text_marriage, text_lottery, text_quit],
  });
  let answer = await prompt.run();
  if (answer === text_marriage) {
    const prompt = new StringPrompt({
      name: 'name',
      message: dialog(king, 'What is your beautiful name son?😊'),
    });

    prompt
      .run()
      .then(async (answer) => {
        userName = nameInsulter(answer);
        const passages = [
          `${king}: 🤦 `,
          `${userName}???`,
          `That must be the most ridiculous name I've ever heard in my entire life.`,
          `What were your parents thinking? I'm curious.`,
          `Oh, maybe they wanted to do justice to your face!`,
          `But, whatever.`,
          `One should not judge people by their names! `,
          `Even... when they are named ${userName}🤭 `,
          `Mmm...`,
          `Wait. Lemme check the availability.`,
          `Ok. One remaining. How unfortunate.`,
          `Poor girl.`,
          `Hold up!`,
          `Few more seconds...`,
          `There we go!!! 😋 `,
          `You are late son.
           All my daughters are now married to people with good names.
           But do not lose hope, You are such a strong man!`,
          `You have lived your entire life with this -> ${nameInsulter(answer)}.
           How worse can it get?`,
        ];

        for (let i = 0; i < passages.length; i++) {
          console.log(`
            ${passages[i]}
                `);
          await waitFor();
        }

        entry();
      })
      .catch(console.error);
  } else if (answer === text_lottery) {
    const prompt = new NumberPrompt({
      name: 'number',
      message: 'Please enter your lucky number 🤗 ',
    });

    prompt
      .run()
      .then((answer) => {
        console.log(
          `

          ${dialog(
            king,
            `
            Well ${answer} turned out to be your unlucky number! 😏
            Maybe it's not the number that's to be blamed.🙄`,
          )}

          `,
        );
        entry();
      })
      .catch(console.error);
  } else {
    harshFarewell();
  }
};

const entry = async () => {
  const prompt = new Toggle({
    message: virgin_user
      ? `Nigerian king: ${chalk.italic(
          `"Hey, lucky person! Would you like to talk to me for a second??`,
        )} 😍"`
      : 'Try again? 😏',
    disabled: virgin_user ? 'Absolutely' : 'Um... Okay.',
    enabled: 'Nope',
  });
  let answer = await prompt.run();
  if (!answer) {
    runPrompt();
  } else {
    harshFarewell();
  }
};

const harshFarewell = async () => {
  console.clear();
  const prompt = new Select({
    name: 'color',
    message: `${dialog(
      king,
      virgin_user
        ? `Don't go. I know you are busy.
      Please retry.`
        : `You are a good quitter. Aren't you?
      I heard you quit your job even before they called you for an interview.`,
    )}`,
    choices: ['I QUIT.', 'GOODBYE', 'RETRY'],
  });
  let answer = await prompt.run();
  if (answer === 'GOODBYE') {
    console.log(`
      GOOD RIDDANCE, Mr. ${userName ? userName : ''}
      `);
  } else if (answer === 'RETRY') {
    entry();
  } else {
    console.log(`

    ${dialog(
      king,
      userName
        ? `
    I just realized.
    Qui...ter... and ${userName} rhyme the same! 🤯
    Woah...
    `
        : `Heh, Just a nameless quitter.`,
    )}

    `);
  }
};

entry();
