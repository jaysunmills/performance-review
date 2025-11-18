---
title: ML/AI Engineer Competency Rubric
version: 1.0.0
last_updated: 2025-01-15
role: ml-ai-engineer
track: ic
---

# ML/AI Engineer Competency Rubric

This rubric defines the role-specific competencies for ML/AI Engineers at each level. All engineers are also evaluated on the three [Universal Criteria](../../../docs/universal-criteria.md): Craft/Quality, Speed, and Adaptiveness.

---

## Level Overview

| Level | Title | Experience | Key Competencies |
|-------|-------|------------|------------------|
| IC1 | Junior ML Engineer | 0-2 years | Model Development Quality, Learning Agility |
| IC2 | ML Engineer | 2-4 years | Model Development Quality, Experimentation, Collaboration |
| IC3 | Senior ML Engineer | 4-7 years | Model Development Quality, ML System Design, Research Application, Mentoring |
| IC4 | Staff ML Engineer | 7-12 years | Technical Leadership, ML Platform Architecture, Cross-Team Collaboration, Strategic Thinking |
| IC5 | Principal ML Engineer | 12+ years | Technical Vision, Innovation, Organizational Impact, Industry Expertise |

---

## IC1: Junior ML Engineer

### Scope
Task execution within defined boundaries. Focus on ML fundamentals and reproducible experiments.

### Competencies

#### Model Development Quality

**Definition**: Implementing ML models with clean, reproducible code

**Level 4 - Meets Expectations:**
- Writes clean, well-documented ML code
- Experiments are reproducible (seeds, versioning)
- Tracks experiments systematically
- Validates data and model assumptions
- Follows team ML practices and standards

**Level 3 - Needs Improvement:**
- Code works but is hard to reproduce
- Poor experiment tracking
- Missing documentation
- Doesn't validate assumptions

**Level 2/1 - Below Expectations:**
- Experiments not reproducible
- Code doesn't follow standards
- No tracking or documentation

**Development Suggestions:**
- Learn experiment tracking tools (MLflow, W&B)
- Study ML engineering best practices
- Practice writing reproducible notebooks
- Document experiment hypotheses and results

#### Learning Agility

**Definition**: Quickly learning ML concepts, tools, and domain knowledge

**Level 4 - Meets Expectations:**
- Asks thoughtful questions about ML approaches
- Learns ML libraries and tools proactively
- Studies relevant papers and techniques
- Understands when to apply different algorithms
- Shows steady improvement in ML skills

**Level 3 - Needs Improvement:**
- Slow to learn new ML techniques
- Doesn't understand ML fundamentals
- Limited initiative in learning

**Level 2/1 - Below Expectations:**
- Cannot apply basic ML concepts
- Makes same mistakes repeatedly
- Resistant to learning

---

## IC2: ML Engineer

### Scope
Model ownership with independence. Expected to own model development end-to-end.

### Competencies

#### Model Development Quality

**Definition**: Building production-ready models with proper validation

**Level 4 - Meets Expectations:**
- Delivers production-ready models
- Proper train/validation/test splits
- Comprehensive evaluation metrics
- Considers model fairness and bias
- Handles feature engineering effectively

**Level 3 - Needs Improvement:**
- Models work but lack rigor
- Evaluation not comprehensive
- Doesn't consider production constraints

**Level 2/1 - Below Expectations:**
- Models underperform expectations
- Poor validation practices
- Doesn't learn from failures

#### Experimentation

**Definition**: Designing and running effective ML experiments

**Level 4 - Meets Expectations:**
- Designs experiments with clear hypotheses
- Uses appropriate baselines
- Analyzes results thoroughly
- Iterates based on learnings
- Communicates findings clearly

**Level 3 - Needs Improvement:**
- Experiments lack rigor
- Poor baseline selection
- Doesn't analyze failures

**Level 2/1 - Below Expectations:**
- Cannot design experiments independently
- Wastes resources on poor experiments

**Development Suggestions:**
- Study experimental design
- Learn statistical significance testing
- Practice hypothesis-driven development
- Document experiment learnings

#### Collaboration

**Definition**: Working effectively with stakeholders on ML projects

**Level 4 - Meets Expectations:**
- Communicates model capabilities and limitations
- Collaborates with data engineers on pipelines
- Works with product on requirements
- Shares knowledge with team
- Documents models for stakeholders

**Level 3 - Needs Improvement:**
- Limited stakeholder communication
- Oversells model capabilities
- Works in isolation

**Level 2/1 - Below Expectations:**
- Poor communication causes project failures
- Dismissive of non-ML concerns

---

## IC3: Senior ML Engineer

### Scope
Technical leadership within the ML team. Expected to lead ML projects and mentor others.

### Competencies

#### Model Development Quality

**Definition**: Setting ML quality standards and practices for the team

**Level 4 - Meets Expectations:**
- Models serve as examples for team
- Establishes ML best practices
- Ensures reproducibility across team
- Reviews models for quality and rigor
- Champions responsible AI practices

**Level 3 - Needs Improvement:**
- Good personal quality but doesn't elevate team
- Doesn't establish team practices

**Level 2/1 - Below Expectations:**
- Quality regression from IC2
- Negative impact on team standards

#### ML System Design

**Definition**: Designing end-to-end ML systems for production

