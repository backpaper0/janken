package com.example.janken.api.reactive;

public enum Hand {

    GU(0, 1),
    CHOKI(1, 0),
    PA(2, 2);

    private final int value;
    private final int addMe;

    private Hand(final int value, final int addMe) {
        this.value = value;
        this.addMe = addMe;
    }

    private int adjustedValue(final int value) {
        return (value + addMe) % 3;
    }

    public Issue jankenHoi(final Hand enemy) {
        final int p = adjustedValue(value);
        final int e = adjustedValue(enemy.value);
        if (p == e) {
            return Issue.DRAW;
        } else if (p < e) {
            return Issue.WIN;
        }
        return Issue.LOSE;
    }
}
