#!/bin/bash
PACKAGE_VERSION="${TRAVIS_COMMIT_MESSAGE}"
git checkout --orphan assets
git reset --hard
git rm --cached -r .
git add sublime-syntax/build/sublime/MapleMBSE-MSE.sublime-package
git commit -m "v${PACKAGE_VERSION}"
git remote add github-asset "https://${USERNAME}:${GITHUB_OAUTH_TOKEN}@github.com/Open-MBEE/MSE.git"
git push -f github-asset assets