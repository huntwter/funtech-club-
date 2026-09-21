import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CalendarPlus,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  Download,
  ExternalLink,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Maximize2,
  Menu,
  RotateCcw,
  Send,
  Sparkles,
  Trophy,
  Users,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

const navItems = [
  { label: 'Why Fun Tech', href: '#why' },
  { label: 'On the calendar', href: '#calendar' },
  { label: 'The people', href: '#people' },
  { label: 'Questions', href: '#questions' },
];

const reasons = [
  {
    number: '01',
    icon: Sparkles,
    title: 'Start curious.',
    copy: 'No gatekeeping, no “expert” costume. Bring the thing you keep wondering about and we will find a way in.',
    tint: 'coral',
    href: '#questions',
    hint: 'Read FAQs & Philosophy',
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Make something.',
    copy: 'Small builds, messy prototypes, and beautifully over-engineered experiments all count as progress here.',
    tint: 'mint',
    href: '#calendar',
    hint: 'Explore Upcoming Events',
  },
  {
    number: '03',
    icon: Users,
    title: 'Find your people.',
    copy: 'The best technical shortcuts are often conversations. Meet the folks who will stay late to debug with you.',
    tint: 'lavender',
    href: '#people',
    hint: 'Meet Team & Coordinators',
  },
];

const availableInterests = [
  'Web & App Dev',
  'AI & Machine Learning',
  'Robotics & Hardware',
  'UI / UX & Design',
  'Open Source & Hacks',
  'Competitive Coding',
  'Game Dev & Creative Coding',
];

const availableBranches = [
  'Computer Science & Engineering',
  'Information Technology',
  'Artificial Intelligence & Data Science',
  'Electronics & Communication (ECE)',
  'Electrical Engineering (EE)',
  'Mechanical Engineering',
  'Civil Engineering',
  'Other / Interdisciplinary',
];

const events = [
  {
    id: 'techbuzz-dev-sprint',
    date: '28',
    month: 'SEP',
    title: 'TechBuzz: Dev Sprint',
    tag: 'WORKSHOP',
    meta: 'LT-2 · 4:00 PM',
    venue: 'LT-2, MITS Gwalior',
    timeString: '4:00 PM – 6:00 PM IST',
    copy: 'Interactive problem-solving, live coding sessions, and tech challenges. Bring your laptop and collaborate with peer builders.',
    tone: 'mint',
    image: '/images/funtech/TechBuzz2.jpg',
    status: 'upcoming',
    alt: 'TechBuzz workshop session at MITS LT-2',
    googleCalendarUrl:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=TechBuzz%3A%20Dev%20Sprint%20-%20Fun%20Tech%20Club%20MITS&dates=20260928T103000Z%2F20260928T123000Z&details=Interactive%20problem-solving%2C%20live%20coding%20sessions%2C%20and%20tech%20challenges.%20Bring%20your%20laptop%20and%20collaborate%20with%20peer%20builders%20at%20Fun%20Tech%20Club%20MITS.&location=LT-2%2C%20Madhav%20Institute%20of%20Technology%20%26%20Science%2C%20Gwalior',
  },
  {
    id: 'techmania-young-thinkers',
    date: '10',
    month: 'SEP',
    title: 'TechMania: Young Thinkers Conclave',
    tag: 'CONCLAVE',
    meta: 'Seminar Hall · 10:30 AM',
    venue: 'Seminar Hall, MITS Gwalior',
    timeString: '10:30 AM – 2:00 PM IST',
    copy: 'A high-energy student conclave celebrating hands-on builds, project exhibitions, and deep-dive tech discussions across disciplines.',
    tone: 'coral',
    image: '/images/funtech/Techmania2.jpg',
    status: 'completed',
    alt: 'TechMania Young Thinkers Conclave participants at MITS',
  },
  {
    id: 'placement-drive-harshil',
    date: '31',
    month: 'AUG',
    title: 'Placement Drive: Harshil Bansal',
    tag: 'TALK & DRIVE',
    meta: 'Conclave Center · 11:00 AM – 1:00 PM',
    venue: 'Conclave Center, MITS Gwalior',
    timeString: '11:00 AM – 1:00 PM IST',
    copy: 'Bridging the gap between theory and practice with Harshil Sir (ex-Google, AI/ML startups). Internships for Top 2, LORs for Top 7, interviews for Top 20.',
    tone: 'ink',
    image: '/images/funtech/placement.jpg',
    status: 'completed',
    alt: 'Fun Tech Club presents Placement Drive with Harshil Bansal',
  },
];

