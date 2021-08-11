package com.example.janken.api;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class HandTest {

	@ParameterizedTest
	@CsvSource(delimiter = '|', value = {
			"GU    | GU    | DRAW",
			"GU    | CHOKI | WIN ",
			"GU    | PA    | LOSE",
			"CHOKI | GU    | LOSE",
			"CHOKI | CHOKI | DRAW",
			"CHOKI | PA    | WIN ",
			"PA    | GU    | WIN ",
			"PA    | CHOKI | LOSE",
			"PA    | PA    | DRAW"
	})
	void jankenHoi(final Hand player, final Hand enemy, final Issue expected) {
		assertEquals(expected, player.jankenHoi(enemy));
	}
}
