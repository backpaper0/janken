package com.example.janken.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

class JankenControllerTest {

    private MockMvc mvc;

    @BeforeEach
    void setUpController() {
        final EnemyHand enemyHand = () -> Hand.GU;
        mvc = MockMvcBuilders.standaloneSetup(new JankenController(enemyHand)).build();
    }

    @Test
    void postJanken() throws Exception {
        final String content = new ObjectMapper().writeValueAsString(Map.of("player", "PA"));

        mvc.perform(post("/janken")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.player").value("PA"))
                .andExpect(jsonPath("$.enemy").value("GU"))
                .andExpect(jsonPath("$.issue").value("WIN"));
    }
}
