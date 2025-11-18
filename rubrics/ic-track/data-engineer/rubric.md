---
title: Data Engineer Competency Rubric
version: 1.0.0
last_updated: 2025-01-15
role: data-engineer
track: ic
---

# Data Engineer Competency Rubric

This rubric defines the role-specific competencies for Data Engineers at each level. All engineers are also evaluated on the three [Universal Criteria](../../../docs/universal-criteria.md): Craft/Quality, Speed, and Adaptiveness.

---

## Level Overview

| Level | Title | Experience | Key Competencies |
|-------|-------|------------|------------------|
| IC1 | Junior Data Engineer | 0-2 years | Data Pipeline Quality, Learning Agility |
| IC2 | Data Engineer | 2-4 years | Data Pipeline Quality, Data Modeling, Collaboration |
| IC3 | Senior Data Engineer | 4-7 years | Data Pipeline Quality, Data Architecture, System Design, Mentoring |
| IC4 | Staff Data Engineer | 7-12 years | Technical Leadership, Data Platform Architecture, Cross-Team Collaboration, Strategic Thinking |
| IC5 | Principal Data Engineer | 12+ years | Technical Vision, Innovation, Organizational Impact, Industry Expertise |

---

## IC1: Junior Data Engineer

### Scope
Task execution within defined boundaries. Focus on learning data engineering fundamentals.

### Competencies

#### Data Pipeline Quality

**Definition**: Building reliable, tested data pipelines for simple use cases

**Level 4 - Meets Expectations:**
- Writes clean, readable pipeline code following team standards
- Includes data quality checks and validation
- Handles common data anomalies and edge cases
- Pipelines are idempotent and recoverable
- Documents data sources, transformations, and outputs

**Level 3 - Needs Improvement:**
- Pipelines work but lack quality checks
- Poor error handling or recovery
- Missing or incomplete documentation
- Requires multiple reviews for same issues

**Level 2/1 - Below Expectations:**
- Pipelines frequently fail or produce bad data
- Ignores feedback from reviews
- No testing or validation

**Development Suggestions:**
- Study team pipeline patterns and standards
- Learn data quality frameworks
- Practice writing idempotent transformations
- Review production pipeline incidents

#### Learning Agility

**Definition**: Ability to learn data engineering concepts and tools quickly

**Level 4 - Meets Expectations:**
- Asks thoughtful questions about data systems
- Learns SQL, Python, and pipeline tools proactively
- Applies feedback to improve data quality
- Understands data lineage and impact
- Shows steady improvement over time

**Level 3 - Needs Improvement:**
- Slow to learn new data tools
- Doesn't understand data context
- Limited initiative in learning

**Level 2/1 - Below Expectations:**
- Doesn't ask questions when stuck
- Makes same data quality mistakes repeatedly
- Resistant to learning new approaches

---

## IC2: Data Engineer

### Scope
Pipeline ownership with independence. Expected to own data pipelines end-to-end.

### Competencies

#### Data Pipeline Quality

**Definition**: Building production-ready pipelines with comprehensive quality controls

**Level 4 - Meets Expectations:**
- Delivers complete, production-ready pipelines
- Comprehensive data quality checks and monitoring
- Optimizes for performance and cost
- Handles schema evolution gracefully
- Considers data freshness and SLA requirements

**Level 3 - Needs Improvement:**
- Pipelines work but lack robustness
- Performance not optimized
- Limited monitoring or alerting

**Level 2/1 - Below Expectations:**
- Frequent data quality issues in production
- Doesn't learn from incidents
- Impacts downstream data consumers

#### Data Modeling

**Definition**: Designing data models that serve business needs effectively

**Level 4 - Meets Expectations:**
- Creates clear, well-documented data models
- Chooses appropriate modeling patterns (star schema, etc.)
- Considers query patterns and performance
- Maintains data dictionary and lineage
- Models are extensible and maintainable

