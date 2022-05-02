import './style.css'
import { createOnlinePBXClient } from './lib'

const onlinePBX = createOnlinePBXClient({
    apiKey: '',
    domain: '',
    autoConnect: false
})

console.log(onlinePBX)

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Onlinepbx</h1>
`
