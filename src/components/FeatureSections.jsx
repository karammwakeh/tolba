import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { EASING } from '../lib/motionVariants'

// ─────────────────────────────────────────────────────────────
//  FeatureSections — Alternating Z-layout (text ↔ visual)
//
//  Each section: full-width row, text on one side, abstract
//  geometric SVG placeholder on the other. Alternates per
//  section. Generous whitespace. Scroll-triggered reveals.
// ─────────────────────────────────────────────────────────────

// ── Abstract visual placeholders ─────────────────────────────
// Each is a self-contained SVG composition — no stock photos,
// no icons from libraries, pure geometry as information design.

function VisualCircuitGrid() {
  return (
    <svg viewBox="0 0 480 360" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Grid substrate */}
      <pattern id="cg" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="40" cy="40" r="1" fill="rgba(0,229,255,0.12)" />
        <circle cx="0"  cy="40" r="1" fill="rgba(0,229,255,0.12)" />
        <circle cx="40" cy="0"  r="1" fill="rgba(0,229,255,0.12)" />
        <circle cx="0"  cy="0"  r="1" fill="rgba(0,229,255,0.12)" />
      </pattern>
      <rect width="480" height="360" fill="url(#cg)" />

      {/* Main circuit path */}
      <path
        d="M 60 180 L 120 180 L 120 100 L 240 100 L 240 260 L 360 260 L 360 180 L 420 180"
        stroke="rgba(0,229,255,0.3)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      {/* Branch 1 */}
      <path
        d="M 200 100 L 200 60 L 300 60 L 300 140 L 360 140"
        stroke="rgba(0,229,255,0.18)"
        strokeWidth="1"
      />
      {/* Branch 2 */}
      <path
        d="M 120 160 L 80 160 L 80 240 L 160 240"
        stroke="rgba(0,229,255,0.15)"
        strokeWidth="1"
      />

      {/* Nodes */}
      {[
        [120, 180], [240, 100], [240, 260], [360, 260],
        [200, 100], [300, 140], [120, 160], [160, 240],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" fill="rgba(0,229,255,0.15)" stroke="rgba(0,229,255,0.5)" strokeWidth="1" />
          <circle cx={x} cy={y} r="2" fill="#00E5FF" />
        </g>
      ))}

      {/* Central chip */}
      <rect x="195" y="155" width="90" height="50" rx="4"
        fill="rgba(0,229,255,0.05)" stroke="rgba(0,229,255,0.25)" strokeWidth="1" />
      <text x="240" y="177" textAnchor="middle" fill="rgba(0,229,255,0.6)"
        fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="500">CORE</text>
      <text x="240" y="192" textAnchor="middle" fill="rgba(0,229,255,0.4)"
        fontSize="7" fontFamily="JetBrains Mono, monospace">v4.2.1</text>

      {/* Pin lines */}
      {[165, 175, 185, 195].map((y, i) => (
        <line key={i} x1="195" y1={y} x2="182" y2={y} stroke="rgba(0,229,255,0.3)" strokeWidth="0.75" />
      ))}
      {[165, 175, 185, 195].map((y, i) => (
        <line key={i} x1="285" y1={y} x2="298" y2={y} stroke="rgba(0,229,255,0.3)" strokeWidth="0.75" />
      ))}

      {/* Corner brackets */}
      <path d="M 20 20 L 20 50 M 20 20 L 50 20" stroke="rgba(0,229,255,0.2)" strokeWidth="1.5" />
      <path d="M 460 20 L 460 50 M 460 20 L 430 20" stroke="rgba(0,229,255,0.2)" strokeWidth="1.5" />
      <path d="M 20 340 L 20 310 M 20 340 L 50 340" stroke="rgba(0,229,255,0.2)" strokeWidth="1.5" />
      <path d="M 460 340 L 460 310 M 460 340 L 430 340" stroke="rgba(0,229,255,0.2)" strokeWidth="1.5" />
    </svg>
  )
}

