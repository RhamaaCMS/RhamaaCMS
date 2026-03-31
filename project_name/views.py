from inertia import render as inertia_render


def handler404(request, exception=None):
    return inertia_render(request, "errors/NotFound", {}, status=404)


def handler500(request):
    return inertia_render(request, "errors/ServerError", {}, status=500)
