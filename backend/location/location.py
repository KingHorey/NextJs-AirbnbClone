from typing import Tuple, Optional
from geopy.exc import GeocoderTimedOut
from geopy.geocoders import Nominatim
from decouple import config
import logging

from services.cache_wrapper import CacheWrapper

# Set up logging
logger = logging.getLogger(__name__)

# Initialize CacheWrapper
cache_wrapper = CacheWrapper()


class LocationMapper:
    """Service class for geolocation operations using Geopy."""

    def __init__(self):
        # Initialize the geolocator with a user agent
        app_name = config("APP_NAME", default="airbnb_clone")
        self.geolocator = Nominatim(user_agent=app_name)

    def _fetch_and_cache_location(self, address: str, key_prefix: str) -> Optional[Nominatim]:
        """Fetches a geolocation result and caches it."""
        cache_key = f"{key_prefix}:{address.strip().lower()}"
        cached_result = cache_wrapper.get(cache_key)
        if cached_result:
            return cached_result
        try:
            location = self.geolocator.geocode(address, timeout=10)
            if location:
                cache_wrapper.set(cache_key, location)
            return location
        except GeocoderTimedOut:
            logger.warning("Geocoder timed out for address: %s", address)
        except Exception as e:
            logger.error("Error fetching geolocation for address '%s': %s", address, e)
        return None

    def get_long_lat(self, address: str) -> Tuple[Optional[float], Optional[float]]:
        """Fetches longitude and latitude for an address."""
        location = self._fetch_and_cache_location(address, "geo")
        if location:
            return location.longitude, location.latitude
        return None, None

    def get_address(self, address: str) -> Optional[str]:
        """Fetches a formatted address for a location."""
        location = self._fetch_and_cache_location(address, "address")
        if location:
            return location.address
        return None