function VisualDataFlow() {
  return (
    <svg viewBox="0 0 480 360" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Background rings */}
      <circle cx="240" cy="180" r="140" stroke="rgba(0,229,255,0.05)" strokeWidth="1" />
      <circle cx="240" cy="180" r="100" stroke="rgba(0,229,255,0.07)" strokeWidth="1" strokeDasharray="3 5" />
      <circle cx="240" cy="180" r="60"  stroke="rgba(0,229,255,0.1)"  strokeWidth="1" />

      {/* Core orb */}
      <circle cx="240" cy="180" r="28" fill="rgba(0,229,255,0.08)" stroke="rgba(0,229,255,0.35)" strokeWidth="1.5" />
      <circle cx="240" cy="180" r="14" fill="rgba(0,229,255,0.2)" />
      <circle cx="240" cy="180" r="6"  fill="#00E5FF" />

      {/* Satellite nodes */}
      {[
        { angle: 0,   label: 'API',   r: 100 },
        { angle: 60,  label: 'ML',    r: 100 },
        { angle: 120, label: 'Cache', r: 100 },
        { angle: 180, label: 'DB',    r: 100 },
        { angle: 240, label: 'CDN',   r: 100 },
        { angle: 300, label: 'Auth',  r: 100 },
      ].map(({ angle, label, r }) => {
        const rad = (angle * Math.PI) / 180
        const x = 240 + r * Math.cos(rad)
        const y = 180 + r * Math.sin(rad)
        return (
          <g key={label}>
            <line x1="240" y1="180" x2={x} y2={y}
              stroke="rgba(0,229,255,0.15)" strokeWidth="0.75" strokeDasharray="3 4" />
            <circle cx={x} cy={y} r="18"
              fill="rgba(0,229,255,0.06)" stroke="rgba(0,229,255,0.28)" strokeWidth="1" />
            <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
              fill="rgba(0,229,255,0.7)" fontSize="8"
              fontFamily="JetBrains Mono, monospace" fontWeight="500">
              {label}
            </text>
          </g>
        )
      })}

      {/* Corner brackets */}
      <path d="M 20 20 L 20 44 M 20 20 L 44 20" stroke="rgba(0,229,255,0.18)" strokeWidth="1.5" />
      <path d="M 460 20 L 460 44 M 460 20 L 436 20" stroke="rgba(0,229,255,0.18)" strokeWidth="1.5" />
      <path d="M 20 340 L 20 316 M 20 340 L 44 340" stroke="rgba(0,229,255,0.18)" strokeWidth="1.5" />
      <path d="M 460 340 L 460 316 M 460 340 L 436 340" stroke="rgba(0,229,255,0.18)" strokeWidth="1.5" />
    </svg>
  )
}

function VisualLayerStack() {
  const layers = [
    { y: 260, label: 'Infrastructure', opacity: 0.08 },
    { y: 210, label: 'Platform',       opacity: 0.11 },
    { y: 160, label: 'Services',       opacity: 0.14 },
    { y: 110, label: 'Application',    opacity: 0.17 },
    { y:  60, label: 'Experience',     opacity: 0.22, accent: true },
  ]
  const W = 340, H_LAYER = 40, X0 = 70, SKEW = 22

  return (
    <svg viewBox="0 0 480 360" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Corner brackets */}
      <path d="M 20 20 L 20 44 M 20 20 L 44 20" stroke="rgba(0,229,255,0.18)" strokeWidth="1.5" />
      <path d="M 460 20 L 460 44 M 460 20 L 436 20" stroke="rgba(0,229,255,0.18)" strokeWidth="1.5" />

      {layers.map(({ y, label, opacity, accent }) => (
        <g key={label}>
          {/* Layer face */}
          <path
            d={`M ${X0} ${y} L ${X0 + W} ${y} L ${X0 + W - SKEW} ${y + H_LAYER} L ${X0 - SKEW} ${y + H_LAYER} Z`}
            fill={accent ? `rgba(0,229,255,${opacity})` : `rgba(15,26,43,${opacity * 4})`}
            stroke={accent ? 'rgba(0,229,255,0.4)' : 'rgba(0,229,255,0.15)'}
            strokeWidth={accent ? 1.5 : 0.75}
          />
          {/* Side depth (right) */}
          <path
            d={`M ${X0 + W} ${y} L ${X0 + W + 14} ${y - 8} L ${X0 + W - SKEW + 14} ${y + H_LAYER - 8} L ${X0 + W - SKEW} ${y + H_LAYER} Z`}
            fill="rgba(0,229,255,0.04)"
            stroke="rgba(0,229,255,0.1)"
            strokeWidth="0.5"
          />
          <text
            x={X0 + 14}
            y={y + H_LAYER / 2 + 1}
            dominantBaseline="middle"
            fill={accent ? '#00E5FF' : 'rgba(136,153,170,0.8)'}
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            fontWeight={accent ? '600' : '400'}
          >
            {label}
          </text>
          {/* Accent dot on right */}
          {accent && (
            <circle
              cx={X0 + W - 20}
              cy={y + H_LAYER / 2}
              r="4"
              fill="#00E5FF"
              style={{ filter: 'drop-shadow(0 0 4px #00E5FF88)' }}
            />
          )}
        </g>
      ))}
    </svg>
  )
}

const VISUALS = [VisualCircuitGrid, VisualDataFlow, VisualLayerStack]

