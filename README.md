# KamiHobbies

A portfolio website showcasing hardware, software, and 3D modeling projects by Kevin Kaminski.

🔗 **Live Site:** [kamihobbies.com](https://kamihobbies.com)

## About

KamiHobbies is a technical portfolio showcasing a diverse range of engineering projects spanning embedded systems, software development, and 3D CAD design. The site features detailed technical writeups, interactive diagrams, and comprehensive documentation for each project.

## Featured Projects

### Hardware
- **LED Controller** - Custom automotive digital dash using STM32G031F6P6 microcontrollers with distributed architecture for precise LED control
- **LED Light Guide** - Optical diffusion system for addressable RGB LEDs

### Software
- **Irrational Art** - Interactive canvas-based visualization mapping irrational number digits (π, e, φ, √2) to geometric paths with cursor-anchored pan/zoom
- **Teensy Home Theater Control** - Unified home theater controller using Teensy 4.1, bridging RS-232, OSC, and HTTPS protocols
- **Remote Focus/Iris Controller** - Closed-loop motor control system for cinema lenses using Maxon motors and PID control

### 3D Modeling
- Custom mechanical designs and modifications
- Functional parts for embedded systems projects
- Aerospace and automotive applications

## Tech Stack

### Core
- **Next.js 14.2** - React framework with static export
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library with Synthwave theme

### Features
- **Mermaid.js** - Interactive technical diagrams with custom theming
- **React Syntax Highlighter** - Code blocks with syntax highlighting
- **Responsive Design** - Mobile-first approach with TailwindCSS
- **Static Export** - Optimized for CloudFlare Pages deployment

## Development

### Prerequisites
- Node.js 18.18.0 or higher
- npm 10.7.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/KaminKevCrew/KamiHobbies.git
cd KamiHobbies

# Install dependencies
npm install
```

### Development Server

```bash
# Start the development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Serve the static export locally
npx serve@latest out
```

### Project Structure

```
KamiHobbies/
├── src/
│   ├── app/
│   │   ├── _components/      # Reusable React components
│   │   ├── hardware/          # Hardware project pages
│   │   ├── software/          # Software project pages
│   │   ├── 3dModeling/        # 3D modeling project pages
│   │   └── layout.tsx         # Root layout with metadata
│   ├── styles/
│   │   └── globals.css        # Global styles and Tailwind imports
│   └── env.js                 # Environment configuration
├── public/                    # Static assets (images, favicons, STL files)
├── out/                       # Static export output (generated)
└── next.config.js             # Next.js configuration
```

## Key Features

### Interactive Diagrams
Technical documentation includes interactive Mermaid diagrams with:
- Custom dark theme matching site aesthetics
- Rounded corners on all shapes
- Color-coded system architecture diagrams
- Flowcharts for technical processes

### Syntax Highlighting
Code blocks feature:
- Language-specific highlighting
- Line numbers (optional)
- Support for multiple programming languages
- Clean, readable formatting

### Static Export
The site uses Next.js static export for:
- Fast page loads
- CDN-friendly deployment
- No server-side dependencies
- CloudFlare Pages optimization

## Deployment

This site is deployed to CloudFlare Pages with automatic builds from the main branch.

### CloudFlare Pages Configuration
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Node version:** 18.18.0+

## License

This project is created and maintained by Kevin Kaminski. All project content and documentation are original work unless otherwise noted.

## Contact

- **GitHub:** [KaminKevCrew](https://github.com/KaminKevCrew)
- **LinkedIn:** [Kevin Kaminski](https://www.linkedin.com/in/kevin-kaminski/)

---

Built with Next.js • Styled with TailwindCSS & DaisyUI • Deployed on CloudFlare Pages