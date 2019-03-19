#!groovy

timeout(20) {
  node {
    def scmVars = checkout scm

    stage('publish: Monorepo Docker image') {
      echo 'Publishing Monorepo Docker image...'
      if (BRANCH_NAME == 'master') {
        def dockerRepoName = 'zooniverse/front-end-monorepo'
        def dockerImageName = "${dockerRepoName}:${scmVars.GIT_COMMIT}"
        def newImage = docker.build(dockerImageName)
        newImage.push()
        newImage.push('latest')
      } else {
        echo 'Not on `master` branch, skipping stage'
      }
    }

    stage('publish: App Docker images') {
      echo 'Publishing app Docker images...'
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

    stage('Deploy to Kubernetes') {
      if (BRANCH_NAME == 'master') {
        sh "kubectl apply --record -f kubernetes/"
        sh "sed 's/__IMAGE_TAG__/${scmVars.GIT_COMMIT}/g' kubernetes/deployment.tmpl | kubectl apply --record -f -"
      } else {
        echo 'Not on `master` branch, skipping stage'
      }
    }

  }
}
