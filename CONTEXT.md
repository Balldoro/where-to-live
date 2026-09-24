# Where to live?

Helps someone deciding where to buy or rent a home in Poland judge a place: what is nearby, how well public transport serves it, how long it takes to reach the places they go regularly, and environmental risks.

## Language

### Places

**Candidate location**:
The address or map pin the user is currently evaluating as a potential home.
_Avoid_: Pin, target, property, home

**Anchor**:
A labelled place the user travels to regularly (work, school, a partner's flat). Anchors belong to the user, not to a Candidate location, so each one is entered once and shown alongside every location.
_Avoid_: Destination, favourite place, POI

**Saved location**:
A Candidate location a signed-in user has kept so they can return to it or share it.
_Avoid_: Favourite, bookmark

**Share link**:
A public, read-only, revocable link to one Saved location and its Anchors. Everything else shown to the recipient is computed fresh at view time.
_Avoid_: Snapshot, report, permalink

**Amenity**:
A nearby point of everyday use (grocery, pharmacy, clinic, school, restaurant, cinema, park, gym, parcel locker), shown as a pin on the map.
_Avoid_: POI, place, venue

**Amenity category**:
A fixed grouping of Amenities that the user can toggle on or off.

**Walking catchment**:
The area reachable on foot from a Candidate location within a given time; Amenities are "near" only if they fall inside it.
_Avoid_: Radius, buffer

### Public transport

**Service level**:
How often public transport departs within walking distance of a Candidate location, per Time window, measured in departures per hour. Each trip counts once, however many nearby stops it passes.
_Avoid_: Number of lines, transport score

**Time window**:
A named slice of the week (weekday rush, weekday off-peak, night, weekend) used to measure both Service level and Commute time.

**Commute time**:
How long it takes to travel between a Candidate location and an Anchor by a given mode. By public transport it is reported per Time window; walking, cycling and driving get a single typical value.
_Avoid_: Travel time, route time, ETA

**Coverage**:
Whether timetable data exists (and how fresh it is) for a given area. An area without Coverage has an unknown Service level, never a zero one.

### Environment

**Flood zone**:
An area marked on the official flood hazard maps. A location outside a mapped Flood zone is "not mapped", not "safe".

**Air quality reading**:
A pollution measurement from the nearest monitoring station, always shown together with the distance to that station.
