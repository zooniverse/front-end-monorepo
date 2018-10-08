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
      sh '''
        lerna run build --scope="@zooniverse/react-components"
        lerna run test:ci --stream --since master
      '''
    }
  }
}
