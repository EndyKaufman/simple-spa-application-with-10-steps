cd frontend
npm run build-to-backend
cd ..
git add .
git -c user.name='travis' -c user.email='travis' commit -am "travis ci: deploy"
git checkout master
git merge develop
git push -f -q https://$GITHUB_USERNAME:$GITHUB_API_KEY@github.com/$GITHUB_USERNAME/$GITHUB_PROJECT master &2>/dev/null