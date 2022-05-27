```javascript
const generate = () => {
  const timestamp = Date.now();

  const result = BigInt(timestamp) << BigInt(22);
  console.log(result);
  console.log(result.toString(2));

  const shard_id = 750;

  const result2 = result | (BigInt(shard_id % 1024) << BigInt(12));
  console.log(result2);
  console.log(result2.toString(2));

  const sequence = 4055;

  const result3 = result2 | BigInt(sequence % 4096);
  console.log(result3);
  console.log(result3.toString(2));
  console.log(result3.toString(2).length);

  console.log("");

  const snowflake_string = "0" + result3.toString(2);

  const timestamp_bits = snowflake_string.substring(1, 42);

  console.log("Timestamp: ", timestamp);
  console.log("Timestamp Bits: ", timestamp_bits);
  console.log("Total Bits: ", timestamp_bits.length);
  console.log("Timestamp: ", timestamp_bits, 2);
  console.log("Matches Timestamp: ", parseInt(timestamp_bits, 2) === timestamp);

  console.log("");

  const shard_bits = snowflake_string.substring(42, 52);

  console.log("Shard Id Bits: ", shard_bits);
  console.log("Total Bits: ", shard_bits.length);
  console.log("Shard Id: ", parseInt(shard_bits, 2));
  console.log("Matches Shard Id: ", parseInt(shard_bits, 2) === shard_id);

  console.log("");

  const sequence_bits = snowflake_string.substring(52);

  console.log("Sequence Id Bits: ", sequence_bits);
  console.log("Total Bits: ", sequence_bits.length);
  console.log("Sequence Id: ", parseInt(sequence_bits, 2));
  console.log("Matches Sequence Id: ", parseInt(sequence_bits, 2) === sequence);

  console.log(result3.toString());
};

generate();
```
