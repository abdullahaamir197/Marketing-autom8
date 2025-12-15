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
                sh 'sleep 15' // Wait for containers to start and stabilize
                sh 'docker ps'
            }
        }

        stage('Test (Selenium)') {
            steps {
                script {
                    // install dependencies specifically in the running container if not baking them in image
                    // OR assume image has them. Let's run the test script.
                    // We execute the test INSIDE the container that has network access to the frontend
                    // Important: The backend container (node) needs chrome to run selenium.
                    // If the node image is small (alpine), it might fail.
                    // A safer bet for this specific assignment usually implies running it on the agent
                    // but the agent needs to reach the containers.
                    // Let's try running it inside the backend container which has the code.
                    
                    sh 'docker exec autom8-backend-jenkins npm install'
                    sh 'docker exec autom8-backend-jenkins npm test'
                }
            }
        }
    }
}
