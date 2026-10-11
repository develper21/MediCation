const test = require("node:test");
const assert = require("node:assert/strict");
const {
    calcAdherenceScore,
    calcLateness,
    getWeekRange,
} = require("../src/utils/scheduleHelper");

test("calcAdherenceScore returns a one-decimal percentage", () => {
    assert.equal(calcAdherenceScore(2, 3), 66.7);
});

test("calcAdherenceScore treats no scheduled doses as full adherence", () => {
    assert.equal(calcAdherenceScore(0, 0), 100);
});

test("calcLateness applies the 15-minute grace period", () => {
    const scheduledAt = new Date("2026-01-05T08:00:00.000Z");

    assert.deepEqual(
        calcLateness(scheduledAt, new Date("2026-01-05T08:15:00.000Z")),
        { isLate: false, minutesLate: 15 },
    );
    assert.deepEqual(
        calcLateness(scheduledAt, new Date("2026-01-05T08:16:00.000Z")),
        { isLate: true, minutesLate: 16 },
    );
});

test("getWeekRange returns Monday through Sunday in UTC", () => {
    const { start, end } = getWeekRange(new Date("2026-01-07T12:00:00.000Z"));

    assert.equal(start.toISOString(), "2026-01-05T00:00:00.000Z");
    assert.equal(end.toISOString(), "2026-01-11T23:59:59.999Z");
});
