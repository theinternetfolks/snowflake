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
        var _b = _a === void 0 ? {} : _a, _c = _b.timestamp, timestamp = _c === void 0 ? Date.now() : _c, _d = _b.shard_id, shard_id = _d === void 0 ? Snowflake.SHARD_ID : _d, _e = _b.sequence, sequence = _e === void 0 ? Number((Math.random() * 1e4).toFixed(0)) : _e;
        if (timestamp instanceof Date)
            timestamp = timestamp.valueOf();
        else
            timestamp = new Date(timestamp).valueOf();
        if (shard_id === null)
            shard_id = Number((Math.random() * 1e5).toFixed(0));
        // tslint:disable:no-bitwise
        var result = (BigInt(timestamp) - BigInt(Snowflake.EPOCH)) << BigInt(22);
        result = result | (BigInt(shard_id % 1024) << BigInt(12));
        result = result | BigInt(sequence % 4096);
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
            timestamp: Snowflake.extractBits(snowflake, 1, 41),
            shard_id: Snowflake.extractBits(snowflake, 42, 10),
            sequence: Snowflake.extractBits(snowflake, 52),
            binary: binary,
        };
    };
    Snowflake.isValid = function (snowflake) {
        if (!/^[\d]{19}$/.test(snowflake)) {
            return false;
        }
        try {
            Snowflake.parse(snowflake);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    /**
     * Extract bits and their values from a snowflake.
     * @param {SnowflakeResolvable} snowflake - Snowflake to extract from
     * @param {number|bigint} shift - Number of bits to shift before extracting
     * @param {number|bigint} length - Number of bits to extract before stopping
     * @returns {bigint}
     */
    Snowflake.extractBits = function (snowflake, start, length) {
        return parseInt(length
            ? Snowflake.binary(snowflake).substring(start, start + length)
            : Snowflake.binary(snowflake).substring(start), 2);
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
    Snowflake.SHARD_ID = null;
    return Snowflake;
}());
exports.Snowflake = Snowflake;
//# sourceMappingURL=index.js.map