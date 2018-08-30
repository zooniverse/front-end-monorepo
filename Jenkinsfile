#!groovy

node {
  checkout scm

  def dockerRepoName = 'zooniverse/front-end-monorepo'
  def dockerImageName = "${dockerRepoName}:${env.BUILD_ID}"
  def newImage = null

  stage('Build Docker image') {
    newImage = docker.build(dockerImageName)
  }

  stage('Deploy') {
    newImage.inside {
      sh 'lerna run --no-bail test'
    }
  }
}
