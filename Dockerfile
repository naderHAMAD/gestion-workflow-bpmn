FROM openjdk:11
# Expose the port on which the Spring Boot app will run (default is 8080)
EXPOSE 8080
# ADD
ADD target/backend-integration.jar backend-integration.jar
# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "/backend-integration.jar"]