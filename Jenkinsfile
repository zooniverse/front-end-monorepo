#!groovy

timeout(20) {
  node {
    def scmVars = checkout scm

    if (env.BRANCH_NAME != 'master') {
      echo 'Not on `master` branch, skipping build'
      currentBuild.result = 'SUCCESS'
      return
    }

    stage('publish: Monorepo Docker image') {
      echo 'Publishing Monorepo Docker image...'
      def dockerRepoName = 'zooniverse/front-end-monorepo'
      def dockerImageName = "${dockerRepoName}:${BRANCH_NAME}"
      def newImage = docker.build(dockerImageName)
      newImage.push()
      newImage.push('latest')
    }

    stage('publish: App Docker images') {
      echo 'Publishing app Docker images...'
      def appFolders = sh(returnStdout: true, script: './bin/get-app-folders.sh').trim().split(',')

      echo "Found ${appFolders.size()} app(s) to deploy."

      if (appFolders.size() > 0) {
        for (appDir in appFolders) {
          dir (appDir) {
            // get the app's project name - ideally this shell code moves to a package.json script in each app
            def dockerRepoName = sh(returnStdout: true, script: 'grep name package.json | cut -c 13- | rev | cut -c 3- | rev').trim()
            def dockerImageName = "${dockerRepoName}:${scmVars.GIT_COMMIT}"

            echo "Building image for ${dockerImageName}..."
            def newImage = docker.build(dockerImageName, '--quiet .')

            echo "Pushing ${dockerImageName} to Docker Hub..."
            newImage.push()
            newImage.push('latest')
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      sh "kubectl apply --record -f kubernetes/"
      sh "sed 's/__IMAGE_TAG__/${scmVars.GIT_COMMIT}/g' kubernetes/deployment.tmpl | kubectl apply --record -f -"
    }

    if (currentBuild.currentResult == 'FAILURE') {
      slackSend (
        color: '#FF0000',
        message: "DEPLOY FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})",
        channel: "#frontend-rewrite"
      )
    }
  }
}
