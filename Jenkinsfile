#!groovy

// Uses the Jenkins Declarative Pipeline -
// https://jenkins.io/doc/book/pipeline/syntax/#declarative-pipeline

// ProTip: If you're debugging changes to this file, use the replay feature in
// Jenkins rather than the commit/watch/fix cycle:
//   1. Go to https://jenkins.zooniverse.org/job/Zooniverse%20GitHub/job/front-end-monorepo/
//   2. Find your branch and click on it
//   3. Pick a build from the list in the sidebar
//   4. Click 'Replay' in the sidebar
//   5. You should get an editor when you can modify the pipeline and run it
//      again immediately <3

pipeline {
  agent none

  options {
    quietPeriod(120) // builds happen at least 120 seconds apart
    disableConcurrentBuilds()
  }

  stages {

    // Right now, we're *only* building and deploying on the `master` branch;
    // longer-term, we'll want to deploy feature branches as well.
    stage('`master` branch') {
      when { branch 'master' }
      stages {

        stage('Build base Docker image') {
          agent any
          steps {
            script {
              def dockerRepoName = 'zooniverse/front-end-monorepo'
              def dockerImageName = "${dockerRepoName}:${BRANCH_NAME}"
              def newImage = docker.build(dockerImageName)
              newImage.push()
              newImage.push('latest')
            }
          }
        }

        stage('Build app Docker images') {
          parallel {
            stage('Build @zooniverse/fe-content-pages') {
              agent any
              steps {
                dir ('packages/app-content-pages') {
                  script {
                    def dockerRepoName = 'zooniverse/fe-content-pages'
                    def dockerImageName = "${dockerRepoName}:${BRANCH_NAME}"
                    def newImage = docker.build(dockerImageName)
                    newImage.push()
                    newImage.push('latest')
                  }
                }
              }
            }
            stage('Build @zooniverse/fe-project') {
              agent any
              steps {
                dir ('packages/app-project') {
                  script {
                    def dockerRepoName = 'zooniverse/fe-project'
                    def dockerImageName = "${dockerRepoName}:${BRANCH_NAME}"
                    def newImage = docker.build(dockerImageName)
                    newImage.push()
                    newImage.push('latest')
                  }
                }
              }
            }
          }
        }

        stage('Deploy to Kubernetes') {
          steps {
            sh "kubectl apply --record -f kubernetes/"
            sh "sed 's/__IMAGE_TAG__/${scmVars.GIT_COMMIT}/g' kubernetes/deployment.tmpl | kubectl apply --record -f -"
          }
        }
      }

      post {
        unsuccessful {
          slackSend (
            color: '#FF0000',
            message: "DEPLOY FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})",
            channel: "#frontend-rewrite"
          )
        }
      }
    }

  }
}
