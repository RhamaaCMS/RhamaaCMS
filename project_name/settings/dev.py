import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from the project root (BASE_DIR)
_env_file = Path(__file__).resolve().parent.parent.parent / ".env"
if _env_file.exists():
    load_dotenv(_env_file)

from .base import *  # noqa: E402, F401, F403

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get("DJANGO_DEBUG", "True") == "True"
MQTT_RUN_MODE = os.environ.get("MQTT_RUN_MODE", "embedded").strip().lower()

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get(
    "DJANGO_SECRET_KEY",
    "django-insecure-v%9!*4@)_lmgmmw0te5tn_3u=q30i2x$@#p_=p_bme-55j9w!p",
)

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS", "*").split(",")

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


try:
    from .local import *
except ImportError:
    pass
