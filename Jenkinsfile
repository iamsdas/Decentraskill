pipeline {
    agent { dockerfile true }
    environment {
        HOME = '/var/lib/jenkins/workspace/decentraskill'
        YARN_CACHE_FOLDER = '/var/lib/jenkins/workspace/decentraskill/.yarn-cache'
    }
    stages {
        stage('Dependencies') {
            steps {
                sh 'yarn install --frozen-lockfile'
            }
        }
        stage('Build') {
            steps {
                sh 'yarn craco build'
            }
        }
        stage('Test') {
            steps {
                sh 'yarn truffle test'
            }
        }
    }
}