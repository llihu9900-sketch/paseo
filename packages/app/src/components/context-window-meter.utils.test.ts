import { describe, expect, it } from "vitest";
import {
  formatTokenCount,
  hasSessionTokenData,
  isFiniteTokenValue,
} from "./context-window-meter.utils";

describe("formatTokenCount", () => {
  it("formats raw counts below 1k", () => {
    expect(formatTokenCount(0)).toBe("0");
    expect(formatTokenCount(999)).toBe("999");
  });

  it("formats thousands with a k suffix", () => {
    expect(formatTokenCount(1_000)).toBe("1k");
    expect(formatTokenCount(12_345)).toBe("12k");
  });

  it("formats millions with an m suffix", () => {
    expect(formatTokenCount(1_000_000)).toBe("1m");
    expect(formatTokenCount(2_500_000)).toBe("3m");
  });
});

describe("isFiniteTokenValue", () => {
  it("accepts finite numbers", () => {
    expect(isFiniteTokenValue(0)).toBe(true);
    expect(isFiniteTokenValue(42)).toBe(true);
  });

  it("rejects absent, non-finite, and invalid payloads", () => {
    expect(isFiniteTokenValue(null)).toBe(false);
    expect(isFiniteTokenValue(undefined)).toBe(false);
    expect(isFiniteTokenValue(NaN)).toBe(false);
    expect(isFiniteTokenValue(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isFiniteTokenValue("42" as unknown as number)).toBe(false);
  });
});

describe("hasSessionTokenData", () => {
  it("is true when either session token total is present", () => {
    expect(hasSessionTokenData(10, null)).toBe(true);
    expect(hasSessionTokenData(null, 20)).toBe(true);
    expect(hasSessionTokenData(10, 20)).toBe(true);
  });

  it("is false when neither total is a finite number", () => {
    expect(hasSessionTokenData(null, null)).toBe(false);
    expect(hasSessionTokenData(undefined, undefined)).toBe(false);
    expect(hasSessionTokenData(NaN, Number.POSITIVE_INFINITY)).toBe(false);
  });
});
