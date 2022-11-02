pipeline {
    agent any 
    environment {
        BUILDVERSION = $BUILD_NUMBER
        DOCKER_REGISTRY = "dinushadee/test_cicd_emapta_trade"
        DOCKERHUB_CREDENTIALS='jenkins_docker_hub'
	    DOCKER_IMAGE = ""
    }

    stages {
        stage('build') {
            steps {
                echo 'Building image $DOCKER_REGISTRY:$BUILD_NUMBER'
                script {
                    DOCKER_IMAGE = docker.build BUILDVERSION
                }
            }
        }

	    stage('push_dockerhub') {
		    steps {
			    script {
          			docker.withRegistry( 'https://registry.hub.docker.com', DOCKERHUB_CREDENTIALS ) {
            		        DOCKER_IMAGE.push(BUILDVERSION)
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
			            sh 'kubectl apply -f deployment.yaml --context tradeapp-cluster'
// 			            echo 'Configuring user role'
// 			            sh 'kubectl apply -f deployement_user_role.yaml'
// 			            echo 'Deploying containers'
//                         sh 'kubectl apply -f deployment.yaml'
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
