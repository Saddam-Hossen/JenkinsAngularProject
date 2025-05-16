pipeline {
    agent any

    environment {
        PROD_HOST  = credentials('DO_HOST')         // e.g., 159.89.172.251
        PROD_USER  = credentials('DO_USER')         // e.g., root
        DEPLOY_DIR = '/www/wwwroot/CITSNVN/jenkins/angular/browser'
        BUILD_DIR  = 'dist/my-project'              // Replace with actual Angular build output dir
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Saddam-Hossen/JenkinsAngularProject.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Verify Environment Files') {
            steps {
                bat 'dir src\\app\\environments'
            }
        }

        stage('Build Angular Project') {
            steps {
                bat 'ng build --configuration=production'
            }
        }

        stage('Deploy to DigitalOcean') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'DO_SSH_KEY', keyFileVariable: 'SSH_KEY')]) {
                    bat """
                    "C:\\Program Files\\Git\\bin\\bash.exe" -c \
                    "scp -o StrictHostKeyChecking=no -i \\"$SSH_KEY\\" -r ${BUILD_DIR}/* ${PROD_USER}@${PROD_HOST}:${DEPLOY_DIR}"
                    """
                }
            }
        }

        stage('Reload NGINX & Restart Backend') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'DO_SSH_KEY', keyFileVariable: 'SSH_KEY')]) {
                    sh """
                    ssh -o StrictHostKeyChecking=no -i $SSH_KEY ${PROD_USER}@${PROD_HOST} << EOF
                        echo "🔁 Testing NGINX config..."
                        nginx -t && systemctl reload nginx
                        
                        echo "♻️ Restarting Spring Boot backend..."
                        systemctl restart my-spring-boot.service  # Replace with your actual service name
                    EOF
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Angular build, deploy, and NGINX reload complete!'
        }
        failure {
            echo '❌ Build or deployment failed. Check console output.'
        }
    }
}
