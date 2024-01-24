const { App } = require('@slack/bolt');
const compliments = require('./work_compliments.json');
require('dotenv').config();

const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
  });

const triggerCommand = 'compliment';

app.message(triggerCommand, async ({ message, say }) => {
  const compliment = getRandomCompliment();

  await say(compliment);
});

function getRandomCompliment() {
  const randomIndex = Math.floor(Math.random() * compliments.workCompliments.length);
  return compliments.workCompliments[randomIndex];
}

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Bot is running!');
})();
