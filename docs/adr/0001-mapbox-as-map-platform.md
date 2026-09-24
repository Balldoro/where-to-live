# Mapbox as the map platform

We use Mapbox for map rendering, address search, and walking isochrones, instead of MapLibre with open-source services (OpenFreeMap, Photon/own geocoder, pgRouting). We chose it to ship sooner: one vendor that covers maps, geocoding with autocomplete, and isochrones saves several weeks of self-hosting and data work, and keeps the focus on the features only this app provides (Coverage, Flood zones, Amenity data). Mapbox terms require its results to be shown on a Mapbox map, so this choice ties the whole map stack to it.

## Consequences

- All Mapbox calls except map loads (geocoding, isochrones) go through our backend behind our own interfaces, so the provider can be swapped (e.g. for pgRouting isochrones, or a PRG-based geocoder) without changing the frontend.
- Cost is capped by design: the public token is restricted to our domain, requests are rate-limited per IP and per user, and a global daily limit stops calls before the free tier runs out.
- Temporary geocoding results may not be stored. Coordinates we persist (e.g. Saved locations) must come from a source we are allowed to store, not from Mapbox geocoding responses.
