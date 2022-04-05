import { expect } from "chai";
import { Snowflake } from "../src/index";

describe("index", () => {
  describe("generate", () => {
    it("should generate a snowflake", () => {
      const tests = [
        {
          timestamp: 1649156222074,
          value: "6917062538869867520",
          shard_id: 1,
        },
        {
          timestamp: 1649156718566,
          value: "6917064621308249088",
          shard_id: 1,
        },
        {
          timestamp: 1649157035498,
          value: "6917065950617407488",
          shard_id: 4,
        },
      ];
      for (const test of tests) {
        expect(
          Snowflake.generate({
            timestamp: test.timestamp,
            shard_id: test.shard_id,
          }).toString()
        ).to.be.eq(test.value);
      }
    });
  });

  describe("deconstruct", () => {
    it("should desconstruct a snowflake", () => {
      const tests = [
        {
          timestamp: 1649156222074,
          value: "6917062538869867520",
          shard_id: 1,
        },
        {
          timestamp: 1649156718566,
          value: "6917064621308249088",
          shard_id: 1,
        },
        {
          timestamp: 1649157035498,
          value: "6917065950617407488",
          shard_id: 4,
        },
      ];
      for (const test of tests) {
        const parsed = Snowflake.parse(test.value);
        expect(parsed.timestamp).to.be.eq(test.timestamp);
        expect(parsed.shard_id).to.be.eq(test.shard_id);
      }
    });
  });
});
