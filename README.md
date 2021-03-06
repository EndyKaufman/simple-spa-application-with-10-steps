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

## Create github repository

1) Login or register on https://github.com/

2) Create <github_project>

3) Init repository

    $ rm -rf .git
    $ git init
    $ git commit -m "first commit"
    $ git remote add origin git@github.com:<github_username>/<github_project>.git
    $ git push -u origin master

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

## Push repository

    $ git add .
    $ git commit -m "prepare backend"
    $ git push -u origin master

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

## Push repository

    $ git add .
    $ git commit -m "prepare frontend"
    $ git push -u origin master

# Deploy to Heroku (or Dokku)

## Create application

1) Create account on http://heroku.com

2) Create application on dashboard https://dashboard.heroku.com/new?org=personal-apps

3) Deployment method set Heroku Git and set "Wait for CI to pass before deploy" to uncheck

## Login and push local files to remote heroku git server

    $ heroku login
    $ heroku git:remote -a mypoject
    $ git add .
    $ git commit -am "push on heroku"
    $ git push heroku master
    $ heroku run python manage.py migrate

## Run db migrations on heroku

For run migrations or other shell command you most create/update file "bin/post_compile"

    # !/usr/bin/env bash
    echo "=> Performing database migrations..."
    python manage.py migrate

# Tests and deploy with Travis CI

## Install external

### Install Ruby
http://rubyinstaller.org/downloads/

## Make script for run Tests

Create scripts folder on root folder of project and create in file "scripts/test.sh"

    python manage.py migrate
    python manage.py collectstatic --noinput
    python manage.py test
    cd frontend
    npm run test

Create script "scripts/install.sh"

    wget https://raw.githubusercontent.com/creationix/nvm/v0.31.0/nvm.sh -O ~/.nvm/nvm.sh
    source ~/.nvm/nvm.sh
    nvm install 6
    node --version
    sudo add-apt-repository ppa:git-core/ppa -y
    sudo apt-get update
    sudo apt-get install git -y
    git --version
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

## Make script for deploy to master

Create script "scripts/deploy.sh"

    curl -o /tmp/travis-automerge https://raw.githubusercontent.com/cdown/travis-automerge/master/travis-automerge
    chmod a+x /tmp/travis-automerge"
    /tmp/travis-automerge

## Make encrypt token for deploy with Travis

Create <access_token> on github https://github.com/settings/tokens

Create <encrypt_token> 

    $ gem install travis
    $ travis encrypt -r <github_username>/<github_project> 'GITHUB_SECRET_TOKEN=<access_token>'

## Add config for Travis CI

Create env vars on Travis project settings 
on https://travis-ci.org/<github_username>/<github_project>/settings
    
    secure=<encrypt token>
    BRANCHES_TO_MERGE_REGEX=^develop
    BRANCH_TO_MERGE_INTO=master 
    GITHUB_REPO=<github_username>/<github_project> 
    GITHUB_SECRET_TOKEN=<access_token>

Create yaml config on root folder ".travis.yml"

    language: python
    python:
    - '2.7'
    sudo: required
    install:
    - source scripts/install.sh
    script:
    - cd ..
    - source scripts/test.sh
    after_success:
    - cd ..
    - source scripts/deploy.sh
    branches:
    only:
        - develop

## Push repository

    $ git add .
    $ git commit -m "prepare deploy with Travis CI"
    $ git push -u origin master
    $ git checkout -b develop
    $ git push origin develop

Change deployment method on Heroku to GitHub for master branch

# Use cloud database and static server

## Connect Postrges

After create application on heroku, heroku automatically create postgres database and save connection strings 
to env config on heroku, for use it you must update settings.py

    # Database
    # https://docs.djangoproject.com/en/1.9/ref/settings/#databases

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }

    # Parse database configuration from $DATABASE_URL
    if os.environ.get('DATABASE_URL', None) is not None:
        DATABASES['default'] = dj_database_url.config(default=os.environ.get('DATABASE_URL'))
        
Tune project for use amazone storage s3, for store static files

## Install

    $ source venv/Scripts/activate
    $ pip install boto
    $ pip install django-storages
    $ pip install django-cors-headers
    $ pip freeze > requirements.txt

Add storages to your settings.py file:

    INSTALLED_APPS = (
        ...
        'storages',
        'corsheaders',
        ...
    )

Update settings.py

    ...
    DEBUG = os.environ.get('DEBUG', '1') == '1'
    ...
    MIDDLEWARE_CLASSES = (
        ...
        'corsheaders.middleware.CorsMiddleware',
        'django.middleware.common.CommonMiddleware',
        ...
    )   
    CORS_ORIGIN_ALLOW_ALL = True 
    ...
    # http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region
    AWS_S3_HOST = 's3.eu-central-1.amazonaws.com'

    # Simplified static file serving.
    # https://warehouse.python.org/project/whitenoise/
    if DEBUG:
        STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
    else:
        DEFAULT_FILE_STORAGE = 'storages.backends.s3boto.S3BotoStorage'
        STATICFILES_STORAGE = 'storages.backends.s3boto.S3BotoStorage'
        AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
        AWS_STORAGE_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME')
        AWS_PRELOAD_METADATA = True  # necessary to fix manage.py collectstatic command to only upload changed files instead of all files
        STATIC_URL = 'http://%s.%s/' % (AWS_STORAGE_BUCKET_NAME, AWS_S3_HOST)

## Create account and storage for static

1) Go to url https://aws.amazon.com/ru/

2) Create account

3) Open https://console.aws.amazon.com/s3/home

4) Create new bucket with <bucket name> and set region Frankfurt

