PRODUCT REQUIREMENTS DOCUMENT (PRD)

PROJECT NAME
Bhaskoro - Interactive Developer Portfolio

PROJECT TYPE
Personal Portfolio Website

PLATFORM
Web

FRAMEWORK
Next.js

LANGUAGE
JavaScript

STYLING
Tailwind CSS

ANIMATION
Motion / Framer Motion

DEPLOYMENT
Vercel


==================================================
1. PRODUCT OVERVIEW
==================================================

Bhaskoro - Interactive Developer Portfolio adalah website
portfolio personal untuk memperkenalkan identitas, skill,
pengalaman, dan project sebagai programmer.

Website menggunakan konsep futuristic, cinematic,
interactive, dan space-themed.

Fokus utama:

- Game Development
- Game Programming
- Web Development
- Next.js
- JavaScript
- React
- C#
- Unity

Website harus terlihat modern dan menarik, tetapi tetap
profesional dan mudah digunakan.


==================================================
2. PRODUCT GOAL
==================================================

Website harus mampu:

1. Memperkenalkan identitas developer.
2. Menampilkan skill.
3. Menampilkan project.
4. Menampilkan pengalaman.
5. Menampilkan teknologi yang sedang dipelajari.
6. Menyediakan contact information.
7. Menunjukkan kemampuan membuat interactive website.
8. Responsive pada desktop, tablet, dan mobile.


==================================================
3. TARGET USER
==================================================

Primary Users:

- Recruiter
- Game Studio
- Software Company
- Client
- Developer

Secondary Users:

- Mahasiswa
- Dosen
- Teman
- Komunitas programmer
- Pengunjung umum


==================================================
4. DESIGN CONCEPT
==================================================

Tema:

FUTURISTIC SPACE
+
GAME DEVELOPER
+
INTERACTIVE WEB

Visual:

- Dark background
- Space environment
- Stars
- Particles
- Glow effect
- Futuristic typography
- Blue / purple accent
- Smooth animation
- Parallax
- Interactive cursor
- Scroll-based animation

Animation tidak boleh mengganggu pembacaan konten.


==================================================
5. WEBSITE STRUCTURE
==================================================

Website terdiri dari:

1. Navbar
2. Hero / Home
3. About / Biodata
4. Skills
5. Projects
6. Experience
7. Currently Learning
8. Contact
9. Footer


==================================================
6. NAVBAR
==================================================

Menu:

HOME
ABOUT
SKILLS
PROJECTS
EXPERIENCE
CONTACT

Features:

- Sticky / fixed navbar
- Smooth scrolling
- Active section indicator
- Hover animation
- Responsive navigation

Desktop menggunakan navigation menu.

Mobile menggunakan hamburger menu.


==================================================
7. HERO SECTION
==================================================

Hero merupakan bagian pertama website.

Content:

Hi, I'm

BHASKORO PRAYOGA

Game Programmer & Developer

I build interactive experiences through code,
games and the web.

CTA:

VIEW PROJECTS
CONTACT ME

Hero tidak menggunakan foto sebagai background.

Gunakan interactive space environment.


==================================================
8. ROCKET ANIMATION
==================================================

Rocket merupakan visual element utama website.

Rocket bergerak berdasarkan scroll progress.

Contoh:

Hero
  |
  🚀
  |
About
  |
  🚀
  |
Skills
  |
  🚀
  |
Projects
  |
  🚀
  |
Experience
  |
  🚀
  |
Contact

Rocket memiliki:

- Vertical movement
- Rotation
- Glow
- Particle trail
- Smooth movement

Rocket harus tetap berfungsi pada mobile.


==================================================
9. ABOUT / BIODATA
==================================================

Foto hanya digunakan pada section About / Biodata.

Informasi:

Name:
Bhaskoro Prayoga

Role:
Game Programmer / Developer

Education:
Informatics Student

Focus:
Game Development & Web Development

About description menjelaskan:

- Ketertarikan terhadap programming.
- Game development.
- Web development.
- Teknologi yang sedang dipelajari.
- Tujuan karier.


==================================================
10. SKILLS
==================================================

FRONTEND:

- Next.js
- React
- JavaScript
- HTML
- CSS
- Tailwind CSS


GAME DEVELOPMENT:

- Unity
- C#
- Game Programming
- Gameplay Systems
- Animation Systems
- Input System


TOOLS:

- Git
- GitHub
- VS Code
- Blender
- Blockbench


Skill ditampilkan sebagai interactive cards.

Setiap card memiliki:

