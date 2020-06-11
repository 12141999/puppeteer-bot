const puppeteer = require('puppeteer');
const chromeOptions = {
    executablePath:'google-chrome',
    headless: false
 };

 function extractTitle() {
    const title1 = document.querySelectorAll('._13J5uS');
    const items = [];
    for (let element of title1) {
        items.push(element.innerText);
    }
    return items;
}

  (async function main() {
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    await page.setViewport({width:1535, height:756});
    await page.goto('https://www.flipkart.com/realme-x2-pearl-white-64-gb/p/itm75023903eb431' , { waitUntil: 'domcontentloaded' });
    await page.screenshot({path:'contactus.png'});

    await page.waitFor(5000);

    const form = await page.waitForSelector('._3X4tVa');
    let pincode = "322230";
    form.type(pincode);
    await page.waitFor(4000);
    await page.click('._2aK_gu');
    await page.waitFor(5000);
    const title2 = await page.evaluate(extractTitle);
    console.log(`this product ${title2} where pincode is ${pincode}`);

    await page.screenshot({path:'filled.png'});
    await browser.close();
  })()