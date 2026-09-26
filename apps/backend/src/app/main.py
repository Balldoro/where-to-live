from fastapi import APIRouter, FastAPI

API_PREFIX = "/api"

app = FastAPI(
    title="where-to-live",
    docs_url=f"{API_PREFIX}/docs",
    redoc_url=f"{API_PREFIX}/redoc",
    openapi_url=f"{API_PREFIX}/openapi.json",
)
api = APIRouter(prefix=API_PREFIX)


@api.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(api)
