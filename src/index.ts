export class Snowflake {
  /* c8 ignore start */
  /**
   * The generators epoch timestamp in milliseconds.
   *
   * Defaults to "1st of January, 2000, 00:00".
   *
   * @type {number}
   */
  /* c8 ignore end */

  static EPOCH: number = Date.UTC(1970, 0, 1).valueOf();

  /* c8 ignore start */
  /**
   * The id of the shard running this generator.
   *
   * Defaults to "1".
   *
   * @type {number}
   */
  /* c8 ignore end */

  static SHARD_ID: number = 1;

  /* c8 ignore start */
  /**
   * The sequence of the current running generator.
   *
   * Defaults to "1".
   *
   * @type {number}
   */
  /* c8 ignore end */

  static SEQUENCE: number = 1;

  /* c8 ignore start */
  /**
   * Generates a single snowflake.
   * @param {Date|number} [timestamp = Date.now] - Timestamp to generate from
   * @returns {bigint}
   */
  /* c8 ignore end */

  static generate({
    timestamp = Date.now(),
    shard_id = Snowflake.SHARD_ID,
  }: {
    timestamp?: Date | number;
    shard_id?: number;
  } = {}): string {
    if (timestamp instanceof Date) timestamp = timestamp.valueOf();
    else timestamp = new Date(timestamp).valueOf();

    // tslint:disable:no-bitwise
    let result = (BigInt(timestamp) - BigInt(Snowflake.EPOCH)) << BigInt(22);
    result = result | (BigInt(shard_id % 1024) << BigInt(12));
    result = result | BigInt(Snowflake.SEQUENCE++ % 4096);
    // tslint:enable:no-bitwise
    return result.toString();
  }

  /**
   * Deconstruct a snowflake to its values using the `Generator.epoch`.
   * @param {SnowflakeResolvable|SnowflakeResolvable[]} snowflake - Snowflake(s) to deconstruct
   * @returns {DeconstructedSnowflake|DeconstructedSnowflake[]}
   */

  static parse(snowflake: SnowflakeResolvable): DeconstructedSnowflake {
    const binary = Snowflake.binary(snowflake);
    return {
      timestamp: Snowflake.extractBits(snowflake, 1, 41),
      shard_id: Snowflake.extractBits(snowflake, 42, 10),
      sequence: Snowflake.extractBits(snowflake, 52),
      binary,
    };
  }

  static isValid(snowflake: string) {
    if (!/^[\d]{19}$/.test(snowflake)) {
      return false;
    }
    try {
      Snowflake.parse(snowflake);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Extract bits and their values from a snowflake.
   * @param {SnowflakeResolvable} snowflake - Snowflake to extract from
   * @param {number|bigint} shift - Number of bits to shift before extracting
   * @param {number|bigint} length - Number of bits to extract before stopping
   * @returns {bigint}
   */

  static extractBits(
    snowflake: SnowflakeResolvable,
    start: number,
    length?: number
  ): number {
    return parseInt(
      length
        ? Snowflake.binary(snowflake).substring(start, start + length)
        : Snowflake.binary(snowflake).substring(start),
      2
    );
  }

  /**
   * Transform a snowflake into its 64Bit binary string.
   * @param {SnowflakeResolvable} snowflake - Snowflake to transform
   * @returns {string}
   * @private
   */

  static binary(snowflake: SnowflakeResolvable): string {
    const cached64BitZeros =
      "0000000000000000000000000000000000000000000000000000000000000000";
    const binValue = BigInt(snowflake).toString(2);
    return binValue.length < 64
      ? cached64BitZeros.substring(0, 64 - binValue.length) + binValue
      : binValue;
  }
}

/**
 * Resolvable value types for a valid Snowflake.
 * * string
 * * number
 * * bigint
 * @type {SnowflakeResolvable}
 */

type SnowflakeResolvable = string;

/**
 * Interface of a Snowflake after `Generator.deconstruct()`.
 * @property {bigint} snowflake - Snowflake deconstructed from
 * @property {bigint} timestamp - The timestamp the snowflake was generated
 * @property {bigint} shard_id - The shard_id used when generating
 * @property {bigint} increment - The increment of this snowflake
 * @property {string} binary - The 64Bit snowflake binary string
 * @interface DeconstructedSnowflake
 */

interface DeconstructedSnowflake {
  timestamp: number;
  shard_id: number;
  sequence: number;
  binary: string;
}
