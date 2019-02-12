package com.example.janken.api;

import java.util.Arrays;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.aop.framework.ProxyFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.example.janken.api.JankenController.JankenRequest;
import com.example.janken.api.JankenController.Result;

@Configuration
@Profile("mock")
public class MockConfig {

    @Bean
    public BeanPostProcessor mockJankenControllerBeanPostProcessor() {
        return new MockJankenBeanPostProcessor();
    }

    private static class MockJankenBeanPostProcessor implements BeanPostProcessor {
        @Override
        public Object postProcessAfterInitialization(final Object bean, final String beanName)
                throws BeansException {

            if (bean instanceof JankenController) {
                final ProxyFactory proxyFactory = new ProxyFactory(bean);
                proxyFactory.addAdvice(new MockJankenInterceptor());
                return proxyFactory.getProxy();
            }

            return bean;
        }
    }

    static class MockJankenInterceptor implements MethodInterceptor {

        private final AtomicInteger state = new AtomicInteger(0);

        @Override
        public Object invoke(final MethodInvocation invocation) throws Throwable {
            final JankenRequest jankenRequest = (JankenRequest) invocation.getArguments()[0];
            final Hand player = jankenRequest.getPlayer();
            final Function<Issue, Result> f = issue -> {
                final Hand enemy = Arrays.stream(Hand.values())
                        .filter(hand -> player.jankenHoi(hand) == issue).findFirst().get();
                return new Result(player, enemy, issue);
            };
            switch (state.getAndIncrement() % 4) {
            case 0:
                return f.apply(Issue.WIN);
            case 1:
                return f.apply(Issue.DRAW);
            case 2:
                return f.apply(Issue.LOSE);
            default:
                throw new RuntimeException();
            }
        }
    }
}
