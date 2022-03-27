import './style.css'
import { OnlinePBX } from './lib'

const onlinePBX = new OnlinePBX({
    apiKey: '',
    domain: '',
    autoConnect: false
})

console.log(onlinePBX)

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Onlinepbx</h1>
`
