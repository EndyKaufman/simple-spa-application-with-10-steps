# Install external

## Install GIT
https://git-scm.com/download/win
## Install SourceTree
https://www.sourcetreeapp.com/
## Install Visual Studio Code
https://code.visualstudio.com/

# Prepare backend

## Install external

### Install Python 2.7
http://docs.python-guide.org/en/latest/starting/install/win/
### Install Heroku CLI
https://devcenter.heroku.com/articles/heroku-command-line

## Install

    $ git clone https://github.com/heroku/python-getting-started.git  myproject
    $ cd myproject
    $ pip install virtualenv
    $ virtualenv venv
    $ source venv/Scripts/activate
    $ pip install -r requirements.txt
    $ python manage.py migrate
    $ python manage.py collectstatic --noinput
    $ pip install djangorestframework
    $ pip install markdown
    $ pip install django-filter
    $ pip freeze > requirements.txt

## Update gettingstarted/urls.py to

    from django.conf.urls import include, url

    from django.contrib.auth.models import User
    from rest_framework import routers, serializers, viewsets

    from django.contrib import admin
    admin.autodiscover()

    import hello.views

    # Examples:
    # url(r'^$', 'gettingstarted.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # Serializers define the API representation.
    class UserSerializer(serializers.HyperlinkedModelSerializer):
        class Meta:
            model = User
            fields = ('url', 'username', 'email', 'is_staff')

    # ViewSets define the view behavior.
    class UserViewSet(viewsets.ModelViewSet):
        queryset = User.objects.all()
        serializer_class = UserSerializer

    # Routers provide an easy way of automatically determining the URL conf.
    router = routers.DefaultRouter()
    router.register(r'users', UserViewSet)

    urlpatterns = [
        url(r'^$', hello.views.index, name='index'),
        url(r'^db', hello.views.db, name='db'),
        url(r'^admin/', include(admin.site.urls)),
        url(r'^api/', include(router.urls)),
        url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    ]

## Start server

    $ source venv/Scripts/activate
    $ python manage.py migrate
    $ python manage.py collectstatic --noinput
    $ python manage.py runserver 0.0.0.0:5000

# Prepare frontend

## Install external

### Install NodeJS 6
https://nodejs.org/en/

## Install

    $ cd myproject
    $ git clone https://github.com/preboot/angular2-webpack.git frontend
    $ cd frontend
    $ npm install
    $ rm -rf .git

## Remove all ".[hash]" usage in webpack.config.json

## Append new task in scripts section on package.json
    
    "scripts": {
        ...
        "copy-to-backend": "rimraf ../gettingstarted/static && cp -r dist ../gettingstarted/static && cp -r dist/index.html ../hello/templates",
        "copy-index-to-backend": "cp -r dist/index.html ../hello/templates",
        "build-to-backend": "npm run build && npm run copy-to-backend"
    }

## Run standalone frontend application

    $ npm start #start server on http://localhost:8080

## Run frontend application from backend 

### Build and copy frontend files to backend

    $ npm run build-to-backend
    $ npm run copy-index-to-backend 

### Update hello/templates/index.html with special template tags

    <!doctype html>
    <html>
    <head>
    {% load staticfiles %}
    <meta charset="utf-8">
    <title>Angular 2 App | ng2-webpack</title>
    <link rel="icon" type="image/x-icon" href="{% static '/img/favicon.ico' %}">
    <base href="/">
    <link href="{% static '/css/app.css' %}" rel="stylesheet">
    </head>
    <body>
    <my-app>Loading...</my-app>
    <script type="text/javascript" src="{% static '/js/polyfills.js' %}"></script>
    <script type="text/javascript" src="{% static '/js/vendor.js' %}"></script>
    <script type="text/javascript" src="{% static '/js/app.js' %}"></script></body>
    </html>

### Update gettingstarted/urls.py to

    from django.conf.urls.static import static
    from django.conf import settings
    ...
    if settings.DEBUG:
        urlpatterns += static('/css/', document_root='gettingstarted/staticfiles/css/')
        urlpatterns += static('/img/', document_root='gettingstarted/staticfiles/img/')
        urlpatterns += static('/js/', document_root='gettingstarted/staticfiles/js/')

### Run backend server

    $ cd ../
    $ source venv/Scripts/activate
    $ python manage.py migrate
    $ python manage.py collectstatic --noinput
    $ python manage.py runserver 0.0.0.0:5000

# Deploy to Heroku (or Dokku)

## Create application

1) Create account on http://heroku.com

2) Create application on dashboard https://dashboard.heroku.com/new?org=personal-apps

3) Deployment method set Heroku Git

## Login and push local files to remote heroku git server

    $ heroku login
    $ heroku git:remote -a mypoject
    $ git add .
    $ git commit -am "push on heroku"
    $ git push heroku master
    $ heroku run python manage.py migrate

## Tests and deploy with Travis CI

### Make script for run Tests

Create scripts folder on root folder of project and create in file "scripts/test.sh"

    python manage.py migrate
    python manage.py collectstatic --noinput
    python manage.py test
    cd frontend
    npm run test
    cd ..

Create script "scripts/install.sh"

    wget https://raw.githubusercontent.com/creationix/nvm/v0.31.0/nvm.sh -O ~/.nvm/nvm.sh
    source ~/.nvm/nvm.sh
    nvm install 6
    node --version
    sudo apt-get update
    sudo npm update -g    
    sudo npm install -g npm
    sudo npm install -g git+https://git@github.com/gulpjs/gulp.git#4.0
    sudo npm install -g karma-cli
    sudo npm install -g npm-check-updates
    sudo npm install -g bower
    sudo npm install -g protractor
    sudo npm install -g selenium-webdriver
    sudo npm install -g typescript
    sudo npm install -g tslint
    sudo npm install -g node-gyp
    sudo npm rebuild
    sudo pip install --upgrade pip
    sudo apt-get update
    pip install -r requirements.txt
    cd frontend
    npm install
    cd ..

### Make script for deploy to master

Create script "scripts/deploy.sh"

    cd frontend
    npm run build-to-backend
    cd ..
    git add .
    git commit -am "travis ci: deploy"
    git checkout master
    git merge develop
    git push origin master

### Add config for Travis CI

Create yaml config on root folder ".travis.yml"

    language: python
    python:
    - '2.7'
    sudo: required
    install:
    - source scripts/install.sh
    script:
    - source scripts/test.sh
    after_success:
    - source scripts/deploy.sh

Change deployment method on Heroku to GitHub for master branch
