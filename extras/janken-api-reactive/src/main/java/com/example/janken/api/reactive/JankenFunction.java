package com.example.janken.api.reactive;

import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.fasterxml.jackson.annotation.JsonProperty;

import reactor.core.publisher.Mono;

public class JankenFunction {

    private final EnemyHand enemyHand;

    public JankenFunction(final EnemyHand enemyHand) {
        this.enemyHand = enemyHand;
    }

    public RouterFunction<ServerResponse> routerFunction() {
        return RouterFunctions.route()
                .nest(RequestPredicates.path("/api"),
                        builder -> builder.POST("/janken", this::postJanken))
                .build();
    }

    private Mono<ServerResponse> postJanken(final ServerRequest request) {
        final Mono<Result> result = request.bodyToMono(JankenRequest.class)
                .map(r -> {
                    final Hand player = r.getPlayer();
                    final Hand enemy = enemyHand.next();
                    final Issue issue = player.jankenHoi(enemy);
                    return new Result(player, enemy, issue);
                });
        return ServerResponse.ok().body(result, Result.class);
    }

    public static class JankenRequest {

        private final Hand player;

        public JankenRequest(@JsonProperty("player") final Hand player) {
            this.player = player;
        }

        public Hand getPlayer() {
            return player;
        }
    }

    public static class Result {

        private final Hand player;
        private final Hand enemy;
        private final Issue issue;

        public Result(final Hand player, final Hand enemy, final Issue issue) {
            this.player = player;
            this.enemy = enemy;
            this.issue = issue;
        }

        public Hand getPlayer() {
            return player;
        }

        public Hand getEnemy() {
            return enemy;
        }

        public Issue getIssue() {
            return issue;
        }
    }
}
