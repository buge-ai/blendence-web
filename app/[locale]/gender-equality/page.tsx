'use client';

import React from 'react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { Reveal, WordReveal } from '@/lib/motion';

interface GenderBalanceRow {
  category: string;
  status: string;
}

interface PolicyArea {
  id: string;
  title: string;
  items: string[];
}

interface ActionPlanRow {
  objective: string;
  action: string;
  kpi: string;
  timeline: string;
  responsible: string;
}

function CheckMarker() {
  return (
    <svg
      className="marker marker-check"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}

function DotMarker() {
  return (
    <svg
      className="marker marker-dot"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="2" />
    </svg>
  );
}

function SectionTitle({ title, className }: { title: string; className?: string }) {
  const match = title.match(/^(\d+)\.\s*(.*)$/);
  return (
    <h2 className={`section-title ${className ?? ''}`}>
      {match && <span className="section-num">{match[1]}</span>}
      <span className="section-name">{match ? match[2] : title}</span>
    </h2>
  );
}

export default function GenderEqualityPage() {
  const { t } = useLanguage();
  const p = t.genderEqualityPage;

  return (
    <div className="policy-page">
      <Navigation />

      <main className="content-wrapper">
        <div className="container">
          <WordReveal as="h1" className="font-display page-title" text={p.title} delay={0.05} />

          <Reveal y={14} delay={0.1}>
            <div className="doc-info">
              <p className="doc-badge">{p.docInfo.gepTitle}</p>
              <p>{p.docInfo.company}</p>
              <p>{p.docInfo.publicDoc}</p>
              <p>{p.docInfo.effectiveDate}</p>
              <p>{p.docInfo.version}</p>
            </div>
          </Reveal>

          {/* Section 1: Organisation Profile */}
          <section className="content-section">
            <Reveal y={14}>
              <SectionTitle title={p.sections.orgProfile.title} />
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{p.sections.orgProfile.items.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Brand:</span>
                  <span className="info-value">{p.sections.orgProfile.items.brand}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Founded:</span>
                  <span className="info-value">{p.sections.orgProfile.items.founded}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Headquarters:</span>
                  <span className="info-value">{p.sections.orgProfile.items.headquarters}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Production Facility:</span>
                  <span className="info-value">{p.sections.orgProfile.items.productionFacility}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Legal Status:</span>
                  <span className="info-value">{p.sections.orgProfile.items.legalStatus}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Chair of the Board:</span>
                  <span className="info-value">{p.sections.orgProfile.items.chairOfBoard}</span>
                </div>
              </div>
            </Reveal>
          </section>

          {/* Section 2: Commitment */}
          <section className="content-section">
            <Reveal y={14}>
              <SectionTitle title={p.sections.commitment.title} />
              <div className="content-body">
                {p.sections.commitment.content.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </section>

          {/* Section 3: Gender Equality Officer */}
          <section className="content-section">
            <Reveal y={14}>
              <SectionTitle title={p.sections.officer.title} />
              <div className="content-body">
                <p>{p.sections.officer.intro}</p>
                <div className="officer-card">
                  <p className="officer-title">{p.sections.officer.officerTitle}</p>
                  <p className="officer-name">{p.sections.officer.officerName}</p>
                  <ul className="marker-list dot-list officer-roles">
                    {p.sections.officer.officerRoles.map((role: string, index: number) => (
                      <li key={index}>
                        <DotMarker />
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="officer-bio">{p.sections.officer.officerBio}</p>
                <p>{p.sections.officer.resources}</p>
              </div>
            </Reveal>
          </section>

          {/* Section 4: Current Gender Balance */}
          <section className="content-section">
            <Reveal y={14}>
              <SectionTitle title={p.sections.genderBalance.title} />
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.sections.genderBalance.table.map((row: GenderBalanceRow, index: number) => (
                      <tr key={index}>
                        <td>{row.category}</td>
                        <td>{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="table-note">{p.sections.genderBalance.note}</p>
            </Reveal>
          </section>

          {/* Section 5: Policy Areas */}
          <section className="content-section">
            <Reveal y={14}>
              <SectionTitle title={p.sections.policyAreas.title} />
              <div className="policy-areas">
                {p.sections.policyAreas.areas.map((area: PolicyArea, index: number) => (
                  <div key={index} className="policy-area">
                    <h3 className="policy-area-title">
                      <span className="policy-area-id">{area.id}</span>
                      {area.title}
                    </h3>
                    <ul className="marker-list check-list policy-list">
                      {area.items.map((item: string, itemIndex: number) => (
                        <li key={itemIndex}>
                          <CheckMarker />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* Section 6: Harassment Reporting */}
          <section className="content-section">
            <Reveal y={14}>
              <SectionTitle title={p.sections.harassment.title} />
              <div className="content-body">
                <p>{p.sections.harassment.intro}</p>
                <h4 className="subsection-title">{p.sections.harassment.channelsTitle}</h4>
                <ul className="marker-list dot-list">
                  {p.sections.harassment.channels.map((channel: string, index: number) => (
                    <li key={index}>
                      <DotMarker />
                      <span>{channel}</span>
                    </li>
                  ))}
                </ul>
                <h4 className="subsection-title">{p.sections.harassment.procedureTitle}</h4>
                <ul className="marker-list dot-list">
                  {p.sections.harassment.procedure.map((step: string, index: number) => (
                    <li key={index}>
                      <DotMarker />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </section>

          {/* Section 7: Data Collection */}
          <section className="content-section">
            <Reveal y={14}>
              <SectionTitle title={p.sections.dataCollection.title} />
              <div className="content-body">
                <p>{p.sections.dataCollection.intro}</p>
                <h4 className="subsection-title">{p.sections.dataCollection.indicatorsTitle}</h4>
                <ul className="marker-list dot-list">
                  {p.sections.dataCollection.indicators.map((indicator: string, index: number) => (
                    <li key={index}>
                      <DotMarker />
                      <span>{indicator}</span>
                    </li>
                  ))}
                </ul>
                <p className="note-text">{p.sections.dataCollection.note}</p>
              </div>
            </Reveal>
          </section>

          {/* Section 8: Training and Awareness */}
          <section className="content-section">
            <Reveal y={14}>
              <SectionTitle title={p.sections.training.title} />
              <div className="content-body">
                <p>{p.sections.training.intro}</p>
                <h4 className="subsection-title">{p.sections.training.commitmentsTitle}</h4>
                <ul className="marker-list dot-list">
                  {p.sections.training.commitments.map((commitment: string, index: number) => (
                    <li key={index}>
                      <DotMarker />
                      <span>{commitment}</span>
                    </li>
                  ))}
                </ul>
                <h4 className="subsection-title">{p.sections.training.pastTitle}</h4>
                <p>{p.sections.training.pastContent}</p>
              </div>
            </Reveal>
          </section>

          {/* Section 9: Publication */}
          <section className="content-section">
            <Reveal y={14}>
              <SectionTitle title={p.sections.publication.title} />
              <div className="content-body">
                {p.sections.publication.content.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </section>

          {/* Section 10: Signature */}
          <section className="content-section">
            <Reveal y={14}>
              <SectionTitle title={p.sections.signature.title} />
              <p>{p.sections.signature.intro}</p>
              <div className="table-wrapper signature-table-wrapper">
                <table className="data-table signature-table">
                  <thead>
                    <tr>
                      {p.sections.signature.tableHeaders.map((header: string, index: number) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{p.sections.signature.tableData.name}</td>
                      <td>{p.sections.signature.tableData.title}</td>
                      <td>{p.sections.signature.tableData.signature}</td>
                      <td>{p.sections.signature.tableData.date}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Reveal>
          </section>

          {/* Appendix: Action Plan */}
          <section className="content-section appendix-section">
            <Reveal y={14}>
              <SectionTitle title={p.sections.appendix.title} />
              <div className="table-wrapper action-table-wrapper">
                <table className="data-table action-table">
                  <thead>
                    <tr>
                      {p.sections.appendix.tableHeaders.map((header: string, index: number) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {p.sections.appendix.actions.map((action: ActionPlanRow, index: number) => (
                      <tr key={index}>
                        <td>{action.objective}</td>
                        <td>{action.action}</td>
                        <td>{action.kpi}</td>
                        <td>{action.timeline}</td>
                        <td>{action.responsible}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </section>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .policy-page {
          background-color: var(--surface);
          color: var(--text-body);
          min-height: 100vh;
        }

        .content-wrapper {
          padding: 11rem 2rem 6rem;
        }

        .container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .container :global(.page-title) {
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          margin-bottom: 1.75rem;
        }

        .doc-info {
          background: var(--surface-mist);
          border: 1px solid var(--hairline);
          border-radius: var(--radius-md);
          padding: 1.5rem 1.75rem;
          margin-bottom: 3.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .doc-info p {
          font-size: 0.95rem;
          color: var(--text-body);
          margin: 0;
        }

        .doc-badge {
          font-weight: 600;
          color: var(--petrol) !important;
          font-size: 1rem !important;
          margin-bottom: 0.5rem !important;
        }

        .content-section {
          margin-bottom: 3.25rem;
        }

        /* Section title with display numeral */
        .section-title {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-heading);
          margin-bottom: 1.5rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--hairline);
        }

        .section-title .section-num {
          font-family: var(--font-display-family);
          font-weight: 500;
          font-size: 1.7rem;
          line-height: 1;
          color: var(--turquoise-deep);
          flex-shrink: 0;
        }

        .section-title .section-name {
          font-weight: 600;
        }

        .info-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .info-item {
          display: flex;
          gap: 0.5rem;
          font-size: 1rem;
          line-height: 1.6;
        }

        .info-label {
          font-weight: 600;
          color: var(--petrol);
          min-width: 160px;
        }

        .info-value {
          color: var(--text-body);
        }

        .content-body {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .content-body p {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--text-body);
        }

        /* Officer Card */
        .officer-card {
          background: var(--surface);
          border: 1px solid var(--hairline);
          border-left: 3px solid var(--turquoise-deep);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-soft);
          padding: 1.5rem 1.75rem;
        }

        .officer-title {
          font-weight: 600;
          color: var(--petrol);
          margin-bottom: 0.5rem;
        }

        .officer-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-heading);
          margin-bottom: 0.75rem;
        }

        .officer-bio {
          font-style: italic;
          background: var(--surface-mist);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          color: var(--text-body) !important;
        }

        /* Marker lists (real SVG markers) */
        .marker-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .marker-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.95rem;
          color: var(--text-body);
          padding: 0.35rem 0;
          line-height: 1.6;
        }

        .marker-list :global(.marker) {
          flex-shrink: 0;
          margin-top: 0.28rem;
        }

        .check-list :global(.marker-check) {
          color: var(--turquoise-deep);
        }

        .dot-list :global(.marker-dot) {
          color: var(--petrol);
        }

        .officer-roles li {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        /* Tables */
        .table-wrapper {
          overflow-x: auto;
          overflow-y: hidden;
          margin: 1rem 0;
          border: 1px solid var(--hairline);
          border-radius: var(--radius-md);
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .data-table th,
        .data-table td {
          padding: 0.9rem 1rem;
          text-align: left;
        }

        .data-table th {
          background: var(--petrol-deep);
          color: #fff;
          font-weight: 600;
          letter-spacing: 0.01em;
        }

        .data-table th:not(:last-child) {
          border-right: 1px solid rgba(255, 255, 255, 0.12);
        }

        .data-table td {
          background: var(--surface);
          color: var(--text-body);
          border-bottom: 1px solid var(--hairline);
        }

        .data-table td:not(:last-child) {
          border-right: 1px solid var(--hairline);
        }

        .data-table tbody tr:last-child td {
          border-bottom: none;
        }

        .data-table tbody tr:hover td {
          background: var(--surface-mist);
        }

        .table-note {
          font-size: 0.95rem;
          color: var(--text-muted);
          font-style: italic;
          margin-top: 1rem;
        }

        .signature-table td {
          text-align: center;
        }

        .action-table-wrapper {
          margin-top: 1.5rem;
        }

        .action-table th,
        .action-table td {
          font-size: 0.9rem;
          padding: 0.75rem;
        }

        .appendix-section {
          background: var(--surface-mist);
          padding: 2rem;
          border-radius: var(--radius-lg);
          margin-top: 2.5rem;
        }

        /* Policy Areas */
        .policy-areas {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .policy-area {
          background: var(--surface-mist);
          border: 1px solid var(--hairline);
          border-left: 3px solid var(--turquoise-deep);
          border-radius: var(--radius-md);
          padding: 1.35rem 1.6rem;
        }

        .policy-area-title {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-heading);
          margin-bottom: 0.85rem;
        }

        .policy-area-id {
          font-family: var(--font-display-family);
          font-weight: 500;
          color: var(--turquoise-deep);
          flex-shrink: 0;
        }

        /* Subsection titles */
        .subsection-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--petrol);
          margin-bottom: 0.25rem;
          margin-top: 0.5rem;
        }

        .note-text {
          background: var(--surface-mist);
          border-left: 3px solid var(--turquoise-deep);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          font-size: 0.95rem;
          color: var(--petrol);
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 8rem 1.25rem 4rem;
          }

          .section-title {
            font-size: 1.25rem;
          }

          .section-title .section-num {
            font-size: 1.4rem;
          }

          .info-item {
            flex-direction: column;
            gap: 0.25rem;
          }

          .info-label {
            min-width: auto;
          }

          .data-table th,
          .data-table td {
            padding: 0.6rem;
            font-size: 0.85rem;
          }

          .action-table th,
          .action-table td {
            font-size: 0.8rem;
            padding: 0.5rem;
          }

          .appendix-section {
            padding: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
