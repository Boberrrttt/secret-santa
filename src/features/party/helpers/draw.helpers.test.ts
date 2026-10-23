import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { drawAssignments } from "./draw.helpers.ts";

function assertDerangement(
  participantIds: string[],
  pairs: { giverId: string; recipientId: string }[],
  exclusions: { leftId: string; rightId: string }[],
) {
  assert.equal(pairs.length, participantIds.length);
  const recipients = pairs.map((pair) => pair.recipientId);
  assert.deepEqual([...recipients].sort(), [...participantIds].sort());
  for (const pair of pairs) {
    assert.notEqual(pair.giverId, pair.recipientId);
    const blocked = exclusions.some(
      (exclusion) =>
        (exclusion.leftId === pair.giverId && exclusion.rightId === pair.recipientId) ||
        (exclusion.rightId === pair.giverId && exclusion.leftId === pair.recipientId),
    );
    assert.equal(blocked, false);
  }
}

describe("drawAssignments", () => {
  it("gives each person one other person", () => {
    const participantIds = ["alex", "blair", "casey", "drew"];
    const pairs = drawAssignments(participantIds, []);
    assert.ok(pairs);
    assertDerangement(participantIds, pairs, []);
  });

  it("keeps an excluded pair apart in both directions", () => {
    const participantIds = ["alex", "blair", "casey", "drew"];
    const exclusions = [{ leftId: "alex", rightId: "blair" }];
    const pairs = drawAssignments(participantIds, exclusions);
    assert.ok(pairs);
    assertDerangement(participantIds, pairs, exclusions);
  });

  it("returns nothing when every pairing is excluded", () => {
    const participantIds = ["alex", "blair", "casey"];
    const exclusions = [
      { leftId: "alex", rightId: "blair" },
      { leftId: "alex", rightId: "casey" },
      { leftId: "blair", rightId: "casey" },
    ];
    assert.equal(drawAssignments(participantIds, exclusions), null);
  });
});
