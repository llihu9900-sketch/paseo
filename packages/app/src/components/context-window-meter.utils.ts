export function formatTokenCount(value: number): string {
  if (value >= 1_000_000) {
    return `${Math.round(value / 1_000_000)}m`;
  }
  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}k`;
  }
  return Math.round(value).toString();
}

export function isFiniteTokenValue(value: number | null | undefined): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/**
 * Whether either session token total is present. Session totals and context
 * window usage are independent provider reports, so the meter must render
 * when only one of them is available.
 */
export function hasSessionTokenData(
  sessionInputTokens: number | null | undefined,
  sessionOutputTokens: number | null | undefined,
  sessionCachedInputTokens?: number | null | undefined,
): boolean {
  return (
    isFiniteTokenValue(sessionInputTokens) ||
    isFiniteTokenValue(sessionOutputTokens) ||
    isFiniteTokenValue(sessionCachedInputTokens)
  );
}
