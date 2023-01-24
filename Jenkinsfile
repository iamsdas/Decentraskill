pipeline {
    agent { dockerfile {
        filename 'Dockerfile'
        args '-u root:root'
    } }
    environment {
        HOME = "/app"
    }
    stages {
        stage('Build') {
            steps {
                sh 'yarn craco build'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
    }
}