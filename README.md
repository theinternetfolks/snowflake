[![The Internet Folks Logo](https://theinternetfolks.com/assets/images/logo.png)](https://theinternetfolks.com)

# @theinternetfolks/snowflake

[![GitHub license](https://img.shields.io/github/license/theinternetfolks/kubernetes.svg)](https://github.com/theinternetfolks/context/blob/master/LICENSE)
[![Maintainer](https://img.shields.io/badge/maintainer-monkfromearth-green)](https://github.com/monkfromearth)
[![Downloads](https://img.shields.io/npm/dm/@theinternetfolks/snowflake)](https://www.npmjs.com/package/@theinternetfolks/kubernetes)

Library to help you create a Snowflake Id or parse the same.

## Installation

Install with npm

```bash
  npm install @theinternetfolks/snowflake
```

Install with yarn

```bash
  yarn add @theinternetfolks/snowflake
```

## Usage

#### Simple Generation

```javascript
import { Snowflake } from "@theinternetfolks/snowflake";

console.log(Snowflake.generate());
// 6917062538869867520
```

#### Advanced Generation

```javascript
import { Snowflake } from "@theinternetfolks/snowflake";

console.log(Snowflake.generate({ timestamp: 1649156222074 }));
// 6917062538869867520
```

```javascript
import { Snowflake } from "@theinternetfolks/snowflake";

console.log(Snowflake.generate({ timestamp: 1649157035498, shard_id: 4 }));
// 6917065950617407488
```

## API

```
static generate(
    {
        timestamp?: Date | number;
        shard_id?: number;
        epoch?: number;
    }
): string;
```

```
static parse(snowflake: string | number | bigint): {
    timestamp: number;
    shard_id: number;
    binary: string;
};
```

[Test Coverage](https://theinternetfolks.github.io/snowflake/coverage/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
