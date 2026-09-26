from collections.abc import Iterator

import pytest
from testcontainers.community.postgres import PostgresContainer

# Must match the db image in compose.yaml.
POSTGIS_IMAGE = "postgis/postgis:18-3.6"


@pytest.fixture(scope="session")
def postgres() -> Iterator[PostgresContainer]:
    with PostgresContainer(POSTGIS_IMAGE) as container:
        yield container
