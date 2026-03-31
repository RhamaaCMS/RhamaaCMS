from django.db import models
from inertia import render as inertia_render
from wagtail.models import Page


class InertiaPageMixin:
    """Mixin that serves a Wagtail Page as an Inertia.js response."""

    inertia_component: str = ""

    def get_inertia_props(self, request):
        return {"title": self.title}

    def serve(self, request):
        return inertia_render(request, self.inertia_component, self.get_inertia_props(request))

    def serve_password_required_response(self, request, form, action_url):
        return super().serve_password_required_response(request, form, action_url)


class HomePage(InertiaPageMixin, Page):
    inertia_component = "home/Index"

    class Meta:
        verbose_name = "Home Page"
