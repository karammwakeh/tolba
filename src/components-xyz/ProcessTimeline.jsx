import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { EASING } from '../lib/motionVariants'

// ─────────────────────────────────────────────────────────────
//  ProcessTimeline
//
//  Each step "lights up" — dot glows cyan, connecting line
//  draws down, content fades and slides in — as it enters
//  the viewport. Fully scroll-triggered, no intersection
//  observer boilerplate needed thanks to Framer's useInView.
// ─────────────────────────────────────────────────────────────

// Default process steps — fully overridable via props
export const DEFAULT_STEPS = [
  {
    id: '01',
    phase: 'Discovery',
    title: 'Deep-Dive Discovery',
    body: 'We embed with your team for 2–4 weeks. Stakeholder interviews, architecture audits, codebase reviews, and a competitive signal scan. We leave with a shared mental model — not a slide deck.',
    tags: ['Requirements Workshop', 'Tech Audit', 'Risk Mapping'],
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    id: '02',
    phase: 'Architecture',
    title: 'System Design & Architecture',
    body: 'We design for the 10x scale, not just the first launch. API contracts, data models, infrastructure topology, and security architecture are locked before a line of production code is written.',
    tags: ['System Design', 'ADRs', 'Proof of Concept'],
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>
    ),
  },
  {
    id: '03',
    phase: 'Engineering',
    title: 'Agile Build & Iteration',
    body: 'Two-week sprints. Every sprint ends with a shippable increment. CI/CD from day one. Automated test coverage gates block merges below threshold. You see working software — never status decks.',
    tags: ['Sprint Delivery', 'CI/CD', 'Test-First'],
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    id: '04',
    phase: 'Quality',
    title: 'Quality Engineering at Scale',
    body: 'Shift-left QA: unit, integration, E2E, performance, and security scans run in parallel with feature development. Our QA engineers sit in the same sprint — not a downstream gate.',
    tags: ['Automated QA', 'Load Testing', 'SAST/DAST'],
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    id: '05',
    phase: 'Launch',
    title: 'Deployment & Handoff',
    body: 'Zero-downtime deployments, runbook documentation, SRE practices, and a 90-day hypercare window post-launch. Your team is self-sufficient before we reduce engagement.',
    tags: ['Blue/Green Deploy', 'Runbooks', '90-Day Hypercare'],
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
  },
]

// ─── Single Step ──────────────────────────────────────────────
function ProcessStep({ step, index, isLast }) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-15% 0px -15% 0px',
  })

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      {/* ── Left column: number + line ── */}
      <div className="flex flex-col items-center flex-shrink-0">

        {/* Step dot */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: EASING.out, delay: 0.05 }}
          className="relative z-10 flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0"
          style={{
            background: isInView
              ? 'rgba(0, 229, 255, 0.12)'
              : 'rgba(30, 48, 72, 0.6)',
            border: isInView
              ? '1px solid rgba(0, 229, 255, 0.4)'
              : '1px solid rgba(30, 48, 72, 0.8)',
            boxShadow: isInView
              ? '0 0 16px rgba(0,229,255,0.25), 0 0 32px rgba(0,229,255,0.1)'
              : 'none',
            transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <span
            style={{
              color: isInView ? '#00E5FF' : '#8899AA',
              transition: 'color 0.4s ease',
            }}
          >
            {step.icon}
          </span>
        </motion.div>

        {/* Connecting line (not on last step) */}
        {!isLast && (
          <div className="relative flex-1 w-px mt-1" style={{ minHeight: '3.5rem' }}>
            {/* Static grey track */}
            <div className="absolute inset-0 bg-brand-border opacity-40" />
            {/* Animated cyan fill */}
            <motion.div
              className="absolute inset-x-0 top-0 bg-brand-accent"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              style={{ originY: 0 }}
              transition={{ duration: 0.7, ease: EASING.out, delay: 0.3 }}
            />
          </div>
        )}
      </div>

      {/* ── Right column: content card ── */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: EASING.out, delay: 0.1 }}
        className="pb-12 md:pb-16 flex-1 min-w-0"
        style={{ paddingBottom: isLast ? '0' : undefined }}
      >
        {/* Phase label + step number */}
        <div className="flex items-center gap-3 mb-3">
          <span className="eyebrow">{step.phase}</span>
          <span
            className="font-mono text-xs font-medium"
            style={{ color: 'rgba(136,153,170,0.5)' }}
          >
            — {step.id}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-brand-primary mb-3">
          {step.title}
        </h3>

        {/* Body */}
        <p className="text-brand-muted text-sm md:text-base leading-relaxed max-w-xl mb-4">
          {step.body}
        </p>

        {/* Deliverable tags */}
        <div className="flex flex-wrap gap-2">
          {step.tags.map((tag) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, ease: EASING.out, delay: 0.25 }}
              className="text-xs font-mono font-medium px-2.5 py-1 rounded-md"
              style={{
                background: 'rgba(0,229,255,0.06)',
                border: '1px solid rgba(0,229,255,0.14)',
                color: '#00B8CC',
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// ─── ProcessTimeline ──────────────────────────────────────────
export default function ProcessTimeline({ steps = DEFAULT_STEPS }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: EASING.out }}
        className="mb-16 md:mb-20"
      >
        <p className="eyebrow mb-3">How We Work</p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h2
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-primary"
            style={{ letterSpacing: '-0.03em', maxWidth: '24rem' }}
          >
            Our Engineering
            <br />
            <span className="text-gradient-cyan">Process</span>
          </h2>
          <p className="text-brand-muted text-sm md:text-base leading-relaxed max-w-sm lg:mb-1">
            A repeatable, battle-tested delivery system refined across 500+ programs — fast enough for startups, rigorous enough for regulated industries.
          </p>
        </div>
      </motion.div>

      {/* Timeline steps */}
      <div className="max-w-3xl">
        {steps.map((step, index) => (
          <ProcessStep
            key={step.id}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
