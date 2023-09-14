pipeline {
  agent any

  tools {
    // Define the Maven tool with the appropriate version
    maven 'maven_3_8_3'
  }


  stages {
    stage('Checkout') {
        steps {
            checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/drissi2002/backend-bpmn-workflow-module']])
            //git 'https://github.com/drissi2002/backend-bpmn-workflow-module.git'
        }
    }
    stage('Build') {
      steps {
        // Clean and build the project
        sh 'mvn clean package'
      }
    }

    stage('Test') {
      steps {
        // Run tests
        sh 'mvn test'
      }
    }

    stage('Build Docker Image') {
      steps {
        // Build the Docker image
        sh 'docker build -t backend-integration:latest -f Dockerfile .'
      }
    }

    stage('Publishing to Docker Hub') {
            steps {
                // Log in to Docker Hub
                sh 'docker login -u drissi2002 -p 98633589RIMdrissi'
                // Tag the Docker image with the Docker Hub repository URL
                sh 'docker tag backend-integration:latest drissi2002/backend-integration:latest'
                // Push the Docker image to Docker Hub
                sh 'docker push drissi2002/backend-integration:latest'
            }
    }
   stage('Deploy') {
      steps {
        echo 'docker compose stage';
        sh 'docker-compose up -d'
      }
    }
  }
}