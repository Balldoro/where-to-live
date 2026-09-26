from fastapi import APIRouter, FastAPI
from fastapi.routing import APIRoute

API_PREFIX = "/api"


def operation_id(route: APIRoute) -> str:
    return f"{route.tags[0]}-{route.name}"


app = FastAPI(
    title="where-to-live",
    docs_url=f"{API_PREFIX}/docs",
    redoc_url=f"{API_PREFIX}/redoc",
    openapi_url=f"{API_PREFIX}/openapi.json",
    generate_unique_id_function=operation_id,
)
api = APIRouter(prefix=API_PREFIX)


@api.get("/health", tags=["system"])
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(api)
