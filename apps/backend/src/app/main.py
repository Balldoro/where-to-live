from fastapi import FastAPI

app = FastAPI(title="where-to-live")


@app.get("/health")
def health():
    return {"status": "ok"}
