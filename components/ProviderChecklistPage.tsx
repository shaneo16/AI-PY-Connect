
import React, { useState } from 'react';
import { Shield, UserCheck, GraduationCap, Heart, MessageCircle, Plus, Minus, Copy, ArrowRight, Clock, Award, ShieldAlert, FileText } from 'lucide-react';
import { Button } from './Button';

export const ProviderChecklistPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const checklistData = [
    {
      id: 'doc1',
      title: 'Erweitertes Führungszeugnis',
      subtitle: 'Enhanced criminal record check',
      tags: ['Required', 'Legal requirement'],
      description: 'The extended (erweitertes) version of the German criminal record check covers additional offence categories specific to working with minors. This is mandatory under German law for anyone working with children — and Berlin schools will specifically ask for the extended version, not the standard one. Make sure you request the right type.',
      meta: [
        { label: 'Where to get it', value: 'Your local Bürgeramt (bring your ID)' },
        { label: 'Time to obtain', value: '2–4 weeks by post' },
        { label: 'Cost', value: '€13' }
      ],
      tip: 'Common mistake: Applying for the standard Führungszeugnis by accident. At the Bürgeramt, say you need it for work with minors (für Tätigkeit mit Minderjährigen) — this triggers the extended version automatically.'
    },
    {
      id: 'doc2',
      title: 'Steuernummer',
      subtitle: 'Freelance tax registration number',
      tags: ['Required'],
      description: 'To invoice schools or parents for your services in Germany, you need a tax number (Steuernummer) issued by your local Finanzamt. This is what makes you a legally operating freelancer. Without it you cannot issue a valid invoice, and schools cannot pay you. Separate from the Steuer-ID which you received automatically when you registered your address.',
      meta: [
        { label: 'Where to get it', value: 'Apply to your local Finanzamt or online via ELSTER' },
        { label: 'Time to obtain', value: '2–6 weeks' },
        { label: 'Cost', value: 'Free' }
      ],
      tip: 'Note on Kleinunternehmer: If your annual income from this work is under €22,000, you can operate under the Kleinunternehmer rule — which means no VAT on invoices and simpler tax filing. Worth knowing before you register.'
    },
    {
      id: 'doc3',
      title: 'Masernschutznachweis',
      subtitle: 'Measles vaccination proof',
      tags: ['Required', 'Masernschutzgesetz 2020'],
      description: "Under Germany's Measles Protection Act (in force since March 2020), anyone born after 1970 who works in a school or childcare setting must provide proof of measles vaccination or immunity. This applies to all external providers and freelancers, not just employed staff. You need evidence of two vaccinations or a lab test showing immunity.",
      meta: [
        { label: 'Acceptable proof', value: 'Impfpass, doctor\'s letter, or blood test result' },
        { label: 'Who is exempt', value: 'Anyone born before 1970 (considered immune)' },
        { label: 'Cost (if vaccinating)', value: 'Covered by health insurance' }
      ],
      tip: "Can't find your Impfpass? Your GP can check your vaccination history or arrange a blood test to confirm immunity. A letter from your doctor confirming two vaccinations is accepted by most schools."
    },
    {
      id: 'doc4',
      title: 'Kinderschutz-Zertifikat / §72a SGB VIII',
      subtitle: 'Child safeguarding certificate',
      tags: ['Required', '§72a SGB VIII'],
      description: 'Section 72a of the German Social Code requires providers working with children to sign a declaration confirming they have no relevant disqualifying offences — separate from, and in addition to, the criminal record check. Many schools provide their own version of this form. International and private schools increasingly also expect a completed Kinderschutz course from an accredited provider.',
      meta: [
        { label: 'Basic form', value: 'Ask the school — most have their own template' },
        { label: 'Course providers', value: 'DRK, AWO, Caritas — all run in Berlin' },
        { label: 'Course cost', value: '€30–80 depending on provider' }
      ],
      tip: 'Go beyond the form: Completing a formal Kinderschutz course (typically half a day) makes you a much stronger candidate when approaching schools and is increasingly expected even when not strictly required.'
    },
    {
      id: 'doc5',
      title: 'Erste-Hilfe-Kurs',
      subtitle: 'First aid certificate',
      tags: ['Required'],
      description: 'A valid first aid certificate is required by virtually all Berlin schools before an external provider can run sessions with children. The standard course is 9 hours and covers CPR, choking, bleeding, and other paediatric emergencies. It must be renewed every two years for anyone working regularly with children — even if the certificate says it\'s valid for longer.',
      meta: [
        { label: 'Where to get it', value: 'DRK, Johanniter, Malteser — all Berlin-wide' },
        { label: 'Renewal', value: 'Every 2 years recommended' },
        { label: 'Cost', value: '€40–60' }
      ],
      tip: 'What your certificate must say: Some schools check that the certificate mentions work with children (Kinder) or was completed recently. If in doubt, ask the school what wording they need before booking your course.'
    },
    {
      id: 'doc6',
      title: 'Berufshaftpflichtversicherung',
      subtitle: 'Professional liability insurance',
      tags: ['Strongly recommended'],
      description: 'Professional liability insurance protects you if a child is injured or property is damaged during your sessions. Most Berlin schools now require evidence of this cover before allowing external providers to work on their premises, even if it\'s technically not a legal requirement. Minimum €3 million coverage is standard for anyone working with children.',
      meta: [
        { label: 'Providers to check', value: 'Hiscox, Exali, Allianz, ARAG' },
        { label: 'Minimum cover', value: '€3 million recommended' },
        { label: 'Annual cost', value: '~€100–300 depending on activity type' }
      ],
      tip: 'Activity-specific cover: Make sure your policy explicitly covers the activity you provide. A yoga teacher\'s policy may not cover contact sports. Always check the exclusions before purchasing.'
    },
    {
      id: 'doc7',
      title: 'Gewerbeschein',
      subtitle: 'Business registration — only if applicable',
      tags: ['Sometimes needed'],
      description: "Most activity providers in Berlin don't need a Gewerbeschein. If you are offering a skill-based or educational service as a freelancer (Freiberufler), a Steuernummer is sufficient. You would typically need a Gewerbeschein if you are running a commercial operation — for example, a sports academy, a franchise, or a business selling both services and physical products. If you're unsure, ask a Steuerberater or the Finanzamt directly — many freelancers register one unnecessarily.",
      meta: [
        { label: 'Where to register', value: 'Ordnungsamt or Bürgeramt' },
        { label: 'Time to obtain', value: 'Same day (in person)' },
        { label: 'Cost', value: '€10–65 depending on district' }
      ],
      tip: 'Freiberufler vs. Gewerbetreibender: Coaches, tutors, and artists generally qualify as Freiberufler under German tax law. This is a more favourable status — lower admin burden, no trade tax. Worth confirming with your Finanzamt before registering a Gewerbe.'
    }
  ];

  const faqs = [
    {
      q: "Do I need all seven documents before I can start working?",
      a: "Not necessarily all at once. Most schools have a practical view — they want to see that you're in the process of getting everything sorted. The Führungszeugnis and measles proof are typically the first things checked. The others can sometimes follow within a few weeks of starting. That said, some international schools will not let you through the door until everything is in place, so it's worth asking your specific school coordinator what their timeline is."
    },
    {
      q: "What counts as a valid safeguarding certificate for Berlin schools?",
      a: "Schools require a signed declaration under §72a SGB VIII confirming that no disqualifying offences exist. This is separate from the criminal record check. Many schools provide their own version of the form — just ask for it. Some providers also complete a formal Kinderschutz course (offered by DRK, AWO, and Caritas) which provides more context and is increasingly expected by international and private schools, even when not strictly required."
    },
    {
      q: "How often does first aid need to be renewed?",
      a: "First aid certificates should be renewed every two years for anyone working regularly with children. The standard 9-hour Erste-Hilfe course is offered by DRK, Johanniter, and Malteser across Berlin and typically costs €40–60. Some schools will accept older certificates but keeping it current is best practice and increasingly expected."
    },
    {
      q: "Do I need a Gewerbeschein to run children's activities?",
      a: "Most activity providers in Berlin do not need a Gewerbeschein. If you are offering a skill-based or educational service as a freelancer (Freiberufler), a Steuernummer from the Finanzamt is usually sufficient. You would typically only need a Gewerbeschein if you are running a commercial operation — for example, selling products or operating a for-profit childcare facility. If in doubt, ask your Finanzamt before registering a Gewerbe unnecessarily."
    },
    {
      q: "What if I already have some of these documents from another country?",
      a: "Foreign equivalents are sometimes accepted — particularly criminal record checks and first aid certificates — but schools vary in their approach. A criminal record check from your home country is generally acceptable if issued recently, but Berlin schools may also ask for the German Führungszeugnis once you have been registered in Germany for a period. For medical documents like measles proof, German GP confirmation is the simplest route even if you have a foreign record."
    },
    {
      q: "I speak limited German — can I still work in Berlin schools?",
      a: "Yes. Many international and bilingual schools in Berlin specifically look for English-speaking or multilingual providers. Even at German-language schools, activity providers are often assessed on their relationship with children rather than their German fluency. That said, the paperwork itself — particularly the Führungszeugnis application and tax registration — will require some German or help from someone who speaks it. The Teach What You Know workshops are a good place to get help navigating this."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 selection:bg-secondary selection:text-black">
      {/* Page Header */}
      <div className="max-w-[800px] mx-auto px-6 py-16 md:py-24">
        <div className="text-center">
          <div className="text-[0.78rem] tracking-[0.12em] uppercase text-primary font-bold mb-3">Provider resources</div>
          <h1 className="font-display text-4xl md:text-5xl font-normal leading-[1.12] mb-6 uppercase tracking-tight">
            Berlin provider checklist — <em className="italic text-primary not-italic">what's needed </em> to work as external youth educators in schools
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            Seven documents. That's what most Berlin schools require before they'll let an external provider through the door. This page explains each one in plain English — what it is, where you get it, and how long it takes. No jargon, no scaremongering.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            The list is the same whether you teach football, music, chess, or coding. The requirements come from German law, Berlin school policy, and common practice among activity coordinators across the city.
          </p>
        </div>
      </div>

      {/* Checklist Section */}
      <div className="max-w-[800px] mx-auto px-6 pb-24" id="checklist">
        {/* Document Cards */}
        <div className="space-y-6">
          {checklistData.map((doc) => (
            <div 
              key={doc.id} 
              id={doc.id}
              className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-primary/30 transition-colors shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-normal text-slate-900 uppercase tracking-tight">{doc.title}</h2>
                    <p className="text-sm text-slate-400 mt-1 font-medium">{doc.subtitle}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {doc.tags.map(tag => (
                      <span key={tag} className={`text-[0.72rem] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        tag.includes('Required') ? 'bg-primary/10 text-primaryDark' : 
                        tag.includes('recommended') ? 'bg-secondary/20 text-slate-700' : 
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">{doc.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {doc.meta.map(m => (
                    <div key={m.label}>
                      <div className="text-[0.72rem] tracking-wider uppercase text-slate-400 mb-1 font-bold">{m.label}</div>
                      <div className="text-sm text-slate-700 font-medium">{m.value}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 border-l-4 border-secondary shadow-sm">
                  <strong className="text-slate-900 font-bold">Common mistake:</strong> {doc.tip}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-100 py-24" id="faq">
        <div className="max-w-[780px] mx-auto px-6">
          <h2 className="font-display text-3xl font-normal mb-8 uppercase tracking-tight">Questions we hear a lot</h2>
          <div className="divide-y divide-slate-200">
            {faqs.map((faq, i) => (
              <div key={i} className="py-5">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 text-left group"
                >
                  <span className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{faq.q}</span>
                  <div className="mt-1 text-slate-400">
                    {openFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                  <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-6 py-8 bg-white">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-400 font-medium">
            A <a href="https://primeyouth.de" className="text-primary hover:underline">Prime Youth</a> resource &nbsp;·&nbsp; Berlin
          </div>
          <div className="flex gap-6">
            <a href="https://primeyouth.de/teach-what-you-know" className="text-sm text-slate-400 hover:text-primary transition-colors font-medium">Teach What You Know</a>
            <a href="https://klasshero.com" className="text-sm text-slate-400 hover:text-primary transition-colors font-medium">Klass Hero</a>
            <a href="https://primeyouth.de" className="text-sm text-slate-400 hover:text-primary transition-colors font-medium">primeyouth.de</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
