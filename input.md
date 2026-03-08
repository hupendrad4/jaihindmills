Build a complete, modern ecommerce web application for selling Indian sarees, inspired by the features and content of https://jaihindmill.com.
The site should match the look, functionality, and structure of Jaihind Mill, but leverage advanced technologies and design best practices for maximum usability, responsiveness, performance, and SEO.
Use the attached design images and page mockups as strict reference for UI/UX—mimic layouts, motifs, colors, and content flow.
Core Business & Visual Guide

    Primary business is saree sales; emphasize Indian culture (paisley, mandala, sari border motifs, rich magenta, gold, peacock blue)
    Responsive design for mobile, tablet, desktop, large screens
    Integrate logo and branding as in reference designs

Tech Stack

    Backend: Node.js (latest LTS) + Convex database (https://www.convex.dev/)
    Frontend: Vue.js 3 (Composition API preferred), Nuxt 3 for SSR/SEO and static generation
    UI/UX: Tailwind CSS, Tailwind UI, DaisyUI/Headless UI, cultural patterns, and modern card layouts
    Animations: Use Vue transitions and Tailwind Motion for smooth, delightful effects
    Auth: Clerk (https://clerk.dev/) for authentication, social login, and user profiles
    Images/CDN: Optimize all images, lazy load, responsive formats (WebP/AVIF). Store on Cloudinary or Vercel Images
    Payments: Integrate Stripe, Razorpay, UPI as needed
    SEO: SSR, schema markup, meta management, rich snippets, Nuxt meta module
    PWA: Make the app installable/offline-ready
    Accessibility: WCAG/ARIA compliance for Indian and global audience
    Other: Error logging (Sentry), analytics, push notifications, live chat (optional)

Features

    Home Page: Hero banner, featured sarees, trending collections, categories, newsletter
    Shop/Categories: Grid display, sidebar filters (by color/fabric/price), sorting, quick-add to cart
    Product Detail: Image slider/zoom, add-to-cart/wishlist, cultural/fabric origin info, related products
    Cart/Checkout: Preview, modify, coupon codes, streamlined checkout
    Wishlist: Save, compare, quick actions
    Auth: Register/Login with Clerk, elegant theme
    Account/Profile: Order history, address, payment, user details
    Order Tracking: Timeline, progress steps, icons
    About Us: Brand story, founder bios, mission, team photos
    Contact Us: Form, locations, map, traditional footer
    Smart search: Instant suggestions, top keywords
    Blog/Stories: Optional for culture, SEO, and content marketing
    Indian language support (future-proof with Nuxt i18n)
    Personalization: Recommended products, trending sarees

Implementation Instructions

    Use the attached design images as direct UI blueprint.
    Mimic the structure, cultural detail, and conversion-focused layout from Jaihind Mill website.
    Build modular components and pages as outlined above.
    Ensure pixel-perfect, responsive adaptation of all desktop, tablet, and mobile views.
    Apply SEO and performance best practices: SSR, static-site generation, optimized code splitting, lazy loading.
    Use Clerk for user auth and Convex for database; integrate Stripe/Razorpay for payments.
    Apply Indian cultural motifs in banners, footers, backgrounds, and CTA sections.
    Make all navigation, filters, animations, and transitions smooth and visually appealing.
    Test across all devices for accessibility and usability.
    Document all endpoints, core data structures, and UI components.

You are to build this web application as an exact implementation of the designs and requirements above, using the latest technology stack and best practices for performance, SEO, accessibility, and Indian ecommerce culture.