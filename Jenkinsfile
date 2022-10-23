pipeline {
    agent any 
    environment {
	        DOCKER_REGISTRY = "dinushadee/test_cicd_emapta_trade"
		DOCKERHUB_CREDENTIALS=credentials('jenkins_docker_hub')
	}
    stages {
        stage('build') {
            steps {
                sh 'ls -altr'
                sh 'docker compose build'
		sh 'docker images'
                echo 'Building the application'
            }
        }
	stage('Push image') {
		docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
		    app.push("${env.BUILD_NUMBER}")
		    app.push("latest")
		}
    	}
        stage('login_dockerhub') {
		steps {
			sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
		}
	}
	stage('push_dockerhub') {
		steps {
			sh 'docker push test_cicd-trade:latest'
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
