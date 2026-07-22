import asyncio

from django.core.management.base import BaseCommand, CommandError

from ...worker import run_mqtt_worker


class Command(BaseCommand):
    help = "Run the single-owner MQTT subscriber/publisher process."

    def handle(self, **options):
        try:
            asyncio.run(run_mqtt_worker())
        except KeyboardInterrupt:
            self.stdout.write("MQTT worker stopped.")
        except RuntimeError as exc:
            raise CommandError(str(exc)) from exc
