import React from "react";
import {
  TrafficCone,
  Search,
  Bot,
  Car,
  IdCard,
  Compass,
  FileText,
  Phone,
  Lightbulb,
  User,
  Send,
  MessageCircle,
  Brain,
  FolderOpen,
  CheckCircle2,
  ArrowLeftRight,
  RefreshCw,
  CreditCard,
  Calendar,
  ClipboardList,
  Clock,
  Globe,
  Smartphone,
  Link2,
  Landmark,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import "./Home.css";

export default function DMTAssist({ onOpenChat }) {
  return (
    <div className="dmt">
      {/* NAVIGATION */}
      <header className="dmt-nav">
        <div className="dmt-nav-inner">
          <a className="dmt-logo" href="#top">
            <span className="dmt-logo-mark">
              <TrafficCone size={22} strokeWidth={2.2} />
            </span>
            <span className="dmt-logo-text">
              DMT Assist
              <span className="dmt-logo-sub">Information &amp; Guidance Concept</span>
            </span>
          </a>

          <nav className="dmt-nav-links" aria-label="Main Navigation">
            <a href="#services">Services</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#questions">Popular Questions</a>
            <a href="#trust">About</a>
          </nav>

          <div className="dmt-nav-actions">
            <div className="dmt-lang">
              <button className="dmt-lang-btn" type="button">සිංහල</button>
              <span className="dmt-lang-divider">/</span>
              <button className="dmt-lang-btn" type="button">தமிழ்</button>
              <span className="dmt-lang-divider">/</span>
              <button className="dmt-lang-btn dmt-lang-active" type="button">English</button>
            </div>
            <button
              type="button"
              className="dmt-btn dmt-btn-primary dmt-btn-nav"
              onClick={onOpenChat}
            >
              <Sparkles size={16} />
              Ask DMT Assistant
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO SECTION */}
        <section className="dmt-hero">
          <div className="dmt-hero-inner">
            <div className="dmt-hero-copy">
              <div className="dmt-badge">
                <span className="dmt-badge-dot"></span>
                Department of Motor Traffic · Sri Lanka
              </div>
              <h1>
                Not Sure What to Do at <span>DMT</span>? Just Ask.
              </h1>
              <p className="dmt-hero-sub">
                Get clear, step-by-step guidance for driving licences, vehicle
                registration, ownership transfers, documents, and more — all in one place.
              </p>

              <div className="dmt-hero-search">
                <label htmlFor="dmt-search" className="dmt-hero-search-label">
                  What do you need help with?
                </label>
                <div className="dmt-hero-search-box">
                  <Search className="dmt-search-icon" size={18} aria-hidden="true" />
                  <input
                    id="dmt-search"
                    type="text"
                    placeholder="Ask anything about DMT..."
                    readOnly
                    onClick={onOpenChat}
                  />
                  <kbd className="dmt-kbd">⌘K</kbd>
                </div>
                <div className="dmt-hero-examples">
                  <span>“How do I renew my driving licence?”</span>
                  <span>“What documents do I need to transfer ownership?”</span>
                  <span>“I lost my driving licence. What should I do?”</span>
                </div>
              </div>

              <div className="dmt-hero-cta">
                <button
                  type="button"
                  className="dmt-btn dmt-btn-primary"
                  onClick={onOpenChat}
                >
                  <MessageCircle size={18} />
                  Ask DMT Assistant
                </button>
                <a href="#services" className="dmt-btn dmt-btn-secondary">
                  Explore Services
                </a>
              </div>
            </div>

            {/* HERO VISUAL / PREVIEW CARD */}
            <div className="dmt-hero-visual">
              <div className="dmt-hero-card-preview">
                <div className="dmt-hero-chip-head">
                  <Bot className="dmt-icon" size={20} />
                  <span>Instant DMT Guidance</span>
                </div>
                <p className="dmt-hero-chip-q">“What do I need for vehicle transfer?”</p>
                <div className="dmt-hero-chip-a">
                  <p><strong>Required Documents:</strong></p>
                  <ul>
                    <li>MTA 6 Application Form</li>
                    <li>Original Registration Certificate</li>
                    <li>NIC / Passport copies of both parties</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE PROBLEM SECTION */}
        <section className="dmt-section dmt-problem">
          <div className="dmt-section-inner">
            <p className="dmt-eyebrow dmt-eyebrow-center">The Problem</p>
            <h2 className="dmt-section-title">
              Getting Help Shouldn&apos;t Be This Complicated
            </h2>
            <p className="dmt-section-sub">
              Finding the right information about motor-traffic services can be difficult. 
              People often search multiple websites, watch videos, or make long phone calls before knowing what to do.
            </p>

            <div className="dmt-grid dmt-grid-4">
              <div className="dmt-card">
                <div className="dmt-card-icon-wrapper">
                  <Search size={22} />
                </div>
                <h3>Too Much Searching</h3>
                <p className="dmt-card-q">Where do I find official info?</p>
                <p>Information is scattered across different sites and outdated portals.</p>
              </div>

              <div className="dmt-card">
                <div className="dmt-card-icon-wrapper">
                  <Compass size={22} />
                </div>
                <h3>Unclear Processes</h3>
                <p className="dmt-card-q">What do I need to do first?</p>
                <p>Knowing your goal is easy, but finding the exact steps is frustrating.</p>
              </div>

              <div className="dmt-card">
                <div className="dmt-card-icon-wrapper">
                  <FileText size={22} />
                </div>
                <h3>Document Confusion</h3>
                <p className="dmt-card-q">Which documents do I bring?</p>
                <p>Missing a single form can result in wasted days and trips back home.</p>
              </div>

              <div className="dmt-card">
                <div className="dmt-card-icon-wrapper">
                  <Phone size={22} />
                </div>
                <h3>Calling for Answers</h3>
                <p className="dmt-card-q">Who should I ask?</p>
                <p>Simple questions lead to endless calls, long hold times, or guesswork.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SCENARIO COMPARISON */}
        <section className="dmt-section dmt-scenario">
          <div className="dmt-section-inner">
            <p className="dmt-eyebrow dmt-eyebrow-center">A Familiar Story</p>
            <h2 className="dmt-section-title">We&apos;ve All Been Here.</h2>
            <p className="dmt-scenario-quote">
              “I need to transfer my vehicle to someone else. What do I need?”
            </p>

            <div className="dmt-scenario-compare">
              <div className="dmt-scenario-col dmt-scenario-before">
                <h3>The Traditional Way</h3>
                <ol className="dmt-flow">
                  <li>Search Google for random forum guides</li>
                  <li>Watch multi-part YouTube videos</li>
                  <li>Ask friends for conflicting advice</li>
                  <li>Call DMT offices and wait on hold</li>
                  <li className="dmt-flow-end">Still unsure if you have the right forms</li>
                </ol>
              </div>

              <div className="dmt-scenario-divider" aria-hidden="true">
                <ArrowRight size={22} />
              </div>

              <div className="dmt-scenario-col dmt-scenario-after">
                <h3>With DMT Assistant</h3>
                <ol className="dmt-flow">
                  <li>Ask: “I want to transfer ownership of my car. What do I need?”</li>
                  <li>Get an instant, structured breakdown</li>
                  <li>Download the exact MTA forms required</li>
                  <li>Know which regional office to visit</li>
                  <li className="dmt-flow-end">Complete your task with total clarity</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* MEET THE ASSISTANT */}
        <section id="assistant" className="dmt-section dmt-assistant">
          <div className="dmt-section-inner dmt-assistant-inner">
            <div className="dmt-assistant-copy">
              <p className="dmt-eyebrow">The Solution</p>
              <h2 className="dmt-section-title dmt-section-title-left">
                Meet Your DMT Assistant
              </h2>
              <p>
                A smart digital assistant built to simplify Department of Motor Traffic 
                services, answer your specific questions, and navigate you through every process.
              </p>
              <div className="dmt-assistant-note">
                <Lightbulb size={18} className="dmt-note-icon" />
                <span>
                  <strong>Interactive Preview:</strong> Click any prompt to launch a full live consultation with the assistant.
                </span>
              </div>
            </div>

            <div className="dmt-chat-mock" role="img" aria-label="Preview of a DMT Assistant conversation">
              <div className="dmt-chat-head">
                <div className="dmt-chat-head-user">
                  <div className="dmt-chat-avatar">
                    <Bot size={18} />
                  </div>
                  <div className="dmt-chat-title">
                    <span>DMT Assistant</span>
                    <span className="dmt-chat-status">Online · Official Info Mode</span>
                  </div>
                </div>
              </div>

              <div className="dmt-chat-body">
                <div className="dmt-chat-bubble dmt-chat-bot">
                  Hello! How can I help you with DMT services today?
                </div>
                <div className="dmt-chat-bubble dmt-chat-user">
                  <User size={14} aria-hidden="true" /> I lost my driving licence. What should I do?
                </div>
                <div className="dmt-chat-bubble dmt-chat-bot">
                  Don&apos;t worry! Here is what you need to obtain a duplicate licence:
                  <ol>
                    <li>Obtain a Police Report from your local station.</li>
                    <li>Get a Medical Certificate from National Transport Medical Institute (NTMI).</li>
                    <li>Visit the DMT office in Werahera or your District Office.</li>
                  </ol>
                  <span className="dmt-chat-link" onClick={onOpenChat}>
                    View detailed procedure <ArrowRight size={14} />
                  </span>
                </div>
              </div>

              <div className="dmt-chat-input" onClick={onOpenChat}>
                <span>Type your question...</span>
                <Send className="dmt-send-icon" size={16} />
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="dmt-section dmt-how">
          <div className="dmt-section-inner">
            <p className="dmt-eyebrow dmt-eyebrow-center">How It Works</p>
            <h2 className="dmt-section-title">From Question to Clear Answer</h2>

            <div className="dmt-grid dmt-grid-4">
              <div className="dmt-step">
                <span className="dmt-step-num">01</span>
                <div className="dmt-step-icon">
                  <MessageCircle size={24} />
                </div>
                <h3>Ask</h3>
                <p>Describe your issue in plain language.</p>
                <p className="dmt-step-example">“I want to renew my driving licence.”</p>
              </div>

              <div className="dmt-step">
                <span className="dmt-step-num">02</span>
                <div className="dmt-step-icon">
                  <Brain size={24} />
                </div>
                <h3>Analyze</h3>
                <p>The AI matches your question with up-to-date DMT regulations.</p>
              </div>

              <div className="dmt-step">
                <span className="dmt-step-num">03</span>
                <div className="dmt-step-icon">
                  <FolderOpen size={24} />
                </div>
                <h3>Guide</h3>
                <p>Receive step-by-step guidance and exact document checklists.</p>
              </div>

              <div className="dmt-step">
                <span className="dmt-step-num">04</span>
                <div className="dmt-step-icon">
                  <CheckCircle2 size={24} />
                </div>
                <h3>Action</h3>
                <p>Visit the office prepared and complete your service seamlessly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* POPULAR QUESTIONS */}
        <section id="questions" className="dmt-section dmt-questions">
          <div className="dmt-section-inner">
            <p className="dmt-eyebrow dmt-eyebrow-center">Popular Questions</p>
            <h2 className="dmt-section-title">What Can You Ask?</h2>

            <div className="dmt-grid dmt-grid-3">
              <div className="dmt-qcard" onClick={onOpenChat}>
                <div className="dmt-qcard-icon">
                  <Car size={22} />
                </div>
                <h3>Vehicle Registration</h3>
                <p>How do I register a newly imported or pre-owned vehicle?</p>
              </div>

              <div className="dmt-qcard" onClick={onOpenChat}>
                <div className="dmt-qcard-icon">
                  <ArrowLeftRight size={22} />
                </div>
                <h3>Ownership Transfer</h3>
                <p>What forms and signatures are required for normal vs. absolute transfers?</p>
              </div>

              <div className="dmt-qcard" onClick={onOpenChat}>
                <div className="dmt-qcard-icon">
                  <IdCard size={22} />
                </div>
                <h3>Driving Licence</h3>
                <p>How do I apply for a new driving licence or heavy vehicle permit?</p>
              </div>

              <div className="dmt-qcard" onClick={onOpenChat}>
                <div className="dmt-qcard-icon">
                  <RefreshCw size={22} />
                </div>
                <h3>Licence Renewal</h3>
                <p>How do I renew an expired driving licence or convert an foreign licence?</p>
              </div>

              <div className="dmt-qcard" onClick={onOpenChat}>
                <div className="dmt-qcard-icon">
                  <FileText size={22} />
                </div>
                <h3>Documents &amp; Forms</h3>
                <p>Where can I download official MTA application forms directly?</p>
              </div>

              <div className="dmt-qcard" onClick={onOpenChat}>
                <div className="dmt-qcard-icon">
                  <Search size={22} />
                </div>
                <h3>Vehicle Information</h3>
                <p>How can I verify vehicle ownership details and revenue licence status?</p>
              </div>
            </div>
          </div>
        </section>

        {/* BIG CTA */}
        <section className="dmt-section dmt-cta-big">
          <div className="dmt-section-inner dmt-cta-big-inner">
            <h2>Have a Question About DMT?</h2>
            <p>Skip the guesswork and search engines. Get an instant answer now.</p>

            <button
              type="button"
              onClick={onOpenChat}
              className="dmt-btn dmt-btn-primary dmt-btn-lg"
            >
              Ask DMT Assistant <ArrowRight size={18} />
            </button>

            <p className="dmt-cta-lang">Available in සිංහල · தமிழ் · English</p>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="dmt-section dmt-benefits">
          <div className="dmt-section-inner">
            <p className="dmt-eyebrow dmt-eyebrow-center">Benefits</p>
            <h2 className="dmt-section-title">Make Every DMT Task Effortless</h2>

            <div className="dmt-grid dmt-grid-3">
              <div className="dmt-benefit">
                <div className="dmt-benefit-icon">
                  <Compass size={24} />
                </div>
                <h3>Clear Guidance</h3>
                <p>Get simple, logical steps tailored to your specific situation.</p>
              </div>

              <div className="dmt-benefit">
                <div className="dmt-benefit-icon">
                  <ClipboardList size={24} />
                </div>
                <h3>Complete Preparation</h3>
                <p>Know all document and fee requirements before you leave home.</p>
              </div>

              <div className="dmt-benefit">
                <div className="dmt-benefit-icon">
                  <Clock size={24} />
                </div>
                <h3>Save Valuable Hours</h3>
                <p>Avoid multiple trips by doing things right the very first time.</p>
              </div>

              <div className="dmt-benefit">
                <div className="dmt-benefit-icon">
                  <Globe size={24} />
                </div>
                <h3>Trilingual Support</h3>
                <p>Ask and read answers comfortably in Sinhala, Tamil, or English.</p>
              </div>

              <div className="dmt-benefit">
                <div className="dmt-benefit-icon">
                  <Smartphone size={24} />
                </div>
                <h3>24/7 Availability</h3>
                <p>Get reliable assistance anytime from your phone or laptop.</p>
              </div>

              <div className="dmt-benefit">
                <div className="dmt-benefit-icon">
                  <Link2 size={24} />
                </div>
                <h3>Grounded in Official Info</h3>
                <p>Answers are continuously mapped against official DMT guidelines.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES LIST */}
        <section id="services" className="dmt-section dmt-services">
          <div className="dmt-section-inner">
            <p className="dmt-eyebrow dmt-eyebrow-center">Services</p>
            <h2 className="dmt-section-title">Everything DMT. One Place.</h2>

            <div className="dmt-grid dmt-grid-4">
              {[
                { Icon: IdCard, label: "Driving Licence" },
                { Icon: Car, label: "Vehicle Registration" },
                { Icon: ArrowLeftRight, label: "Ownership Transfer" },
                { Icon: CreditCard, label: "Revenue Licence" },
                { Icon: Search, label: "Vehicle Information" },
                { Icon: FileText, label: "Forms & Documents" },
                { Icon: Calendar, label: "Appointments" },
                { Icon: FolderOpen, label: "Other DMT Services" },
              ].map(({ Icon, label }) => (
                <div className="dmt-service" key={label} onClick={onOpenChat}>
                  <Icon className="dmt-icon" size={20} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST & DISCLAIMER */}
        <section id="trust" className="dmt-section dmt-trust">
          <div className="dmt-section-inner">
            <p className="dmt-eyebrow dmt-eyebrow-center">Trust &amp; Transparency</p>
            <h2 className="dmt-section-title">Guidance You Can Rely On</h2>
            <p className="dmt-section-sub">
              Designed with accuracy in mind to ensure smooth government service interactions.
            </p>

            <div className="dmt-grid dmt-grid-4">
              <div className="dmt-trust-item">
                <Landmark size={18} />
                <span>Official Sources</span>
              </div>
              <div className="dmt-trust-item">
                <RefreshCw size={18} />
                <span>Updated Regulations</span>
              </div>
              <div className="dmt-trust-item">
                <CheckCircle2 size={18} />
                <span>Clear Instructions</span>
              </div>
              <div className="dmt-trust-item">
                <Link2 size={18} />
                <span>Verified Links</span>
              </div>
            </div>

            <div className="dmt-disclaimer">
              <AlertTriangle size={20} className="dmt-disclaimer-icon" />
              <p>
                <strong>Disclaimer:</strong> DMT Assist provides informational guidance based on public government guidelines. Always verify crucial requirements, official fee structures, and instructions at an official Department of Motor Traffic office before making payments or submissions.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="dmt-footer">
        <div className="dmt-footer-inner">
          <div className="dmt-footer-col dmt-footer-brand">
            <a className="dmt-logo dmt-logo-footer" href="#top">
              <span className="dmt-logo-mark">
                <TrafficCone size={20} />
              </span>
              <span className="dmt-logo-text">DMT Assist</span>
            </a>
            <p>
              Making Department of Motor Traffic information easier to understand and accessible for everyone in Sri Lanka.
            </p>
          </div>

          <div className="dmt-footer-col">
            <h4>Quick Links</h4>
            <a href="#services">Services</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#questions">FAQs</a>
            <a href="#assistant">Ask Assistant</a>
          </div>

          <div className="dmt-footer-col">
            <h4>Languages</h4>
            <a href="#top">සිංහල</a>
            <a href="#top">தமிழ்</a>
            <a href="#top">English</a>
          </div>

          <div className="dmt-footer-col dmt-footer-important">
            <h4>Important Notice</h4>
            <p>
              This digital tool is an informational concept and does not issue legal documents or process direct government payments.
            </p>
          </div>
        </div>

        <div className="dmt-footer-official">
          <p>
            <strong>Official Department of Motor Traffic Head Office:</strong> No. 341, Alvitigala Mawatha, Narahenpita, Colombo 05, Sri Lanka.
          </p>
        </div>

        <div className="dmt-footer-bottom">
          <p>
            © {new Date().getFullYear()} DMT Assist Concept · Designed with precision for Sri Lankan citizens.
          </p>
        </div>
      </footer>
    </div>
  );
}