5) Open properties and permissions

6) Add Everyone and check "List" item

7) Edit CORS configuration

    <?xml version="1.0" encoding="UTF-8"?>
    <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
        <CORSRule>
            <AllowedOrigin>*</AllowedOrigin>
            <AllowedMethod>GET</AllowedMethod>
            <AllowedMethod>POST</AllowedMethod>
            <AllowedMethod>PUT</AllowedMethod>
            <AllowedHeader>*</AllowedHeader>
        </CORSRule>
    </CORSConfiguration>

8) Open Static Website Hosting and check "Enable website hosting"

Index Document: index.html

Error Document: index.html

Edit Redirection Rules (change projectname:

    <RoutingRules>
    <RoutingRule>
        <Condition>
        <KeyPrefixEquals>api/</KeyPrefixEquals>
        </Condition>
        <Redirect>
        <HostName>projectname.herokuapp.com</HostName>
        </Redirect>
    </RoutingRule>
    </RoutingRules> 

## Create access tokens for access to service

1) Open https://console.aws.amazon.com/iam/home#security_credential

2) Click to Access Keys and click to "Create New Access Key"

3) Click to "Download Key File" on modal window and it to save "rootkey.csv"

## Set heroku config env

    $ heroku config:set DEBUG=0
    $ heroku config:set AWS_ACCESS_KEY_ID=<AWSAccessKeyId from rootkey.csv>
    $ heroku config:set AWS_SECRET_ACCESS_KEY=<AWSSecretKey from rootkey.csv>
    $ heroku config:set S3_BUCKET_NAME=<bucket name>
    $ heroku config:set S3_USE_SIGV4='True'
    
## Update index.html on gettingstarted

    ...
    <base href="{% static '/' %}">
    ...

## Push repository

    $ git add .
    $ git commit -m "prepare AWS S3 static server"
    $ git push origin develop

## Open you static site on amazon s3

Try go to http://simple-spa-application-with-10-steps.s3-website.eu-central-1.amazonaws.com/

Change name you project and region if you use another region name

# Create simple master-detail application

## Install

    $ pip install Pillow
    $ pip freeze > requirements.txt

## Rename gettingstarted to app in all files and rename folder

## Remove hello module

Remove all usage hello from app/urls.py

## Create module mypoject

    $ source venv/Scripts/activate
    $ django-admin.py startapp myproject

## Update app/settings.py

    ...
    INSTALLED_APPS = (
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'rest_framework',
        'storages',
        'corsheaders',
        'myproject'
    )
    ...

## Update mypoject/models.py

    from __future__ import unicode_literals
    from django.db import models
    from rest_framework import routers, serializers, viewsets

    class Detail(models.Model):
        title = models.TextField(max_length=512)
        image = models.ImageField(upload_to='images')

    class Master(models.Model):
        title = models.TextField(max_length=512)
        details = models.ManyToManyField(Detail, blank=True)

    class DetailSerializer(serializers.HyperlinkedModelSerializer):
        class Meta:
            model = Detail
            fields = ('title', 'image')

    class DetailViewSet(viewsets.ModelViewSet):
        queryset = Detail.objects.all()
        serializer_class = DetailSerializer

    class MasterSerializer(serializers.HyperlinkedModelSerializer):
        class Meta:
            model = Master
            fields = ('title', 'details')
            
    class MasterViewSet(viewsets.ModelViewSet):
        queryset = Master.objects.all()
        serializer_class = MasterSerializer

## Update mypoject/views.py

    from django.shortcuts import render
    # Create your views here.
    def index(request):
        # return HttpResponse('Hello from Python!')
        return render(request, 'index.html')

## Update app/urls.py

    ...
    from mypoject.models import DetailViewSet, MasterViewSet
    from django.contrib import admin
    import myproject.views
    ...
    router = routers.DefaultRouter()
    router.register(r'users', UserViewSet)
    router.register(r'details', DetailViewSet)
    router.register(r'masters', MasterViewSet)
    urlpatterns = [
        url(r'^$', myproject.views.index, name='index'),
        ...
    ]
    if settings.DEBUG:
        urlpatterns += static('/api/details/images/', document_root='images/')
        ...
    ...

## Update frontend/package.json

    ...
    "copy-to-backend": "rimraf ../app/static && cp -r dist ../app/static",
    "copy-index-to-backend": "cp -r dist/index.html ../myproject/templates",
    ...

## Update .gitignore

    ...
    images

## Make migrations

    $ python manage.py makemigrations

## Create superuser

    $ python manage.py migrate
    $ python manage.py createsuperuser

## Build and copy frontend files to backend

    $ mkdir myproject/templates
    $ cd frontend
    $ npm run build-to-backend
    $ npm run copy-index-to-backend 

## Update mypoject/templates/index.html with special template tags

    <!doctype html>
    <html>
    <head>
    {% load staticfiles %}
    <meta charset="utf-8">
    <title>Angular 2 App | ng2-webpack</title>
    <link rel="icon" type="image/x-icon" href="{% static '/img/favicon.ico' %}">
    <base href="{% static '/' %}">
    <link href="{% static '/css/app.css' %}" rel="stylesheet">
    </head>
    <body>
    <my-app>Loading...</my-app>
    <script type="text/javascript" src="{% static '/js/polyfills.js' %}"></script>
    <script type="text/javascript" src="{% static '/js/vendor.js' %}"></script>
    <script type="text/javascript" src="{% static '/js/app.js' %}"></script></body>
    </html>

## Run local server

    $ python manage.py collectstatic --noinput
    $ python manage.py runserver 0.0.0.0:5000    