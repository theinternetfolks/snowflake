export declare class Snowflake {
    /**
     * The generators epoch timestamp in milliseconds.
     *
     * Defaults to "1st of January, 2000, 00:00".
     *
     * @type {number}
     */
    static EPOCH: number;
    /**
     * The id of the shard running this generator.
     *
     * Defaults to "1".
     *
     * @type {number}
     */
    static SHARD_ID: number | null;
    /**
     * Generates a single snowflake.
     * @param {Date|number} [timestamp = Date.now] - Timestamp to generate from
     * @returns {bigint}
     */
    static generate({ timestamp, shard_id, sequence, }?: {
        timestamp?: Date | number;
        shard_id?: number;
        sequence?: number;
    }): string;
    /**
     * Deconstruct a snowflake to its values using the `Generator.epoch`.
     * @param {SnowflakeResolvable|SnowflakeResolvable[]} snowflake - Snowflake(s) to deconstruct
     * @returns {DeconstructedSnowflake|DeconstructedSnowflake[]}
     */
    static parse(snowflake: SnowflakeResolvable): DeconstructedSnowflake;
    static isValid(snowflake: string): boolean;
    /**
     * Extract bits and their values from a snowflake.
     * @param {SnowflakeResolvable} snowflake - Snowflake to extract from
     * @param {number|bigint} shift - Number of bits to shift before extracting
     * @param {number|bigint} length - Number of bits to extract before stopping
     * @returns {bigint}
     */
    static extractBits(snowflake: SnowflakeResolvable, start: number, length?: number): number;
    /**
     * Transform a snowflake into its 64Bit binary string.
     * @param {SnowflakeResolvable} snowflake - Snowflake to transform
     * @returns {string}
     * @private
     */
    static binary(snowflake: SnowflakeResolvable): string;
}
/**
 * Resolvable value types for a valid Snowflake.
 * * string
 * * number
 * * bigint
 * @type {SnowflakeResolvable}
 */
declare type SnowflakeResolvable = string;
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
export {};
//# sourceMappingURL=index.d.ts.map