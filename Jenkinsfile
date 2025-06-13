 
pipeline {
    agent any
    tools {
        nodejs 'Node18' // Matches NodeJS configuration in Jenkins
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/preethamgondela/Employer-Dashboard.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                dir('material-dashboard-react-main') {
                    bat 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                dir('material-dashboard-react-main') {
                    bat 'npm run build'
                }
            }
        }
        stage('Archive Artifacts') {
            steps {
                dir('material-dashboard-react-main') {
                    archiveArtifacts artifacts: 'build/**', allowEmptyArchive: false
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed.'
        }
    }
}