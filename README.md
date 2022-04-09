# OnlinePBX 

Simple [OnlinePBX](https://www.onlinepbx.ru/) telephony interface. Powered by plain JavaScript (written in TypeScript) ⚡️

> ⚠️ This package is unstable and in active development. Use at your own risk or 
> wait for the release of a stable version for use in a production environment.

## Features

- __Intuitive API__
- __Lightweight__
- __TypeScript__
- __Plain JS__

## Documentation

Coming soon...

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

// Hanlde success connection
onlinePBX.on('connect', () => {
    console.log('success')
})

// Call to subscriber
onlinePBX.command('make_call', {
    from: '101', // internal onlinepbx user number
    to: '998992221144' // subscriber phone number
})
```

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present, azabroflovski
