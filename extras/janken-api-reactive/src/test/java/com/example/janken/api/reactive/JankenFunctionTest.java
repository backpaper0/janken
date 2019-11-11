package com.example.janken.api.reactive;

import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;

class JankenFunctionTest {

    private WebTestClient client;

    @BeforeEach
    void setUp() {
        final var routerFunction = new JankenFunction(() -> Hand.GU).routerFunction();
        client = WebTestClient
                .bindToRouterFunction(routerFunction)
                .build();
    }

    @Test
    void postJanken() {
        final var body = Map.of("player", "PA");
        client.post().uri("/api/janken")
                .contentType(MediaType.APPLICATION_JSON)
                .syncBody(body)
                .exchange()
                .expectBody(Map.class)
                .isEqualTo(Map.of(
                        "player", "PA",
                        "enemy", "GU",
                        "issue", "WIN"));
    }
}
