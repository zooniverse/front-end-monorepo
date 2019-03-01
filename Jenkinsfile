#!groovy

timeout(20) {
  node {
    checkout scm

    stage('test') {
      def dockerRepoName = 'zooniverse/front-end-monorepo'
      def dockerImageName = "${dockerRepoName}:${env.BUILD_ID}"
      def testImage = docker.build(dockerImageName)
      testImage.inside {
        sh '''
          cd /usr/src/
          ./node_modules/.bin/lerna run build --scope="@zooniverse/grommet-theme"
          ./node_modules/.bin/lerna run --stream test:ci
        '''
      }
    }

    stage('publish: Docker images') {
      echo 'Publishing Docker images...'
      if (BRANCH_NAME == 'master') {
        def appFolders = sh(returnStdout: true, script: './bin/get-app-folders.sh').trim().split(',')

        echo "Found ${appFolders.size()} app(s) to deploy."

        if (appFolders.size() > 0) {
          for (appDir in appFolders) {
            dir (appDir) {
              def dockerRepoName = sh(returnStdout: true, script: 'grep name package.json | cut -c 13- | rev | cut -c 3- | rev').trim()
              def dockerImageName = "${dockerRepoName}:${BRANCH_NAME}"

              echo "Building image for ${dockerImageName}..."
              def newImage = docker.build(dockerImageName, '--quiet .')

              echo "Pushing ${dockerImageName} to Docker Hub..."
              newImage.push('latest')
            }
          }
        }
      } else {
        echo 'Not on `master` branch, skipping stage'
      }
    }

    stage('Deploy to Swarm') {
      if (BRANCH_NAME == 'master') {
        sh """
          cd "/var/jenkins_home/jobs/Zooniverse GitHub/jobs/operations/branches/master/workspace" && \
          ./hermes_wrapper.sh exec swarm19a -- \
              docker stack deploy --prune \
              -c /opt/infrastructure/stacks/fe-project-staging.yml \
              fe-project-staging
        """
      }
    }

  }
}
