pipeline {
    agent any 
    environment {
	IMAGE_DKR = "fjkljflje"
        BUILDVERSION = sh(script: "echo `date +%s`", returnStdout: true).trim()
        DOCKER_REGISTRY = "dinushadee/test_cicd_emapta_trade"
        DOCKERHUB_CREDENTIALS='jenkins_docker_hub'
    }

    stages {
        stage('build') {
            steps {
                echo 'Building image'
                IMAGE_DKR = docker.build DOCKER_REGISTRY
            }
        }

	    stage('push_dockerhub') {
		    steps {
			    script {
          			docker.withRegistry( 'https://registry.hub.docker.com', DOCKERHUB_CREDENTIALS ) {
            		    IMAGE_DKR.push(BUILDVERSION)
          		    }
                }
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
                script {
                    
                    try {
		                echo 'Creating service user'
			            sh 'kubectl apply -f deployement_service_user.yaml'
			            echo 'Configuring user role'
			            sh 'kubectl apply -f deployement_user_role.yaml'
			            echo 'Deploying containers'
                        sh 'kubectl apply -f deployment.yaml'
                    } catch(error) {

                        }
                    }
            }
        }
	   
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
