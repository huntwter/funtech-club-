import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  Trophy,
  Users,
  Wrench,
  X,
  Zap,
} from 'lucide-react';

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
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Make something.',
    copy: 'Small builds, messy prototypes, and beautifully over-engineered experiments all count as progress here.',
    tint: 'mint',
  },
  {
    number: '03',
    icon: Users,
    title: 'Find your people.',
    copy: 'The best technical shortcuts are often conversations. Meet the folks who will stay late to debug with you.',
    tint: 'lavender',
  },
];

const events = [
  {
    date: '06',
    month: 'SEP',
    title: 'Build Night: Tiny Games',
    tag: 'MAKE',
    meta: 'B-Block Lab 204 · 5:30 PM',
    copy: 'A low-stakes evening of strange mechanics, tiny sprites, and playable ideas. Bring a laptop or just an idea.',
    tone: 'coral',
    image: '/images/funtech/Techmania2.jpg',
    status: 'completed',
  },
  {
    date: '14',
    month: 'SEP',
    title: 'The Placement Room',
    tag: 'TALK',
    meta: 'LT-2 · 4:00 PM',
    copy: 'Honest notes on projects, portfolios, and the first technical interview — led by seniors who have been there.',
    tone: 'ink',
    image: '/images/funtech/placement.jpg',
    status: 'completed',
  },
  {
    date: '21',
    month: 'SEP',
    title: 'Circuit Playground',
    tag: 'LAB',
    meta: 'Innovation Cell · 11:00 AM',
    copy: 'Make LEDs dance, sensors misbehave, and physical computing feel less like a textbook.',
    tone: 'mint',
    image: '/images/funtech/TechBuzz2.jpg',
    status: 'upcoming',
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
  const [joined, setJoined] = useState(false);
  const [email, setEmail] = useState('');
  const [savedEvents, setSavedEvents] = useState<number[]>([]);

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

  const handleJoin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
  };

  const toggleSavedEvent = (index: number) => {
    setSavedEvents((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  };

  const renderEventCard = ({ event, index }: { event: (typeof events)[number]; index: number }) => (
    <article className={`event-card event-${event.tone} ${event.status === 'completed' ? 'event-completed' : ''} reveal`} key={event.title} data-testid={`card-event-${index}`}>
      <div className="event-image-wrap">
        <img src={event.image} alt="" loading="lazy" />
      </div>
      <div className="event-card-body">
        <div className="event-card-top">
          <div className="event-date" aria-label={`${event.date} ${event.month}`}>
            <strong>{event.date}</strong>
            <span>{event.month}</span>
          </div>
          <span className="event-tag">{event.tag}</span>
          <span className={`event-status ${event.status === 'upcoming' ? 'event-status-upcoming' : 'event-status-completed'}`}>
            {event.status === 'upcoming' ? 'UPCOMING' : 'COMPLETED'}
          </span>
          {event.status === 'upcoming' ? (
            <button
              className={`event-action ${savedEvents.includes(index) ? 'event-saved' : ''}`}
              type="button"
              aria-label={savedEvents.includes(index) ? `Remove ${event.title} from saved events` : `Save ${event.title}`}
              aria-pressed={savedEvents.includes(index)}
              onClick={() => toggleSavedEvent(index)}
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
          <h3>{event.title}</h3>
          <p>{event.copy}</p>
        </div>
        <div className="event-meta">
          <span><MapPin size={14} /> {event.meta.split(' · ')[0]}</span>
          <span><Clock3 size={14} /> {event.meta.split(' · ')[1]}</span>
        </div>
      </div>
    </article>
  );

  const eventEntries = events.map((event, index) => ({ event, index }));
  const upcomingEvents = eventEntries.filter(({ event }) => event.status === 'upcoming');
  const completedEvents = eventEntries.filter(({ event }) => event.status === 'completed');

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header" data-testid="header-site">
        <a className="brand" href="#top" aria-label="Fun Tech Club home" data-testid="link-home">
          <span className="brand-mark" aria-hidden="true">
            <img src="/images/funtech/Funtech-favicon.png" alt="" />
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
          <a className="nav-join" href="#join" data-testid="link-nav-join" onClick={() => setMenuOpen(false)}>
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
                Find your way in <ArrowDownRight size={18} />
              </a>
              <a className="text-link" href="#calendar" data-testid="link-hero-calendar">
                See what’s happening <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="hero-art reveal" aria-label="Abstract graphic showing connected ideas">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="art-sticker sticker-top">NO<br />SERIOUS<br />FACES</div>
            <div className="art-core">
              <span>FT</span>
              <small>EST.<br />2019</small>
            </div>
            <div className="art-note note-one">build<br />→ break<br />→ learn</div>
            <div className="art-note note-two">curious<br />is a skill</div>
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
            <span className="scribble-arrow" aria-hidden="true">↳</span>
          </div>
          <div className="reason-list">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <article className={`reason-card reason-${reason.tint} reveal`} key={reason.number} data-testid={`card-reason-${reason.number}`}>
                  <div className="reason-top">
                    <span className="reason-number">{reason.number}</span>
                    <Icon size={21} strokeWidth={1.8} />
                  </div>
                  <h3>{reason.title}</h3>
                  <p>{reason.copy}</p>
                  <ArrowUpRight className="reason-arrow" size={20} />
                </article>
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
              <div className="stamp">FUN<br />TECH<br />MITS</div>
              <p>
                Creativity through tech exploration.<br />
                Coding and STEM skills, with a little<br />
                more room for play.
              </p>
            </div>
          </div>
          <div className="manifesto-side-note">FIELD NOTES / 001</div>
        </section>

        <section className="section calendar-section" id="calendar" aria-labelledby="calendar-title">
          <div className="calendar-header reveal">
            <div>
              <p className="eyebrow">Put it in your calendar</p>
              <h2 id="calendar-title">Coming up<br /><em>at the club.</em></h2>
            </div>
            <p className="calendar-aside">
              One workshop, one conversation, one excuse to get out of your room. New things land here as we
              make them.
            </p>
          </div>
          <div className="event-group event-group-upcoming">
            <div className="event-group-heading">
              <h3>Next up</h3>
              <span>Save your spot</span>
            </div>
            <div className="events-list">
              {upcomingEvents.map(renderEventCard)}
            </div>
          </div>
          <div className="event-group event-group-completed">
            <div className="event-group-heading">
              <h3>Past events</h3>
              <span>Field notes from the club</span>
            </div>
            <div className="events-list">
              {completedEvents.map(renderEventCard)}
            </div>
          </div>
          <a className="calendar-link reveal" href="#join" data-testid="link-calendar-rsvp">
            Get event notes in your inbox <ArrowUpRight size={17} />
          </a>
        </section>

        <section className="lab-section" aria-labelledby="lab-title">
          <div className="lab-top reveal">
            <p className="eyebrow">Seen around campus</p>
            <span className="lab-index">MITS / 26.218° N, 78.182° E</span>
          </div>
          <div className="lab-collage">
            <div className="collage-main reveal">
                <img className="collage-photo" src="/images/funtech/Club carnival.jpg" alt="Fun Tech members gathered around a campus activity" loading="lazy" />
              <div className="collage-grid" />
              <span className="collage-label">THE LAB<br />IS WHERE<br />IT STARTS</span>
              <div className="collage-shape shape-yellow" />
              <div className="collage-shape shape-coral" />
              <div className="collage-shape shape-blue" />
              <span className="collage-caption">A little chaos is a healthy sign.</span>
            </div>
            <div className="collage-side reveal">
              <div className="side-card side-card-mint">
                <img className="side-card-image" src="/images/funtech/TechBuzz2.jpg" alt="" loading="lazy" />
                <Code2 size={27} />
                <span>CODE<br />TOGETHER</span>
              </div>
              <div className="side-card side-card-lavender">
                <img className="side-card-image" src="/images/funtech/Club carnival 2.jpg" alt="" loading="lazy" />
                <Trophy size={27} />
                <span>COMPETE<br />KINDLY</span>
              </div>
              <div className="side-card side-card-coral">
                <img className="side-card-image" src="/images/funtech/Techmania2.jpg" alt="" loading="lazy" />
                <BookOpen size={27} />
                <span>LEARN<br />OUT LOUD</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section people-section" id="people" aria-labelledby="people-title">
          <div className="people-copy reveal">
            <p className="eyebrow">Behind the club</p>
            <h2 id="people-title">Built by<br /><em>people,</em> not profiles.</h2>
            <p className="people-description">
              The student team keeps Fun Tech open, active, and a little unpredictable. Our coordinators make
              sure the curiosity has somewhere to go.
            </p>
            <a className="text-link" href="#join" data-testid="link-people-join">
              Say hello <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="people-cards reveal">
            <article className="person-card person-tej">
              <img className="person-image" src="/images/funtech/cordinator-image1.jpg" alt="Dr. Tej Singh" loading="lazy" />
              <div className="person-info">
                <span>FACULTY COORDINATOR</span>
                <h3>Dr. Tej Singh</h3>
                <p className="person-role">Assistant Professor</p>
              </div>
            </article>
            <article className="person-card person-priyanka">
              <img className="person-image" src="/images/funtech/cordinator-image2.jpg" alt="Dr. Priyanka Garg" loading="lazy" />
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
            <h2 id="faq-title">No silly<br /><em>questions.</em></h2>
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
                    <span><b>0{index + 1}</b>{faq.question}</span>
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

        <section className="join-section" id="join" aria-labelledby="join-title">
          <div className="join-doodle doodle-one" aria-hidden="true">+</div>
          <div className="join-doodle doodle-two" aria-hidden="true">?</div>
          <div className="join-inner">
            <p className="eyebrow eyebrow-light reveal">Your move</p>
            <h2 id="join-title" className="reveal">Bring your<br /><em>what if?</em></h2>
            <p className="join-copy reveal">
              Leave your email and we’ll send the next event, the useful bits, and an invitation to pull up a
              chair.
            </p>
            {joined ? (
              <div className="join-success reveal" role="status" data-testid="status-join-success">
                <span className="success-icon"><Check size={20} /></span>
                You’re on the list. See you in the lab.
              </div>
            ) : (
              <form className="join-form reveal" onSubmit={handleJoin}>
                <label className="sr-only" htmlFor="join-email">Your MITS email address</label>
                <input
                  id="join-email"
                  type="email"
                  placeholder="your.name@mitsgwalior.in"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  data-testid="input-join-email"
                />
                <button className="button button-light" type="submit" data-testid="button-join-submit">
                  I’m curious <ArrowUpRight size={18} />
                </button>
              </form>
            )}
            <div className="join-foot reveal">
              <span><Mail size={15} /> funtech@mitsgwalior.in</span>
              <span><MapPin size={15} /> Madhav Institute of Technology &amp; Science</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top" data-testid="link-footer-home">
          <span className="brand-mark" aria-hidden="true">
            <img src="/images/funtech/Funtech-favicon.png" alt="" />
          </span>
          <span className="brand-copy">FUN TECH<small>MITS · GWALIOR</small></span>
        </a>
        <p>Where technology meets fun<br />and innovation.</p>
        <div className="footer-links">
          <a href="#calendar" data-testid="link-footer-events">Events</a>
          <a href="#questions" data-testid="link-footer-faq">FAQ</a>
          <a href="mailto:funtech@mitsgwalior.in" data-testid="link-footer-mail">Contact</a>
          <a href="https://www.instagram.com/" aria-label="Fun Tech on Instagram" data-testid="link-footer-instagram"><Instagram size={17} /></a>
          <a href="https://www.linkedin.com/" aria-label="Fun Tech on LinkedIn" data-testid="link-footer-linkedin"><Linkedin size={17} /></a>
        </div>
        <span className="footer-year">© 2024–25 / FT-MITS</span>
      </footer>
    </div>
  );
}

export default App;