**Level 3 - Needs Improvement:**
- Models work but are difficult to use
- Doesn't consider downstream consumers
- Poor documentation

**Level 2/1 - Below Expectations:**
- Models cause performance issues
- Frequent breaking changes
- Cannot design models independently

**Development Suggestions:**
- Study dimensional modeling patterns
- Learn about data warehouse design
- Practice optimizing queries
- Review successful data models in your org

#### Collaboration

**Definition**: Working effectively with data consumers and stakeholders

**Level 4 - Meets Expectations:**
- Understands business context for data needs
- Communicates data issues and timelines clearly
- Collaborates with analysts and scientists
- Participates in data quality reviews
- Documents data products for consumers

**Level 3 - Needs Improvement:**
- Limited stakeholder communication
- Doesn't understand business context
- Works in isolation

**Level 2/1 - Below Expectations:**
- Poor communication causes data issues
- Dismissive of consumer needs
- Creates friction with stakeholders

---

## IC3: Senior Data Engineer

### Scope
Technical leadership within the data team. Expected to lead data projects and mentor others.

### Competencies

#### Data Pipeline Quality

**Definition**: Setting data quality standards and practices for the team

**Level 4 - Meets Expectations:**
- Pipelines serve as examples for team
- Identifies and addresses data tech debt
- Improves team data quality standards
- Catches subtle data issues in reviews
- Champions data quality culture

**Level 3 - Needs Improvement:**
- Good personal quality but doesn't raise team level
- Doesn't address systemic data issues

**Level 2/1 - Below Expectations:**
- Quality regression from IC2 level
- Negative impact on team standards

#### Data Architecture

**Definition**: Designing data systems that meet current and future needs

**Level 4 - Meets Expectations:**
- Designs scalable data architectures
- Chooses appropriate technologies for use cases
- Considers cost, performance, and maintainability
- Documents architectural decisions (ADRs)
- Evolves architecture incrementally

**Level 3 - Needs Improvement:**
- Good designs but missing key considerations
- Doesn't document decisions
- Over-engineers solutions

**Level 2/1 - Below Expectations:**
- Designs cause production problems
- Cannot handle architectural complexity

**Development Suggestions:**
- Study modern data architectures (lakehouse, etc.)
- Evaluate different data technologies
- Document your design decisions
- Get feedback before implementing

#### System Design

**Definition**: Designing end-to-end data systems with operational concerns

**Level 4 - Meets Expectations:**
- Designs for reliability, observability, and recovery
- Considers data governance and compliance
- Plans for data growth and scale
- Implements effective monitoring and alerting
- Creates runbooks for operations

**Level 3 - Needs Improvement:**
- Designs work but lack operational maturity
- Limited monitoring or documentation
- Doesn't plan for scale

**Level 2/1 - Below Expectations:**
- Systems are fragile and hard to operate
- Cannot design at this complexity level

#### Mentoring

**Definition**: Developing junior data engineers through guidance and feedback

**Level 4 - Meets Expectations:**
- Actively mentors 1-2 junior data engineers
- Provides actionable feedback on data quality
- Shares data engineering knowledge and patterns
- Creates learning opportunities
- Helps mentees build data intuition

**Level 3 - Needs Improvement:**
- Answers questions but doesn't proactively mentor
- Feedback is not actionable
- Hoards knowledge

**Level 2/1 - Below Expectations:**
- Avoids mentoring responsibilities
- Negative impact on mentees

---

## IC4: Staff Data Engineer

### Scope
Cross-team data platform impact. Expected to drive data strategy across the organization.

### Competencies

#### Technical Leadership

**Definition**: Leading data platform direction across multiple teams

**Level 4 - Meets Expectations:**
- Sets data platform direction adopted org-wide
- Drives consensus on data architecture decisions
- Unblocks teams on complex data challenges
- Builds credibility as data platform expert
- Balances technical ideals with business needs

