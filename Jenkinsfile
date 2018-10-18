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
        cd /usr/src/
        ./node_modules/.bin/lerna run build --scope="@zooniverse/grommet-theme"
        ./node_modules/.bin/lerna run --stream test
      '''
    }
  }
}
