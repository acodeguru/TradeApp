pipeline {
    agent any 
    stages {
        stage('build') {
            steps {
                sh 'ls -altr'
                sh 'docker-compose up'
                echo 'Building the application'
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