- Icon
- Skill name
- Description
- Hover animation
- Glow effect


==================================================
11. PROJECTS
==================================================

Project ditampilkan dalam interactive cards.

Setiap project memiliki:

- Project image
- Project title
- Description
- Category
- Technologies
- GitHub link
- Demo link jika tersedia

Category:

ALL
WEB
GAME
OTHER

User dapat memfilter project.

Ketika filter berubah, card menggunakan animation.


==================================================
12. PROJECT DETAIL
==================================================

Setiap project dapat memiliki halaman detail.

Route:

/projects/[slug]

Contoh:

/projects/farm-beware

Isi:

PROJECT NAME

DESCRIPTION

TECHNOLOGIES

MY ROLE

FEATURES

LINKS

Contoh:

Farm-Beware

Category:
Game Development

Technology:
Unity
C#

Role:
Game Programmer

Features:

- Player movement
- Inventory system
- Interaction system
- Bedroom system
- Kitchen system
- UI system


==================================================
13. EXPERIENCE
==================================================

Experience ditampilkan menggunakan timeline.

Contoh:

2026
|
|-- Game Programmer
|
|-- Web Development
|
|-- Informatics Student
|
2025

Timeline memiliki scroll animation.


==================================================
14. CURRENTLY LEARNING
==================================================

CURRENTLY LEARNING

01 - Next.js
Building modern web applications.

02 - Golang
Backend development.

03 - Unity
Gameplay programming.

04 - Game Systems
Inventory, interaction, UI, and gameplay systems.


==================================================
15. CONTACT
==================================================

Headline:

LET'S BUILD
SOMETHING
TOGETHER.

Contact:

- Email
- GitHub
- LinkedIn
- Instagram

CTA:

GET IN TOUCH


==================================================
16. FOOTER
==================================================

BHASKORO PRAYOGA

Game Programmer • Developer

© 2026 Bhaskoro Prayoga

Built with Next.js


==================================================
17. ANIMATION REQUIREMENTS
==================================================

Required:

- Page entrance animation
- Scroll reveal
- Parallax
- Hover animation
- Cursor interaction
- Rocket animation
- Project card animation
- Skill card animation
- Navbar transition
- Section transition

Animation harus smooth dan tidak berlebihan.


==================================================
18. CUSTOM CURSOR
==================================================

Desktop menggunakan custom cursor.

Normal:

Small glowing dot.

Hover interactive element:

Cursor menjadi lebih besar.

Hover project:

Cursor memberikan visual feedback.

Custom cursor dapat dinonaktifkan pada mobile.


==================================================
19. RESPONSIVE DESIGN
==================================================

Desktop:

1920x1080
1440x900
1366x768

Tablet:

1024x768
768x1024

Mobile:

430x932
390x844
375x812

Requirements:

- Tidak ada horizontal overflow.
- Typography responsive.
- Spacing responsive.
- Button touch-friendly.
- Hamburger menu.
- Animation optimized untuk mobile.


==================================================
20. PERFORMANCE
==================================================

Requirements:

- Optimized images.
- Lazy loading jika diperlukan.
- Code splitting.
- Minimal dependencies.
- Optimized animation.
- Particle dikurangi pada mobile.
- Hindari penggunaan 3D jika tidak diperlukan.

Target Lighthouse:

Performance: 90+
Accessibility: 90+
Best Practices: 90+
SEO: 90+


==================================================
21. ACCESSIBILITY
==================================================

Website harus memiliki:

- Semantic HTML
- Alt text
- Keyboard navigation
- Focus state
- Readable contrast
- Accessible buttons
- Accessible navigation

Support:

prefers-reduced-motion

Jika aktif:

- Kurangi animation.
- Kurangi parallax.
- Nonaktifkan cursor animation.
- Gunakan transition sederhana.


==================================================
22. SEO
==================================================

Title:

Bhaskoro Prayoga - Game Programmer & Developer

Description:

Portfolio of Bhaskoro Prayoga, a programmer focused on
game development, web development and interactive experiences.

SEO:

- Metadata
- Open Graph
- Favicon
- Sitemap
- Robots.txt
- Semantic HTML
- Proper heading structure


==================================================
23. TECHNICAL ARCHITECTURE
==================================================

Gunakan Next.js App Router dengan JavaScript.

Struktur:

