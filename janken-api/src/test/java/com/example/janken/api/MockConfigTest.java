package com.example.janken.api;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.aop.framework.ProxyFactory;

import com.example.janken.api.JankenController.JankenRequest;
import com.example.janken.api.JankenController.Result;
import com.example.janken.api.MockConfig.MockJankenInterceptor;

class MockConfigTest {

	@Test
	void mockJankenInterceptor() throws Exception {
		final ProxyFactory proxyFactory = new ProxyFactory();
		proxyFactory.setInterfaces(Target.class);
		proxyFactory.addAdvice(new MockJankenInterceptor());
		final Target target = (Target) proxyFactory.getProxy();

		final JankenRequest req1 = new JankenRequest(Hand.GU);
		assertThat(target.target(req1))
				.usingRecursiveComparison().isEqualTo(new Result(Hand.GU, Hand.CHOKI, Issue.WIN));
		assertThat(target.target(req1))
				.usingRecursiveComparison().isEqualTo(new Result(Hand.GU, Hand.GU, Issue.DRAW));
		assertThat(target.target(req1))
				.usingRecursiveComparison().isEqualTo(new Result(Hand.GU, Hand.PA, Issue.LOSE));
		assertThatThrownBy(() -> target.target(req1));

		final JankenRequest req2 = new JankenRequest(Hand.CHOKI);
		assertThat(target.target(req2))
				.usingRecursiveComparison().isEqualTo(new Result(Hand.CHOKI, Hand.PA, Issue.WIN));
		assertThat(target.target(req2))
				.usingRecursiveComparison().isEqualTo(new Result(Hand.CHOKI, Hand.CHOKI, Issue.DRAW));
		assertThat(target.target(req2))
				.usingRecursiveComparison().isEqualTo(new Result(Hand.CHOKI, Hand.GU, Issue.LOSE));
		assertThatThrownBy(() -> target.target(req2));

		final JankenRequest req3 = new JankenRequest(Hand.PA);
		assertThat(target.target(req3))
				.usingRecursiveComparison().isEqualTo(new Result(Hand.PA, Hand.GU, Issue.WIN));
		assertThat(target.target(req3))
				.usingRecursiveComparison().isEqualTo(new Result(Hand.PA, Hand.PA, Issue.DRAW));
		assertThat(target.target(req3))
				.usingRecursiveComparison().isEqualTo(new Result(Hand.PA, Hand.CHOKI, Issue.LOSE));
		assertThatThrownBy(() -> target.target(req3));
	}

	private interface Target {
		Result target(JankenRequest arg);
	}
}
