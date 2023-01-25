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
        stage('Compile smart contracts') {
            steps {
                sh 'yarn truffle compile'
            }
        }
        stage('Build frontend') {
            steps {
                sh 'yarn build'
            }
        }
        stage('Setup local blockchain') {
            steps {
                sh 'ganache-cli -D'
            }
        }
        stage('Test smart contracts') {
            steps {
                sh 'yarn truffle test'
            }
        }
    }
}