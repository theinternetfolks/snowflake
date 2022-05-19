import { expect } from "chai";
import { Snowflake } from "../src/index";

const tests = [
  {
    timestamp: 1649161028424,
    value: "6917082698162902015",
    shard_id: 4,
    salt: 1023,
  },
  {
    timestamp: 1649161059081,
    value: "6917082826748448499",
    shard_id: 755,
    salt: 755,
  },
  {
    timestamp: 1649161081508,
    value: "6917082920815127972",
    shard_id: 1755,
    salt: 420,
  },
  {
    timestamp: 1649161118392,
    value: "6917083075516040193",
    shard_id: 1,
    salt: 1,
  },
];

describe("index", () => {
  describe("generate", () => {
    it("should generate a snowflake", () => {
      for (const test of tests) {
        expect(
          Snowflake.generate({
            timestamp: test.timestamp,
            shard_id: test.shard_id,
            salt: test.salt,
          }).toString()
        ).to.be.eq(test.value);
      }
    });
    it("should generate a random snowflake", () => {
      const generated: string[] = [];
      for (const test of [...Array(5)]) {
        generated.push(Snowflake.generate());
      }
      expect(generated.length).to.be.equal(new Set(generated).size);
    });
  });

  describe("deconstruct", () => {
    it("should desconstruct a snowflake", () => {
      for (const test of tests) {
        const parsed = Snowflake.parse(test.value);
        expect(parsed.timestamp).to.be.eq(test.timestamp);
        expect(parsed.shard_id).to.be.eq(test.shard_id);
      }
    });
  });

  describe("isValid", () => {
    it("should desconstruct a snowflake", () => {
      const tests = [
        { value: "6917082698162902015", valid: true },
        { value: "abv", valid: false },
      ];
      for (const test of tests) {
        const parsed = Snowflake.isValid(test.value);
        expect(parsed).to.be.eq(test.valid);
      }
    });
  });
});
