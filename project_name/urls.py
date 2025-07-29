import os
from django.conf import settings
from django.urls import include, path
from django.contrib import admin

from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls


def import_app_urls(folder_path):
    """
    Automatically discover and include URLs from all Django apps in the specified folder.
    Each app can have a urls.py file that will be included with the app name as prefix and namespace.
    """
    app_urls = []
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    apps_dir = os.path.join(base_dir, folder_path)

    if os.path.exists(apps_dir):
        for item in os.listdir(apps_dir):
            app_path = os.path.join(apps_dir, item)
            if (os.path.isdir(app_path) and 
                os.path.exists(os.path.join(app_path, '__init__.py'))):
                
                urls_file = os.path.join(app_path, 'urls.py')
                if os.path.exists(urls_file):
                    try:
                        # Include app URLs with app name as prefix and namespace
                        module_name = f"{folder_path}.{item}.urls"
                        app_urls.append(
                            path(f"{item}/", include(module_name, namespace=item))
                        )
                    except ImportError:
                        # App's urls.py has import errors, skip
                        continue
    
    return app_urls

urlpatterns = [
    path("django-admin/", admin.site.urls),
    path("admin/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
]

# Automatically include URLs from all apps in the 'apps' folder
urlpatterns += import_app_urls('apps')


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = urlpatterns + [
    # For anything not caught by a more specific rule above, hand over to
    # Wagtail's page serving mechanism. This should be the last pattern in
    # the list:
    path("", include(wagtail_urls)),
    # Alternatively, if you want Wagtail pages to be served from a subpath
    # of your site, rather than the site root:
    #    path("pages/", include(wagtail_urls)),
]
