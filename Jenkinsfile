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
                sh 'docker compose build'
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
			sh 'docker rmi -f $DOCKER_REGISTRY:$BUILDVERSION'   
		}
	}
        
        stage('test') {
            steps {
                echo 'Testing the application'
            }
        }
	    
        stage('deploy-k8') {
            steps {
//                 sshagent(['k8s-jenkins']){
                    // sh 'scp -r -o StrictHostKeyChecking=no deployment.yaml username@ip-addr:/path'
                    script {
                        try {
		            echo 'Creating service user'
			    sh 'kubectl apply -f deployement_service_user.yaml'
			    echo 'Configuring user role'
			    sh 'kubectl apply -f deployement_user_role.yaml'
			    echo 'Deploying containers'
                            // sh 'ssh username@ipddr kubectl apply -f /path/node-deployment.yaml --kubeconfig=/path/kube.yaml'
                            sh 'kubectl apply -f deployment.yaml'
                        } catch(error) {

                        }
                    }
//                 }
            }
        }
	   
    }
    post {
	always {
		sh 'docker logout'
	}
    }
}
