pipeline {
    agent any 
    environment {
	    	BUILDVERSION = sh(script: "echo `date +%s`", returnStdout: true).trim()
	        DOCKER_REGISTRY = "dinushadee/test_cicd_emapta_trade"
		DOCKERHUB_CREDENTIALS=credentials('jenkins_docker_hub')
	}
    stages {
        stage('build') {
            steps {
                sh 'ls -altr'
                sh 'docker compose build -t $DOCKER_REGISTRY:$BUILDVERSION'
		sh 'docker images'
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
			sh 'docker push $DOCKER_REGISTRY:$BUILDVERSION'
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
