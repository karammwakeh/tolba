import { useState, useRef, useId } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { EASING, staggerContainer, staggerItem } from '../lib/motionVariants'

// ─────────────────────────────────────────────────────────────
//  InquirySection — Premium minimal contact form
//
//  Floating label inputs (CSS-driven, no JS required for labels)
//  Micro-animated submit button with three states:
//    idle → submitting (spinner) → success (checkmark)
//
//  The background uses the same geometric grammar as the rest
//  of the site — no solid color blobs, no gradient meshes.
// ─────────────────────────────────────────────────────────────

// ── Floating label field ──────────────────────────────────────
function FloatField({
  label,
  type = 'text',
  name,
  id,
  required = false,
  autoComplete,
  className = '',
}) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const lifted = focused || hasValue

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        name={name}
        id={id}
        required={required}
        autoComplete={autoComplete}
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(!!e.target.value)
        }}
        onChange={(e) => setHasValue(!!e.target.value)}
        className="w-full pt-5 pb-2 px-4 rounded-xl text-sm text-brand-primary outline-none peer transition-all duration-200"
        style={{
          background: 'rgba(15, 26, 43, 0.6)',
          border: `1px solid ${focused ? 'rgba(0,229,255,0.38)' : 'rgba(30,48,72,0.9)'}`,
          boxShadow: focused ? '0 0 0 3px rgba(0,229,255,0.09)' : 'none',
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          caretColor: '#00E5FF',
          color: '#F0F4F8',
        }}
      />
      <label
        htmlFor={id}
        className="absolute left-4 pointer-events-none transition-all duration-200 select-none"
        style={{
          top: lifted ? '8px' : '50%',
          transform: lifted ? 'translateY(0) scale(0.76)' : 'translateY(-50%)',
          transformOrigin: 'left center',
          fontSize: lifted ? '10px' : '14px',
          fontWeight: lifted ? 600 : 400,
          letterSpacing: lifted ? '0.07em' : '0',
          textTransform: lifted ? 'uppercase' : 'none',
          color: lifted ? (focused ? '#00E5FF' : '#8899AA') : '#8899AA',
        }}
      >
        {label}
      </label>
    </div>
  )
}

// ── Floating textarea ─────────────────────────────────────────
function FloatTextarea({ label, name, id, rows = 4, required = false }) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const lifted = focused || hasValue

  return (
    <div className="relative">
      <textarea
        name={name}
        id={id}
        required={required}
        rows={rows}
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(!!e.target.value)
        }}
        onChange={(e) => setHasValue(!!e.target.value)}
        className="w-full pt-7 pb-3 px-4 rounded-xl text-sm text-brand-primary outline-none resize-none transition-all duration-200"
        style={{
          background: 'rgba(15, 26, 43, 0.6)',
          border: `1px solid ${focused ? 'rgba(0,229,255,0.38)' : 'rgba(30,48,72,0.9)'}`,
          boxShadow: focused ? '0 0 0 3px rgba(0,229,255,0.09)' : 'none',
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          caretColor: '#00E5FF',
          color: '#F0F4F8',
        }}
      />
      <label
        htmlFor={id}
        className="absolute left-4 pointer-events-none transition-all duration-200 select-none"
        style={{
          top: lifted ? '10px' : '16px',
          fontSize: lifted ? '10px' : '14px',
          fontWeight: lifted ? 600 : 400,
          letterSpacing: lifted ? '0.07em' : '0',
          textTransform: lifted ? 'uppercase' : 'none',
          color: lifted ? (focused ? '#00E5FF' : '#8899AA') : '#8899AA',
        }}
      >
        {label}
      </label>
    </div>
  )
}

