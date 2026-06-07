import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASING, staggerContainer, staggerItem } from '../lib/motionVariants'
import ProcessTimeline, { DEFAULT_STEPS } from './ProcessTimeline'
import FeatureSections from './FeatureSections'
import InquirySection from './InquirySection'

// ─────────────────────────────────────────────────────────────
//  InnerPageTemplate — Reusable for Services, Industries, About
//
//  Structure:
//    1. PageHeader    — breadcrumb, eyebrow, headline, subtext
//    2. LeadSection   — KPI strip and intro paragraph
//    3. FeatureSections — Alternating Z-layout
//    4. ProcessTimeline — Scroll-triggered step animation
//    5. InquirySection  — Contact form
//
//  All sections are fully props-driven — pass in your own
//  content and the layout handles spacing, animation, rhythm.
// ─────────────────────────────────────────────────────────────

// ─── Page Header ──────────────────────────────────────────────
function PageHeader({ breadcrumb = [], eyebrow, title, subtitle, kpis = [] }) {
  const headerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  })
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <header
      ref={headerRef}
      className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden pt-[72px]"
      style={{ background: 'linear-gradient(180deg, #070D1C 0%, #050A14 100%)' }}
    >
      {/* Background geometry */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Grid dots layer */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,229,255,0.07) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.6,
          }}
        />
        {/* Gradient wash — bleeds from top centre */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[480px]"
          style={{
            background: 'radial-gradient(ellipse at center top, rgba(0,229,255,0.08) 0%, transparent 65%)',
            filter: 'blur(2px)',
          }}
        />
        {/* Floating hexagon — top right */}
        <motion.div
          className="absolute top-20 right-16 lg:right-32 opacity-30"
          animate={{ rotate: [0, 10, -5, 0], y: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <polygon points="50,4 96,26 96,74 50,96 4,74 4,26"
              stroke="rgba(0,229,255,0.4)" strokeWidth="0.75" fill="rgba(0,229,255,0.04)" />
            <polygon points="50,16 84,34 84,66 50,84 16,66 16,34"
              stroke="rgba(0,229,255,0.2)" strokeWidth="0.5" fill="none" />
          </svg>
        </motion.div>
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to top, #050A14 0%, transparent 100%)' }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 pt-16"
      >
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASING.out, delay: 0.1 }}
            className="flex items-center gap-2 mb-6"
          >
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="text-xs text-brand-muted hover:text-brand-primary transition-colors duration-200"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-xs text-brand-accent font-medium">{crumb.label}</span>
                )}
                {i < breadcrumb.length - 1 && (
                  <svg
                    width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5"
                    viewBox="0 0 24 24" className="text-brand-border flex-shrink-0"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Content */}
        <motion.div
          variants={staggerContainer(0.09, 0.15)}
          initial="hidden"
          animate="show"
        >
          {eyebrow && (
            <motion.p variants={staggerItem} className="eyebrow mb-4">
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            variants={staggerItem}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-brand-primary leading-[1.02] mb-6"
            style={{ letterSpacing: '-0.035em', maxWidth: '18ch' }}
          >
            {typeof title === 'string'
              ? title
              : title /* allows JSX with <span className="text-gradient-cyan"> */}
          </motion.h1>
          {subtitle && (
            <motion.p
              variants={staggerItem}
              className="text-brand-muted text-lg leading-relaxed max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </header>
  )
}

// ─── KPI Strip ────────────────────────────────────────────────
function KpiStrip({ kpis = [] }) {
  if (!kpis.length) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASING.out }}
      className="border-y"
      style={{ borderColor: 'rgba(30,48,72,0.5)', background: 'rgba(7,13,28,0.8)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`grid grid-cols-2 md:grid-cols-${Math.min(kpis.length, 4)} divide-x`}
          style={{ divideColor: 'rgba(30,48,72,0.5)' }}>
          {kpis.map(({ value, unit = '', label }) => (
            <div key={label} className="py-8 px-6 first:pl-0 last:pr-0">
              <div className="flex items-baseline gap-0.5 mb-1">
                <span className="text-3xl font-extrabold text-gradient-cyan tabular tracking-tight">
                  {value}
                </span>
                <span className="text-lg font-bold text-brand-accent">{unit}</span>
              </div>
              <p className="text-xs text-brand-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Intro Paragraph ─────────────────────────────────────────
function IntroBlock({ heading, body }) {
  if (!heading && !body) return null
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: EASING.out }}
            className="text-2xl md:text-4xl font-extrabold tracking-tight text-brand-primary"
            style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}
          >
            {heading}
          </motion.h2>
        </div>
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: EASING.out, delay: 0.1 }}
            className="text-brand-muted text-base md:text-lg leading-relaxed"
          >
            {body}
          </motion.p>
        </div>
      </div>
      {/* Divider */}
      <div className="divider-subtle mt-20" />
    </section>
  )
}

// ─── InnerPageTemplate (main export) ─────────────────────────
export default function InnerPageTemplate({
  // PageHeader props
  breadcrumb,
  eyebrow,
  title,
  subtitle,

  // KPI bar (optional)
  kpis,

  // Intro 2-col text (optional)
  introHeading,
  introBody,

  // Feature sections (Z-layout) — pass custom or use defaults
  features,

  // Process steps — pass custom or use defaults
  processSteps,

  // Whether to show the inquiry section (default true)
  showInquiry = true,

  // Slot for any extra section between Features and Process
  children,
}) {
  return (
    <div className="min-h-screen" style={{ background: '#050A14' }}>
      {/* 1. Page Header */}
      <PageHeader
        breadcrumb={breadcrumb}
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
      />

      {/* 2. KPI Strip (optional) */}
      {kpis?.length > 0 && <KpiStrip kpis={kpis} />}

      {/* 3. Intro block (optional) */}
      {(introHeading || introBody) && (
        <IntroBlock heading={introHeading} body={introBody} />
      )}

      {/* 4. Feature Sections (Z-layout) */}
      <FeatureSections features={features} />

      {/* 5. Any page-specific slot content */}
      {children}

      {/* 6. Process Timeline */}
      <div
        className="border-t"
        style={{
          borderColor: 'rgba(30,48,72,0.35)',
          background: 'linear-gradient(180deg, #060B18 0%, #050A14 100%)',
        }}
      >
        <ProcessTimeline steps={processSteps || DEFAULT_STEPS} />
      </div>

      {/* 7. Inquiry / Contact */}
      {showInquiry && <InquirySection />}
    </div>
  )
}
