pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose-jenkins.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Deploy') {
            steps {
                script {
                    sh 'docker-compose -f ${COMPOSE_FILE} down'
                    sh 'docker-compose -f ${COMPOSE_FILE} up -d --build'
                }
            }
        }

        stage('Verify') {
            steps {
                sh 'sleep 10' // Wait for containers to start
                sh 'docker ps'
            }
        }
    }
}
