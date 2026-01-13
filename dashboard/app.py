import streamlit as st
import pandas as pd
query_params = st.experimental_get_query_params()
if "page" in query_params:
    st.session_state.page = query_params["page"][0]
st.markdown("""
<style>
/* Background */
.stApp {
    background: linear-gradient(135deg, #5b3cc4, #b89cff);
}

/* All normal text */
h1, h2, h3, h4, h5, h6, p, span, label {
    color: #ffffff !important;
}

/* Streamlit buttons */
.stButton > button {
    background: #8f6bff;
    color: white;
    border-radius: 20px;
    padding: 10px 22px;
    border: none;
    font-weight: 600;
}

/* Button hover */
.stButton > button:hover {
    background: #a88cff;
    color: white;
}

/* Selectbox & inputs */
.stSelectbox div, .stTextInput div {
    background-color: rgba(255,255,255,0.15);
    color: white;
}

/* Metric text */
[data-testid="stMetricValue"] {
    color: #ffffff;
}
</style>
""", unsafe_allow_html=True)


# ---------- PAGE CONFIG ----------
st.set_page_config(page_title="AlertIndia", layout="wide")

# ---------- BACKGROUND FIX ----------
st.markdown("""
<style>
.stApp {
    background: linear-gradient(135deg, #5b3cc4, #b89cff);
}

h1, h2, h3, p {
    color: white;
}

.card {
    background: white;
    padding: 25px;
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    color: black;
}
</style>
""", unsafe_allow_html=True)

# ---------- NAVBAR ----------
colA, colB = st.columns([6,2])
with colA:
    st.markdown("## 🔔 AlertIndia")
with colB:
    if st.button("Get Started"):
        st.session_state.page = "dashboard"

# ---------- PAGE STATE ----------
if "page" not in st.session_state:
    st.session_state.page = "home"

# ================= HOME PAGE =================
if st.session_state.page == "home":

    col1, col2 = st.columns([1.2,1])

    with col1:
        st.markdown("## Monitor Aadhaar Updates in Real Time")
        st.write(
            "Get data‑driven insights and track Aadhaar activities across India instantly."
        )

        c1, c2 = st.columns(2)
        with c1:
            if st.button("View Dashboard"):
                st.session_state.page = "dashboard"
        with c2:
            if st.button("Live Alerts"):
                st.session_state.page = "alerts"

    with col2:
        st.markdown("📊 *(Dashboard Illustration Placeholder)*")

    st.markdown("---")

    c1, c2, c3 = st.columns(3)

    with c1:
        st.markdown("""
        <div class="card">
        <h3>📈 Interactive Graphs</h3>
        <p>Visualize trends with dynamic charts.</p>
        </div>
        """, unsafe_allow_html=True)

    with c2:
        st.markdown("""
        <div class="card">
        <h3>🤖 AI Chatbot Insights</h3>
        <p>Ask questions and get instant insights.</p>
        </div>
        """, unsafe_allow_html=True)

    with c3:
        st.markdown("""
        <div class="card">
        <h3>🚨 Real‑Time Alerts</h3>
        <p>Automatic red / yellow / green signals.</p>
        </div>
        """, unsafe_allow_html=True)

# ================= DASHBOARD PAGE =================
elif st.session_state.page == "dashboard":

    st.markdown("## 📊 Dashboard")

    df = pd.read_csv("data/aadhaar_data.csv")
    df["total"] = df["demo_age_5_17"] + df["demo_age_17_"]

    state = st.selectbox("Select State", sorted(df["state"].unique()))
    total = df[df["state"] == state]["total"].sum()

    st.metric("Total Aadhaar Updates", f"{total:,}")

    if st.button("⬅ Back to Home"):
        st.session_state.page = "home"

# ================= ALERTS PAGE =================
elif st.session_state.page == "alerts":

    st.markdown("## 🚨 Alerts")

    st.error("🔴 Bihar – Update rate dropped by 28%")
    st.warning("🟡 MP – Slight decline detected")
    st.success("🟢 Gujarat – Stable performance")

    if st.button("⬅ Back to Home"):
        st.session_state.page = "home"
