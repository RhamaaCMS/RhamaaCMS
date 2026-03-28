from django.urls import path
from . import views

app_name = "mqtt"

urlpatterns = [
    path("", views.dashboard, name="dashboard"),
    path("publish/", views.publish_api, name="publish"),
    path("status/", views.status, name="status"),
    path("history/delete/<int:pk>/", views.history_delete, name="history_delete"),
    path("history/clear/", views.history_clear, name="history_clear"),
    path("history/purge/", views.history_purge, name="history_purge"),
]
