sudo apt-get update
sudo apt-get autoremove nodejs -y
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install npm -y
wget https://atom.io/download/deb
mv deb atom-amd64.deb  
dpkg -i atom-amd64.deb
apm install linter-tslint@0.8.3
sudo npm update -g    
sudo npm install -g npm
sudo npm install -g git+https://git@github.com/gulpjs/gulp.git#4.0
sudo npm install -g karma-cli
sudo npm install -g npm-check-updates
sudo npm install -g bower
sudo npm install -g protractor
sudo npm install -g selenium-webdriver
sudo npm install -g tslint
sudo npm install -g typescript
sudo npm install -g node-gyp
sudo npm rebuild
sudo pip install --upgrade pip
sudo apt-get update
pip install -r requirements.txt
cd frontend
npm install
cd ..