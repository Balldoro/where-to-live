from testcontainers.community.postgres import PostgresContainer


def test_postgis_is_available(postgres: PostgresContainer) -> None:
    result = postgres.exec(
        ["psql", "-U", postgres.username, "-d", postgres.dbname, "-tAc", "select postgis_version()"]
    )

    assert result.exit_code == 0
    assert result.output.decode().startswith("3.6")
