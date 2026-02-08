# Global Policy Factory — Product Brief & PRD

**PassportCard / DavidShield Group**
**Author:** Benefit Product Studio + Alon Ketzef
**Date:** February 2026
**Classification:** Confidential & Proprietary

---

## SECTION A: PRODUCT BRIEF

### Executive Summary

The Global Policy Factory is an internal insurance product configuration and lifecycle management platform for the PassportCard/DavidShield Group. It replaces fragmented, expertise-dependent systems with a unified software platform that embeds insurance domain knowledge directly into its workflows — enforcing a 95% completeness threshold before any product can launch. The platform handles multi-currency transactions, cross-border compliance, life event adjustments, and reinsurance operations automatically, reducing configuration errors to near zero and eliminating dependency on scarce expert knowledge.

PassportCard currently serves 2.1M+ customers across 150+ countries with a unique real-time payment model (swipe-to-pay for medical services). The company operates in Israel, Europe, and Australia through strategic partnerships with Allianz, White Mountains Insurance Group (NYSE: WTM), and UnitedHealthcare. To sustain global growth and launch new products faster, the company requires a modern policy administration backbone — one designed for its unique cross-border, multi-currency, digital-nomad-serving business model.

### Problem Statement

The current product configuration systems require deep expert knowledge to set up and manage insurance products. This creates four critical business risks:

1. **Bottleneck dependency** — A small number of experts are the only people who can configure products correctly. When they're unavailable, operations stall.
2. **Slow market entry** — Launching a new product or entering a new geography takes months of manual configuration and testing.
3. **Operational risk** — A single configuration error can cost millions in incorrect premium calculations, coverage gaps, or compliance violations.
4. **Legacy accumulation** — Without automated migration tools, discontinued products remain active, increasing operational complexity and cost.

Industry data supports the urgency: insurers using modern policy administration systems deliver 40% more policies than those on legacy technology (McKinsey), and cloud-native platforms achieve 35% faster processing times compared to on-premise systems.

### Target Audience

#### Primary Persona: Product Operations Manager
- **Role:** Configures and maintains insurance products across PassportCard's global markets
- **Pain Points:** Spends excessive time on manual product setup; fears configuration errors; cannot launch products without senior expert review
- **Current Solution:** Spreadsheets, legacy admin tools, and institutional knowledge passed down verbally
- **Why They'd Switch:** The Policy Factory lets them configure products through guided workflows with built-in guardrails — no expert review needed for routine changes

#### Secondary Persona: Senior Underwriter / Product Designer
- **Role:** Designs new insurance products, sets pricing rules, manages reinsurance relationships
- **Pain Points:** Time consumed reviewing junior staff's configurations instead of designing new products; no version control for policy changes; manual reinsurance tracking
- **Why They'd Switch:** Version control, automated completeness checks, and reinsurance automation free them to focus on strategic product design

#### Tertiary Persona: Country Manager / Regional Director
- **Role:** Oversees product portfolio for a specific geography; responsible for regulatory compliance
- **Pain Points:** Cannot easily audit what products are active, what changed, or whether configurations comply with local regulations
- **Why They'd Switch:** Immutable audit trails, compliance tagging, and real-time portfolio visibility

### Value Proposition

The Global Policy Factory is the first policy administration platform purpose-built for a global, multi-currency, real-time-payment insurance operation. Unlike generic PAS platforms (Guidewire, Duck Creek, Socotra), it embeds PassportCard's specific domain expertise — digital nomad coverage, cross-border lifecycle management, and cradle-to-grave policy evolution — directly into the software. The result: any trained operator can configure products that previously required years of institutional knowledge.

### Market Opportunity

**Insurance Platform Market:**
- Global market size: USD 116.16 billion (2025), projected to reach USD 207.52 billion by 2030 (CAGR 12.3%)
- Policy administration is the fastest-growing segment within insurance platforms
- 60% of large insurers have adopted cloud-native PAS solutions
- AI-driven policy administration is expected to reduce processing time by 40% by 2028

**PassportCard's Position:**
- Market leader in Israeli travel insurance (40% market share)
- 2.1M+ customers globally across 150+ countries
- Operations in Israel, Germany, UK, Cyprus, and Australia
- Strategic partnerships with Allianz, White Mountains (NYSE: WTM), UnitedHealthcare
- Pioneer in real-time autonomous insurance (swipe-to-pay model)

