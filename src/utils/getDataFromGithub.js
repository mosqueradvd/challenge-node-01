const puppeteer = require('puppeteer');
const postToSlack = require('./postToSlack');
const { getTime } = require('./getTime');

const getDataFromGithub = async (githubUser) => {
  console.log('Launch Puppeteer');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const githubUrl = 'https://github.com/';

  await page.goto(`${githubUrl}${githubUser}`);
  await page.screenshot({ path: `src/images/${getTime()}-${githubUser}.png` });

  const githubCounter = await page.evaluate(() => document.getElementsByClassName('Counter')[0].innerText);
  console.log('counter:', githubCounter);
  const githubUserPhoto = await page.evaluate(() => document.getElementsByClassName('avatar-before-user-status')[0].src);
  
  postToSlack(githubUser, githubUserPhoto, githubCounter);
  
  await browser.close();
};

module.exports = {
  getDataFromGithub,
};
