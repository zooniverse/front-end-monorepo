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

  // enable BUILDKIT https://docs.docker.com/develop/develop-images/build_enhancements/#to-enable-buildkit-builds
  // for all build stages
  environment {
    DOCKER_BUILDKIT = 1
  }

  options {
    quietPeriod(120) // builds happen at least 120 seconds apart
    disableConcurrentBuilds()
  }

  stages {
    stage('Build production Docker image') {
      when {
        tag 'production-release'
      }
      agent any

      environment {
        APP_ENV = "production"
        COMMIT_ID = "${GIT_COMMIT}"
        CONTENTFUL_ACCESS_TOKEN = credentials('contentful-access-token')
        CONTENTFUL_SPACE_ID = credentials('contentful-space-ID')
        CONTENT_ASSET_PREFIX = "https://www.zooniverse.org/about"
        SENTRY_CONTENT_DSN = 'https://1f0126a750244108be76957b989081e8@sentry.io/1492498'
        PROJECT_ASSET_PREFIX = "https://www.zooniverse.org/projects"
        SENTRY_PROJECT_DSN = 'https://2a50683835694829b4bc3cccc9adcc1b@sentry.io/1492691'
      }

      steps {
        script {
          def dockerRepoName = 'zooniverse/front-end-monorepo-production'
          def dockerImageName = "${dockerRepoName}:${GIT_COMMIT}"
          def buildArgs = "--build-arg APP_ENV --build-arg COMMIT_ID --build-arg CONTENTFUL_ACCESS_TOKEN --build-arg CONTENTFUL_SPACE_ID --build-arg CONTENT_ASSET_PREFIX --build-arg SENTRY_CONTENT_DSN --build-arg PROJECT_ASSET_PREFIX --build-arg SENTRY_PROJECT_DSN ."
          def newImage = docker.build(dockerImageName, buildArgs)
          newImage.push()
          newImage.push('latest')
        }
      }
    }

    stage('Dry run deployments') {
       agent any
       steps {
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
  }

  post {
    // Notify about valid builds AND deploys
    success {
      script {
        if (env.TAG_NAME == 'production-release') {
          slackSend (
            color: '#00FF00',
            message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})",
            channel: "#deploys"
          )
        }
      }
    }
    // Notify about failed builds OR deploys
    failure {
      script {
        if (env.TAG_NAME == 'production-release') {
          slackSend (
            color: '#FF0000',
            message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})",
            channel: "#deploys"
          )
        }
      }
    }
    // Notify about broken builds on non-deploy branches only
    unsuccessful {
      script {
        if (env.TAG_NAME != 'production-release') {
          slackSend (
            color: '#FF0000',
            message: "BUILD FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})",
            channel: "#deploys"
          )
        }
      }
    }
  }
}
