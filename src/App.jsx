// ─────────────────────────────────────────────────────────────
//  App.jsx — Root shell with state-based routing & transitions
//
//  No external router needed for a static site this size.
//  We use a `page` state atom + AnimatePresence for seamless
//  transitions. Swap for React Router / Next.js as needed —
//  the PageTransition component works with either.
// ─────────────────────────────────────────────────────────────

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Layout
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'

// Home page sections
import Hero           from './components/Hero'
import StatsStrip     from './components/StatsStrip'
import BentoGrid      from './components/BentoGrid'
import CaseStudiesSlider from './components/CaseStudiesSlider'
import InquirySection from './components/InquirySection'

// Inner page template
import InnerPageTemplate from './components/InnerPageTemplate'

// ─── Page definitions ─────────────────────────────────────────
// Each page is a function component — lazy-evaluating to keep
// the bundle clean when we add more pages.

function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <BentoGrid />
      <CaseStudiesSlider />
      <InquirySection />
    </>
  )
}

function ServicesPage() {
  return (
    <InnerPageTemplate
      breadcrumb={[
        { label: 'Home', href: '#' },
        { label: 'Services' },
      ]}
      eyebrow="Capabilities"
      title={
        <>
          Engineering Services
          <br />
          <span className="text-gradient-cyan">Built to Scale.</span>
        </>
      }
      subtitle="From embedded firmware to distributed cloud systems — we cover the full technology stack with the rigor global enterprises demand."
      kpis={[
        { value: '500+', label: 'Products shipped globally' },
        { value: '25+',  label: 'Years of engineering depth' },
        { value: '4K+',  label: 'Engineers across 8 countries' },
        { value: '98%',  label: 'Client retention rate' },
      ]}
      introHeading="One partner across the full product lifecycle."
      introBody="Most companies end up stitching together 4–6 specialist vendors across their tech stack — a design shop, a cloud partner, a QA firm, a security consultant. NexCore eliminates that. We architect, build, test, deploy, and optimize end-to-end. One team. One escalation path. One accountable partner."
    />
  )
}

function IndustriesPage() {
  return (
    <InnerPageTemplate
      breadcrumb={[
        { label: 'Home', href: '#' },
        { label: 'Industries' },
      ]}
      eyebrow="Vertical Expertise"
      title={
        <>
          Deep Domain
          <br />
          <span className="text-gradient-cyan">Knowledge.</span>
        </>
      }
      subtitle="We don't generalize. Each practice has dedicated architects who've shipped within that regulatory context, understood the chipset constraints, and met the market timelines."
      kpis={[
        { value: '6',    label: 'Focused industry verticals' },
        { value: '40+',  label: 'Automotive programs delivered' },
        { value: '20+',  label: 'Regulated-industry deployments' },
        { value: '100%', label: 'Compliance record (ISO/IEC)' },
      ]}
      introHeading="Domain architects, not generalists."
      introBody="A senior cloud architect who has never touched automotive safety software doesn't belong on an ADAS program. Every NexCore industry practice is staffed with engineers who've built production systems in that vertical — including navigating its regulatory frameworks, toolchain constraints, and certification processes."
      features={[
        {
          eyebrow: 'Automotive & Mobility',
          title: 'Functional Safety From Day One',
          body: 'ISO 26262, AUTOSAR, ASPICE, and SOTIF are not afterthoughts in our process — they are design constraints that shape architecture from the first whiteboard session. We have delivered ASIL-D certified systems at volume.',
          bullets: [
            'ISO 26262 ASIL-A through ASIL-D certified delivery',
            'AUTOSAR Classic & Adaptive BSW configuration',
            'HIL/SIL/MIL test lab integrations for CI pipelines',
          ],
          cta: { label: 'See automotive case studies', href: '#case-studies' },
        },
        {
          eyebrow: 'Semiconductor',
          title: 'Silicon to Software in One Team',
          body: 'Our semiconductor practice spans from RTL verification support and EDA toolchain integration to yield analytics ML pipelines and chip-specific SDK development. We speak foundry.',
          bullets: [
            'EDA workflow automation (Synopsys, Cadence, Mentor)',
            'Yield intelligence ML systems at 5nm–28nm nodes',
            'Firmware and SDK development for custom silicon',
          ],
          cta: { label: 'See semiconductor work', href: '#case-studies' },
        },
        {
          eyebrow: 'Healthcare & Medical',
          title: 'FDA-Ready Engineering, Not Retrofitted',
          body: "IEC 62304, 21 CFR Part 11, and HIPAA are embedded into our SDLC for medical programs. We've taken three Class II devices from prototype to 510(k) clearance without audit findings.",
          bullets: [
            'IEC 62304 compliant SDLC documentation',
            '510(k) and CE Mark technical file preparation',
            'HIPAA-compliant cloud architecture with audit trails',
          ],
          cta: { label: 'See healthcare programs', href: '#case-studies' },
        },
      ]}
    />
  )
}

