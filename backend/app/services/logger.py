from app.services.helpers import get_timestamp


def log_request(name):
    print(f"[{get_timestamp()}] Career advice requested by: {name}")