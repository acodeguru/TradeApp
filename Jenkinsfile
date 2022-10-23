pipeline {
    agent any 
    environment {
		DOCKERHUB_CREDENTIALS=credentials('jenkins_docker_hub')
	}
    stages {
        stage('build') {
            steps {
                sh 'ls -altr'
                sh 'docker compose build'
                echo 'Building the application'
            }
        }
        stage('login_dockerhub') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

		stage('push_dockerhub') {

			steps {
				sh 'docker push dinushadee/nodeapp:latest'
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
