"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snowflake = void 0;
var Snowflake = /** @class */ (function () {
    function Snowflake() {
    }
    /* c8 ignore start */
    /**
     * Generates a single snowflake.
     * @param {Date|number} [timestamp = Date.now] - Timestamp to generate from
     * @returns {bigint}
     */
    /* c8 ignore end */
    Snowflake.generate = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.timestamp, timestamp = _c === void 0 ? Date.now() : _c, _d = _b.shard_id, shard_id = _d === void 0 ? Snowflake.SHARD_ID : _d;
        if (timestamp instanceof Date)
            timestamp = timestamp.valueOf();
        else
            timestamp = new Date(timestamp).valueOf();
        // tslint:disable:no-bitwise
        var result = (BigInt(timestamp) - BigInt(Snowflake.EPOCH)) << BigInt(22);
        result = result | (BigInt(shard_id) << BigInt(10));
        // tslint:enable:no-bitwise
        return result.toString();
    };
    /**
     * Deconstruct a snowflake to its values using the `Generator.epoch`.
     * @param {SnowflakeResolvable|SnowflakeResolvable[]} snowflake - Snowflake(s) to deconstruct
     * @returns {DeconstructedSnowflake|DeconstructedSnowflake[]}
     */
    Snowflake.parse = function (snowflake) {
        var binary = Snowflake.binary(snowflake);
        return {
            timestamp: Number(Snowflake.extractBits(snowflake, BigInt(22), BigInt(64)) +
                BigInt(Snowflake.EPOCH)),
            shard_id: Number(Snowflake.extractBits(snowflake, BigInt(10), BigInt(13))),
            binary: binary,
        };
    };
    /**
     * Extract bits and their values from a snowflake.
     * @param {SnowflakeResolvable} snowflake - Snowflake to extract from
     * @param {number|bigint} shift - Number of bits to shift before extracting
     * @param {number|bigint} length - Number of bits to extract before stopping
     * @returns {bigint}
     */
    Snowflake.extractBits = function (snowflake, shift, length) {
        var shiftN = BigInt(shift);
        // tslint:disable:no-bitwise
        var bitmask = ((BigInt(1) << BigInt(length)) - BigInt(1)) << shiftN;
        return (BigInt(snowflake) & bitmask) >> shiftN;
        // tslint:enable:no-bitwise
    };
    /**
     * Transform a snowflake into its 64Bit binary string.
     * @param {SnowflakeResolvable} snowflake - Snowflake to transform
     * @returns {string}
     * @private
     */
    Snowflake.binary = function (snowflake) {
        var cached64BitZeros = "0000000000000000000000000000000000000000000000000000000000000000";
        var binValue = BigInt(snowflake).toString(2);
        return binValue.length < 64
            ? cached64BitZeros.substring(0, 64 - binValue.length) + binValue
            : binValue;
    };
    /* c8 ignore start */
    /**
     * The generators epoch timestamp in milliseconds.
     *
     * Defaults to "1st of January, 2000, 00:00".
     *
     * @type {number}
     */
    /* c8 ignore end */
    Snowflake.EPOCH = Date.UTC(1970, 0, 1).valueOf();
    /* c8 ignore start */
    /**
     * The id of the shard running this generator.
     *
     * Defaults to "1".
     *
     * @type {number}
     */
    /* c8 ignore end */
    Snowflake.SHARD_ID = 1;
    return Snowflake;
}());
exports.Snowflake = Snowflake;
//# sourceMappingURL=index.js.map