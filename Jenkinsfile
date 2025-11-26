pipeline {
    agent any
    stages {
        stage('Pull') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'dev') {
                        sh './build.sh dev'
                    }
                }
            }
        }
    }
}
