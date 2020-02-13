#!groovy

// Uses the Jenkins Declarative Pipeline -
// https://jenkins.io/doc/book/pipeline/syntax/#declarative-pipeline

// ProTip: If you're debugging changes to this file, use the replay feature in
// Jenkins rather than the commit/watch/fix cycle:
//   1. Go to https://jenkins.zooniverse.org/job/Zooniverse%20GitHub/job/front-end-monorepo/
//   2. Find your branch and click on it
//   3. Pick a build from the list in the sidebar
//   4. Click 'Replay' in the sidebar
//   5. You should get an editor where you can modify the pipeline and run it
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
              def newImage = docker.build(dockerImageName, "--target bootstrap ./")
              newImage.push()
              newImage.push('latest')
            }
          }
        }

        stage('Build app Docker images') {
          environment {
              NODE_ENV = 'production'
              PANOPTES_ENV = 'production'
          }

          parallel {
            stage('Build @zooniverse/fe-content-pages') {
              agent any

              environment {
                ASSET_PREFIX = 'https://fe-content-pages.zooniverse.org'
                SENTRY_DSN = 'https://1f0126a750244108be76957b989081e8@sentry.io/1492498'
              }

              steps {
                dir ('packages/app-content-pages') {
                  script {
                    def dockerRepoName = 'zooniverse/fe-content-pages'
                    def dockerImageName = "${dockerRepoName}:${GIT_COMMIT}"
                    def newImage = docker.build(dockerImageName)
                    newImage.push()
                    newImage.push('latest')
                  }
                }
              }
            }
            stage('Build @zooniverse/fe-project') {
              agent any

              environment {
                ASSET_PREFIX = 'https://fe-project.zooniverse.org'
                SENTRY_DSN = 'https://2a50683835694829b4bc3cccc9adcc1b@sentry.io/1492691'
              }

              steps {
                dir ('packages/app-project') {
                  script {
                    def dockerRepoName = 'zooniverse/fe-project'
                    def dockerImageName = "${dockerRepoName}:${GIT_COMMIT}"
                    def newImage = docker.build(dockerImageName)
                    newImage.push()
                    newImage.push('latest')
                  }
                }
              }
            }
          }
        }
      }
    }

    stage('Deploy production to Kubernetes') {
      when { tag 'production-release' }
      agent any
      steps {
        sh "sed 's/__IMAGE_TAG__/${GIT_COMMIT}/g' kubernetes/deployment-production.tmpl | kubectl --context azure apply --record -f -"
      }
    }

    stage('Deploy staging to Kubernetes') {
      when { branch 'master' }
      agent any
      steps {
        sh "sed 's/__IMAGE_TAG__/${GIT_COMMIT}/g' kubernetes/deployment-staging.tmpl | kubectl --context azure apply --record -f -"
      }
    }
  }

  post {
    unsuccessful {
      slackSend (
        color: '#FF0000',
        message: "DEPLOY FAILED: Job '${JOB_NAME} [${BUILD_NUMBER}]' (${BUILD_URL})",
        channel: "#frontend-rewrite"
      )
    }
  }
}
