# janken-api

```
curl https://start.spring.io/starter.tgz -d dependencies=web,devtools \
-d artifactId=janken-api -d name=janken-api -d baseDir=janken-api \
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

