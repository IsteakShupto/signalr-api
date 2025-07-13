## SignalR & Infinite Scroll – Real-time Location & API Integration (Next.js)

### Quick View of the Web App

Check the live demo here 👉 [https://signalr-api.vercel.app/](https://signalr-api.vercel.app/)

---

### 🛠 Prerequisites

To run this project locally, you’ll need:

- **Node.js** – JavaScript runtime environment
- **npm** – Comes bundled with Node.js

Download Node.js from the official site: [https://nodejs.org/](https://nodejs.org/)
After installation, confirm versions:

```bash
node -v
npm -v
```

---

### ⚙️ Setup Instructions

1. Open your terminal and go to the directory where you want to place the project.
2. Clone the repo:

```bash
git clone https://github.com/IsteakShupto/signalr-api.git
```

3. Move into the project folder:

```bash
cd signalr-api
```

4. Install dependencies:

```bash
npm install
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

### Tasks Completed

#### Real-Time Location Sharing using SignalR

- **Framework:** Built with **Next.js** using **TypeScript** for type safety and code clarity.

- **WebSocket (SignalR) Integration:**
  Created a custom `useSignalR()` hook to manage connection, sending, and receiving data between clients in real-time.

- **Two UIs:**

  - **User A (Sender):** Simulates or sends GPS coordinates.
  - **User B (Receiver):** Listens and displays the updated coordinates on a **Leaflet.js** map.

- **SignalR Methods Implemented:**

  - `SendLatLon`: Sends current latitude and longitude.
  - `ReceiveLatLon`: Listens for updates and renders them on a map.

- **UI Feedback:**

  - Floating animation on live marker.
  - Smooth update transitions on the map.

---

#### Infinite Scroll User Feed

- **User Cards:**
  Designed a `<User />` component that renders user details like name, email, company title, and avatar image.

- **Pagination with Infinite Scrolling:**

  - Integrated **React Query’s `useInfiniteQuery()`** to fetch paginated users.
  - Used **Intersection Observer** to load the next page when the bottom is reached.

- **Skeleton Loading & Virtualization:**

  - Skeleton loaders displayed while new data is fetched.
  - Virtualized user list using `react-window` for better performance on large datasets.

- **Accessibility & Error Handling:**

  - Used semantic HTML, keyboard focusability, and `aria-*` attributes.
  - Handled API/network failures with an elegant fallback UI using `error.tsx` in root of app.

---

### Architecture & Best Practices

- **Component Structure:**
  Cleanly separated views and reusable components (`/components`, `/app`, `/hooks`).

- **Error Boundary:**
  Configured fallback UI using `react-error-boundary` to catch and handle crashes gracefully.

- **Animations:**
  Subtle bounce and hover effects added to improve user interaction.

- **Formatting & Linting:**
  Used `Prettier` and `ESLint` throughout development to maintain clean, consistent code.

---

### Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS, DaisyUI
- **WebSocket:** SignalR (via WebSocket transport)
- **Map Integration:** Leaflet.js
- **Data Fetching:** Tenstack Query (`useInfiniteQuery`)
- **Virtualization:** react-window
- **Error Boundary:** added error.tsx in root of app for fallback
- **Animations:** Tailwind utility classes + basic CSS transitions + DaisyUI
