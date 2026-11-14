# All Care Dental — Client Requirements and Website Specification

**Document status:** Requirements draft for client review  
**Purpose:** Define what the client needs and what the project is intended to become before any further design or development work.  
**Last updated:** 8 November 2026

> This document records the current understanding of the project. Items marked **To be confirmed** are not approved facts and must not be published as if they are true.

## 1. Project Summary

All Care Dental needs a premium, patient-friendly website that introduces the clinic, explains the kinds of care it offers, builds trust, and makes it easy for a prospective patient to contact or visit the clinic.

The intended first release is a focused, responsive website rather than a patient-management product. Its role is to present the clinic clearly and guide visitors toward a phone call, WhatsApp conversation, directions, or an appointment enquiry. It is not intended to diagnose patients, provide clinical advice, or replace direct communication with the clinic.

## 2. Business Objectives

The website should:

1. Establish a credible and premium online presence for All Care Dental.
2. Help new and existing patients quickly understand the clinic and its services.
3. Make the clinic's contact details, location, and visiting hours easy to find.
4. Encourage appropriate enquiries and appointment requests.
5. Direct urgent dental cases to call the clinic rather than rely on an online form.
6. Present the clinic's doctors, experience, and facilities using only client-approved information.
7. Work especially well on mobile phones, where many patients are likely to discover and contact the clinic.

## 3. Primary Audience

The primary users are:

- Prospective patients researching a dental clinic.
- Existing patients looking for contact details, opening hours, or directions.
- Parents or family members looking for dental care for someone else.
- Patients with an urgent dental concern who need the correct phone contact.

The site should assume that some visitors may be anxious, in discomfort, or unfamiliar with dental terminology. Language should therefore be calm, clear, reassuring, and easy to scan.

## 4. Proposed Website

The current scope is a polished, responsive, primarily one-page clinic website with clear navigation between sections.

### Proposed page structure

1. **Header and navigation** — clinic identity and quick access to the main sections.
2. **Hero / introduction** — a memorable introduction to All Care Dental and its approach to care.
3. **About / approach** — what the clinic stands for and what patients can expect.
4. **Treatments / services** — an approved overview of the care available.
5. **Why choose All Care Dental** — verified differentiators, experience, facilities, or care philosophy.
6. **Doctors / team** — approved names, qualifications, roles, biographies, and photographs.
7. **Appointment or enquiry action** — the agreed method for requesting an appointment or contacting the clinic.
8. **Emergency notice** — clear instruction to call the clinic directly for urgent dental care.
9. **Visit and contact information** — phone, WhatsApp, address, hours, and map link.
10. **Footer** — clinic identity, essential links, legal/copyright information, and any required asset credits.

The final structure may be simplified after the new creative direction is approved, but all essential patient information must remain easy to access.

## 5. Functional Requirements

### 5.1 Navigation

- Navigation must take users directly to the relevant page section.
- The most important actions—contacting the clinic and finding its location—must be prominent.
- A user must not need to watch or complete an animation before accessing essential information.

### 5.2 Contact actions

- The phone action must open the device's calling interface using the approved clinic number.
- The WhatsApp action must open a conversation with the approved WhatsApp number, if the clinic wants WhatsApp enquiries.
- The directions action must open the client-approved map location.
- Contact actions must not be shown with placeholder or unverified details on a live site.

### 5.3 Appointment enquiries

The original scope described a visual appointment-request form, while the latest website direction states that there is no appointment system. This is an unresolved scope decision.

If the client approves an appointment-request form for the first release:

- Submitting it represents a **request**, not a confirmed booking.
- The interface must clearly say that clinic staff or the doctor will confirm the appointment manually.
- Patients must not be promised a time slot automatically.
- Emergency patients must be directed to call instead of using the form.
- A static form without a delivery method must not be presented as functional.
- The final fields, submission destination, consent text, and data-retention process must be approved before implementation.

If the form is not approved for the first release, the site will use direct call and/or WhatsApp actions instead.

### 5.4 Consultation windows

Meeting notes currently record the following consultation windows:

- 10:00 AM to 12:30 PM
- 5:00 PM to 7:30 PM
- 30-minute appointment windows
- Approximately 3–4 patients may be accommodated per window

These details are **to be confirmed by the client**. They must not be treated as final booking availability or published scheduling rules until approved.

### 5.5 Emergency communication

- The website must state that dental emergencies should be handled by calling the clinic directly.
- The emergency phone number and the clinic's ability to handle emergencies must be confirmed before launch.
- The website must not imply 24-hour emergency availability unless the client explicitly confirms it.

### 5.6 Location and hours

- Display the full approved address.
- Provide a client-approved Google Maps or equivalent directions link.
- Display confirmed opening days and hours.
- If consultation hours differ from general opening hours, label both clearly.

## 6. Content Requirements

All patient-facing claims must come from, or be explicitly approved by, the client.

### Content required from the client

- Official clinic name and preferred spelling.
- Approved tagline or positioning statement.
- Primary phone number and any separate emergency number.
- WhatsApp number and whether it is monitored for appointments.
- Full address and approved map link.
- Opening days, clinic hours, and consultation hours.
- Complete, approved treatment/service list.
- Doctor names, roles, qualifications, registrations where appropriate, and short biographies.
- Approved doctor portraits and clinic photographs.
- Official logo files and brand guidelines, if available.
- Clinic history, including approval of any “Since 1969” heritage claim shown in the supplied branding.
- Verified reasons to choose the clinic, such as experience, technology, accessibility, or specialisations.
- Approved social-media links.
- Preferred website language or languages.
- Privacy policy and any required consent wording if personal information will be collected.

### Content standards

