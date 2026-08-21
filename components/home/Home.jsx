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
} from "lucide-react";
import "./Home.css";

export default function DMTAssist({ onOpenChat }) {
  return (
    <div className="dmt">
      {/* NAVBAR */}
      <header className="dmt-nav">
        <div className="dmt-nav-inner">
          <a className="dmt-logo" href="#top">
            <span className="dmt-logo-mark">
              <TrafficCone size={22} strokeWidth={2} />
            </span>
            <span className="dmt-logo-text">
              DMT Assist
              <span className="dmt-logo-sub">Information &amp; guidance concept</span>
            </span>
          </a>

          <nav className="dmt-nav-links">
            <a href="#services">Services</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#questions">Popular Questions</a>
            <a href="#trust">About</a>
          </nav>

          <div className="dmt-nav-actions">
            <div className="dmt-lang">
              <button className="dmt-lang-btn" type="button">සිංහල</button>
              <span className="dmt-lang-divider">|</span>
              <button className="dmt-lang-btn" type="button">தமிழ்</button>
              <span className="dmt-lang-divider">|</span>
              <button className="dmt-lang-btn dmt-lang-active" type="button">English</button>
            </div>
            <a
              href="#assistant"
              className="dmt-btn dmt-btn-primary dmt-btn-nav"
              onClick={onOpenChat}
            >
              Ask DMT Assistant
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="dmt-hero">
          <div className="dmt-hero-inner">
            <div className="dmt-hero-copy">
              <p className="dmt-eyebrow">Department of Motor Traffic · Sri Lanka</p>
              <h1>
                Not Sure What to Do at <span>DMT</span>? Just Ask.
              </h1>
              <p className="dmt-hero-sub">
                Get clear, step-by-step guidance for driving licences, vehicle
                registration, ownership transfers, documents and more — all in
                one place.
              </p>

              <div className="dmt-hero-search">
                <label htmlFor="dmt-search" className="dmt-hero-search-label">
                  What do you need help with?
                </label>
                <div className="dmt-hero-search-box">
                  <Search className="dmt-icon" size={18} aria-hidden="true" />
                  <input
                    id="dmt-search"
                    type="text"
                    placeholder="Ask anything about DMT..."
                    readOnly
                  />
                </div>
                <div className="dmt-hero-examples">
                  <span>“How do I renew my driving licence?”</span>
                  <span>“What documents do I need to transfer ownership?”</span>
                  <span>“I lost my driving licence. What should I do?”</span>
                </div>
              </div>

              <div className="dmt-hero-cta">
                <a
                  href="#assistant"
                  className="dmt-btn dmt-btn-primary"
                  onClick={onOpenChat}
                >
                  Ask DMT Assistant
                </a>
                <a href="#services" className="dmt-btn dmt-btn-secondary">
                  Explore Services
                </a>
              </div>
            </div>

            
          </div>
        </section>

        {/* PROBLEM */}
        <section className="dmt-section dmt-problem">
          <div className="dmt-section-inner">
            <p className="dmt-eyebrow dmt-eyebrow-center">The Problem</p>
            <h2 className="dmt-section-title">
              Getting Help Shouldn&apos;t Be This Complicated
            </h2>
            <p className="dmt-section-sub">
              Finding the right information about motor-traffic services can
              be difficult. People often have to search through different
              pages, watch videos, call offices or ask others before they
              know what to do.
            </p>

            <div className="dmt-grid dmt-grid-4">
              <div className="dmt-card">
                <Search className="dmt-icon dmt-card-icon" size={26} aria-hidden="true" />
                <h3>Too Much Searching</h3>
                <p className="dmt-card-q">Where do I find the right information?</p>
                <p>Information can be spread across different pages and services.</p>
              </div>
              <div className="dmt-card">
                <Compass className="dmt-icon dmt-card-icon" size={26} aria-hidden="true" />
                <h3>Unclear Processes</h3>
                <p className="dmt-card-q">What do I need to do first?</p>
                <p>People may know what they want but not know the correct process.</p>
              </div>
              <div className="dmt-card">
                <FileText className="dmt-icon dmt-card-icon" size={26} aria-hidden="true" />
                <h3>Document Confusion</h3>
                <p className="dmt-card-q">Which documents do I need?</p>
                <p>Users often don&apos;t know what documents or forms are required.</p>
              </div>
              <div className="dmt-card">
                <Phone className="dmt-icon dmt-card-icon" size={26} aria-hidden="true" />
                <h3>Calling for Answers</h3>
                <p className="dmt-card-q">Who should I ask?</p>
                <p>Simple questions can turn into phone calls, visits or asking someone else.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SCENARIO */}
        <section className="dmt-section dmt-scenario">
          <div className="dmt-section-inner">
            <p className="dmt-eyebrow dmt-eyebrow-center">A Familiar Story</p>
            <h2 className="dmt-section-title">We&apos;ve All Been Here.</h2>
            <p className="dmt-scenario-quote">
              “I need to transfer my vehicle to someone else. What do I need?”
            </p>

            <div className="dmt-scenario-compare">
              <div className="dmt-scenario-col dmt-scenario-before">
                <h3>The Old Way</h3>
                <ol className="dmt-flow">
                  <li>Search Google</li>
                  <li>Watch YouTube</li>
                  <li>Ask a friend</li>
                  <li>Call DMT</li>
                  <li className="dmt-flow-end">Still not sure</li>
                </ol>
              </div>

              <div className="dmt-scenario-divider" aria-hidden="true">
                <ArrowRight size={22} />
              </div>

              <div className="dmt-scenario-col dmt-scenario-after">
                <h3>With DMT Assistant</h3>
                <ol className="dmt-flow">
                  <li>Ask: “I want to transfer ownership of my car. What do I need?”</li>
                  <li>Get a clear answer</li>
                  <li>See required documents</li>
                  <li>Know where to go</li>
                  <li className="dmt-flow-end">Know what to do next</li>
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
                A simple digital assistant that helps you understand
                Department of Motor Traffic services and guides you through
                what to do next.
              </p>
              <p className="dmt-assistant-note">
                <Lightbulb className="dmt-icon" size={18} aria-hidden="true" />
                This preview shows how a conversation looks — it&apos;s a
                static illustration, not a live chat.
              </p>
            </div>

            <div className="dmt-chat-mock" role="img" aria-label="Preview of a DMT Assistant conversation">
              <div className="dmt-chat-head">
                <Bot className="dmt-icon" size={18} aria-hidden="true" />
                <span>DMT Assistant</span>
              </div>
              <div className="dmt-chat-body">
                <div className="dmt-chat-bubble dmt-chat-bot">
                  Hello! How can I help you today?
                </div>
                <div className="dmt-chat-bubble dmt-chat-user">
                  <User className="dmt-icon" size={14} aria-hidden="true" /> I lost my driving licence.
                </div>
                <div className="dmt-chat-bubble dmt-chat-bot">
                  Don&apos;t worry. I can guide you through the process.
                  <br />
                  Here&apos;s what you may need:
                  <ol>
                    <li>Complete the required form</li>
                    <li>Prepare required documents</li>
                    <li>Visit the relevant office</li>
                  </ol>
                  <span className="dmt-chat-link">
                    View detailed steps <ArrowRight size={14} />
                  </span>
                </div>
              </div>
              <div className="dmt-chat-input">
                <span>Ask another question...</span>
                <Send className="dmt-icon" size={16} aria-hidden="true" />
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
                <MessageCircle className="dmt-icon dmt-step-icon" size={26} aria-hidden="true" />
                <h3>Ask</h3>
                <p>Tell the assistant what you need in your own words.</p>
                <p className="dmt-step-example">“I want to renew my licence.”</p>
              </div>
              <div className="dmt-step">
                <span className="dmt-step-num">02</span>
                <Brain className="dmt-icon dmt-step-icon" size={26} aria-hidden="true" />
                <h3>Understand</h3>
                <p>The assistant identifies the relevant DMT service for your question.</p>
              </div>
              <div className="dmt-step">
                <span className="dmt-step-num">03</span>
                <FolderOpen className="dmt-icon dmt-step-icon" size={26} aria-hidden="true" />
                <h3>Guide</h3>
                <p>Get required documents, steps and relevant office information.</p>
              </div>
              <div className="dmt-step">
                <span className="dmt-step-num">04</span>
                <CheckCircle2 className="dmt-icon dmt-step-icon" size={26} aria-hidden="true" />
                <h3>Take Action</h3>
                <p>Follow the instructions or go directly to the official service.</p>
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
              <div className="dmt-qcard">
                <Car className="dmt-icon" size={24} aria-hidden="true" />
                <h3>Vehicle Registration</h3>
                <p>How do I register a vehicle?</p>
              </div>
              <div className="dmt-qcard">
                <ArrowLeftRight className="dmt-icon" size={24} aria-hidden="true" />
                <h3>Ownership Transfer</h3>
                <p>What documents do I need to transfer ownership?</p>
              </div>
              <div className="dmt-qcard">
                <IdCard className="dmt-icon" size={24} aria-hidden="true" />
                <h3>Driving Licence</h3>
                <p>How do I apply for a driving licence?</p>
              </div>
              <div className="dmt-qcard">
                <RefreshCw className="dmt-icon" size={24} aria-hidden="true" />
                <h3>Licence Renewal</h3>
                <p>How can I renew my driving licence?</p>
              </div>
              <div className="dmt-qcard">
                <FileText className="dmt-icon" size={24} aria-hidden="true" />
                <h3>Documents &amp; Forms</h3>
                <p>Which form do I need?</p>
              </div>
              <div className="dmt-qcard">
                <Search className="dmt-icon" size={24} aria-hidden="true" />
                <h3>Vehicle Information</h3>
                <p>How can I check vehicle information?</p>
              </div>
            </div>
          </div>
        </section>

        {/* BIG CTA */}
        <section className="dmt-section dmt-cta-big">
          <div className="dmt-section-inner dmt-cta-big-inner">
            <h2>Have a Question About DMT?</h2>
            <p>Don&apos;t search through pages. Just ask.</p>

            <div className="dmt-hero-search dmt-cta-search">
              <div className="dmt-hero-search-box">
                <MessageCircle className="dmt-icon" size={18} aria-hidden="true" />
                <input type="text" placeholder="Type your question..." readOnly />
              </div>
            </div>

            <button
  type="button"
  onClick={onOpenChat}
  className="dmt-btn dmt-btn-gold"
>
  Ask DMT Assistant <ArrowRight size={16} />
</button>
            <p className="dmt-cta-lang">Available in සිංහල · தமிழ் · English</p>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="dmt-section dmt-benefits">
          <div className="dmt-section-inner">
            <p className="dmt-eyebrow dmt-eyebrow-center">Benefits</p>
            <h2 className="dmt-section-title">Make Every DMT Task Easier</h2>

            <div className="dmt-grid dmt-grid-3">
              <div className="dmt-benefit">
                <Compass className="dmt-icon" size={30} aria-hidden="true" />
                <h3>Clear Guidance</h3>
                <p>Know what to do, step by step.</p>
              </div>
              <div className="dmt-benefit">
                <ClipboardList className="dmt-icon" size={30} aria-hidden="true" />
                <h3>Know What to Prepare</h3>
                <p>Understand the documents and requirements before you visit.</p>
              </div>
              <div className="dmt-benefit">
                <Clock className="dmt-icon" size={30} aria-hidden="true" />
                <h3>Save Time</h3>
                <p>Find answers without searching through multiple pages.</p>
              </div>
              <div className="dmt-benefit">
                <Globe className="dmt-icon" size={30} aria-hidden="true" />
                <h3>Your Language</h3>
                <p>Ask questions in Sinhala, Tamil or English.</p>
              </div>
              <div className="dmt-benefit">
                <Smartphone className="dmt-icon" size={30} aria-hidden="true" />
                <h3>Available Anytime</h3>
                <p>Get guidance whenever you need it.</p>
              </div>
              <div className="dmt-benefit">
                <Link2 className="dmt-icon" size={30} aria-hidden="true" />
                <h3>Official Information</h3>
                <p>Answers are grounded in official DMT information rather than random internet content.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
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
                <div className="dmt-service" key={label}>
                  <Icon className="dmt-icon" size={22} aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section id="trust" className="dmt-section dmt-trust">
          <div className="dmt-section-inner">
            <p className="dmt-eyebrow dmt-eyebrow-center">Trust &amp; Safety</p>
            <h2 className="dmt-section-title">Guidance You Can Trust</h2>
            <p className="dmt-section-sub">
              The assistant is designed to provide guidance based on official
              Department of Motor Traffic information.
            </p>

            <div className="dmt-grid dmt-grid-4">
              <div className="dmt-trust-item">
                <Landmark className="dmt-icon" size={20} aria-hidden="true" />
                <span>Official Sources</span>
              </div>
              <div className="dmt-trust-item">
                <RefreshCw className="dmt-icon" size={20} aria-hidden="true" />
                <span>Updated Information</span>
              </div>
              <div className="dmt-trust-item">
                <CheckCircle2 className="dmt-icon" size={20} aria-hidden="true" />
                <span>Clear Steps</span>
              </div>
              <div className="dmt-trust-item">
                <Link2 className="dmt-icon" size={20} aria-hidden="true" />
                <span>Transparent Links</span>
              </div>
            </div>

            <div className="dmt-disclaimer">
              <AlertTriangle className="dmt-icon" size={22} aria-hidden="true" />
              <p>
                <strong>Important:</strong> The assistant provides informational
                guidance. Always verify important requirements, fees and
                official instructions through the relevant Department of Motor
                Traffic service before taking action.
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
                <TrafficCone size={22} strokeWidth={2} />
              </span>
              <span className="dmt-logo-text">DMT Assist</span>
            </a>
            <p>
              Making Department of Motor Traffic information easier to
              understand and access.
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
            <h4>Important</h4>
            <p>
              This assistant provides informational guidance. Verify important
              requirements with official DMT sources.
            </p>
          </div>
        </div>

        <div className="dmt-footer-official">
          <p>
            <strong>Official Department of Motor Traffic</strong> — No. 341,
            Alvitigala Mawatha, Narahenpita, Colombo 05, Sri Lanka.
          </p>
        </div>

        <div className="dmt-footer-bottom">
          <p>
            DMT Assist is an information &amp; guidance concept and is not
            officially affiliated with the Department of Motor Traffic.
          </p>
        </div>
      </footer>
    </div>
  );
}