src/
|
|-- app/
|   |-- layout.js
|   |-- page.js
|   |-- globals.css
|   |
|   |-- projects/
|       |-- [slug]/
|           |-- page.js
|
|-- components/
|   |-- Navbar.js
|   |-- Hero.js
|   |-- About.js
|   |-- Skills.js
|   |-- Projects.js
|   |-- Experience.js
|   |-- Contact.js
|   |-- Footer.js
|   |-- Rocket.js
|   |-- CustomCursor.js
|
|-- data/
|   |-- projects.js
|   |-- skills.js
|   |-- experience.js
|
|-- hooks/
|   |-- useMousePosition.js
|   |-- useScrollProgress.js
|
public/
|
|-- images/
|-- projects/
|-- models/


==================================================
24. DATA STRUCTURE
==================================================

Data project, skill, dan experience harus dipisahkan
dari component.

Contoh project:

{
  title: "Farm-Beware",
  description: "Game development project",
  category: "game",
  technologies: ["Unity", "C#"],
  image: "/projects/farm-beware.png",
  github: "",
  demo: "",
  slug: "farm-beware"
}

Penambahan project baru harus dapat dilakukan tanpa
mengubah component utama.


==================================================
25. FUNCTIONAL REQUIREMENTS
==================================================

FR-01
User dapat berpindah section melalui navbar.

FR-02
Website memiliki smooth scrolling.

FR-03
Hero memiliki interactive animation.

FR-04
Rocket mengikuti scroll progress.

FR-05
User dapat melihat biodata.

FR-06
User dapat melihat skills.

FR-07
User dapat memfilter project.

FR-08
User dapat membuka detail project.

FR-09
User dapat mengakses GitHub atau demo project.

FR-10
User dapat mengakses contact information.

FR-11
Website responsive.

FR-12
Website mendukung reduced motion.


==================================================
26. NON-FUNCTIONAL REQUIREMENTS
==================================================

Performance:

Website harus tetap smooth pada perangkat mobile
dan desktop.

Maintainability:

Data project, skill, dan experience dipisahkan dari UI.

Scalability:

Project baru dapat ditambahkan dengan mudah.

Accessibility:

Website dapat digunakan dengan keyboard.

Responsive:

Tidak boleh terdapat horizontal overflow.


==================================================
27. MVP
==================================================

Version 1:

[ ] Navbar
[ ] Hero
[ ] About
[ ] Skills
[ ] Projects
[ ] Experience
[ ] Currently Learning
[ ] Contact
[ ] Footer
[ ] Responsive design
[ ] Dark futuristic theme
[ ] Basic animation
[ ] Rocket scroll animation
[ ] Project filtering


==================================================
28. PHASE 2
==================================================

Setelah MVP selesai:

[ ] Advanced particle system
[ ] 3D environment
[ ] Interactive skill visualization
[ ] Advanced cursor
[ ] Project detail animation
[ ] Page transitions
[ ] Sound effects
[ ] Easter eggs
[ ] Interactive mini game


==================================================
29. DEVELOPMENT PRIORITY
==================================================

PRIORITY 1:

Website structure
Navbar
Hero
About
Skills
Projects
Contact
Responsive design


PRIORITY 2:

Animation
Rocket
Cursor
Project filtering
Project detail


PRIORITY 3:

Advanced interaction
3D
Particles
Sound
Easter eggs


==================================================
30. SUCCESS CRITERIA
==================================================

Portfolio dianggap berhasil apabila:

1. Pengunjung memahami identitas developer dalam
   waktu kurang dari 5 detik.

2. Project dapat ditemukan dengan mudah.

3. Contact information mudah ditemukan.

4. Website terlihat profesional.

5. Website berbeda dari portfolio developer biasa.

6. Animation smooth dan tidak mengganggu.

7. Website berjalan baik di desktop dan mobile.

8. Tidak terdapat horizontal overflow.

9. Project dapat ditambahkan dengan mudah.

10. Website memiliki performance yang baik.


==================================================
31. CORE CONCEPT
==================================================

"A cinematic futuristic portfolio where users travel
through an interactive digital space while discovering
the developer's identity, skills, projects, and experience."

Portfolio harus menggabungkan:

PROGRAMMING
+
GAME DEVELOPMENT
+
WEB DEVELOPMENT
+
INTERACTIVE EXPERIENCE

Website bukan hanya CV online.

Website harus menjadi demonstrasi kemampuan developer
dalam membuat interactive digital experience.


==================================================
32. IMPORTANT TECHNICAL RULE
==================================================

DO NOT USE TYPESCRIPT.

Use JavaScript only.

Use:

.js
.jsx

Do NOT use:

.ts
.tsx

The project must be implemented using JavaScript
with Next.js App Router.