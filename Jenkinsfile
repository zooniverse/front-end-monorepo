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

def newImage = null

pipeline {
  agent none

  options {
    quietPeriod(120) // builds happen at least 120 seconds apart
    disableConcurrentBuilds()
  }

  stages {

    // Right now, we're *only* building and deploying on the `master` branch;
    // longer-term, we'll want to deploy feature branches as well.

    stage('Build base Docker image') {
      agent any

      environment {
        APP_ENV = "${env.TAG_NAME == "production-release" ? "production" : "staging"}"
        COMMIT_ID = "${GIT_COMMIT}"
        CONTENTFUL_ACCESS_TOKEN = credentials('contentful-access-token')
        CONTENTFUL_SPACE_ID = credentials('contentful-space-ID')
        CONTENT_ASSET_PREFIX = "${env.TAG_NAME == "production-release" ? "https://fe-content-pages.zooniverse.org" : "https://fe-content-pages.preview.zooniverse.org"}"
        SENTRY_CONTENT_DSN = 'https://1f0126a750244108be76957b989081e8@sentry.io/1492498'
        PROJECT_ASSET_PREFIX = "${env.TAG_NAME == "production-release" ? "https://fe-project.zooniverse.org" : "https://fe-project.preview.zooniverse.org"}"
        SENTRY_PROJECT_DSN = 'https://2a50683835694829b4bc3cccc9adcc1b@sentry.io/1492691'
      }

      steps {
        script {
          def dockerRepoName = 'zooniverse/front-end-monorepo-${APP_ENV}'
          def dockerImageName = "${dockerRepoName}:${GIT_COMMIT}"
          def buildArgs = "--build-arg APP_ENV --build-arg COMMIT_ID --build-arg CONTENTFUL_ACCESS_TOKEN --build-arg CONTENTFUL_SPACE_ID --build-arg CONTENT_ASSET_PREFIX --build-arg SENTRY_CONTENT_DSN --build-arg PROJECT_ASSET_PREFIX --build-arg SENTRY_PROJECT_DSN ."
          newImage = docker.build(dockerImageName, buildArgs)
        }
      }
    }

    stage('push built images on master') {
      when { branch 'master' }
      agent any

      steps {
        script {
          newImage.push()
          newImage.push('latest')
        }
      }
    }

    stage('Dry run deployments') {
       agent any
       steps {
         sh "sed 's/__IMAGE_TAG__/${GIT_COMMIT}/g' kubernetes/deployment-staging.tmpl | kubectl --context azure apply --dry-run=client --record -f -"
         sh "sed 's/__IMAGE_TAG__/${GIT_COMMIT}/g' kubernetes/deployment-production.tmpl | kubectl --context azure apply --dry-run=client --record -f -"
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
    // Notify about valid builds AND deploys
    success {
      script {
        if (env.BRANCH_NAME == 'master' || env.TAG_NAME == 'production-release') {
          slackSend (
            color: '#00FF00',
            message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})",
            channel: "#ops"
          )
        }
      }
    }
    // Notify about failed builds OR deploys
    failure {
      script {
        if (env.BRANCH_NAME == 'master' || env.TAG_NAME == 'production-release') {
          slackSend (
            color: '#FF0000',
            message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})",
            channel: "#ops"
          )
        }
      }
    }
    // Notify about broken builds on non-deploy branches only
    unsuccessful {
      script {
        if (env.BRANCH_NAME != 'master' || env.TAG_NAME != 'production-release') {
          slackSend (
            color: '#FF0000',
            message: "BUILD FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})",
            channel: "#frontend-rewrite"
          )
        }
      }
    }
  }
}