const faqs = [
  {
    question: 'Do I need to be “good at coding” to join?',
    answer:
      'Absolutely not. Fun Tech is built for the in-between stage: you are interested, you are learning, and you are willing to try. We pair people by curiosity, not by marks.',
  },
  {
    question: 'What happens at a typical club meet?',
    answer:
      'Usually a short spark — a demo, a story, or a prompt — followed by hands-on time and a lot of side conversations. Some meets are structured workshops; others are gloriously open-ended build nights.',
  },
  {
    question: 'Can I come to one event before joining?',
    answer:
      'Please do. The fastest way to understand Fun Tech is to show up, look around, and make something small with us. RSVP below or simply find us at the next event.',
  },
  {
    question: 'Who runs Fun Tech Club?',
    answer:
      'The student crew keeps the energy moving, with guidance from our faculty coordinators Dr. Tej Singh and Dr. Priyanka Garg. It is a community, not a hierarchy.',
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [savedEvents, setSavedEvents] = useState<number[]>([]);
  const [selectedPoster, setSelectedPoster] = useState<{
    src: string;
    title: string;
    meta?: string;
    tag?: string;
    googleCalendarUrl?: string;
    isUpcoming?: boolean;
  } | null>(null);

  // Registration & RSVP Form State
  const [formType, setFormType] = useState<'membership' | 'rsvp'>('membership');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState(availableBranches[0]);
  const [year, setYear] = useState('1st Year');
  const [interests, setInterests] = useState<string[]>([
    'Web & App Dev',
    'AI & Machine Learning',
  ]);
  const [rsvpTechBuzz, setRsvpTechBuzz] = useState(true);
  const [curiosityNote, setCuriosityNote] = useState('');

  const [submittedPass, setSubmittedPass] = useState<{
    memberId: string;
    fullName: string;
    email: string;
    branch: string;
    year: string;
    interests: string[];
    rsvpTechBuzz: boolean;
  } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPoster(null);
    };
    if (selectedPoster) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPoster]);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest],
    );
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast.error('Please enter your name and college email.');
      return;
    }

    const randomId = `FT-MITS-24-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedPass({
      memberId: randomId,
      fullName: fullName.trim(),
      email: email.trim(),
      branch,
      year,
      interests,
      rsvpTechBuzz,
    });

    toast.success('🎉 Welcome to Fun Tech Club! Your registration is complete.', {
      description: rsvpTechBuzz
        ? 'Your seat for TechBuzz Dev Sprint on 28 Sep is reserved!'
        : 'Check your email for upcoming sessions and community links.',
    });
  };

  const handleQuickRsvp = (eventTitle: string) => {
    setRsvpTechBuzz(true);
    setFormType('rsvp');
    toast.info(`Selected ${eventTitle}! Fill out your details below to save your spot.`);
    const joinElem = document.getElementById('join');
    if (joinElem) {
      joinElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadIcsFile = (eventItem: (typeof events)[number]) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Fun Tech Club MITS//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${eventItem.title} - Fun Tech Club MITS`,
      `DESCRIPTION:${eventItem.copy.replace(/\n/g, ' ')}`,
      `LOCATION:${eventItem.meta}, MITS Gwalior`,
      'DTSTART:20260928T103000Z',
      'DTEND:20260928T123000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${eventItem.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded calendar invite for ${eventItem.title}`);
  };

  const toggleSavedEvent = (index: number) => {
    const isSaved = savedEvents.includes(index);
    setSavedEvents((current) =>
      isSaved ? current.filter((item) => item !== index) : [...current, index],
    );
    if (!isSaved) {
      toast.success(`Saved ${events[index].title} to your bookmarks!`);
    } else {
      toast.info(`Removed ${events[index].title} from bookmarks.`);
    }
  };

  const renderEventCard = ({ event, index }: { event: (typeof events)[number]; index: number }) => (
    <article
      className={`event-card event-${event.tone} ${event.status === 'completed' ? 'event-completed' : ''} reveal`}
      key={event.title}
      data-testid={`card-event-${index}`}
    >
      <div
        className="event-image-wrap"
        role="button"
        tabIndex={0}
        onClick={() =>
          setSelectedPoster({
            src: event.image,
            title: event.title,
            meta: `${event.meta} · ${event.status === 'upcoming' ? 'Upcoming Workshop' : 'Completed Event'}`,
            tag: event.tag,
            googleCalendarUrl: event.googleCalendarUrl,
            isUpcoming: event.status === 'upcoming',
          })
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelectedPoster({
              src: event.image,
              title: event.title,
              meta: `${event.meta} · ${event.status === 'upcoming' ? 'Upcoming Workshop' : 'Completed Event'}`,
              tag: event.tag,
              googleCalendarUrl: event.googleCalendarUrl,
              isUpcoming: event.status === 'upcoming',
            });
          }
        }}
        aria-label={`View full poster for ${event.title}`}
        title="Click to view full uncropped poster"
      >
        <img src={event.image} alt={event.alt || event.title} loading="lazy" />
        <div className="event-image-overlay">
          <span className="event-image-zoom-badge">
            <Maximize2 size={13} /> View Poster
          </span>
        </div>
      </div>
      <div className="event-card-body">
        <div className="event-card-top">
          <div className="event-date" aria-label={`${event.date} ${event.month}`}>
            <strong>{event.date}</strong>
            <span>{event.month}</span>
          </div>
          <span className="event-tag">{event.tag}</span>
          <span
            className={`event-status ${
              event.status === 'upcoming' ? 'event-status-upcoming' : 'event-status-completed'
            }`}
          >
            {event.status === 'upcoming' ? 'UPCOMING' : 'COMPLETED'}
          </span>
          {event.status === 'upcoming' ? (
            <button
              className={`event-action ${savedEvents.includes(index) ? 'event-saved' : ''}`}
              type="button"
              aria-label={
                savedEvents.includes(index)
                  ? `Remove ${event.title} from saved events`
                  : `Save ${event.title}`
              }
              aria-pressed={savedEvents.includes(index)}
              onClick={() => toggleSavedEvent(index)}
              title={savedEvents.includes(index) ? 'Bookmarked' : 'Bookmark Event'}
              data-testid={`button-save-event-${index}`}
            >
              <CalendarDays size={18} />
            </button>
          ) : (
            <span className="event-complete-icon" aria-label="Event completed">
              <CheckCircle2 size={19} />
            </span>
          )}
        </div>
        <div className="event-info">
          <h3>
            <button
              type="button"
              className="event-title-btn"
              onClick={() =>
                setSelectedPoster({
                  src: event.image,
                  title: event.title,
                  meta: `${event.meta} · ${event.status === 'upcoming' ? 'Upcoming Workshop' : 'Completed Event'}`,
                  tag: event.tag,
                  googleCalendarUrl: event.googleCalendarUrl,
                  isUpcoming: event.status === 'upcoming',
                })
              }
            >
              {event.title}
            </button>
          </h3>
          <p>{event.copy}</p>
        </div>
        <div className="event-meta">
          <span>
            <MapPin size={14} /> {event.meta.split(' · ')[0]}
          </span>
          <span>
            <Clock3 size={14} /> {event.meta.split(' · ')[1]}
          </span>
        </div>

        {/* Real Interactive Calendar & RSVP actions */}
        {event.status === 'upcoming' && (
          <div className="event-actions-bar">
            {event.googleCalendarUrl && (
              <a
                href={event.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="event-btn event-btn-calendar"
                title="Add directly to your Google Calendar"
              >
                <CalendarPlus size={15} /> Add to Google Calendar
              </a>
            )}
            <div className="event-actions-subgroup">
              <button
                type="button"
                className="event-btn event-btn-rsvp"
                onClick={() => handleQuickRsvp(event.title)}
                title="Reserve your seat in the join form below"
              >
                <Send size={14} /> RSVP Seat
              </button>
              <button
                type="button"
                className="event-btn event-btn-ics"
                onClick={() => downloadIcsFile(event)}
                title="Download .ics file for Apple/Outlook/Phone Calendar"
              >
                <Download size={14} /> .ICS
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );

  const eventEntries = events.map((event, index) => ({ event, index }));
  const upcomingEvents = eventEntries.filter(({ event }) => event.status === 'upcoming');
  const completedEvents = eventEntries.filter(({ event }) => event.status === 'completed');

  return (
    <div className="site-shell">
      <Toaster position="bottom-right" richColors />

      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header" data-testid="header-site">
        <a className="brand" href="#top" aria-label="Fun Tech Club home" data-testid="link-home">
          <span className="brand-mark" aria-hidden="true">
            <img src="/images/funtech/Funtech-favicon.png" alt="Fun Tech Logo" />
          </span>
          <span className="brand-copy">
            FUN TECH
            <small>MITS · GWALIOR</small>
          </span>
        </a>
        <nav className={`desktop-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            className="nav-join"
            href="#join"
            data-testid="link-nav-join"
            onClick={() => setMenuOpen(false)}
          >
            Join the club <ArrowUpRight size={16} strokeWidth={2.2} />
          </a>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
          data-testid="button-menu-toggle"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow reveal">A student-led technology community at MITS</p>
            <h1 id="hero-title" className="hero-title reveal">
              Make room
              <br />
              for <em>curiosity.</em>
            </h1>
            <p className="hero-intro reveal">
              Fun Tech is where technical curiosity becomes a shared campus culture. Learn, build, compete,
              and meet people — without the usual pressure or posturing.
            </p>
            <div className="hero-actions reveal">
              <a className="button button-primary" href="#join" data-testid="link-hero-join">
                Pull up a chair · Join Us <ArrowDownRight size={18} />
              </a>
              <a className="text-link" href="#calendar" data-testid="link-hero-calendar">
                See what’s happening <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="hero-art reveal" aria-label="Abstract graphic showing connected ideas">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="art-sticker sticker-top">
              NO<br />SERIOUS<br />FACES
            </div>
            <div className="art-core">
              <span>FT</span>
              <small>
                EST.<br />2019
              </small>
            </div>
            <div className="art-note note-one">
              build<br />→ break<br />→ learn
            </div>
            <div className="art-note note-two">
              curious<br />is a skill
            </div>
            <div className="art-line" />
          </div>
          <div className="hero-foot reveal">
            <span>01 / 08</span>
            <span className="hero-rule" />
            <span>Scroll to explore</span>
            <ArrowDownRight size={16} />
          </div>
        </section>

        <section className="marquee-band" aria-label="Club values">
          <div className="marquee-track">
            <span>TECHNOLOGY MEETS FUN</span>
            <i>+</i>
            <span>IDEAS MEET PEOPLE</span>
            <i>+</i>
            <span>MAKE SOMETHING ODD</span>
            <i>+</i>
            <span>TECHNOLOGY MEETS FUN</span>
            <i>+</i>
          </div>
        </section>

        {/* 01, 02, 03 Reasons - Now Interactive Clickable Links */}
        <section className="section reasons-section" id="why" aria-labelledby="why-title">
          <div className="section-heading reveal">
            <p className="eyebrow">The short version</p>
            <h2 id="why-title">
              Less <span>“grind.”</span>
              <br />
              More <span>“what if?”</span>
            </h2>
          </div>
          <div className="reasons-intro reveal">
            <p>
              We think the most useful kind of technical education happens when people feel comfortable enough
              to ask the obvious question — and brave enough to chase the weird one.
            </p>
            <span className="scribble-arrow" aria-hidden="true">
              ↳
            </span>
          </div>
          <div className="reason-list">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <a
                  href={reason.href}
                  className={`reason-card reason-${reason.tint} reveal`}
                  key={reason.number}
                  data-testid={`card-reason-${reason.number}`}
                  title={`Click to jump: ${reason.hint}`}
                >
                  <div className="reason-top">
                    <span className="reason-number">{reason.number}</span>
                    <Icon size={21} strokeWidth={1.8} />
                  </div>
                  <h3>{reason.title}</h3>
                  <p>{reason.copy}</p>
                  <div className="reason-bottom-bar">
                    <span className="reason-hint-text">{reason.hint}</span>
                    <ArrowUpRight className="reason-arrow" size={20} />
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <section className="manifesto-section" aria-labelledby="manifesto-title">
          <div className="manifesto-grid" aria-hidden="true" />
          <div className="manifesto-inner">
            <p className="eyebrow eyebrow-light reveal">A note from the club</p>
            <h2 id="manifesto-title" className="reveal">
              “You don’t have to
              <br />
              <span>know the answer</span>
              <br />
              to pull up a chair.”
            </h2>
            <div className="manifesto-meta reveal">
              <div className="stamp">
                FUN<br />TECH<br />MITS
              </div>
              <p>
                Creativity through tech exploration.<br />
                Coding and STEM skills, with a little<br />
                more room for play.
              </p>
            </div>
          </div>
          <div className="manifesto-side-note">FIELD NOTES / 001</div>
        </section>

        {/* Calendar Section with Active Links & Google Calendar */}
        <section className="section calendar-section" id="calendar" aria-labelledby="calendar-title">
          <div className="calendar-header reveal">
            <div>
              <p className="eyebrow">Put it in your calendar</p>
              <h2 id="calendar-title">
                Coming up<br />
                <em>at the club.</em>
              </h2>
            </div>
            <p className="calendar-aside">
              One workshop, one conversation, one excuse to get out of your room. Click posters for details or add events directly to your calendar.
            </p>
          </div>
          <div className="event-group event-group-upcoming">
            <div className="event-group-heading">
              <h3>Next up</h3>
              <span>Save your spot</span>
            </div>
            <div className="events-list">{upcomingEvents.map(renderEventCard)}</div>
          </div>
          <div className="event-group event-group-completed">
            <div className="event-group-heading">
              <h3>Past events</h3>
              <span>Field notes from the club</span>
            </div>
            <div className="events-list">{completedEvents.map(renderEventCard)}</div>
          </div>
          <a className="calendar-link reveal" href="#join" data-testid="link-calendar-rsvp">
            Get event notes &amp; invitations in your inbox <ArrowUpRight size={17} />
          </a>
        </section>

        <section className="lab-section" aria-labelledby="lab-title">
          <div className="lab-top reveal">
            <div>
              <p className="eyebrow">Seen around campus</p>
              <h2 className="lab-heading">The lab is where it starts.</h2>
            </div>
            <span className="lab-index">MITS · GWALIOR / 26.218° N, 78.182° E</span>
          </div>
          <div className="lab-collage">
            <div
              className="collage-main reveal"
              role="button"
              tabIndex={0}
              onClick={() =>
                setSelectedPoster({
                  src: '/images/funtech/Club carnival.jpg',
                  title: 'Club Carnival: Welcoming Admitted Batch of 2023',
                  meta: 'MITS Campus Grounds · Fun Tech Orientation',
                })
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPoster({
                    src: '/images/funtech/Club carnival.jpg',
                    title: 'Club Carnival: Welcoming Admitted Batch of 2023',
                    meta: 'MITS Campus Grounds · Fun Tech Orientation',
                  });
                }
              }}
              title="Click to view full photo"
              aria-label="View full Club Carnival photo"
            >
              <img
                className="collage-photo"
                src="/images/funtech/Club carnival.jpg"
                alt="Fun Tech members gathered at Club Carnival stall welcoming students"
                loading="lazy"
              />
              <div className="collage-footer-bar">
                <div className="collage-footer-text">
                  <strong>CLUB CARNIVAL ORIENTATION</strong>
                  <span>Welcoming batch of students to the Fun Tech family</span>
                </div>
                <span className="collage-zoom-hint">
                  <Maximize2 size={13} /> Full Photo
                </span>
              </div>
            </div>
            <div className="collage-side reveal">
              <div
                className="side-card side-card-mint"
                role="button"
                tabIndex={0}
                onClick={() =>
                  setSelectedPoster({
                    src: '/images/funtech/TechBuzz2.jpg',
                    title: 'TechBuzz: Code Together',
                    meta: 'Interactive workshop at MITS auditorium',
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPoster({
                      src: '/images/funtech/TechBuzz2.jpg',
                      title: 'TechBuzz: Code Together',
                      meta: 'Interactive workshop at MITS auditorium',
                    });
                  }
                }}
                title="Click to view full image"
                aria-label="View full TechBuzz photo"
              >
                <div className="side-card-image-wrap">
                  <img
                    className="side-card-image"
                    src="/images/funtech/TechBuzz2.jpg"
                    alt="TechBuzz students coding together"
                    loading="lazy"
                  />
                </div>
                <div className="side-card-content">
                  <div className="side-card-icon">
                    <Code2 size={22} />
                  </div>
                  <span>
                    CODE<br />TOGETHER
                  </span>
                </div>
              </div>
              <div
                className="side-card side-card-lavender"
                role="button"
                tabIndex={0}
                onClick={() =>
                  setSelectedPoster({
                    src: '/images/funtech/Club carnival 2.jpg',
                    title: 'Club Carnival: Student & Faculty Coordinators',
                    meta: 'Fun Tech stall celebration at MITS',
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPoster({
                      src: '/images/funtech/Club carnival 2.jpg',
                      title: 'Club Carnival: Student & Faculty Coordinators',
                      meta: 'Fun Tech stall celebration at MITS',
                    });
                  }
                }}
                title="Click to view full image"
                aria-label="View full Club Carnival group photo"
              >
                <div className="side-card-image-wrap">
                  <img
                    className="side-card-image"
                    src="/images/funtech/Club carnival 2.jpg"
                    alt="Faculty coordinators and student team at Club Carnival"
                    loading="lazy"
                  />
                </div>
                <div className="side-card-content">
                  <div className="side-card-icon">
                    <Trophy size={22} />
                  </div>
                  <span>
                    COMPETE<br />KINDLY
                  </span>
                </div>
              </div>
              <div
                className="side-card side-card-coral"
                role="button"
                tabIndex={0}
                onClick={() =>
                  setSelectedPoster({
                    src: '/images/funtech/Techmania2.jpg',
                    title: 'TechMania: Learn Out Loud',
                    meta: 'Young Thinkers Conclave at MITS Seminar Hall',
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPoster({
                      src: '/images/funtech/Techmania2.jpg',
                      title: 'TechMania: Learn Out Loud',
                      meta: 'Young Thinkers Conclave at MITS Seminar Hall',
                    });
                  }
                }}
                title="Click to view full image"
                aria-label="View full TechMania photo"
              >
                <div className="side-card-image-wrap">
                  <img
                    className="side-card-image"
                    src="/images/funtech/Techmania2.jpg"
                    alt="TechMania conclave session"
                    loading="lazy"
                  />
                </div>
                <div className="side-card-content">
                  <div className="side-card-icon">
                    <BookOpen size={22} />
                  </div>
                  <span>
                    LEARN<br />OUT LOUD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section people-section" id="people" aria-labelledby="people-title">
          <div className="people-copy reveal">
            <p className="eyebrow">Behind the club</p>
            <h2 id="people-title">
              Built by<br />
              <em>people,</em> not profiles.
            </h2>
            <p className="people-description">
              The student team keeps Fun Tech open, active, and a little unpredictable. Our faculty coordinators make
              sure the curiosity has somewhere to go.
            </p>
            <a className="text-link" href="#join" data-testid="link-people-join">
              Say hello &amp; join us <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="people-cards reveal">
            <article className="person-card person-tej">
              <div className="person-image-wrap">
                <img
                  className="person-image"
                  src="/images/funtech/cordinator-image1.jpg"
                  alt="Dr. Tej Singh"
                  loading="lazy"
                />
              </div>
              <div className="person-info">
                <span>FACULTY COORDINATOR</span>
                <h3>Dr. Tej Singh</h3>
                <p className="person-role">Assistant Professor</p>
              </div>
            </article>
            <article className="person-card person-priyanka">
              <div className="person-image-wrap">
                <img
                  className="person-image"
                  src="/images/funtech/cordinator-image2.jpg"
                  alt="Dr. Priyanka Garg"
                  loading="lazy"
                />
              </div>
              <div className="person-info">
                <span>FACULTY COORDINATOR</span>
                <h3>Dr. Priyanka Garg</h3>
                <p className="person-role">Assistant Professor</p>
              </div>
            </article>
          </div>
        </section>

        <section className="section faq-section" id="questions" aria-labelledby="faq-title">
          <div className="faq-intro reveal">
            <p className="eyebrow">The questions people actually ask</p>
            <h2 id="faq-title">
              No silly<br />
              <em>questions.</em>
            </h2>
            <Zap size={28} strokeWidth={1.6} />
          </div>
          <div className="faq-list reveal">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div className={`faq-item ${isOpen ? 'faq-open' : ''}`} key={faq.question}>
                  <button
                    className="faq-question"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    data-testid={`button-faq-${index}`}
                  >
                    <span>
                      <b>0{index + 1}</b>
                      {faq.question}
                    </span>
                    <ChevronDown size={19} />
                  </button>
                  <div className="faq-answer" aria-hidden={!isOpen}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Comprehensive Registration & Membership Form Section */}
        <section className="join-section" id="join" aria-labelledby="join-title">
          <div className="join-doodle doodle-one" aria-hidden="true">
            +
          </div>
          <div className="join-doodle doodle-two" aria-hidden="true">
            ?
          </div>
          <div className="join-inner">
            <p className="eyebrow eyebrow-light reveal">Official Registration</p>
            <h2 id="join-title" className="reveal">
              Bring your<br />
              <em>what if?</em>
            </h2>
            <p className="join-copy reveal">
              Join Fun Tech Club MITS or reserve your seat for the next Dev Sprint. No prerequisites — curiosity is all you need.
            </p>

            {submittedPass ? (
              /* Member Pass / Successful Confirmation Card */
              <div className="member-pass reveal" role="status" data-testid="status-join-success">
                <div className="member-pass-header">
                  <span className="member-badge">FT-MITS CONFIRMED</span>
                  <span className="member-id">{submittedPass.memberId}</span>
                </div>
                <div className="member-pass-body">
                  <div className="member-check-circle">
                    <Check size={28} />
                  </div>
                  <h3>You are in, {submittedPass.fullName}!</h3>
                  <p className="member-pass-desc">
                    Welcome to the Fun Tech community. We have registered{' '}
                    <strong>{submittedPass.email}</strong> ({submittedPass.branch}, {submittedPass.year}).
                  </p>

                  {submittedPass.rsvpTechBuzz && (
                    <div className="member-rsvp-highlight">
                      <strong>⚡ Seat Confirmed: TechBuzz Dev Sprint</strong>
                      <span>28 Sep · 4:00 PM · LT-2 (Bring your laptop)</span>
                      <a
                        href={events[0].googleCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-light pass-calendar-btn"
                      >
                        <CalendarPlus size={16} /> Add to Google Calendar
                      </a>
                    </div>
                  )}

                  <div className="member-interests-summary">
                    <span>Your registered curiosity areas:</span>
                    <div className="member-interests-chips">
                      {submittedPass.interests.map((it) => (
                        <span key={it} className="interest-chip-badge">
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="member-pass-actions">
                    <button
                      type="button"
                      className="button button-ghost-pass"
                      onClick={() => {
                        setSubmittedPass(null);
                        setFullName('');
                        setEmail('');
                        setPhone('');
                      }}
                    >
                      <RotateCcw size={15} /> Register Another Student
                    </button>
                    <a
                      href="https://www.instagram.com/funtech_club.mits"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button-light"
                    >
                      <Instagram size={16} /> Join Instagram Channel
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* Complete Interactive Application Form */
              <div className="join-form-wrapper reveal">
                <div className="form-mode-tabs" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={formType === 'membership'}
                    className={`form-mode-btn ${formType === 'membership' ? 'active' : ''}`}
                    onClick={() => setFormType('membership')}
                  >
                    Club Membership Application
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={formType === 'rsvp'}
                    className={`form-mode-btn ${formType === 'rsvp' ? 'active' : ''}`}
                    onClick={() => setFormType('rsvp')}
                  >
                    TechBuzz Dev Sprint RSVP
                  </button>
                </div>

                <form className="join-comprehensive-form" onSubmit={handleFormSubmit}>
                  <div className="form-grid">
                    <div className="form-field">
                      <label htmlFor="input-full-name">Full Name *</label>
                      <input
                        id="input-full-name"
                        type="text"
                        placeholder="e.g. Aarav Sharma"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        data-testid="input-join-name"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="input-college-email">College / Student Email *</label>
                      <input
                        id="input-college-email"
                        type="email"
                        placeholder="your.name@mitsgwalior.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        data-testid="input-join-email"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="select-branch">Branch / Department</label>
                      <select
                        id="select-branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                      >
                        {availableBranches.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="select-year">Year of Study</label>
                      <select
                        id="select-year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      >
                        <option value="1st Year">1st Year (Batch of 2028)</option>
                        <option value="2nd Year">2nd Year (Batch of 2027)</option>
                        <option value="3rd Year">3rd Year (Batch of 2026)</option>
                        <option value="4th Year">4th Year (Batch of 2025)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-interests-section">
                    <label className="section-label">
                      What are you excited to build or explore? (Select all that apply)
                    </label>
                    <div className="interest-chips-group">
                      {availableInterests.map((interest) => {
                        const isSelected = interests.includes(interest);
                        return (
                          <button
                            type="button"
                            key={interest}
                            className={`interest-chip-btn ${isSelected ? 'selected' : ''}`}
                            onClick={() => toggleInterest(interest)}
                          >
                            {isSelected ? <Check size={13} /> : '+'} {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="form-rsvp-checkbox">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={rsvpTechBuzz}
                        onChange={(e) => setRsvpTechBuzz(e.target.checked)}
                      />
                      <span className="checkbox-custom" />
                      <span className="checkbox-label-text">
                        <strong>Reserve my seat for TechBuzz Dev Sprint (28 Sep · LT-2)</strong>
                        <small>Interactive workshop, laptop session, peer problem-solving.</small>
                      </span>
                    </label>
                  </div>

                  <div className="form-field">
                    <label htmlFor="input-curiosity">
                      What is a question or project idea you’ve been wondering about? (Optional)
                    </label>
                    <textarea
                      id="input-curiosity"
                      rows={2}
                      placeholder="e.g. How to build an AI agent, deploy an app, or make a hardware robot..."
                      value={curiosityNote}
                      onChange={(e) => setCuriosityNote(e.target.value)}
                    />
                  </div>

                  <button
                    className="button button-submit-form"
                    type="submit"
                    data-testid="button-join-submit"
                  >
                    <span>Pull Up a Chair · Submit Application</span>
                    <ArrowUpRight size={19} />
                  </button>
                </form>
              </div>
            )}

            <div className="join-foot reveal">
              <span>
                <Mail size={15} /> funtech@mitsgwalior.in
              </span>
              <span>
                <MapPin size={15} /> Madhav Institute of Technology &amp; Science, Gwalior
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with user requested authorship */}
      <footer className="site-footer">
        <a className="brand footer-brand" href="#top" data-testid="link-footer-home">
          <span className="brand-mark" aria-hidden="true">
            <img src="/images/funtech/Funtech-favicon.png" alt="Fun Tech Logo" />
          </span>
          <span className="brand-copy">
            FUN TECH<small>MITS · GWALIOR</small>
          </span>
        </a>
        <p>
          Where technology meets fun
          <br />
          and innovation.
        </p>
        <div className="footer-links">
          <a href="#calendar" data-testid="link-footer-events">
            Events
          </a>
          <a href="#questions" data-testid="link-footer-faq">
            FAQ
          </a>
          <a href="mailto:funtech@mitsgwalior.in" data-testid="link-footer-mail">
            Contact
          </a>
          <a
            href="https://www.instagram.com/funtech_club.mits"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fun Tech on Instagram"
            data-testid="link-footer-instagram"
          >
            <Instagram size={17} />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fun Tech on LinkedIn"
            data-testid="link-footer-linkedin"
          >
            <Linkedin size={17} />
          </a>
        </div>
        <div className="footer-credits">
          <p className="footer-made-by">
            Made by <strong>Jatin Sharma</strong> for fun With heart{' '}
            <span className="heart-icon">❤️</span>
          </p>
          <span className="footer-year">© 2026 Made by Jatin Sharma</span>
        </div>
      </footer>

      {/* Complete, uncropped full-poster / image preview modal with quick actions */}
      {selectedPoster && (
        <div
          className="poster-modal-backdrop"
          onClick={() => setSelectedPoster(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-poster-title"
        >
          <div className="poster-modal-shell" onClick={(e) => e.stopPropagation()}>
            <div className="poster-modal-header">
              <div>
                {selectedPoster.tag && <span className="event-tag">{selectedPoster.tag}</span>}
                <h3 id="modal-poster-title">{selectedPoster.title}</h3>
                {selectedPoster.meta && <p className="poster-modal-meta">{selectedPoster.meta}</p>}
              </div>
              <button
                type="button"
                className="poster-modal-close"
                onClick={() => setSelectedPoster(null)}
                aria-label="Close full view"
              >
                <X size={22} />
              </button>
            </div>
            <div className="poster-modal-image-container">
              <img
                src={selectedPoster.src}
                alt={selectedPoster.title}
                className="poster-modal-full-img"
              />
            </div>
            <div className="poster-modal-footer">
              <div className="modal-footer-actions">
                {selectedPoster.googleCalendarUrl && (
                  <a
                    href={selectedPoster.googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-action-btn modal-btn-calendar"
                  >
                    <CalendarPlus size={15} /> Add to Google Calendar
                  </a>
                )}
                {selectedPoster.isUpcoming && (
                  <button
                    type="button"
                    className="modal-action-btn modal-btn-rsvp"
                    onClick={() => {
                      setSelectedPoster(null);
                      handleQuickRsvp(selectedPoster.title);
                    }}
                  >
                    <Send size={14} /> RSVP for Event
                  </button>
                )}
              </div>
              <a
                href={selectedPoster.src}
                target="_blank"
                rel="noopener noreferrer"
                className="poster-modal-link"
              >
                Open full resolution <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;