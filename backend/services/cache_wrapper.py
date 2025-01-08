from typing import Optional, Any

from django.core.cache import cache


class CacheWrapper:

	@staticmethod
	def get(address: str) -> Optional[Any]:
		""" member function to retrieve the cache key """
		result = cache.get(address)
		return result if result else None

	@staticmethod
	def set(key: str, value, timeout: int = 3600) -> None:
		"""
			set the value in the cache

			args:
			- key: key to the cache result
			- value: result of key in cache
			- timeout: in seconds how long data in the cache is stored
		"""
		if not isinstance(key, str):
			raise TypeError("Key should be a string")
		key = key.strip().lower()
		cache.set(key, value, timeout)

	@staticmethod
	def delete(key:str) -> None:
		""" delete an entry from the cache """
		cache.delete(key)
