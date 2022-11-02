pipeline {
    agent any 
    environment {
//      BUILDVERSION = sh(script: "echo `date +%s`", returnStdout: true).trim()
        DOCKER_REGISTRY = "dinushadee/test_cicd_emapta_trade"
        DOCKERHUB_CREDENTIALS='jenkins_docker_hub'
	    DOCKER_IMAGE = ""
    }

    stages {
        stage('build') {
            steps {
                echo 'Building image'
                script {
                    DOCKER_IMAGE = docker.build $BUILD_NUMBER
                }
            }
        }

	    stage('push_dockerhub') {
		    steps {
			    script {
          			docker.withRegistry( 'https://registry.hub.docker.com', DOCKERHUB_CREDENTIALS ) {
            		        DOCKER_IMAGE.push($BUILD_NUMBER)
          		    }
                }
			    sh 'docker rmi -f $DOCKER_REGISTRY:$BUILD_NUMBER'   
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
