import streamlit as st
import os
import json
import pickle
import numpy as np
import tensorflow as tf
import base64
from datetime import datetime
from PIL import Image
from tensorflow.keras.preprocessing.sequence import pad_sequences

# --- PAGE CONFIG ---
st.set_page_config(page_title="Sentinel | Safety-First Social", layout="wide", page_icon="🛡️")

# --- FILE SETUP ---
POST_FILE = "posts.json"
if not os.path.exists(POST_FILE):
    with open(POST_FILE, "w") as f:
        json.dump([], f)

# --- ENHANCED PROFESSIONAL STYLE ---
st.markdown("""
<style>
    /* Main Background and Font */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
    
    html, body, [class*="css"]  {
        font-family: 'Inter', sans-serif;
    }

    .stApp {
        background-color: #0d1117;
    }

    /* Professional Cards */
    .card {
        background-color: #161b22;
        border: 1px solid #30363d;
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 16px;
        transition: transform 0.2s ease;
    }

    /* Post Input Area */
    .stTextArea textarea {
        background-color: #0d1117 !important;
        border: 1px solid #30363d !important;
        color: #c9d1d9 !important;
        border-radius: 8px;
    }

    /* Buttons */
    .stButton>button {
        border-radius: 8px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    /* Sidebar/Right bar accent */
    .side-panel {
        background-color: #161b22;
        padding: 20px;
        border-radius: 12px;
        border: 1px solid #30363d;
    }

    /* Hide Streamlit elements for a cleaner look */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
</style>
""", unsafe_allow_html=True)

# --- SESSION & MODELS (Keep your existing logic) ---
if "authenticated" not in st.session_state:
    st.session_state.authenticated = False
if "username" not in st.session_state:
    st.session_state.username = None

@st.cache_resource
def load_models():
    try:
        nsfw = tf.keras.models.load_model("models/nsfw_model.keras")
        toxic = tf.keras.models.load_model("models/toxic_model.keras")
        with open("models/tokenizer.pkl", "rb") as f:
            tok = pickle.load(f)
        return nsfw, toxic, tok
    except:
        return None, None, None

nsfw_model, toxic_model, tokenizer = load_models()

# --- HELPER FUNCTIONS ---
def check_text(text):
    if not text.strip() or not toxic_model: return True
    seq = tokenizer.texts_to_sequences([text])
    pad = pad_sequences(seq, maxlen=200)
    pred = toxic_model.predict(pad)[0]
    return not any(p > 0.5 for p in pred)

def check_image(img):
    if not nsfw_model: return True
    img = img.convert('RGB').resize((224, 224))
    arr = np.array(img).astype(np.float32) / 255.0
    arr = np.expand_dims(arr, axis=0)
    pred = nsfw_model.predict(arr)[0]
    classes = ['drawings', 'hentai', 'neutral', 'porn', 'sexy']
    return classes[np.argmax(pred)] not in ['porn', 'hentai', 'sexy']

def load_posts():
    with open(POST_FILE, "r") as f:
        return json.load(f)

def save_posts(posts):
    with open(POST_FILE, "w") as f:
        json.dump(posts, f)

# --- PAGES ---
def login_page():
    _, col2, _ = st.columns([1, 1, 1])
    with col2:
        st.markdown("<div style='height: 100px;'></div>", unsafe_allow_html=True)
        st.markdown("<h1 style='text-align: center; color: #58a6ff;'>🛡️ Sentinel</h1>", unsafe_allow_html=True)
        with st.container(border=True):
            u = st.text_input("Username")
            p = st.text_input("Password", type="password")
            if st.button("Sign In", use_container_width=True, type="primary"):
                if u:
                    st.session_state.authenticated = True
                    st.session_state.username = u
                    st.rerun()

def feed_page():
    left, center, right = st.columns([0.8, 2, 0.8], gap="large")

    with left:
        st.markdown(f'''
            <div class="side-panel">
                <img src="https://i.pravatar.cc/150?u={st.session_state.username}" style="border-radius:50%; width:60px; border: 2px solid #58a6ff;">
                <h3 style="margin-top:15px; margin-bottom:0;">{st.session_state.username}</h3>
                <p style="color:#8b949e; font-size:0.85rem;">Verified User</p>
                <hr style="border-color:#30363d">
                <p style="font-size:0.9rem; color:#c9d1d9; cursor:pointer;">🏠 Home</p>
                <p style="font-size:0.9rem; color:#8b949e; cursor:pointer;">🔔 Notifications</p>
                <p style="font-size:0.9rem; color:#8b949e; cursor:pointer;">👤 Profile</p>
            </div>
        ''', unsafe_allow_html=True)

    with center:
        # --- PUBLISH AREA ---
        with st.container(border=True):
            st.markdown("<h4 style='margin-bottom:15px;'>Share an update</h4>", unsafe_allow_html=True)
            u_text = st.text_area("What's happening?", label_visibility="collapsed", placeholder="Share your thoughts...")
            u_img = st.file_uploader("Upload Media", type=["jpg","png"], label_visibility="collapsed")
            
            col_btn, _ = st.columns([1, 2])
            if col_btn.button("Post Now", type="primary", use_container_width=True):
                if check_text(u_text):
                    is_safe = True
                    img_base64 = ""
                    if u_img:
                        pil_img = Image.open(u_img)
                        if not check_image(pil_img):
                            is_safe = False
                        else:
                            u_img.seek(0)
                            img_base64 = base64.b64encode(u_img.read()).decode()
                    
                    if is_safe:
                        posts = load_posts()
                        posts.insert(0, {"author": st.session_state.username, "text": u_text, "image": img_base64, "time": datetime.now().strftime("%I:%M %p")})
                        save_posts(posts)
                        st.rerun()
                    else:
                        st.error("Safety Alert: Content violates guidelines.")
                else:
                    st.error("Safety Alert: Toxic language detected.")

        st.markdown("<br>", unsafe_allow_html=True)

        # --- FEED ---
        for p in load_posts():
            with st.container(border=True):
                header_col, time_col = st.columns([4, 1])
                header_col.markdown(f"**{p['author']}**")
                time_col.markdown(f"<p style='color:#8b949e; font-size:0.7rem; text-align:right;'>{p['time']}</p>", unsafe_allow_html=True)
                
                st.markdown(f"<p style='margin-top:10px;'>{p['text']}</p>", unsafe_allow_html=True)
                
                if p.get("image"):
                    st.image(base64.b64decode(p["image"]), use_container_width=True)

    with right:
        st.markdown('<div class="side-panel">', unsafe_allow_html=True)
        st.markdown("#### Trending Stories")
        st.image("https://picsum.photos/400/250", use_container_width=True)
        st.caption("AI Ethics in 2026: What's Next?")
        st.markdown("<hr style='border-color:#30363d'>", unsafe_allow_html=True)
        st.markdown("##### Suggested for you")
        st.markdown("<p style='font-size:0.8rem; color:#58a6ff;'>#Tech #Safety #Sentinel</p>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)

# --- ROUTING ---
if not st.session_state.authenticated:
    login_page()
else:
    feed_page()