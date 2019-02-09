package com.example.janken.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;

@RestController
public class JankenController {

    private final EnemyHand enemyHand;

    public JankenController(final EnemyHand enemyHand) {
        this.enemyHand = enemyHand;
    }

    @PostMapping("/janken")
    public Result postJanken(@RequestBody final JankenRequest request) {
        final Hand player = request.getPlayer();
        final Hand enemy = enemyHand.next();
        final Issue issue = player.jankenHoi(enemy);
        return new Result(player, enemy, issue);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public void handle(final HttpMessageNotReadableException e) {
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
