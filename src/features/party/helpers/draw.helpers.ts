export type DrawPair = {
  giverId: string;
  recipientId: string;
};

export type ExclusionPair = {
  leftId: string;
  rightId: string;
};

function shuffleItems<Item>(items: readonly Item[]): Item[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = copy[index];
    copy[index] = copy[swapIndex];
    copy[swapIndex] = current;
  }
  return copy;
}

export function drawAssignments(
  participantIds: readonly string[],
  exclusions: readonly ExclusionPair[],
): DrawPair[] | null {
  if (participantIds.length < 2) return null;

  const blockedPairs = new Set(
    exclusions.flatMap((exclusion) => [
      `${exclusion.leftId}|${exclusion.rightId}`,
      `${exclusion.rightId}|${exclusion.leftId}`,
    ]),
  );
  const givers = [...participantIds];
  const assignment = new Map<string, string>();
  const usedRecipientIds = new Set<string>();

  function canAssign(giverId: string, recipientId: string) {
    return giverId !== recipientId && !blockedPairs.has(`${giverId}|${recipientId}`);
  }

  function search(giverIndex: number): boolean {
    if (giverIndex === givers.length) return true;
    const giverId = givers[giverIndex];
    const candidates = shuffleItems(participantIds).filter(
      (recipientId) => !usedRecipientIds.has(recipientId) && canAssign(giverId, recipientId),
    );
    for (const recipientId of candidates) {
      usedRecipientIds.add(recipientId);
      assignment.set(giverId, recipientId);
      if (search(giverIndex + 1)) return true;
      usedRecipientIds.delete(recipientId);
      assignment.delete(giverId);
    }
    return false;
  }

  if (!search(0)) return null;

  return givers.map((giverId) => ({
    giverId,
    recipientId: assignment.get(giverId) ?? "",
  }));
}
