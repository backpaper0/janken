package com.example.janken.api.reactive;

public class RandomEnemyHand implements EnemyHand {

    @Override
    public Hand next() {
        final Hand[] hands = Hand.values();
        final int index = (int) (Math.random() * hands.length);
        return hands[index];
    }
}
