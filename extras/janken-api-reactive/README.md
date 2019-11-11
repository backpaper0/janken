# janken-api-reactive

```
curl https://start.spring.io/starter.tgz -d dependencies=webflux,devtools \
-d artifactId=janken-api-reactive -d name=janken-api-reactive -d baseDir=janken-api-reactive \
-d javaVersion=11 | tar -xzvf -
```

## Run

```
mvn spring-boot:run
```

Test by following command:

```
curl localhost:8080/api/janken -H "Content-Type: application/json" -d '{"player":"GU"}'
```

