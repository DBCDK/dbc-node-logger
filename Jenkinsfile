def ownerSlack = "fe-drift"

pipeline {
    environment {
        NPM_TOKEN  = credentials('npm-token')
    }
    agent {
        docker {
            label "devel10-head"
            image "docker.dbc.dk/dbc-node:latest"
            args  "-v /home/isworker:/home/isworker"
            alwaysPull true
        }
    }
    stages {
        stage('build and test') {
            steps {
                sh """
                    npm install
                    npm run build
                    npm run test
                """
            }
        }
        stage('pre-publish') {
            steps {
                sh """
                    # check if version has been published
                    npx is-published-to-npm
                """
            }            

        }
        stage('publish') {
            when {
                branch "master" 
            }
            steps {
                sh """
                    npm set //registry.npmjs.org/:_authToken=${NPM_TOKEN}
                    npm publish
                """
            }            
        }
    }
    post {
        failure {
            script {
                slackSend(channel: "${ownerSlack}",
                    color: 'warning',
                    message: "${env.JOB_NAME} #${env.BUILD_NUMBER} failed and needs attention: ${env.BUILD_URL}",
                    tokenCredentialId: 'slack-global-integration-token')
            }    
        }
        success {
            script {
                if ("${env.BRANCH_NAME}" == 'master') {
                    slackSend(channel: "${ownerSlack}",
                        color: 'good',
                        message: "${env.JOB_NAME} #${env.BUILD_NUMBER} completed, and published on npm",
                        tokenCredentialId: 'slack-global-integration-token')
                }
            }
        }
        fixed {
            slackSend(channel: 'fe-drift',
                    color: 'good',
                    message: "${env.JOB_NAME} #${env.BUILD_NUMBER} back to normal: ${env.BUILD_URL}",
                    tokenCredentialId: 'slack-global-integration-token')

        }
    }
}