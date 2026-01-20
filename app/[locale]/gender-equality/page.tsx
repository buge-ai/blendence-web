'use client';

import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

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

export default function GenderEqualityPage() {
  const { t } = useLanguage();
  const p = t.genderEqualityPage;

  return (
    <div className="policy-page">
      <Navigation />

      <main className="content-wrapper">
        <div className="container">
          <h1 className="page-title">{p.title}</h1>

          <div className="doc-info">
            <p className="doc-badge">{p.docInfo.gepTitle}</p>
            <p>{p.docInfo.company}</p>
            <p>{p.docInfo.publicDoc}</p>
            <p>{p.docInfo.effectiveDate}</p>
            <p>{p.docInfo.version}</p>
          </div>

          {/* Section 1: Organisation Profile */}
          <section className="content-section">
            <h2 className="section-title">{p.sections.orgProfile.title}</h2>
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
          </section>

          {/* Section 2: Commitment */}
          <section className="content-section">
            <h2 className="section-title">{p.sections.commitment.title}</h2>
            <div className="content-body">
              {p.sections.commitment.content.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Section 3: Gender Equality Officer */}
          <section className="content-section">
            <h2 className="section-title">{p.sections.officer.title}</h2>
            <div className="content-body">
              <p>{p.sections.officer.intro}</p>
              <div className="officer-card">
                <p className="officer-title">{p.sections.officer.officerTitle}</p>
                <p className="officer-name">{p.sections.officer.officerName}</p>
                <ul className="officer-roles">
                  {p.sections.officer.officerRoles.map((role: string, index: number) => (
                    <li key={index}>{role}</li>
                  ))}
                </ul>
              </div>
              <p className="officer-bio">{p.sections.officer.officerBio}</p>
              <p>{p.sections.officer.resources}</p>
            </div>
          </section>

          {/* Section 4: Current Gender Balance */}
          <section className="content-section">
            <h2 className="section-title">{p.sections.genderBalance.title}</h2>
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
          </section>

          {/* Section 5: Policy Areas */}
          <section className="content-section">
            <h2 className="section-title">{p.sections.policyAreas.title}</h2>
            <div className="policy-areas">
              {p.sections.policyAreas.areas.map((area: PolicyArea, index: number) => (
                <div key={index} className="policy-area">
                  <h3 className="policy-area-title">{area.id} {area.title}</h3>
                  <ul className="policy-list">
                    {area.items.map((item: string, itemIndex: number) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Harassment Reporting */}
          <section className="content-section">
            <h2 className="section-title">{p.sections.harassment.title}</h2>
            <div className="content-body">
              <p>{p.sections.harassment.intro}</p>
              <h4 className="subsection-title">{p.sections.harassment.channelsTitle}</h4>
              <ul className="bullet-list">
                {p.sections.harassment.channels.map((channel: string, index: number) => (
                  <li key={index}>{channel}</li>
                ))}
              </ul>
              <h4 className="subsection-title">{p.sections.harassment.procedureTitle}</h4>
              <ul className="bullet-list">
                {p.sections.harassment.procedure.map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 7: Data Collection */}
          <section className="content-section">
            <h2 className="section-title">{p.sections.dataCollection.title}</h2>
            <div className="content-body">
              <p>{p.sections.dataCollection.intro}</p>
              <h4 className="subsection-title">{p.sections.dataCollection.indicatorsTitle}</h4>
              <ul className="bullet-list">
                {p.sections.dataCollection.indicators.map((indicator: string, index: number) => (
                  <li key={index}>{indicator}</li>
                ))}
              </ul>
              <p className="note-text">{p.sections.dataCollection.note}</p>
            </div>
          </section>

          {/* Section 8: Training and Awareness */}
          <section className="content-section">
            <h2 className="section-title">{p.sections.training.title}</h2>
            <div className="content-body">
              <p>{p.sections.training.intro}</p>
              <h4 className="subsection-title">{p.sections.training.commitmentsTitle}</h4>
              <ul className="bullet-list">
                {p.sections.training.commitments.map((commitment: string, index: number) => (
                  <li key={index}>{commitment}</li>
                ))}
              </ul>
              <h4 className="subsection-title">{p.sections.training.pastTitle}</h4>
              <p>{p.sections.training.pastContent}</p>
            </div>
          </section>

          {/* Section 9: Publication */}
          <section className="content-section">
            <h2 className="section-title">{p.sections.publication.title}</h2>
            <div className="content-body">
              {p.sections.publication.content.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Section 10: Signature */}
          <section className="content-section">
            <h2 className="section-title">{p.sections.signature.title}</h2>
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
          </section>

          {/* Appendix: Action Plan */}
          <section className="content-section appendix-section">
            <h2 className="section-title">{p.sections.appendix.title}</h2>
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
          </section>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .policy-page {
          background-color: #ffffff;
          color: #111;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .content-wrapper {
          padding: 8rem 2rem 6rem;
        }

        .container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 3rem;
          font-weight: 600;
          color: #1A4D5C;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .doc-info {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 3rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .doc-info p {
          font-size: 0.95rem;
          color: #555;
          margin: 0;
        }

        .doc-badge {
          font-weight: 600;
          color: #1A4D5C !important;
          font-size: 1rem !important;
          margin-bottom: 0.5rem !important;
        }

        .content-section {
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1A4D5C;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #e8f4f0;
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
          color: #1A4D5C;
          min-width: 160px;
        }

        .info-value {
          color: #444;
        }

        .content-body {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .content-body p {
          font-size: 1rem;
          line-height: 1.8;
          color: #444;
        }

        /* Officer Card */
        .officer-card {
          background: linear-gradient(135deg, #e8f4f0, #f0f7f5);
          border-radius: 12px;
          padding: 1.5rem;
          border-left: 4px solid #1A4D5C;
        }

        .officer-title {
          font-weight: 600;
          color: #1A4D5C;
          margin-bottom: 0.5rem;
        }

        .officer-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111;
          margin-bottom: 0.75rem;
        }

        .officer-roles {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .officer-roles li {
          font-size: 0.95rem;
          color: #555;
          padding: 0.25rem 0;
          padding-left: 1rem;
          position: relative;
        }

        .officer-roles li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #1A4D5C;
        }

        .officer-bio {
          font-style: italic;
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          color: #555 !important;
        }

        /* Tables */
        .table-wrapper {
          overflow-x: auto;
          margin: 1rem 0;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .data-table th,
        .data-table td {
          padding: 1rem;
          text-align: left;
          border: 1px solid #e0e0e0;
        }

        .data-table th {
          background: #1A4D5C;
          color: white;
          font-weight: 600;
        }

        .data-table td {
          background: #fafafa;
          color: #444;
        }

        .data-table tbody tr:hover td {
          background: #f0f7f5;
        }

        .table-note {
          font-size: 0.95rem;
          color: #555;
          font-style: italic;
          margin-top: 1rem;
        }

        /* Signature Table */
        .signature-table-wrapper {
          max-width: 100%;
        }

        .signature-table td {
          text-align: center;
        }

        /* Action Plan Table */
        .action-table-wrapper {
          margin-top: 1.5rem;
        }

        .action-table th,
        .action-table td {
          font-size: 0.9rem;
          padding: 0.75rem;
        }

        .appendix-section {
          background: #f8f9fa;
          padding: 2rem;
          border-radius: 16px;
          margin-top: 2rem;
        }

        /* Policy Areas */
        .policy-areas {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .policy-area {
          background: #f8f9fa;
          padding: 1.25rem 1.5rem;
          border-radius: 12px;
          border-left: 4px solid #1A4D5C;
        }

        .policy-area-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1A4D5C;
          margin-bottom: 0.75rem;
        }

        .policy-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .policy-list li {
          font-size: 0.95rem;
          color: #444;
          padding: 0.4rem 0;
          padding-left: 1.5rem;
          position: relative;
          line-height: 1.6;
        }

        .policy-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #1A4D5C;
          font-weight: bold;
        }

        /* Subsection titles and lists */
        .subsection-title {
          font-size: 1rem;
          font-weight: 600;
          color: #1A4D5C;
          margin-bottom: 0.5rem;
          margin-top: 0.5rem;
        }

        .bullet-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .bullet-list li {
          font-size: 0.95rem;
          color: #444;
          padding: 0.4rem 0;
          padding-left: 1.5rem;
          position: relative;
          line-height: 1.6;
        }

        .bullet-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #1A4D5C;
          font-weight: bold;
        }

        .note-text {
          background: #e8f4f0;
          padding: 1rem;
          border-radius: 8px;
          font-size: 0.95rem;
          color: #1A4D5C;
          border-left: 3px solid #1A4D5C;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 6rem 1rem 4rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .section-title {
            font-size: 1.25rem;
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
            padding: 0.5rem;
            font-size: 0.85rem;
          }

          .action-table th,
          .action-table td {
            font-size: 0.8rem;
            padding: 0.5rem;
          }

          .appendix-section {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
