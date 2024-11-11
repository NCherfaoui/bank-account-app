FROM openjdk:17-alpine3.14

LABEL authors="nassim"

WORKDIR /app

RUN apk --no-cache add curl

COPY target/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]