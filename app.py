print("App started")

import pandas as pd

df = pd.read_csv("data/aadhaar_data.csv")

print("Data loaded successfully")
print(df.head())
print(df.columns)
print(df.shape)
