#!groovy

node {
  checkout scm

  def dockerRepoName = 'zooniverse/front-end-monorepo'
  def dockerImageName = "${dockerRepoName}:${env.BUILD_ID}"
  def newImage = null

  stage('Build Docker image') {
    newImage = docker.build(dockerImageName)
  }

  stage('Test') {
    newImage.inside {
      sh '''#!/bin/bash -e
        while true; do sleep 3; echo -n "."; done &
        KEEP_ALIVE_ECHO_JOB=\$!
        lerna run build --scope="@zooniverse/react-components"
        lerna run test:ci --stream --since master
        kill \${KEEP_ALIVE_ECHO_JOB}
      '''
    }
  }

  stage('Deploy') {
    if (BRANCH_NAME == 'master') {
      newImage.inside {
        sh '''
        '''
      }
    }
  }
}
