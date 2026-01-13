print("App started")

import pandas as pd
import matplotlib.pyplot as plt

# Load data
df = pd.read_csv("data/aadhaar_data.csv")
print("Data loaded successfully")

# ---- DATA UNDERSTANDING ----
# Total Aadhaar updates = sum of both age groups
df["total_updates"] = df["demo_age_5_17"] + df["demo_age_17_"]

# Group by state
state_totals = df.groupby("state")["total_updates"].sum()

# Top 5 states
top_states = state_totals.sort_values(ascending=False).head(5)

print("Top 5 states:")
print(top_states)

# ---- GRAPH ----
plt.figure(figsize=(8,5))
top_states.plot(kind="bar", color="skyblue")

plt.title("Top 5 States by Aadhaar Updates")
plt.xlabel("State")
plt.ylabel("Total Aadhaar Updates")

plt.tight_layout()
plt.show()