**Level 4 - Meets Expectations:**
- Designs ML systems for scale and reliability
- Considers monitoring and retraining
- Plans for data drift and model decay
- Balances offline and online metrics
- Designs for interpretability when needed

**Level 3 - Needs Improvement:**
- Good models but poor production design
- Doesn't consider operational concerns

**Level 2/1 - Below Expectations:**
- ML systems fail in production
- Cannot design at this complexity

**Development Suggestions:**
- Study ML system design patterns
- Learn about model monitoring
- Practice designing for production
- Review production ML systems

#### Research Application

**Definition**: Translating research into practical applications

**Level 4 - Meets Expectations:**
- Evaluates relevant research papers
- Adapts research to business problems
- Knows when research approaches apply
- Balances novelty with practicality
- Contributes improvements back

**Level 3 - Needs Improvement:**
- Uses research without adaptation
- Chases latest papers without business value

**Level 2/1 - Below Expectations:**
- Cannot apply research practically
- Over-engineers with unnecessary complexity

#### Mentoring

**Definition**: Developing junior ML engineers

**Level 4 - Meets Expectations:**
- Actively mentors 1-2 junior ML engineers
- Shares ML knowledge and intuition
- Reviews experiments and provides feedback
- Helps mentees build ML judgment
- Creates learning opportunities

**Level 3 - Needs Improvement:**
- Answers questions but doesn't proactively mentor
- Doesn't share ML intuition

**Level 2/1 - Below Expectations:**
- Avoids mentoring
- Negative impact on mentees

---

## IC4: Staff ML Engineer

### Scope
Cross-team ML/AI impact. Expected to drive ML platform and strategy.

### Competencies

#### Technical Leadership

**Definition**: Leading ML direction across multiple teams

**Level 4 - Meets Expectations:**
- Sets ML direction adopted by multiple teams
- Drives consensus on ML approaches
- Unblocks teams on complex ML challenges
- Builds credibility as ML expert
- Balances innovation with business needs

**Level 3 - Needs Improvement:**
- Leads within team but not across org
- ML direction not adopted

**Level 2/1 - Below Expectations:**
- Unable to lead at this scope
- Creates ML silos

#### ML Platform Architecture

**Definition**: Designing ML infrastructure and platforms

**Level 4 - Meets Expectations:**
- Designs ML platform for org
- Creates feature stores, model registries
- Enables self-service ML capabilities
- Plans platform evolution
- Evaluates ML tools and vendors

**Level 3 - Needs Improvement:**
- Good designs but limited adoption
- Doesn't consider org needs

**Level 2/1 - Below Expectations:**
- Platform causes problems
- Cannot operate at this scope

#### Cross-Team Collaboration

**Definition**: Working across teams on ML initiatives

**Level 4 - Meets Expectations:**
- Builds relationships across org
- Facilitates cross-team ML discussions
- Shares ML capabilities across teams
- Enables others to use ML effectively

**Level 3 - Needs Improvement:**
- Limited to familiar teams
- Doesn't share capabilities

**Level 2/1 - Below Expectations:**
- Creates friction
- Siloed thinking

#### Strategic Thinking

**Definition**: Connecting ML work to business objectives

**Level 4 - Meets Expectations:**
- Identifies high-impact ML opportunities
- Proposes ML initiatives aligned with business
- Thinks 1-2 years ahead on ML capabilities
- Makes trade-offs with business context

**Level 3 - Needs Improvement:**
- Technical focus without business connection
- Short-term thinking

**Level 2/1 - Below Expectations:**
- ML decisions misaligned with business

---

## IC5: Principal ML Engineer

### Scope
Organization-wide ML/AI strategy and influence.

### Competencies

#### Technical Vision

**Definition**: Defining long-term ML/AI direction

**Level 4 - Meets Expectations:**
- Creates compelling ML/AI vision
- Articulates multi-year ML roadmap
- Aligns ML strategy with company strategy
- Inspires others with ML possibilities

**Level 3 - Needs Improvement:**
- Has vision but cannot drive adoption
- Vision disconnected from reality

**Level 2/1 - Below Expectations:**
- No clear ML vision

#### Innovation

**Definition**: Driving ML/AI innovation

**Level 4 - Meets Expectations:**
- Evaluates emerging ML technologies
- Leads proof-of-concepts
- Drives adoption of valuable innovations
- Creates innovation culture

**Level 3 - Needs Improvement:**
- Innovates but doesn't spread
- Chases trends without value

**Level 2/1 - Below Expectations:**
- No innovation

#### Organizational Impact

**Definition**: Improving ML capabilities org-wide

**Level 4 - Meets Expectations:**
- Improves ML productivity org-wide
- Creates ML tools used across company
- Raises ML bar for organization
- Develops other ML leaders

**Level 3 - Needs Improvement:**
- Impact limited
- Doesn't develop others

**Level 2/1 - Below Expectations:**
- No organizational impact

#### Industry Expertise

**Definition**: Being a recognized ML expert externally

**Level 4 - Meets Expectations:**
- Recognized ML expert
- Speaks at conferences
- Publishes ML content
- Brings external perspectives

**Level 3 - Needs Improvement:**
- Expert internally only
- Doesn't engage externally

**Level 2/1 - Below Expectations:**
- Not recognized as expert
