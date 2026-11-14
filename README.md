# All Care Dental Centre Phase One

This is the Phase One public-facing website for All Care Dental Centre. It is a responsive, editorial clinic introduction built with Next.js App Router, React, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Drei, GSAP, Zod, Vitest, React Testing Library, and Playwright.

## Local setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The verified Phase One phone action is `tel:+919844069010`.

Production-style verification:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

`NEXT_PUBLIC_SITE_URL` controls canonical metadata and the sitemap. Keep `NEXT_PUBLIC_INDEXING_APPROVED=false` for local, draft, and preview deployments. Set it to `true` only after final client launch approval.

## Architecture

- `src/app/page.tsx` composes the page in the approved order.
- `src/content` contains typed, approved clinic facts, services, and intentionally empty optional collections.
- `src/lib/content-validation.ts` fails unsafe content combinations and keeps optional features closed.
- `src/components/sections` owns semantic page regions.
- `src/components/ui` owns reusable controls and cards.
- `src/components/three` owns the lazy WebGL tooth and static fallback.
- `src/components/motion` owns GSAP hero scroll motion and restrained section reveals.
- `public/models/third_molar.glb` is the production copy of the source supplied at the project root. `public/models/tooth.glb` is a separate legacy/optimised asset and is not loaded by the opening.

## Content and approval status

Confirmed and rendered:

- All Care Dental Centre
- Primary clinic contact: Dr. Venkatesh M J
- Phone: +91 9844069010
- The nine approved treatment categories and supplied descriptions
- The supplied emergency guidance and phone-based appointment enquiry wording

Intentionally hidden until approved:

- Address, map, email, opening hours, consultation hours, and WhatsApp
- Doctor qualifications, biographies, specialties, registrations, or portraits
- Reviews, testimonials, awards, patient counts, rankings, and outcome claims
- The `Since 1969` heritage line
- Appointment forms, availability, automatic confirmation, privacy text, and social links

The SVG wordmarks in `public/brand` are documented temporary text-based brand treatments. Replace them with the approved SVG logo before production launch.

## Tooth asset notes

The supplied `third_molar.glb` is a Sketchfab export with CC-BY-4.0 metadata, one mesh, one material, no animation or camera, and three embedded textures. Its source size is 5,861,616 bytes. The byte-identical production copy is kept at `public/models/third_molar.glb`; the scene normalises and centres its bounds while preserving the supplied base-colour, metallic/roughness, occlusion, normal and clearcoat material data. `public/images/3d/tooth-fallback.webp` is used only when WebGL is unavailable or reduced motion is requested; model render failures are exposed instead of being concealed behind the poster.

The original source asset attribution in the GLB metadata is Pixel Swan / Sketchfab, licensed CC-BY-4.0. Confirm asset permission and attribution requirements before launch.

## Safe next changes

When client approvals arrive, update the typed files under `src/content`, add only approved imagery to the appropriate `public/images` folder, replace the temporary logo variants, and add any future enquiry workflow behind `AppointmentSection`. Do not add booking, patient records, payments, authentication, or other Phase Two features to this release.
