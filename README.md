# recipeAI

## Overview
An AI-powered recipe creator tailored to the Swiss market that draws from the real-time inventories (Sortiment) of major grocery retailers such as Migros, Coop, Lidl, and Aldi. Users receive personalized recipe suggestions based on their taste preferences and dietary requirements, while the app displays nutritional breakdowns (e.g., calories per meal) and pricing variations (including information on sales or promotions). The platform can monetize through a freemium model and potentially build collaborations with these retailers, offering them a channel for increased customer engagement and data insights.

## Key Value Propositions

### Personalized Recipe Generation
Use machine learning or rule-based algorithms to suggest recipes based on users' ingredient preferences, dietary restrictions, and historical cooking behaviors.

### Real-Time Product and Price Data
Integrate data from leading Swiss retailers to ensure that recipe suggestions are both current and budget-conscious. This can include dynamically updated product availability, pricing, and special offers.

### Nutritional and Economic Insights
The app calculates calories per meal and tracks price fluctuations, potentially helping users make healthier and more economical choices.

### Retailer Collaboration Opportunities
With permission or partnerships, retailers might directly feed promotions or exclusive offers into your platform, driving additional sales channels and enhancing the shopping experience.

### Monetization Strategy
Adopt a freemium model where basic access is free, and premium features (advanced meal planning, in-depth nutritional analytics, exclusive recipes, etc.) are available via subscription. Additionally, collaboration fees or affiliate links could generate further revenue when users click through to online shopping platforms.

## 🚀 MVP TO-DO LIST — SWISS AI RECIPE APP

### 🔹 PHASE 1: Project Setup
#### ✅ General
- Set up a GitHub repo with clear structure: /frontend, /backend, /scraper
- Configure your Ubuntu server:
  - Install Node.js, Nginx, PM2
  - Set up a reverse proxy for Angular and API endpoints
  - Configure firewall, SSL (Let's Encrypt)

#### ✅ Frontend (Angular + Tailwind)
- Initialize Angular project with TailwindCSS
- Create core pages/components:
  - Homepage / Dashboard
  - Recipe Suggestions Page
  - Preferences Setup (form for dietary filters, dislikes, etc.)
  - Basic Navbar and Routing

#### ✅ Backend (Express.js)
- Set up Express API boilerplate (REST endpoints)
- Integrate CORS & body-parser middleware
- Structure backend to serve:
  - /recipes – Return recipe suggestions
  - /products – Return scraped/integrated product data
  - /user/preferences – Save/load user prefs (use in-memory for now or Lite DB like lowdb)

### 🔹 PHASE 2: Web Scraping or Product Data Integration
#### 🛒 Retailer Data (Start with Migros or Coop)
- Choose one retailer to scrape (e.g. Migros)
- Identify structure of the product listing pages
- Build scraper using Node.js:
  - Use Cheerio or Puppeteer depending on how the site loads
  - Extract name, price, category, image, and promotion if available
  - Output JSON for backend to consume
- Store scraped data locally (JSON or simple in-memory cache)
- Set up cronjob or interval logic to auto-refresh data (every 24h or configurable)

### 🔹 PHASE 3: Recipe Engine (Simple MVP)
- Define format for recipes (title, steps, ingredients, calories, price est.)
- Build logic to match scraped products to ingredients (by keyword/category)
- Use rule-based logic to combine ingredients into simple recipes (or use GPT API for this)
- Calculate rough calorie count (use fixed lookup values or API like Edamam)
- Estimate total cost per recipe from product prices
- Return recipe JSON via /recipes API

### 🔹 PHASE 4: Frontend Integration
- Connect Angular frontend to Express backend using HttpClient
- Display:
  - User preference form
  - Recipe cards (image, calories, cost, ingredients)
  - List of matching products (optional)
- Implement basic loading states and error handling

### 🔹 PHASE 5: Testing, Deploy & MVP Polish
#### ✅ Backend
- Unit test core API endpoints
- Manual tests on scraper data validity

#### ✅ Frontend
- Mobile responsiveness check
- Smooth user flow from preferences → suggestions

#### ✅ Deployment
- Use PM2 to run backend and scraper on Ubuntu server
- Build Angular app and serve via Nginx
- Set up HTTPS with Let's Encrypt (Certbot)
- Add logging (basic console or Winston/Morgan for backend)

### 🧪 Optional Nice-to-Haves (Post-MVP)
- User authentication (JWT or cookie sessions)
- Persist preferences in DB (MongoDB or PostgreSQL)
- Real-time sales alert (for products on discount)
- Use GPT-4 or custom LLM to enhance recipe generation
- Partner APIs if any of the stores provide them
