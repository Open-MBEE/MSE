#!/bin/bash
PACKAGE_VERSION="${TRAVIS_COMMIT_MESSAGE}"
GIT_TAG="v${PACKAGE_VERSION}-asset"
git checkout --orphan assets
git reset --hard
git rm --cached -r ../
git add build/sublime/MapleMBSE-MSE.sublime-package
git commit -m "v${PACKAGE_VERSION}"
git tag $GIT_TAG
git remote add github-asset "https://${USERNAME}:${GITHUB_OAUTH_TOKEN}@github.com/Open-MBEE/MSE.git"
git push -f github-asset assets && git push github-asset $GIT_TAG
