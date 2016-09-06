cd frontend
npm run build-to-backend
cd ..
git commit -am "travis ci: deploy"
git checkout master
git merge develop
git push origin master