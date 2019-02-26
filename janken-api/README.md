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

or

```
# mvn package
java -jar target/janken-api.jar
```

Test by following command:

```
curl localhost:8080/api/janken -H "Content-Type: application/json" -d '{"player":"GU"}'
```

### Use mock

```
SPRING_PROFILES_ACTIVE=mock mvn spring-boot:run
```

or

```
# mvn package
java -jar target/janken-api.jar --spring.profiles.active=mock
```

`WIN`, `DRAW`, `LOSE` and exception are repeated.

## Containerized

```
mvn compile jib:build
```

or

```
mvn compile jib:dockerBuild
```

