from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ckeditor', include('ckeditor_uploader.urls')),
    path('',include('pages.urls')),
    path('blog/',include('blog.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