- Do not invent testimonials, awards, qualifications, treatment outcomes, patient counts, or credibility claims.
- Do not publish placeholder doctor profiles, contact details, or services.
- Avoid guaranteed outcomes or medically misleading language.
- Treatment descriptions should be understandable to a general audience and reviewed by the clinic.
- Photography must have permission for website use; patient images require appropriate consent.

## 7. Brand and Creative Direction

### Current known direction

- Premium, warm, editorial, and reassuring rather than cold or overly clinical.
- Existing palette: ivory/white, walnut or deep brown, burgundy, gold, and black.
- Blue and green have previously been excluded from the visual direction.
- The supplied All Care Dental logo should be treated as the official brand reference until the client provides a higher-quality master file.
- Dental imagery should feel refined and relevant, without using graphic or distressing clinical imagery.
- The experience may use a tooth-focused visual motif, but the visual concept must not obstruct content or contact actions.

### Direction-change note

The project is undergoing a broader direction change. The exact new visual concept, tone, reference sites, and treatment of the existing 3D tooth experience have not yet been documented as client-approved requirements. Those decisions must be captured and approved before the next design or development phase.

## 8. User Experience Requirements

- Design mobile-first and support common mobile, tablet, laptop, and desktop sizes.
- Keep essential information readable and reachable with normal scrolling.
- Use plain language and clear calls to action.
- Maintain strong colour contrast and visible keyboard focus states.
- Provide text alternatives for meaningful images.
- Respect reduced-motion preferences.
- Do not trap, hijack, or block native scrolling.
- Motion or 3D content must have a graceful fallback and must not be required to use the site.
- Avoid horizontal overflow and interactions that depend only on hover.
- Keep phone, WhatsApp, directions, and emergency actions easy to tap.

## 9. Technical and Quality Requirements

The agreed implementation foundation is Next.js with TypeScript. The precise styling approach can be selected during implementation after the new direction is approved.

The released website should:

- Be responsive across current major browsers and common device sizes.
- Load efficiently on typical mobile connections.
- Keep large imagery, 3D assets, and animations optimised and optional where necessary.
- Preserve usable content if JavaScript, WebGL, or an enhanced visual effect fails.
- Include appropriate page title, description, social-sharing metadata, and search indexing settings at launch.
- Use semantic page structure and accessible controls.
- Avoid browser console errors and broken links.
- Use only assets with documented ownership, permission, or licence attribution.
- Keep draft versions non-indexed and unpublished until client approval.

## 10. First-Release Scope

Subject to client confirmation, the first release includes:

- A polished responsive clinic website.
- Clinic introduction and approved service information.
- Approved doctor/team information.
- Phone, optional WhatsApp, address, map, and hours.
- Emergency call guidance.
- An appointment enquiry method chosen by the client.
- Basic accessibility, performance, metadata, and browser checks.

## 11. Explicitly Out of Scope for the First Release

Unless separately approved and estimated, the first release does not include:

- Real-time appointment availability or automatic booking confirmation.
- A patient, doctor, receptionist, or administrator dashboard.
- Patient accounts or authentication.
- A patient database or electronic health records.
- Storage of prescriptions, X-rays, treatment history, or other medical records.
- Automated WhatsApp/SMS/email reminders.
- Online payments or billing.
- Digital prescriptions.
- Teleconsultation or medical diagnosis through the website.
- Follow-up automation.
- A custom content-management system.
- Public deployment before content and launch approval.

## 12. Privacy, Safety, and Compliance Considerations

- Collect the minimum personal information necessary.
- Do not request clinical records or highly sensitive health information through an ordinary contact form.
- Explain how an enquiry will be used and who will respond.
- Obtain consent where required before storing or contacting a user from submitted information.
- Protect any submitted data in transit and at rest if a functional form is added.
- Define who can access enquiries and how long they are retained.
- Have the client review medical claims, qualifications, privacy wording, and local regulatory requirements before launch.

This document identifies product requirements and is not legal or medical-compliance advice.

## 13. Acceptance Criteria for the First Release

The website is ready for launch only when:

- The client has approved the visual direction and final page content.
- Clinic name, phone, WhatsApp, address, map, and hours have been verified.
- The service list and all doctor details have been approved.
- All primary contact actions work with the correct destinations.
- Appointment wording accurately reflects whether the action is an enquiry or a confirmed booking.
- Emergency guidance is clear and uses the approved number.
- No placeholder or invented claims remain.
- The site is usable on mobile and desktop without horizontal overflow.
- Core content is accessible when enhanced animation or 3D content is unavailable.
- Required asset licences and credits are documented.
- Draft-only search blocking is replaced with the correct production indexing configuration.
- The client has completed a final content and launch review.

## 14. Decisions Required Before Design or Development Resumes

1. What is the new overall direction, and which reference sites or visual examples best represent it?
2. Is the website still intended to be a one-page experience?
3. Should the existing 3D tooth concept be retained, simplified, or removed?
4. Is the main conversion action a phone call, WhatsApp message, appointment-request form, or a combination?
5. If there is a form, where should enquiries be delivered and who will respond?
6. What is the final approved service list?
7. What clinic, doctor, and team content is available?
8. Are the recorded hours and appointment-window rules correct?
9. What languages are required for launch?
10. Are there approved testimonials, credentials, registrations, or other trust signals?
11. Is a higher-resolution or vector version of the logo available?
12. What domain, hosting, analytics, and launch date are planned?

## 15. Current Project Understanding in One Sentence

We are defining a premium, mobile-first informational website for All Care Dental that introduces the clinic, presents verified care and team information, and makes direct patient contact simple, while postponing any full booking, patient-account, payment, or medical-record system until separately approved.
