pipeline {
    agent any
    environment {
        REPO_URL = "https://github.com/candymansolonely/Identity-OAuth2-fe.git"
        IMAGE_NAME = "identity-fe"
        CONTAINER_NAME = "identity-fe"
        PORT_HOST = "1001"
        PORT_CONTAINER = "80"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: env.BRANCH_NAME]],
                    userRemoteConfigs: [[
                        url: "${REPO_URL}",
                        credentialsId: env.GIT_CRED_ID
                    ]]
                ])

                // Nếu có submodules
                sh "git submodule update --init --recursive"
            }
            post {
                failure {
                    echo "Checkout project FAILURE"
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh '''
                        docker build -t ${IMAGE_NAME}:latest .
                    '''
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    sh '''
                        docker rm -f ${CONTAINER_NAME} || true
                        docker run -d --name ${CONTAINER_NAME} -p ${PORT_HOST}:${PORT_CONTAINER} ${IMAGE_NAME}:latest
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "🎉 Deploy thành công!"
        }
        failure {
            echo "❌ Deploy thất bại"
        }
    }
}
