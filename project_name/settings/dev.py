from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "{{ secret_key }}"

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ["*"]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Vite dev server
DJANGO_VITE = {
    "default": {
        "dev_mode": True,
        "dev_server_port": 5173,
    }
}


try:
    from .local import *
except ImportError:
    pass
