package com.example.janken.api;

import static org.junit.jupiter.api.Assertions.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.ArgumentsProvider;
import org.junit.jupiter.params.provider.ArgumentsSource;

class HandTest {

    @ParameterizedTest
    @ArgumentsSource(Hands.class)
    void jankenHoi(final Hand player, final Hand enemy, final Issue expected) {
        assertEquals(expected, player.jankenHoi(enemy));
    }

    private static class Hands implements ArgumentsProvider {

        @Override
        public Stream<? extends Arguments> provideArguments(final ExtensionContext context)
                throws Exception {
            return Stream.of(
                    Arguments.arguments(Hand.GU, Hand.GU, Issue.DRAW),
                    Arguments.arguments(Hand.GU, Hand.CHOKI, Issue.WIN),
                    Arguments.arguments(Hand.GU, Hand.PA, Issue.LOSE),
                    Arguments.arguments(Hand.CHOKI, Hand.GU, Issue.LOSE),
                    Arguments.arguments(Hand.CHOKI, Hand.CHOKI, Issue.DRAW),
                    Arguments.arguments(Hand.CHOKI, Hand.PA, Issue.WIN),
                    Arguments.arguments(Hand.PA, Hand.GU, Issue.WIN),
                    Arguments.arguments(Hand.PA, Hand.CHOKI, Issue.LOSE),
                    Arguments.arguments(Hand.PA, Hand.PA, Issue.DRAW));
        }
    }
}