**Level 3 - Needs Improvement:**
- Leads within own team but not across org
- Technical direction not adopted

**Level 2/1 - Below Expectations:**
- Unable to lead at this scope
- Creates data silos

#### Data Platform Architecture

**Definition**: Designing organization-wide data infrastructure and platforms

**Level 4 - Meets Expectations:**
- Designs data platform used across organization
- Makes build vs. buy decisions for data tools
- Defines data governance standards
- Creates self-service data capabilities
- Plans multi-year platform evolution

**Level 3 - Needs Improvement:**
- Good designs but limited adoption
- Doesn't consider org-wide constraints

**Level 2/1 - Below Expectations:**
- Platform causes widespread problems
- Cannot operate at this scope

#### Cross-Team Collaboration

**Definition**: Working across teams to improve data capabilities

**Level 4 - Meets Expectations:**
- Builds relationships with data consumers across org
- Facilitates cross-team data discussions
- Resolves data ownership conflicts
- Enables other teams with data capabilities
- Represents data platform needs effectively

**Level 3 - Needs Improvement:**
- Limited to familiar teams
- Doesn't build relationships proactively

**Level 2/1 - Below Expectations:**
- Creates friction with other teams
- Siloed thinking

#### Strategic Thinking

**Definition**: Connecting data platform work to business objectives

**Level 4 - Meets Expectations:**
- Understands how data drives business value
- Proposes data initiatives aligned with business goals
- Identifies data opportunities for new business needs
- Thinks about data strategy 1-2 years ahead
- Makes trade-offs with business context

**Level 3 - Needs Improvement:**
- Technical focus without business connection
- Short-term thinking only

**Level 2/1 - Below Expectations:**
- Data decisions misaligned with business
- Cannot think strategically

---

## IC5: Principal Data Engineer

### Scope
Organization-wide data engineering strategy and influence.

### Competencies

#### Technical Vision

**Definition**: Defining long-term data engineering direction for the organization

**Level 4 - Meets Expectations:**
- Creates compelling data platform vision
- Articulates 3-5 year data technology roadmap
- Aligns data strategy with company strategy
- Inspires others with data possibilities
- Evolves vision based on industry changes

**Level 3 - Needs Improvement:**
- Has vision but cannot drive adoption
- Vision disconnected from reality

**Level 2/1 - Below Expectations:**
- No clear data vision
- Vision causes organizational problems

#### Innovation

**Definition**: Driving adoption of new data technologies and approaches

**Level 4 - Meets Expectations:**
- Evaluates emerging data technologies
- Leads proof-of-concepts for new approaches
- Drives adoption of valuable innovations
- Balances innovation with stability
- Creates culture of data innovation

**Level 3 - Needs Improvement:**
- Innovates but doesn't spread knowledge
- Chases trends without business value

**Level 2/1 - Below Expectations:**
- No innovation or harmful innovation
- Blocks valuable new approaches

#### Organizational Impact

**Definition**: Improving data engineering capabilities across the organization

**Level 4 - Meets Expectations:**
- Improves data engineering productivity org-wide
- Creates data tools/platforms used across company
- Raises data engineering bar for organization
- Influences hiring and data standards
- Develops other data engineering leaders

**Level 3 - Needs Improvement:**
- Impact limited to part of organization
- Doesn't develop others

**Level 2/1 - Below Expectations:**
- No measurable organizational impact
- Negative impact on data culture

#### Industry Expertise

**Definition**: Being a recognized data engineering expert externally

**Level 4 - Meets Expectations:**
- Recognized expert in data engineering domains
- Represents company at data conferences
- Publishes influential data engineering content
- Brings external perspectives into company
- Builds relationships with data vendors and community

**Level 3 - Needs Improvement:**
- Expert internally but not known externally
- Doesn't engage with data community

**Level 2/1 - Below Expectations:**
- Not recognized as expert
- Damages company reputation