// ── Submit button states ──────────────────────────────────────
function SubmitButton({ status }) {
  return (
    <motion.button
      type="submit"
      disabled={status !== 'idle'}
      className="relative flex items-center justify-center gap-2.5 w-full sm:w-auto px-10 py-3.5 rounded-xl text-sm font-bold overflow-hidden"
      style={{
        background: status === 'success' ? '#00B8CC' : '#00E5FF',
        color: '#050A14',
        cursor: status !== 'idle' ? 'default' : 'pointer',
        minWidth: '180px',
      }}
      whileHover={status === 'idle' ? { scale: 0.975 } : {}}
      whileTap={status === 'idle' ? { scale: 0.96 } : {}}
      transition={{ duration: 0.15 }}
    >
      {/* Shimmer layer on hover — CSS-driven via animation */}
      {status === 'idle' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
            backgroundSize: '250% 100%',
          }}
          animate={{ backgroundPosition: ['-150% center', '250% center'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
        />
      )}

      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.span
            key="idle"
            className="flex items-center gap-2.5"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            Send Inquiry
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </motion.span>
        )}
        {status === 'submitting' && (
          <motion.span
            key="submitting"
            className="flex items-center gap-2.5"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <svg
              className="animate-spin"
              width="14" height="14" fill="none" viewBox="0 0 24 24"
              style={{ color: '#050A14' }}
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </motion.span>
        )}
        {status === 'success' && (
          <motion.span
            key="success"
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Message Sent
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// ─── InquirySection ───────────────────────────────────────────
export default function InquirySection() {
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success'
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const uid = useId()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (status !== 'idle') return
    setStatus('submitting')
    // Simulated async submit — replace with real API call
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => setStatus('idle'), 3500)
    }, 1800)
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050A14 0%, #070D1C 100%)' }}
    >
      {/* Top divider line */}
      <div className="divider-subtle" />

      {/* Background geometry */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Grid dots */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,229,255,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.5,
          }}
        />
        {/* Corner glow */}
        <div
          className="absolute bottom-0 right-0 w-96 h-96"
          style={{
            background: 'radial-gradient(ellipse at bottom right, rgba(0,229,255,0.06) 0%, transparent 65%)',
          }}
        />
        {/* Floating geometric accent */}
        <motion.div
          className="absolute top-16 right-16 opacity-20"
          animate={{ rotate: [0, 12, -6, 0], y: [0, -14, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <polygon points="40,4 76,62 4,62" stroke="#00E5FF" strokeWidth="0.75" fill="none" />
            <polygon points="40,18 64,58 16,58" stroke="#00E5FF" strokeWidth="0.5" fill="rgba(0,229,255,0.04)" />
          </svg>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: Copy ── */}
          <motion.div
            variants={staggerContainer(0.09, 0)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
          >
            <motion.p variants={staggerItem} className="eyebrow mb-4">
              Start a Conversation
            </motion.p>
            <motion.h2
              variants={staggerItem}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-primary mb-6"
              style={{ letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Let's Build
              <br />
              <span className="text-gradient-cyan">Something Real.</span>
            </motion.h2>
            <motion.p variants={staggerItem} className="text-brand-muted text-base leading-relaxed mb-10">
              Whether you have a defined brief or a half-formed problem, we'd rather hear it now than after you've over-specified a solution. Serious inquiries only — we'll respond within one business day.
            </motion.p>

            {/* Contact meta */}
            <motion.div variants={staggerItem} className="space-y-4">
              {[
                { icon: '✦', label: 'Response SLA', value: '< 24 hours' },
                { icon: '✦', label: 'Initial engagement', value: 'Discovery call, NDA optional' },
                { icon: '✦', label: 'Minimum project size', value: 'USD 50,000' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="text-brand-accent text-xs">{icon}</span>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-semibold text-brand-muted whitespace-nowrap">{label}:</span>
                    <span className="text-xs text-brand-primary">{value}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASING.out, delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl p-8 md:p-10 space-y-5"
              style={{
                background: 'rgba(10, 18, 34, 0.7)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(30, 48, 72, 0.8)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
              }}
            >
              {/* Top accent line on card */}
              <div
                className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)' }}
              />

              {/* Row 1: Name + Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FloatField label="Full name" name="name" id={`${uid}-name`} required autoComplete="name" />
                <FloatField label="Company" name="company" id={`${uid}-company`} required autoComplete="organization" />
              </div>

              {/* Row 2: Email + Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FloatField label="Work email" type="email" name="email" id={`${uid}-email`} required autoComplete="email" />
                <FloatField label="Your role" name="role" id={`${uid}-role`} autoComplete="organization-title" />
              </div>

              {/* Budget selector */}
              <div className="relative">
                <label
                  htmlFor={`${uid}-budget`}
                  className="block text-[10px] font-semibold tracking-[0.1em] uppercase text-brand-muted mb-2 ml-1"
                >
                  Project Budget
                </label>
                <select
                  name="budget"
                  id={`${uid}-budget`}
                  className="w-full px-4 py-3 rounded-xl text-sm text-brand-primary outline-none appearance-none"
                  style={{
                    background: 'rgba(15, 26, 43, 0.6)',
                    border: '1px solid rgba(30,48,72,0.9)',
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    color: '#F0F4F8',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(0,229,255,0.38)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(30,48,72,0.9)')}
                >
                  <option value="">Select range</option>
                  <option value="50k-150k">USD 50K – 150K</option>
                  <option value="150k-500k">USD 150K – 500K</option>
                  <option value="500k-1m">USD 500K – 1M</option>
                  <option value="1m+">USD 1M+</option>
                  <option value="tbd">To be discussed</option>
                </select>
                {/* Chevron */}
                <div className="absolute right-4 top-1/2 mt-3 -translate-y-1/2 pointer-events-none text-brand-muted">
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>

              {/* Message */}
              <FloatTextarea
                label="Tell us about your project"
                name="message"
                id={`${uid}-message`}
                rows={4}
                required
              />

              {/* Submit row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
                <p className="text-[11px] text-brand-muted leading-snug max-w-xs">
                  By submitting, you agree to our{' '}
                  <a href="#" className="text-brand-accent underline underline-offset-2 hover:text-white transition-colors">
                    privacy policy
                  </a>
                  . No spam, ever.
                </p>
                <SubmitButton status={status} />
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Global footer strip */}
      <div
        className="border-t py-8"
        style={{ borderColor: 'rgba(30,48,72,0.4)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.3))',
                border: '1px solid rgba(0,229,255,0.35)',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="#00E5FF" />
                <rect x="8" y="1" width="5" height="5" rx="1" fill="#00E5FF" opacity="0.5" />
                <rect x="1" y="8" width="5" height="5" rx="1" fill="#00E5FF" opacity="0.5" />
                <rect x="8" y="8" width="5" height="5" rx="1" fill="#00E5FF" />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight text-brand-primary">
              Nex<span className="text-gradient-cyan">Core</span>
            </span>
          </div>
          <p className="text-xs text-brand-muted">
            © {new Date().getFullYear()} NexCore Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Sitemap'].map((link) => (
              <a key={link} href="#" className="text-xs text-brand-muted hover:text-brand-primary transition-colors duration-200">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