**Build vs. Buy Rationale:**
Commercial PAS platforms (Guidewire at $1.2B revenue, Duck Creek with 90-day implementation promises, Socotra with API-first cloud-native architecture) serve the general insurance market. None of them natively support PassportCard's unique requirements: multi-currency real-time payments, digital nomad border-crossing logic, or cradle-to-grave life event reactors. Building a proprietary platform provides competitive moat and operational efficiency that no off-the-shelf solution can match.

### Competitive Landscape (External PAS Market — for context)

| Platform | Focus | Strengths | Weaknesses | Relevance to PassportCard |
|----------|-------|-----------|------------|--------------------------|
| Guidewire | Large multi-line P&C | Enterprise-grade, $1.2B revenue, deep analytics | Expensive, long implementation, "Legacy 2.0" concerns | Too heavy, not built for IPMI/travel |
| Duck Creek | Rapid P&C launches | 90-day implementation promise, cloud-native | High customization costs, complex configuration | Speed is good, but lacks global health/travel specifics |
| Socotra | Insurtech/embedded insurance | API-first, cloud-native, fastest to deploy | Lightweight feature set, limited compliance | Closest in philosophy but too generic |
| BriteCore | Small/mid P&C carriers | Integrated policy+billing+claims, low-code | US-focused, limited international support | Wrong geography and insurance type |
| EIS | Digital transformation | Multi-line support, modern architecture | Complex implementation, limited user reviews | Potentially interesting but unproven in IPMI |

**Key Insight:** None of the commercial platforms support PassportCard's core differentiators (real-time card payments, digital nomad tracking, multi-currency coverage/premium separation). The Global Policy Factory is not competing with these platforms — it's building internal capability they cannot provide.

### Success Metrics

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Product configuration time | 75% reduction from current baseline | 12 months post-launch |
| Configuration errors reaching production | < 0.5% (from current ~5%) | 6 months post-launch |
| New market launch time | < 30 days (from current 3-6 months) | 18 months post-launch |
| Expert dependency for routine changes | Zero (self-service by trained operators) | 12 months post-launch |
| Policy completeness score compliance | 100% of launched products meet 95% threshold | Immediate |
| Reinsurance reporting accuracy | 99.9% automated bordereaux generation | 12 months post-launch |

### Go-to-Market Summary

This is an internal platform — "go-to-market" means internal rollout:
1. **Phase 1 (Priority 1):** Deploy core modules (Product Shelf, Rule Engine, Versioning, Price Calculator, Currency Basics) to Israel operations team
2. **Phase 2 (Priority 1-2):** Add Gatekeeper/Mover and Reinsurance modules; expand to European operations
3. **Phase 3 (Priority 2):** Deploy Guardrails and Audit modules across all markets
4. **Phase 4 (Priority 3):** Roll out advanced capabilities (Setup Wizard, Border Control, Life Event Reactor, Corporate Structure, Advanced Finance) globally

---

## SECTION B: PRODUCT REQUIREMENTS DOCUMENT

### Overview & Background

The Global Policy Factory is a comprehensive internal platform that transforms how PassportCard/DavidShield configures, manages, and governs insurance products across its global operations. The system is organized into 14 product capabilities ("Product Stories"), prioritized across three tiers. This PRD covers all 14 capabilities with detailed requirements.

### Goals & Non-Goals

#### Goals
1. Eliminate expert dependency for routine product configuration — any trained operator can set up products correctly
2. Enforce minimum 95% completeness score before any product goes live
3. Support multi-currency, cross-border operations natively
4. Maintain immutable audit trails for regulatory compliance (GDPR, SOX)
5. Enable automated policy lifecycle management (grace periods, expiry, renewals)
6. Reduce product launch time from months to days
7. Automate reinsurance tracking and bordereaux generation

