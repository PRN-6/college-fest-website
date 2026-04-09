import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RiLinkedinFill, RiInstagramLine, RiGithubFill, RiGlobalLine } from 'react-icons/ri'
import Header from '../components/Header'
import FooterNav from '../components/FooterNav'

/* ─────────────────────────────────────────────
   FILL IN YOUR TEAM DATA HERE
   photo: path to image in /public e.g. '/team/john.jpg'
   socials: set to null to hide that icon
───────────────────────────────────────────── */
const members = [
  {
    name: 'Faculty Name',
    role: 'Faculty Convenor',
    department: 'Department of Computer Science',
    photo: null,
    socials: { linkedin: '#', instagram: null, github: null, website: null },
  },
  {
    name: 'Faculty Name',
    role: 'Faculty Co-Convenor',
    department: 'Department of Computer Science',
    photo: null,
    socials: { linkedin: '#', instagram: null, github: null, website: null },
  },
  {
    name: 'Student Name',
    role: 'President',
    department: 'Core Committee',
    photo: null,
    socials: { linkedin: '#', instagram: '#', github: '#', website: null },
  },
  {
    name: 'Student Name',
    role: 'Vice President',
    department: 'Core Committee',
    photo: null,
    socials: { linkedin: '#', instagram: '#', github: null, website: null },
  },
  {
    name: 'Student Name',
    role: 'Tech Lead',
    department: 'Technical Team',
    photo: null,
    socials: { linkedin: '#', instagram: null, github: '#', website: null },
  },
  {
    name: 'Student Name',
    role: 'Web Developer',
    department: 'Technical Team',
    photo: null,
    socials: { linkedin: '#', instagram: null, github: '#', website: null },
  },
  {
    name: 'Student Name',
    role: 'Design Lead',
    department: 'Design & Media',
    photo: null,
    socials: { linkedin: '#', instagram: '#', github: null, website: null },
  },
  {
    name: 'Student Name',
    role: 'Photographer',
    department: 'Design & Media',
    photo: null,
    socials: { linkedin: null, instagram: '#', github: null, website: null },
  },
]

const socialLinks = [
  { key: 'linkedin',  Icon: RiLinkedinFill,  label: 'LinkedIn' },
  { key: 'instagram', Icon: RiInstagramLine, label: 'Instagram' },
  { key: 'github',    Icon: RiGithubFill,    label: 'GitHub' },
  { key: 'website',   Icon: RiGlobalLine,    label: 'Website' },
]

/* ── Single member spread (2-panel comic layout) ── */
const MemberSpread = ({ member, index }) => {
  const pageNum = index + 1
  const isEven = index % 2 === 0

  return (
    <div className="w-full border-b-4 border-black">
      <div className={`flex flex-col sm:flex-row ${isEven ? '' : 'sm:flex-row-reverse'} min-h-[340px] sm:min-h-[380px]`}>

        {/* ── Left / Photo Panel ── */}
        <div className="relative flex-1 border-r-4 border-black bg-zinc-200 flex flex-col items-center justify-center p-8 sm:p-12 min-h-[280px]">
          {/* Page label */}
          <span className="absolute top-3 left-4 text-[10px] font-black text-black/40 tracking-widest font-mono uppercase">
            PAGE {pageNum}
          </span>

          {/* Polaroid */}
          <div
            className="bg-white p-3 pb-8 shadow-2xl relative"
            style={{ transform: `rotate(${isEven ? '-3deg' : '2.5deg'})` }}
          >
            {/* Tape strip */}
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-14 h-8 bg-yellow-200/80 opacity-90 z-10"
              style={{ boxShadow: 'inset 0 0 6px rgba(0,0,0,0.1)' }}
            />

            {/* Photo area */}
            <div className="w-40 h-48 sm:w-48 sm:h-56 bg-zinc-300 overflow-hidden flex items-center justify-center">
              {member.photo ? (
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <svg className="w-20 h-20 text-zinc-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </div>

            {/* Member number label */}
            <div className="absolute -bottom-1 left-0 right-0 text-center">
              <span className="text-[11px] font-black text-black tracking-widest font-mono">
                ★ MEMBER #{String(index + 1).padStart(2, '0')} ★
              </span>
            </div>
          </div>
        </div>

        {/* ── Right / Info Panel ── */}
        <div className="relative flex-1 bg-[#111] flex flex-col justify-center p-8 sm:p-12 gap-5 min-h-[200px]">
          {/* "TEAM FILE" stamp */}
          {index === 0 && (
            <div className="absolute top-4 right-4 border-2 border-red-500 px-2 py-1 rotate-[-6deg]">
              <span className="text-[10px] font-black text-red-500 tracking-widest font-mono uppercase">TEAM FILE</span>
            </div>
          )}

          {/* Page label */}
          <span className="absolute top-3 right-4 text-[10px] font-black text-white/20 tracking-widest font-mono uppercase">
            {index !== 0 && `PAGE ${pageNum}`}
          </span>

          {/* Name */}
          <div className="bg-black inline-block px-4 py-3 -mx-1 w-fit max-w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none tracking-tight" style={{ fontStyle: 'italic' }}>
              {member.name}
            </h2>
          </div>

          {/* Role badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="border-2 border-red-500 px-3 py-1 inline-block">
              <span className="text-sm font-black text-white tracking-wide">{member.role}</span>
            </div>
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{member.department}</span>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap gap-2">
            {socialLinks.filter(s => member.socials[s.key]).map(({ key, Icon, label }) => (
              <a
                key={key}
                href={member.socials[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black border border-white/20 px-3 py-2 text-xs font-black text-white tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-200"
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Team = () => {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <Header />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-32 md:py-40">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="mb-12 font-mono text-sm text-white/50 hover:text-white transition-colors tracking-widest uppercase flex items-center gap-2 border-b border-white/20 pb-1 w-fit"
        >
          <span>&larr;</span> Back
        </button>

        {/* Hero */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-white animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.7)]"></div>
            <span className="font-mono tracking-[0.3em] text-white/50 text-sm">COLLAGE FEST 2026</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-4 text-white drop-shadow-lg">
            THE TEAM
          </h1>
          <p className="text-sm font-mono text-white/40 tracking-widest uppercase">
            Scroll through the pages to meet the people behind Collage Fest.
          </p>
        </div>

        {/* Comic Book Panel Container */}
        <div className="border-4 border-black rounded-none overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]">
          {members.map((member, i) => (
            <MemberSpread key={i} member={member} index={i} />
          ))}

          {/* End panel */}
          <div className="bg-zinc-200 flex items-center justify-center py-10 border-t-4 border-black">
            <div className="text-center">
              <p className="text-4xl font-black text-black italic tracking-tighter">TO BE CONTINUED...</p>
              <p className="text-xs font-mono text-black/40 mt-2 tracking-widest uppercase">More team members coming soon</p>
            </div>
          </div>
        </div>
      </div>

      <FooterNav />
    </div>
  )
}

export default Team
