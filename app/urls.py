from django.conf.urls.static import static
from django.conf import settings

from django.conf.urls import include, url

from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

from django.contrib import admin
from myproject.models import DetailViewSet, MasterViewSet
import myproject.views
admin.autodiscover()

# Examples:
# url(r'^$', 'app.views.home', name='home'),
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
router.register(r'details', DetailViewSet)
router.register(r'masters', MasterViewSet)

urlpatterns = [
    url(r'^$', myproject.views.index, name='index'),
    url(r'^admin/', include(admin.site.urls)),
	url(r'^api/', include(router.urls)),
	url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

if settings.DEBUG:
    urlpatterns += static('/images/', document_root='images/')
    urlpatterns += static('/css/', document_root='app/staticfiles/css/')
    urlpatterns += static('/img/', document_root='app/staticfiles/img/')
    urlpatterns += static('/js/', document_root='app/staticfiles/js/')
