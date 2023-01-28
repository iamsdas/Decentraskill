pipeline {
    agent { dockerfile true }
    environment {
        HOME = '/var/lib/jenkins/workspace/decentraskill'
        YARN_CACHE_FOLDER = '/var/lib/jenkins/workspace/decentraskill/.yarn-cache'
        ACCESS_TOKEN = credentials('access-token')
        USERNAME = credentials('username')
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
                sh 'rm -rf build'
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
                sh 'yarn truffle test ./tests/decentraskill.js'
            }
        }
        stage('Deploy build') {
            steps {
                dir('build') {
                    sh 'git init .'
                    sh 'git checkout -b gh-pages'
                    sh 'git add .'
                    sh 'git config user.email "jenkins@decentraskill.com"'
                    sh 'git config user.name "Jenkins Bot"'
                    sh 'git commit -m "update build"'
                    sh 'git push --force https://${USERNAME}:${ACCESS_TOKEN}@github.com/iamsdas/decentraskill.git gh-pages'
                }
            }
        }
    }
}