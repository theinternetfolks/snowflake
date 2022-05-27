[![The Internet Folks Logo](https://theinternetfolks.com/assets/images/logo.png)](https://theinternetfolks.com)

# @theinternetfolks/snowflake

[![GitHub license](https://img.shields.io/github/license/theinternetfolks/kubernetes.svg)](https://github.com/theinternetfolks/context/blob/master/LICENSE)
[![Maintainer](https://img.shields.io/badge/maintainer-monkfromearth-green)](https://github.com/monkfromearth)
[![Downloads](https://img.shields.io/npm/dm/@theinternetfolks/snowflake)](https://www.npmjs.com/package/@theinternetfolks/kubernetes)
[![Npm package version](https://badgen.net/npm/v/@theinternetfolks/snowflake)](https://npmjs.com/@theinternetfolks/snowflake)

Library to help you create a Snowflake Id or parse the same. This solves the problem of generating unique identifiers at scale.

### What are Snowflakes?

Snowflake IDs, or snowflakes, are a form of unique identifier used in distributed computing. The format was created by Twitter and is used for the IDs of tweets. The format has been adopted by other companies, including Discord, and Instagram, which uses a modified version.

By default, the ID format follows the original Twitter snowflake format.

- The ID as a whole is a 63 bit integer stored in a bigint
- 41 bits are used to store a timestamp with millisecond precision, using a custom epoch.
- 10 bits are used to store a node id - a range from 0 through 1023.
- 12 bits are used to store a sequence number - a range from 0 through 4095.

### Why Snowflakes are better than random UUIDs?

Snowflakes are sortable by time, because they are based on the time they were created. Additionally, the time a snowflake was created can be calculated from the snowflake. This can be used to get snowflakes (and their associated objects) that were created before or after a particular date.

### Who uses Snowflake?

- Twitter uses snowflake IDs for tweets, direct messages, users, lists, and all other objects available over the API.
- Discord also uses snowflakes, with their epoch set to the first second of the year 2015.
- Instagram uses a modified version of the format, with 41 bits for a timestamp, 13 bits for a shard ID, and 10 bits for a sequence number.

### How it Works

Each time you generate an ID, it works, like this.

- A timestamp with millisecond precision is stored using 41 bits of the ID.
- Then the NodeID is added in subsequent bits.
- Then the Sequence Number is added, starting at 0 and incrementing for each ID generated in the same millisecond. If you generate enough IDs in the same millisecond that the sequence would roll over or overfill then the generate function will pause until the next millisecond.

The default Twitter format shown below.

```
+--------------------------------------------------------------------------+
| 1 Bit Unused | 41 Bit Timestamp |  10 Bit NodeID  |   12 Bit Sequence ID |
+--------------------------------------------------------------------------+
```

### Performance

With default settings, this snowflake generator should be sufficiently fast
enough on most systems to generate 4096 unique ID's per millisecond. This is
the maximum that the snowflake ID format supports. That is, around 243-244
nanoseconds per operation.

Since the snowflake generator is single threaded the primary limitation will be
the maximum speed of a single processor on your system.

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

The project is based on a fork off of (snowflake-generator)[https://github.com/FatAussieFatBoy/snowflake-generator].
