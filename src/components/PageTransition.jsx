import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

// ─────────────────────────────────────────────────────────────
//  PageTransition — Global wrapper for route-level animation
//
//  Strategy: Two-layer system
//    1. Page content fades + slides UP (replaces the old page)
//    2. A razor-thin cyan line sweeps across the top at the
//       exact midpoint of the transition (enters right as old
//       content exits, vanishes before new content settles)
//
//  Usage:
//    <PageTransition routeKey={currentRoute}>
//      <YourPage />
//    </PageTransition>
// ─────────────────────────────────────────────────────────────

// The ultra-fast top-bar sweep — a single 1px cyan line that
// travels from left to right during page handoff.
function TransitionBar() {
  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[210] h-px pointer-events-none"
      style={{ background: '#00E5FF' }}
      initial={{ scaleX: 0, transformOrigin: 'left center', opacity: 1 }}
      animate={{
        scaleX: [0, 1, 1, 0],
        transformOrigin: ['left center', 'left center', 'right center', 'right center'],
        opacity: [1, 1, 1, 0],
      }}
      transition={{
        duration: 0.65,
        times: [0, 0.42, 0.58, 1],
        ease: 'easeInOut',
      }}
    />
  )
}

// Per-page content variants — each page slides out up and in from below
const pageVariants = {
  initial: {
    opacity: 0,
    y: 28,
    filter: 'blur(4px)',
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.12,   // wait for exit to begin before entering
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: 'blur(2px)',
    transition: {
      duration: 0.28,
      ease: [0.45, 0, 0.55, 1],
    },
  },
}

// Lock body scroll during transition
function useScrollLock(lock) {
  useEffect(() => {
    if (lock) {
      document.body.setAttribute('data-transitioning', 'true')
    } else {
      document.body.removeAttribute('data-transitioning')
    }
    return () => document.body.removeAttribute('data-transitioning')
  }, [lock])
}

// ─── PageTransition Component ─────────────────────────────────
export default function PageTransition({ routeKey, children }) {
  return (
    <>
      {/* The animated bar fires once per routeKey change */}
      <AnimatePresence mode="wait">
        <TransitionBar key={`bar-${routeKey}`} />
      </AnimatePresence>

      {/* Page content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={routeKey}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

// ─── withPageTransition HOC ───────────────────────────────────
// Wraps a page component so it self-handles its own entry animation
// independently of a router, for simple tab/state-based navigation.
export function withPageTransition(Component, pageKey) {
  return function WrappedPage(props) {
    return (
      <motion.div
        key={pageKey}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="w-full"
      >
        <Component {...props} />
      </motion.div>
    )
  }
}
