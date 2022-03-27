# OnlinePBX 

Simple [OnlinePBX](https://www.onlinepbx.ru/) telephony interface. Powered by plain JavaScript (written in TypeScript) ⚡️

> ⚠️ Wait for the release of a stable version for use in a production environment.

## Features

- __Lightweight__
- __Minimalist__
- __TypeScript__
- __Plain JS__

## Install

```sh
npm install onlinepbx-ts
```

## Usage

```js
import { OnlinePBX } from 'onlinepbx-ts'

const onlinePBX = new OnlinePBX({
  apiKey: '',
  domain: '',
  autoConnect: false
})

// Create ws connection
onlinePBX.connect()

onlinePBX.on('connect', () => {
    console.log('success')
})

onlinePBX.command('make_call', {
    from: '101', // internal onlinepbx user number
    to: '998992221144' 
})
```

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present, azabroflovski
