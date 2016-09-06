sudo apt-get update
sudo apt-get autoremove nodejs -y
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install npm -y
sudo npm update -g
sudo npm install -g npm
sudo pip install --upgrade pip
sudo npm install -g node-gyp
sudo npm rebuild
sudo apt-get update
pip install -r requirements.txt
cd frontend
npm install
cd ..