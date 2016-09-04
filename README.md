# Install external

### Install GIT
https://git-scm.com/download/win
### Install SourceTree
https://www.sourcetreeapp.com/
### Install Python 2.7
http://docs.python-guide.org/en/latest/starting/install/win/
### Install Heroku CLI
https://devcenter.heroku.com/articles/heroku-command-line
### Install Visual Studio Code
https://code.visualstudio.com/

## Prepare  backend
    
    $ git clone https://github.com/heroku/python-getting-started.git  myproject
    $ cd myproject
    $ pip install virtualenv
    $ virtualenv venv
    $ venv\Scripts\activate
    $ pip install -r requirements.txt
    $ python manage.py migrate
    $ python manage.py collectstatic
    $ pip install djangorestframework
    $ pip install markdown
    $ pip install django-filter
    $ pip freeze > requirements.txt

### Update gettingstarted/urls.py to

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

### Start server

    $ venv\Scripts\activate
    $ python manage.py migrate
    $ python manage.py collectstatic
    $ python manage.py runserver 0.0.0.0:5000