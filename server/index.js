const puppeteer = require('puppeteer')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())


app.get('/:id', (req, res) => {
  const id = req.params.id
async function search() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(
    `https://www.google.com/search?q=${id}&num=5&gl=uk&tbm=nws&sxsrf=APq-WBvv7cSU3C17cV1WekcxFougM6ZfHw:1643456761780&source=lnt&tbs=sbd:1&sa=X&ved=2ahUKEwiM9vTD8db1AhU6w4sBHcYxBAoQpwV6BAgBECE&biw=1280&bih=569&dpr=1.5`,
  )

  const grabheading = await page.evaluate(() => {
    const head = document.querySelectorAll("a[class='WlydOe']")

    const a = []
    let i = 0
    head.forEach((x) => {
      const data = x.getAttribute('href')
      const text = x.querySelector('.GI74Re.nDgy9d')
      const textd = text.innerText
      const heading = x.querySelector('div[role="heading"]')
      const headingd = heading.innerText

      i++
      a.push({ id: i, link: data, heading: headingd, text: textd })
    })

    return a
  })

  //   const attr = await page.$$eval("a[class='WlydOe']", (el) =>
  //     el.map((x) => x.getAttribute('href')),
  //

  console.log('hello')
  console.log(grabheading)
  res.send(grabheading)

  await browser.close()
}
search()
})

app.listen(5000, () => {
  console.log('listning to port 5000')
})



////////////////////////////////////////////////////////////////////

// const puppeteer = require('puppeteer')

// async function Search3() {
//   const browser = await puppeteer.launch({ headless: false })
//   const page = await browser.newPage()
//   await page.goto('https://www.google.com/search?q=bitcoin')

//   // const getSearchResults=await page.evaluate(()=>{
//   //   +&num=100&gl=usa
//   // })
//   //   await page.click('a[id="pnnext"]')
//   try {
//     for (let i = 0; i < 10; i++) {
//       await page.click('a[id="pnnext"]')
//       await page.waitForSelector('a[id="pnnext"]')
//     }

//     //   await page.waitForSelector('a[id="pnnext"]')
//     //   await page.click('a[id="pnnext"]')
//   } catch (err) {
//     console.log(err)
//   }
//   //   const [response] = await Promise.all([
//   //     page.waitForNavigation(),
//   //     page.click('a[id="pnnext"]'),
//   //   ])
// }
// Search3()

// const express = require('express');
// const app = express();
// const port = 3001;
// app.get('/', (req, res) => {

// })

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
