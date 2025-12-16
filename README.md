
# 📊 LeetMetric

LeetMetric is a web-based dashboard that visualizes **LeetCode user statistics** in a clean, interactive, and shareable format.  
It allows users to **track progress, compare profiles, and analyze performance** using real-time data fetched from LeetCode.

---

## 🚀 Features

### 🔍 Single User Analysis
- View solved problems by difficulty:
  - Easy
  - Medium
  - Hard
- Animated circular progress indicators
- Total solved problems
- Acceptance rate with progress bar
- Submission statistics (Easy / Medium / Hard / Overall)

---

### ⚔️ Compare Two Users
- Compare **two LeetCode usernames**
- Difficulty-wise comparison (Easy / Medium / Hard)
- Total solved comparison
- Winner highlighting using color indicators

---

### 🌗 Dark / Light Mode
- Toggle between dark and light themes
- Theme preference saved using `localStorage`

---

### 🎨 Modern UI
- Responsive layout
- Smooth animations
- Clean card-based design

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)**
- **LeetCode GraphQL API**
- **Fetch API**
- **LocalStorage**

---

## 📂 Project Structure

```text
LeetMetric/
│
├── index.html
├── style.css
├── app.js
└── README.md
---
⚙️ How It Works
 1.User enters a LeetCode username
 2.App sends a GraphQL request to LeetCode
 3.Stats are fetched and displayed with animations
 4.Compare feature fetches stats for two users and highlights differences

---

▶️ How to Run Locally
 1.Clone the repository
   git clone https://github.com/<your-username>/LeetMetric.git
 2.Open the project folder
   cd LeetMetric
 3.Open index.html in your browser
   (No backend or server required)
---

🧠 Learning Outcomes
 1.Working with GraphQL APIs
 2.Handling async JavaScript with fetch
 3.DOM manipulation and animations
 4.UI/UX improvements using CSS
 4.Local storage usage
 5.Real-world data visualization

---

📌 Future Improvements
 -Share progress as an image
 -Search history (last 5 users)
 -Acceptance rate comparison
 -Deploy live on GitHub Pages
 -Convert to React

---

👨‍💻 Author
Sujit Yadav
Computer Science Minor
Interested in Full Stack Development & DSA
Built as a personal learning & portfolio project


