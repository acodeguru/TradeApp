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
		}
	}
        
        stage('test') {
            steps {
                echo 'Testing the application'
            }
        }
	    
        stage('deploy-k8') {
		    steps {
                echo 'Deployement Started'
                withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'docker-desktop', contextName: '', credentialsId: 'jenkins_k8_service_cluster', namespace: 'jenkins', serverUrl: 'https://kubernetes.docker.internal:6443']]) {
                    echo 'Deployment Running'
			        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			        sh 'kubectl apply -f deployment.yaml'  
                    // some block
                }
		    }
//             steps {
//                 sshagent(['k8s-jenkins']){
//                     // sh 'scp -r -o StrictHostKeyChecking=no deployment.yaml username@ip-addr:/path'
//                     script {
//                         try {
//                             // sh 'ssh username@ipddr kubectl apply -f /path/node-deployment.yaml --kubeconfig=/path/kube.yaml'
//                             sh 'kubectl apply -f deployment.yaml'
//                         } catch(error) {

//                         }
//                     }
//                 }
//             }
        }
	   
    }
    post {
	always {
		sh 'docker logout'
	}
    }
}
