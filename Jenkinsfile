 
pipeline {
    agent any
    tools {
        nodejs 'Node54' // Matches NodeJS configuration in Jenkins
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
	stage('Deploy to Tomcat') {
            steps {
                dir('material-dashboard-react-main') {
                    bat 'xcopy /E /I /Y build "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactapp"'
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