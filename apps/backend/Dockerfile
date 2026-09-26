FROM python:3.14-slim-trixie
COPY --from=ghcr.io/astral-sh/uv:0.12.18 /uv /uvx /bin/

RUN groupadd --system --gid 999 nonroot \
 && useradd --no-log-init --system --gid 999 --uid 999 --create-home nonroot

WORKDIR /app

ENV PATH="/app/.venv/bin:$PATH"
ENV UV_NO_DEV=1
ENV UV_COMPILE_BYTECODE=1

COPY pyproject.toml uv.lock ./
RUN uv sync --locked --no-install-project

COPY src ./src
RUN uv sync --locked

USER 999:999

EXPOSE 8000
CMD ["fastapi", "run", "src/app/main.py", "--port", "8000"]