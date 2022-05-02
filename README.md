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
npm install onlinepbx
```

## Usage

```js
import { createOnlinePBXClient } from 'onlinepbx'

const telephony = createOnlinePBXClient({
  apiKey: '',
  domain: '',
  autoConnect: false // turns off automatic connection when creating a client
})

// Create ws connection
telephony.connect()

// Hanlde success connection event
telephony.on('connect', () => {
    console.log('success')
})

// Call to subscriber
telephony.command('make_call', {
    from: '101', // internal onlinepbx user number
    to: '998992221144' // subscriber phone number
})
```

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present, azabroflovski
