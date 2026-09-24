from fastapi import FastAPI

app = FastAPI(title="where-to-live")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
