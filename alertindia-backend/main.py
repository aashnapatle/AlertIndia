from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

# Allow React to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load CSV
df = pd.read_csv("aadhaar_data.csv")

@app.get("/")
def root():
    return {"message": "AlertIndia Backend is running"}

@app.get("/preview")
def preview():
    records = df.head(10).to_dict(orient="records")
    enhanced = []

    for r in records:
        val = r.get("demo_age_5_17", 0)

        if val < 20:
            status = "critical"
        elif val < 50:
            status = "warning"
        else:
            status = "stable"

        r["status"] = status
        enhanced.append(r)

    return enhanced

@app.get("/states")
def states_summary():
    summary = df.groupby("state")["demo_age_5_17"].sum().reset_index()
    return summary.to_dict(orient="records")


@app.get("/alerts")
def generate_alerts():
    alerts = []
    state_groups = df.groupby("state")

    for state, data in state_groups:
        if len(data) < 2:
            continue

        last = data.iloc[-1]["demo_age_5_17"]
        prev = data.iloc[-2]["demo_age_5_17"]

        if prev == 0:
            continue

        change = ((last - prev) / prev) * 100

        if change < -10:
            status = "critical"
        elif change < -5:
            status = "warning"
        else:
            status = "stable"

        alerts.append({
            "state": state,
            "change": round(change, 2),
            "status": status
        })

    return alerts
@app.get("/stats")
def get_stats():
    critical = 0
    warning = 0
    stable = 0

    for _, r in df.iterrows():
        val = r.get("demo_age_5_17", 0)

        if val < 20:
            critical += 1
        elif val < 50:
            warning += 1
        else:
            stable += 1

    total = critical + warning + stable

    return {
        "total": total,
        "critical": critical,
        "warning": warning,
        "stable": stable
    }
