npm run build-to-backend --prefix ./frontend
git commit -am "travis ci: deploy"
git checkout master
git merge develop
git push origin master