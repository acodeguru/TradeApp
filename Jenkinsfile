pipeline {
    agent any 
    stages {
        stage('build') {
            steps {
                echo 'Building the application'
                sh 'docker compose build .'
            }
        }
        stage('test') {
            steps {
                echo 'Testing the application'
            }
        }
        stage('deploy') {
            steps {
                echo 'Deploy the application'
            }
        }
    }
}
