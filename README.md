# Portfolio Website

A modern, responsive, and interactive personal portfolio website built with React, TypeScript, and Framer Motion. This project showcases my skills, experience, and projects with a clean, premium design aesthetic.

## 🚀 Key Features

- **Responsive Design**: A fully responsive layout that adapts seamlessly to Mobile, Tablet, and Desktop screens, featuring distinct layout strategies for optimal user experience on each device type.
- **Interactive UI**: Smooth animations and transitions powered by `Framer Motion`, including:
  - Dynamic page scrolling and navigation.
  - Interactive hover effects on cards and buttons.
  - Typewriter text effect in the Hero section.
  - Scroll-spy navigation that highlights the active section.
- **Modern Styling**:
  - **Glassmorphism**: subtle glass interactions in the left panel and navigation.
  - **Dark Mode Aesthetic**: A sleek, professional dark theme with vibrant accent colors.
  - **Custom Animations**: Tailored CSS and Framer Motion animations for unique visual appeal.
- **SOLID Architecture**: The codebase is refactored to follow SOLID principles, ensuring maintainability and scalability:
  - **Separation of Concerns**: Layout logic is split into dedicated `MobileLayout` and `DesktopLayout` components.
  - **Custom Hooks**: Logic like the typewriter effect is extracted into reusable hooks (`useTypewriter`).
  - **Component Modularity**: Sections are broken down into small, focused components.

## 🛠 Tech Stack

- **Framework**: [React](https://reactjs.org/) (v18)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Modular CSS)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```
src/
├── assets/          # Images and static assets
├── components/
│   ├── common/      # Reusable UI components (Carousel, ContactInput, etc.)
│   ├── layout/      # Layout components (Header, Footer, MobileLayout, DesktopLayout, Sidebars)
│   └── sections/    # Page sections (Hero, About, Experience, Portfolio, etc.)
├── data/            # Static data files (portfolioData.ts) - Single source of truth for content
├── hooks/           # Custom React hooks (useIsMobile, useScrollSpy, useTypewriter)
├── styles/          # CSS stylesheets for components
└── App.tsx          # Main application entry point
```

## ✨ Highlights

- **Mobile-First Approach**: The application detects device width and switches efficiently between a single-column mobile view and a three-pane desktop dashboard layout.
- **Performance Optimized**: Uses efficient hook-based logic for scroll tracking and resizing events.
- **Clean Code Practices**:
  - **DRY (Don't Repeat Yourself)**: Data is centralized in `src/data/`.
  - **Single Responsibility**: Components are focused on presentation, while logic is handled by hooks.

## 📦 Getting Started

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/portfolio-react.git
    cd portfolio-react
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Run the development server**

    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 🎨 Customization

- **Content**: Update `src/data/portfolioData.ts` to easily change your bio, experience, education, and projects without touching the UI code.
- **Styles**: Global variables for colors and fonts are defined in formatting files or can be adjusted in `App.css`.

---

Designed & Built by **Gangasai kumar**