// ── Feature section data ──────────────────────────────────────
const DEFAULT_FEATURES = [
  {
    eyebrow: 'Full-Cycle Delivery',
    title: 'From Concept to Production',
    body: 'We handle the entire engineering lifecycle — discovery, architecture, build, QA, deployment, and ongoing optimization. You get one accountable partner, not a fragmented vendor chain that leaves you holding the integration risk.',
    bullets: [
      'Single-team accountability across stack layers',
      'Dedicated architects, not consultants who hand off to juniors',
      'Embedded security and compliance from sprint one',
    ],
    cta: { label: 'See our delivery model', href: '#process' },
  },
  {
    eyebrow: 'Engineering Depth',
    title: 'Senior-Heavy Teams That Ship',
    body: 'Our engagement model is intentionally senior-heavy: 60% Staff or Principal engineers per team. This isn\'t a staffing agency — it\'s a product studio with opinions, and the track record to back them.',
    bullets: [
      '60%+ Staff & Principal engineers per team',
      'Domain architects with 10-20 years vertical experience',
      '< 48hr escalation-to-resolution SLA on production issues',
    ],
    cta: { label: 'Meet the team model', href: '#about' },
  },
  {
    eyebrow: 'Platform Excellence',
    title: 'Systems Built to Last 10 Years',
    body: 'We design for the second decade, not just the first release. Every architecture decision is documented, every API contract is versioned, and every system comes with a formal runbook so your team can own it confidently.',
    bullets: [
      'Architecture Decision Records (ADRs) on every project',
      'Zero-dependency vendor lock-in by design',
      'Knowledge transfer program before any engagement ends',
    ],
    cta: { label: 'View case studies', href: '#case-studies' },
  },
]

// ─── Visual Panel ─────────────────────────────────────────────
function VisualPanel({ index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const VisualComponent = VISUALS[index % VISUALS.length]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: EASING.out, delay: 0.15 }}
      className="feature-visual w-full"
      style={{ minHeight: 280 }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.25), transparent)' }}
      />

      {/* Corner tag */}
      <div
        className="absolute top-3 right-3 z-10 px-2 py-1 rounded font-mono text-[9px]"
        style={{
          background: 'rgba(0,229,255,0.07)',
          border: '1px solid rgba(0,229,255,0.15)',
          color: 'rgba(0,229,255,0.6)',
        }}
      >
        [DIAGRAM — {['ARCH', 'DATA', 'STACK'][index % 3]}]
      </div>

      {/* Animated shimmer overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(0,229,255,0.04) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
        animate={isInView ? { backgroundPosition: ['-200% center', '300% center'] } : {}}
        transition={{ duration: 3, delay: 0.5, ease: 'linear', repeat: Infinity, repeatDelay: 4 }}
      />

      {/* SVG visual */}
      <div className="absolute inset-0 p-6">
        <VisualComponent />
      </div>
    </motion.div>
  )
}

// ─── Text Panel ───────────────────────────────────────────────
function TextPanel({ feature, isInView }) {
  return (
    <div>
      <motion.p
        className="eyebrow mb-4"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: EASING.out }}
      >
        {feature.eyebrow}
      </motion.p>

      <motion.h3
        className="text-2xl md:text-4xl font-extrabold tracking-tight text-brand-primary mb-5"
        style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, ease: EASING.out, delay: 0.07 }}
      >
        {feature.title}
      </motion.h3>

      <motion.p
        className="text-brand-muted text-base md:text-lg leading-relaxed mb-7"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, ease: EASING.out, delay: 0.12 }}
      >
        {feature.body}
      </motion.p>

      {/* Bullets */}
      <motion.ul
        className="space-y-3 mb-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.18 }}
      >
        {feature.bullets.map((b, i) => (
          <motion.li
            key={b}
            className="flex items-start gap-3 text-sm text-brand-muted"
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, ease: EASING.out, delay: 0.2 + i * 0.07 }}
          >
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: '#00E5FF' }}
            />
            {b}
          </motion.li>
        ))}
      </motion.ul>

      {/* CTA */}
      {feature.cta && (
        <motion.a
          href={feature.cta.href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent animated-underline"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          {feature.cta.label}
          <svg
            className="group-hover:translate-x-0.5 transition-transform duration-200"
            width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </motion.a>
      )}
    </div>
  )
}

// ─── Feature Row ──────────────────────────────────────────────
function FeatureRow({ feature, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`
        grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center
        ${index > 0 ? 'mt-24 md:mt-36' : ''}
      `}
    >
      {/* Text — left on even, right on odd (visual alternation) */}
      <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
        <TextPanel feature={feature} isInView={isInView} />
      </div>

      {/* Visual — right on even, left on odd */}
      <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
        <VisualPanel index={index} />
      </div>
    </div>
  )
}

// ─── Main FeatureSections ─────────────────────────────────────
export default function FeatureSections({ features = DEFAULT_FEATURES }) {
  return (
    <section
      className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32"
      style={{
        background: 'linear-gradient(180deg, #050A14 0%, #070C18 50%, #050A14 100%)',
      }}
    >
      {/* Subtle section divider top */}
      <div className="divider-subtle mb-0 absolute top-0 left-6 right-6 lg:left-12 lg:right-12" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: EASING.out }}
        className="mb-20"
      >
        <p className="eyebrow mb-3">Why NexCore</p>
        <h2
          className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-primary"
          style={{ letterSpacing: '-0.03em', maxWidth: '28rem' }}
        >
          Built Different.
          <br />
          <span className="text-gradient-cyan">Ships Differently.</span>
        </h2>
      </motion.div>

      {/* Feature rows */}
      {features.map((feature, index) => (
        <FeatureRow key={feature.title} feature={feature} index={index} />
      ))}
    </section>
  )
}
