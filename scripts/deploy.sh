cd frontend
npm run build-to-backend
cd ..
git remote update
git fetch
git checkout --track origin/master
git add .
git -c user.name='travis' -c user.email='travis' commit -am "travis ci: deploy"
git merge develop
git remote set-url origin https://$GITHUB_USERNAME:$GITHUB_API_KEY@github.com/$GITHUB_USERNAME/$GITHUB_PROJECT.git
git push origin master