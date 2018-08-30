#!groovy

node {
  checkout scm

  def dockerRepoName = 'zooniverse/front-end-monorepo'
  def dockerImageName = "${dockerRepoName}:${env.BUILD_ID}"
  def newImage = null

  stage('Build Docker image') {
    newImage = docker.build(dockerImageName)
    newImage.inside {
      sh '''
        lerna link
        lerna bootstrap --no-ci
      '''
    }
  }

  stage('Deploy') {
    newImage.inside {
      sh 'lerna run --stream test'
    }
  }
}
