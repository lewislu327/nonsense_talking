const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const hbshelpers = require('handlebars-helpers')
const multihelpers = hbshelpers()
const app = express()
const port = 3000
const task = {
  engineer: ['加個按鈕','加新功能','切個版', '改一點 code'],
  designer: ['畫一張圖', '改個 logo','順便幫忙設計一下','隨便換個設計'],
  entrepreneur: ['週末加班', '要能賺錢','想個 business model','找 VC 募錢']
}

const phrase = ['很簡單','很容易','很快','很正常']

app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: multihelpers}))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  let bsWord = ''
  const people = req.body.people 
  const tasks = task[people]
  const title = titleSwitch(people)
  const taskRamdomIndex = Math.floor(Math.random() * tasks.length)
  const phraseRandomIndex = Math.floor(Math.random() * phrase.length) 

  bsWord = `身為一個${title}，${tasks[taskRamdomIndex]}，${phrase[phraseRandomIndex]}`
  res.render('index',{bsWord,people} )
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})

function titleSwitch(people) {
  switch (people) {
    case 'engineer':
      return '工程師';
    case 'designer':
      return '設計師';
    case 'entrepreneur':
      return '創業家';
  }
}