#### Non-Goals (Explicit)
1. This is NOT a customer-facing platform — end customers do not interact with it
2. This does NOT replace the claims processing system
3. This does NOT handle agent/broker distribution management
4. This does NOT include payment processing (that remains on PassportCard's existing card infrastructure)
5. This is NOT intended for sale as a SaaS product to other insurers (at this stage)

---

### Product Stories — Full Specification

---

#### 1. The Product Shelf — PRIORITY 1

**Description:** A centralized library of product templates (Travel Insurance, Health Coverage, Group Life, and custom products). Users select templates and configure them for specific markets rather than building from scratch.

**User Story:** As a Product Operations Manager, I want to select a pre-built product template and configure it for a specific market so that I can launch new products without custom coding.

**Acceptance Criteria:**
- Template library displays all available product types with descriptions, target markets, and current active versions
- Users can clone any template to create a new product configuration
- Each template includes pre-configured default values for common fields
- Templates can be organized by category (Travel, Health, Life, Custom) and by market
- Search and filter functionality across all templates
- Template usage tracking (which templates are most used, which markets they serve)

**Functional Requirements:**
- CRUD operations on product templates
- Template inheritance: child products inherit base template properties and can override specific fields
- Field-level locking: template owners can lock certain fields to prevent modification by downstream configurators
- Status management: Draft, Review, Approved, Active, Deprecated
- Bulk operations: clone template to multiple markets simultaneously

---

#### 2. Rule Engine (Managing the Policy Journey) — PRIORITY 1

**Description:** Manages the complete policy lifecycle through configurable business rules. Enforces grace periods, mandatory expiry dates, renewal logic, and state transitions automatically.

**User Story:** As a Product Operations Manager, I want to define lifecycle rules for each product so that policies automatically enforce grace periods, expiry dates, and state transitions without manual intervention.

**Acceptance Criteria:**
- Visual rule builder for defining policy lifecycle states and transitions
- Support for time-based triggers (grace period countdown, expiry warnings, renewal windows)
- Conditional rule chains (if X then Y, with nested conditions)
- Rule validation before activation (simulation of rule impact on existing portfolio)
- Real-time rule execution dashboard showing active rules and recent trigger events
- Conflict detection: warns when new rules contradict existing ones

**Functional Requirements:**
- Policy states: Quote, Bound, Active, Grace Period, Suspended, Lapsed, Expired, Cancelled, Renewed
- Transition rules: configurable conditions for each state change
- Time engine: scheduled rule execution with configurable frequency
- Event bus: rules can be triggered by external events (payment received, claim filed, life event)
- Override capability: authorized users can manually override rule outcomes with audit logging

---

#### 3. Versioning — PRIORITY 1

**Description:** Creates immutable snapshots of every policy change. Supports version branching, side-by-side comparisons, and rollback to previous states. Maintains complete audit trail of all modifications.

**User Story:** As a Senior Underwriter, I want to see the exact coverage terms that were active on any given date so that I can resolve claims disputes with documented evidence.

**Acceptance Criteria:**
- Every change to a policy or product configuration creates an automatic version snapshot
- Side-by-side comparison view showing differences between any two versions
- Point-in-time reconstruction: retrieve the exact state of any policy as of any date
- Rollback capability with confirmation workflow
- Version branching for testing changes before applying to production
- Diff highlighting showing added, modified, and removed fields

**Functional Requirements:**
- Immutable version store (versions cannot be edited or deleted)
- Semantic versioning: Major (coverage change), Minor (pricing adjustment), Patch (administrative correction)
- Branching model: create test branches, validate, merge to production
- Comparison engine: field-level diff for any two versions
- API access to historical versions for claims and compliance systems

---

#### 4. The "No-Training" Setup Wizard — PRIORITY 3

**Description:** A guided, step-by-step interface for policy creation. Adapts its workflow based on policy type (individual, group, ASO). Builds complex policy structures from simple inputs.

**User Story:** As a junior operations staff member, I want to create a new policy by answering simple questions so that I don't need deep technical knowledge to configure products accurately.

**Acceptance Criteria:**
- Wizard adapts flow based on policy type selection (Individual, Group, ASO)
- Progressive disclosure: only shows relevant fields based on previous answers
- Inline validation with helpful error messages
- Preview step before submission showing the complete configuration
- "Help me choose" tooltips for complex decisions
- Ability to save progress and resume later

**Functional Requirements:**
- Configurable wizard steps per product type
- Smart defaults based on market and product type
- Dependency graph: field visibility depends on upstream selections
- Completion percentage indicator
- Integration with Product Shelf for template selection as first step

---

#### 5. The Global Border Control — PRIORITY 3

**Description:** Tracks customer location across countries. Triggers mandatory product switches on relocation. Recalculates premiums based on new country risk profiles. Manages transition deadlines.

**User Story:** As a Product Manager, I want the system to automatically detect when a digital nomad customer moves to a new country and adjust their coverage and premiums accordingly, so that we maintain accurate risk pricing without manual intervention.

**Acceptance Criteria:**
- Country risk profile database with premium adjustment factors
- Automated detection of relocation events (integration with external data sources)
- Mandatory 12-month territory rule enforcement (customers must move every 12 months for global coverage)
- Premium recalculation triggered by country change
- Transition deadline management with automated notifications
- Override capability for exceptional cases with audit logging

**Functional Requirements:**
- Territory database: 195+ countries with risk tiers, regulatory requirements, and premium factors
- Location tracking integration points (API endpoints for mobile app, manual update UI)
- Automated product switch workflow: current product → transition period → new product
- Premium recalculation engine with country-specific factors
- Notification system: customer alerts, internal alerts, compliance alerts
- Reporting: customer movement patterns, territory distribution, risk concentration

---

#### 6. The Life Event Reactor — PRIORITY 3

**Description:** Processes life event triggers and automatically adjusts policies. Events include marriage, childbirth, return to home country, employment changes, income changes, property purchases, education status, and retirement.

**User Story:** As a Product Operations Manager, I want the system to automatically adjust coverage and premiums when a customer experiences a life event so that our policies remain accurately priced and customers get appropriate coverage without manual processing.

**Acceptance Criteria:**
- Configurable life event catalog with associated policy adjustments
- Event intake from multiple sources (customer self-service, agent input, integrated data feeds)
- Automated premium recalculation based on event type and impact
- Coverage adjustment proposals with approval workflow for significant changes
- "Always On" lifecycle tracking from enrollment to policy termination
- Batch processing for events affecting multiple policies simultaneously

**Functional Requirements:**
- Life events supported: Marriage, Divorce, Childbirth/Adoption, Death of dependent, Relocation (home country return), Employment change (freelancer ↔ employee), Income change, Disability onset, Property purchase, Education enrollment, Retirement, Other (custom)
- Event → Rule mapping: each event type maps to configurable adjustment rules
- Impact assessment: before applying changes, show premium impact and coverage changes
- Retroactive adjustment capability with date-effective changes
- Integration hooks for external event sources

---

#### 7. The Gatekeeper & Mover — PRIORITY 1-2

**Description:** Manages customer eligibility, continuation rules, and automated migration between products. Segments customers by criteria and automates transitions from discontinued products to replacements.

**User Story:** As a Country Manager, I want to retire unprofitable products and automatically migrate affected customers to replacement offerings so that I can optimize the portfolio without manual customer-by-customer migration.

**Acceptance Criteria:**
- Eligibility rule engine: define who qualifies for which products based on configurable criteria
- Customer segmentation by demographics, geography, product history, and custom attributes
- Bulk migration workflow: select source product → define migration rules → preview affected customers → execute
- Coverage continuity guarantee: no gap in coverage during migration
- Communication trigger: automated notifications to affected customers
- Migration audit trail: complete record of who was moved, from what, to what, and when

**Functional Requirements:**
- Eligibility criteria builder (age, location, employment, coverage history, risk score)
- Product retirement workflow: mark product for sunset → define migration target → set deadline → execute
- Migration simulation: preview impact before execution
- Rollback capability within defined window
- Continuation rules: guarantee coverage equivalence or improvement
- Reporting: migration success rate, customer retention post-migration, coverage gap analysis

---

#### 8. The Price Calculator — PRIORITY 1

**Description:** Centralizes rate tables and pricing formulas. Calculates premiums consistently across all channels. Supports optional AI-based pricing within actuarial guardrails.

**User Story:** As an Actuary, I want to define rate tables and pricing formulas in a central system so that premiums are calculated consistently across all distribution channels and markets.

**Acceptance Criteria:**
- Rate table management with version control
- Formula builder for complex pricing logic (age bands, territory factors, coverage level multipliers)
- Multi-currency premium calculation
- Channel-agnostic: same pricing engine serves all distribution channels
- Simulation mode: test pricing changes against historical data before going live
- Actuarial guardrails: hard floors and ceilings that AI-based pricing cannot breach

**Functional Requirements:**
- Rate table CRUD with effective dates and versioning
- Formula engine supporting: arithmetic operations, conditional logic, lookup tables, interpolation
- Input variables: age, gender, territory, coverage type, deductible, co-pay, group size, claim history
- Output: calculated premium in premium currency with breakdown by component
- AI pricing module (future): dynamic pricing recommendations within actuarial bounds
- Audit trail: every calculation logged with inputs, formula version, and output

---

#### 9. The Corporate Structure Manager — PRIORITY 3

**Description:** Manages master policy / member certificate relationships for enterprise clients. Controls field-level inheritance between corporate plans and individual employees. Automates propagation of master policy changes.

**User Story:** As a Corporate Account Manager, I want to manage a master policy for a corporate client and have changes automatically propagate to all employee certificates so that I don't have to update thousands of individual records manually.

**Acceptance Criteria:**
- Master policy → member certificate hierarchy
- Field-level inheritance rules (which fields propagate, which can be overridden per member)
- Bulk enrollment: import employee rosters (CSV/API) and generate certificates
- Change propagation: master policy changes cascade to all active certificates
- Exception management: individual employees can have overrides that survive propagation
- Reporting: corporate portfolio view, per-member detail, exception list

**Functional Requirements:**
- Hierarchy model: Corporate Group → Sub-groups (departments, locations) → Individual members
- Inheritance engine: configurable per field (Inherit, Override, Lock)
- Enrollment workflow: bulk import, individual add, API integration
- Census management: track employee additions, terminations, and changes
- Market-by-market compliance rules for group insurance regulations
- Billing rollup: aggregate member premiums to corporate invoice level

---

#### 10. Global Currency Basics — PRIORITY 1

**Description:** Supports multiple currencies with separation between premium currency and coverage currency. Handles basic currency conversions.

**User Story:** As a Product Operations Manager, I want to configure products with separate premium and coverage currencies so that customers can pay in local currency while coverage is denominated in a different currency.

**Acceptance Criteria:**
- Support for 50+ currencies
- Separate premium currency and coverage currency per product
- Exchange rate source configuration (manual entry or external feed)
- Conversion at point-of-sale with rate locking
- Currency display formatting per locale
- Historical rate storage for audit purposes

**Functional Requirements:**
- Currency database: ISO 4217 codes, symbols, decimal precision, formatting rules
- Dual-currency product configuration
- Exchange rate management: manual input, scheduled feed import, API integration
- Conversion engine: apply rate at configured timing (quote time, bind time, renewal time)
- Rate audit: store applied rate for every transaction
- Rounding rules: configurable per currency

---

#### 11. Reinsurance — PRIORITY 1-2

**Description:** Manages reinsurance treaties (Quota Share, Stop Loss, Hybrid). Tracks ceded premiums and calculates claim recoveries. Monitors capacity utilization and partner ratings.

**User Story:** As a Reinsurance Manager, I want the system to automatically calculate ceded premiums and claim recoveries based on active treaties so that I can generate accurate bordereaux and maintain strong relationships with reinsurance partners.

**Acceptance Criteria:**
- Treaty management: create, modify, and track reinsurance agreements
- Automated cession calculation based on treaty terms
- Claim recovery calculation for ceded portions
- Bordereaux generation (premium and claims)
- Capacity monitoring: utilization against treaty limits
- Partner rating tracking and alerts

**Functional Requirements:**
- Treaty types: Quota Share, Excess of Loss (Stop Loss), Facultative, Hybrid
- Treaty terms: effective dates, coverage scope, cession percentages, retention limits
- Automated premium cession: calculate ceded premium per policy based on applicable treaties
- Claim recovery engine: determine recoverable amounts per claim based on treaty terms
- Bordereaux generator: scheduled reports in industry-standard formats
- Dashboard: treaty utilization, cession ratios, outstanding recoveries, partner performance

---

#### 12. The "Novice-Safe" Guardrails — PRIORITY 2

**Description:** Enforces completeness thresholds before product launch. Blocks incomplete configurations. Provides guided remediation and pre-launch simulations.

**User Story:** As a Risk Manager, I want the system to prevent any product from going live unless it meets a minimum 95% completeness score so that configuration errors never reach production.

**Acceptance Criteria:**
- Completeness scoring algorithm: weighted checklist of required configuration elements
- Visual completeness dashboard with red/amber/green status per section
- Block deployment below 95% threshold (hard gate)
- Guided remediation: for each missing/incomplete item, provide instructions and quick links to fix
- Pre-launch simulation: model impact of new/changed product on the portfolio
- Override capability for authorized users only (CTO/CPO level), with mandatory justification

**Functional Requirements:**
- Scoring model: configurable weights per configuration element
- Category scores: Pricing (complete rate tables), Coverage (all terms defined), Compliance (regulatory requirements met), Operations (workflows configured), Reinsurance (treaties linked)
- Simulation engine: run new product against historical data to validate pricing, eligibility, and rule behavior
- Alert system: notify stakeholders when products approach launch readiness
- Reporting: historical launch quality scores, error rates by category, time-to-completeness

---

#### 13. Audit and Control — PRIORITY 2

**Description:** Creates immutable, verified logs of all system actions. Tags transactions for compliance frameworks (GDPR, SOX). Enables complete state reconstruction.

**User Story:** As a Compliance Officer, I want to access an immutable, complete audit trail of every action taken in the system so that I can satisfy regulatory inquiries and demonstrate compliance.

**Acceptance Criteria:**
- Every system action logged: who, what, when, from where, and the before/after state
- Compliance tagging: each log entry tagged with applicable frameworks (GDPR, SOX, local regulations)
- Search and filter across audit logs by user, action type, date range, compliance tag
- State reconstruction: rebuild the complete system state as of any historical date
- Export capability: generate audit reports in formats required by regulators
- Tamper-proof storage (blockchain-verified or equivalent immutability guarantee)

**Functional Requirements:**
- Log schema: timestamp, user ID, action type, entity type, entity ID, before state, after state, IP address, session ID, compliance tags
- Retention policy: configurable per regulation (GDPR: right to erasure vs. SOX: 7-year retention)
- Access control: audit logs are read-only; even system administrators cannot modify
- Bulk export: CSV, JSON, PDF report formats
- Real-time compliance dashboard: open items, upcoming regulatory deadlines, audit readiness score
- Integration points: external compliance tools, legal hold systems

---

#### 14. Advanced Global Finance System — PRIORITY 3

**Description:** Implements three-currency model (premium, coverage, cost-sharing). Manages real-time exchange rates from multiple sources. Supports rate locking strategies and conversion audit trails.

**User Story:** As the CFO, I want to manage currency exposure across the global portfolio with configurable rate-locking strategies so that we protect profit margins from currency volatility.

**Acceptance Criteria:**
- Three-currency model: premium currency, coverage currency, cost-sharing currency
- Multiple exchange rate sources with failover logic
- Rate locking strategies: fixed rate, annual lock, monthly lock, real-time
- Conversion audit trail: every currency conversion logged with applied rate and source
- Currency exposure reporting: net position by currency pair
- Impact simulation: model exchange rate movements against the portfolio

**Functional Requirements:**
- Three-currency configuration per product
- Exchange rate aggregator: multiple API sources (ECB, Bloomberg, XE, custom) with priority ordering
- Rate lock engine: apply selected strategy at configured timing
- P&L impact calculator: model FX gains/losses across the portfolio
- Hedging recommendations (future): suggest hedging strategies based on exposure
- Multi-currency claim settlement: calculate payable amounts across currencies with conversion audit

---

### Non-Functional Requirements

**Performance:**
- Page load time: < 2 seconds for all standard views
- Rule engine execution: < 500ms per rule chain evaluation
- Price calculation: < 1 second for individual, < 30 seconds for batch (1000 policies)
- Search response: < 1 second across all indexed entities

**Security:**
- Role-based access control (RBAC) with field-level permissions
- SSO integration (SAML 2.0 / OAuth 2.0)
- Encryption at rest (AES-256) and in transit (TLS 1.3)
- PII handling per GDPR requirements
- Session management with configurable timeout

**Accessibility:**
- WCAG 2.1 AA compliance
- Keyboard navigation for all functions
- Screen reader compatible
- High contrast mode

**Scalability:**
- Support 500+ concurrent internal users
- Handle 10M+ active policies
- Process 100K+ rule evaluations per hour
- Store 5+ years of version history without performance degradation

**Localization:**
- UI language support: English, Hebrew, German (minimum)
- RTL layout support for Hebrew
- Currency and date formatting per locale
- Timezone-aware scheduling and timestamps

---

### UX/UI Guidelines

**Design Inspiration:** Stripe Dashboard meets PassportCard brand identity
**Primary Color:** PassportCard Red (#E30613) — used for primary actions, alerts, and brand elements
**Secondary Colors:** White (#FFFFFF), Dark Gray (#1A1A2E), Light Gray (#F5F5F7)
**Typography:** Montserrat (English), Rubik (Hebrew)
**Key Principles:**
1. **Clarity over density** — Complex insurance data presented in digestible, scannable layouts
2. **Progressive disclosure** — Show essential information first; details on demand
3. **Confidence through guardrails** — Visual indicators of completeness, compliance, and risk
4. **Global-ready** — Every component supports RTL, multi-currency, and multi-locale

**See the accompanying HTML prototype for visual direction and interaction patterns.**

---

### Technical Considerations

**Recommended Architecture:**
- Microservices architecture with API gateway
- Event-driven communication between modules (event bus)
- Cloud-native deployment (AWS/Azure)
- PostgreSQL for transactional data; Elasticsearch for search; Redis for caching
- GraphQL API for frontend; REST APIs for integrations

**Key Integration Points:**
- PassportCard payment card system
- Claims processing system
- Customer self-service portal and mobile app
- External exchange rate APIs
- Reinsurance partner systems
- Regulatory reporting systems

---

### Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Scope creep from 14 capabilities | High | High | Strict priority-based phased delivery; MVP with Priority 1 only |
| Legacy system migration complexity | High | High | Parallel operation period; gradual migration per product line |
| User adoption resistance | Medium | Medium | Change management program; "No-Training" wizard; champion users per team |
| Regulatory differences across markets | Medium | High | Market-specific compliance modules; legal review per jurisdiction |
| Data migration integrity | Medium | High | Automated validation suite; reconciliation reports; rollback capability |
| Exchange rate API reliability | Low | Medium | Multiple rate sources with failover; cached rates as fallback |

---

### Implementation Roadmap

| Phase | Modules | Target | Milestone |
|-------|---------|--------|-----------|
| Phase 1 | Product Shelf, Rule Engine, Versioning, Price Calculator, Currency Basics | Q2 2026 | Core platform operational for Israel market |
| Phase 2 | Gatekeeper & Mover, Reinsurance, Guardrails, Audit & Control | Q4 2026 | Full governance and compliance capability; European expansion |
| Phase 3 | Setup Wizard, Border Control, Life Event Reactor, Corporate Structure, Advanced Finance | Q2 2027 | Complete platform with all advanced capabilities; global rollout |

---

### Open Questions

1. **Blockchain for audit:** The original document raises blockchain-verified audit logs as a possibility. Decision needed on whether immutable database (append-only with cryptographic verification) is sufficient, or if actual distributed ledger is required.
2. **AI pricing boundaries:** What are the acceptable actuarial guardrails for AI-based dynamic pricing? Need collaboration with actuarial team to define hard limits.
3. **Group insurance regulations:** Market-by-market regulatory research needed for Corporate Structure Manager, particularly in Germany, Australia, and UK.
4. **Data residency:** Given GDPR and local regulations, determine data residency requirements per market — does each region need its own data instance?
5. **Integration priority:** Which legacy system integrations are critical for Phase 1 go-live vs. can operate in parallel?

---

### Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | February 2026 | Benefit Product Studio + Alon Ketzef | Initial version based on founder's strategic roadmap |

---

*© 2026 DavidShield & PassportCard Group. All Rights Reserved. Confidential & Proprietary.*
