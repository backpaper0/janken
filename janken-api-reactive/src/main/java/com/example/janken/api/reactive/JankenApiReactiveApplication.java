package com.example.janken.api.reactive;

import org.springframework.http.server.reactive.ReactorHttpHandlerAdapter;
import org.springframework.web.reactive.function.server.RouterFunctions;

import reactor.netty.http.server.HttpServer;

public class JankenApiReactiveApplication {

    public static void main(final String[] args) throws Exception {
        final var enemyHand = new RandomEnemyHand();
        final var router = new JankenFunction(enemyHand).routerFunction();
        final var handler = RouterFunctions.toHttpHandler(router);
        final var adapter = new ReactorHttpHandlerAdapter(handler);
        HttpServer.create().host("localhost").port(8080).handle(adapter).bindNow();
        Thread.sleep(Long.MAX_VALUE);
    }
}