function CaseStudiesPage() {
  return (
    <InnerPageTemplate
      breadcrumb={[
        { label: 'Home', href: '#' },
        { label: 'Case Studies' },
      ]}
      eyebrow="Proof of Work"
      title={
        <>
          Work That Shipped
          <br />
          <span className="text-gradient-cyan">and Stayed Shipped.</span>
        </>
      }
      subtitle="Selected programs where our engineering directly moved a business metric. Names anonymized where NDA-bound — details available under NDA."
      showInquiry
    />
  )
}

// ─── Page registry ────────────────────────────────────────────
const PAGES = {
  home:         { component: HomePage,       label: 'Home' },
  services:     { component: ServicesPage,   label: 'Services' },
  industries:   { component: IndustriesPage, label: 'Industries' },
  'case-studies': { component: CaseStudiesPage, label: 'Case Studies' },
}

// ─── Page transition variants ─────────────────────────────────
// Clean, premium: old page exits slightly up + blurs,
// new page enters from slightly below with a bloom-in.
const pageVariants = {
  initial: {
    opacity: 0,
    y: 24,
    filter: 'blur(3px)',
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: 'blur(2px)',
    transition: {
      duration: 0.3,
      ease: [0.45, 0, 0.55, 1],
    },
  },
}

// The 1px cyan sweep bar that crosses the screen during transition
function TransitionBar({ routeKey }) {
  return (
    <AnimatePresence>
      <motion.div
        key={`bar-${routeKey}`}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[210] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)' }}
        initial={{ scaleX: 0, opacity: 1, transformOrigin: 'left center' }}
        animate={{
          scaleX:          [0, 1,           1,              0],
          transformOrigin: [
            'left center',
            'left center',
            'right center',
            'right center',
          ],
          opacity: [1, 1, 1, 0],
        }}
        transition={{
          duration: 0.7,
          times: [0, 0.42, 0.58, 1],
          ease: 'easeInOut',
        }}
      />
    </AnimatePresence>
  )
}

// ─── App Shell ────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const navigate = useCallback((page) => {
    if (PAGES[page] && page !== currentPage) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      setCurrentPage(page)
    }
  }, [currentPage])

  // Expose navigation globally so Navbar links can trigger it
  // (In real app: use React Router or Next.js <Link>)
  if (typeof window !== 'undefined') {
    window.__nexcoreNavigate = navigate
  }

  const PageComponent = PAGES[currentPage]?.component || HomePage

  return (
    <div
      className="relative min-h-screen"
      style={{ background: '#050A14', color: '#F0F4F8' }}
    >
      {/* Fixed Navbar — always visible */}
      <Navbar currentPage={currentPage} onNavigate={navigate} />

      {/* Transition bar sweep */}
      <TransitionBar routeKey={currentPage} />

      {/* Page content with AnimatePresence */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="w-full"
          onAnimationStart={() => {
            // Prevent pointer interactions during transition
            document.body.style.pointerEvents = 'none'
          }}
          onAnimationComplete={() => {
            document.body.style.pointerEvents = ''
          }}
        >
          <PageComponent />
        </motion.main>
      </AnimatePresence>

      {/* Dev navigation bar (remove in production) */}
      {import.meta.env.DEV && (
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(10, 18, 34, 0.95)',
            border: '1px solid rgba(30,48,72,0.9)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <span className="text-[9px] font-mono text-brand-muted mr-1 uppercase tracking-widest">
            Dev Nav
          </span>
          {Object.entries(PAGES).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => navigate(key)}
              className="text-[11px] font-medium px-3 py-1.5 rounded-full transition-all duration-200"
              style={{
                background: currentPage === key
                  ? 'rgba(0,229,255,0.15)'
                  : 'transparent',
                color: currentPage === key ? '#00E5FF' : '#8899AA',
                border: currentPage === key
                  ? '1px solid rgba(0,229,255,0.3)'
                  : '1px solid transparent',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
