---
title: Rippling Implementation Guide
version: 1.0.0
last_updated: 2025-01-15
audience: hr-leadership
---

# Implementing Performance Reviews with Rippling

This guide explains how to implement our behavior-based performance review system using Rippling's performance management platform and automation features.

---

## Overview: Division of Responsibilities

### What Rippling Handles (Platform)
- 360 survey distribution and collection
- Review cycle automation and reminders
- AI-powered performance signals (Talent Signal)
- Compensation integration
- Employee data management
- Survey analytics and reporting
- Workflow automation

### What This Framework Provides (Content & Process)
- Behavior-based rubrics and competency definitions
- Manager training on writing effective feedback
- Universal criteria and role-specific competencies
- Calibration process and guidelines
- Development plan templates
- PIP procedures

**Think of it this way:** Rippling is the delivery system, this framework is the content and methodology.

---

## Implementation Phases

### Phase 1: Setup & Configuration (Week 1-2)

#### 1.1 Import Custom Rubrics into Rippling

**What to do:**
1. Navigate to Rippling Performance Management settings
2. Create custom review templates for each role track:
   - IC Track (Software Engineer, Data Engineer, etc.)
   - Management Track
   - TPM/PM Track

**For each role template, configure:**

**Universal Criteria (Same for all roles):**
- Craft/Quality
- Speed
- Adaptiveness

**Rating Scale:**
- 4 = Meets Expectations
- 3 = Needs Improvement
- 2 = Below Expectations
- 1 = Unacceptable

**Role-Specific Competencies:**
- Import from `rubrics/[track]/[role]/rubric.md`
- Create separate competency sets for each level (IC1-IC5, M1-M4, etc.)
- Add competency definitions as help text

**Example: Software Engineer IC3 (Senior)**
```
Universal Criteria:
├── Craft/Quality (1-4 scale)
├── Speed (1-4 scale)
└── Adaptiveness (1-4 scale)

Role-Specific Competencies:
├── Code Quality (1-4 scale)
├── Technical Problem Solving (1-4 scale)
├── System Design (1-4 scale)
└── Mentoring (1-4 scale)
```

#### 1.2 Configure Review Question Sets

**Self-Assessment Questions:**
```
For each Universal Criterion (Craft, Speed, Adaptiveness):
- How would you rate yourself? (1-4 scale)
- What are 2-3 examples that demonstrate this rating?
- What would you like to improve?

For each Role-Specific Competency:
- How would you rate yourself? (1-4 scale)
- Provide specific examples from this review period
- What support do you need to grow in this area?

Career & Development:
- What are you most proud of from this cycle?
- What are your career goals for the next 6-12 months?
- What skills or experiences do you want to develop?
```

**Manager Review Questions:**
```
For each criterion/competency:
- Rating (1-4 scale)
- Evidence and specific examples (text area)
- Strengths observed (text area)
- Development areas (text area)
- Action items if rating < 4 (text area)

Overall Assessment:
- Overall performance summary
- Key strengths (3-5 bullet points)
- Primary development areas (2-3 bullet points)
- Development goals for next period
```

**360 Peer Feedback Questions:**
```
About [Employee Name]:

Multiple Choice (1-4 scale):
- How effective is their collaboration?
- How clear is their communication?
- How reliable are they in delivering commitments?
- How strong is their technical contribution?

Short Answer (2-3 sentences each):
- What does this person do well?
- What could they improve?
- What impact have they had on you or your team?
```

#### 1.3 Set Up Review Cycle Automation

**Annual/Semi-Annual Review Cycle:**
1. Go to Performance Management > Review Cycles
2. Create new cycle: "H1 2025 Performance Review"
3. Configure timeline:
   - Week 1: Self-assessments open
   - Week 2: Self-assessments due, 360 surveys sent
   - Week 3: 360 surveys due, manager reviews due
   - Week 4: Calibration sessions
   - Week 5: Review delivery meetings

**Automated Reminders:**
- Self-assessment reminder: 3 days before due date
- 360 survey reminder: 2 days before due date
- Manager review reminder: 5 days before due date
- Delivery meeting reminder: 1 day before scheduled meeting

**Milestone-Based Reviews (for new hires):**
1. Create milestone review templates for:
   - 30-day check-in
   - 60-day check-in
   - 90-day review (full review using role rubric)
2. Configure Rippling to trigger based on start date
3. Simplified competency set for 30/60-day reviews

---

### Phase 2: Talent Signal Integration (Week 2-3)

#### 2.1 Enable Talent Signal (AI Performance Analysis)

**What it does:**
Talent Signal analyzes actual work output to provide objective performance data:
- **Engineers**: GitHub commits, PRs, code reviews
- **Sales**: Salesforce/Gong activity, deal progression
- **Support**: Zendesk tickets, resolution time, customer satisfaction

**How it works:**
1. Rippling connects to your tools (GitHub, Salesforce, Zendesk)
2. AI analyzes work patterns and output quality
3. Rates employees: "on-track," "high-performing," or "needs attention"
4. Provides specific examples for manager review

**Setup steps:**
1. Navigate to Talent Signal settings in Rippling
2. Connect integrations:
   - GitHub (for engineering team)
   - Salesforce + Gong (for sales team)
   - Zendesk (for support team)
3. Configure evaluation periods:
   - New hires: First 90 days
   - Ongoing: Monthly or quarterly snapshots
4. Set notification preferences for managers

#### 2.2 Integrating Talent Signal with Your Review Process

**For the "Craft/Quality" criterion:**

Managers should use Talent Signal data as **objective evidence**:

Example for Software Engineer:
```
Craft/Quality Rating: 4

Evidence from Talent Signal:
- Submitted 47 PRs this quarter with average 2.1 review cycles (team average: 3.4)
- Code review comments primarily focused on architecture discussion, not basic quality issues
- Zero critical bugs traced to their code in production

Additional observations:
- Proactively refactored the authentication service for better maintainability
- Documentation quality praised by 3 peers in 360 feedback
- Consistently considers edge cases before PR submission
```

**For the "Speed" criterion:**

Talent Signal provides velocity data:
```
Speed Rating: 4

Evidence from Talent Signal:
- Average PR cycle time: 1.8 days (team average: 2.5 days)
- Delivered 8 features on schedule, 0 delayed
- When blocked on OAuth implementation, escalated after 6 hours with detailed context

Additional observations:
- Proactively communicates timeline risks
- Breaks down large features into shippable increments
```

**Important:** Talent Signal provides data, but managers still need to:
- Apply the behavior-based framework
- Add context and qualitative observations
- Consider 360 feedback and self-assessment
- Make final rating decisions

---

### Phase 3: Workflow Automation (Week 3-4)

#### 3.1 Automate 360 Peer Selection

**Manual approach (simpler):**
1. Managers select 3-5 peers for each direct report in Rippling
2. Rippling sends surveys automatically

**API-based approach (scales better):**

If you have many employees, automate peer selection:

```python
# Example: Auto-assign peers based on collaboration data
# This would use Rippling API + your internal data

import rippling_api

def assign_360_peers(employee_id, review_cycle_id):
    """
    Auto-assign 360 peers based on:
    - GitHub: Who they collaborated with most (PR reviews, pair programming)
    - Slack: Cross-functional communication partners
    - Project data: Team members on shared projects
    """

    # Get collaboration data
    peers = get_top_collaborators(employee_id, months=6, limit=5)

    # Ensure diversity (different roles, teams)
    balanced_peers = balance_peer_selection(peers)

    # Assign via Rippling API
    for peer_id in balanced_peers:
        rippling_api.assign_360_reviewer(
            employee_id=employee_id,
            reviewer_id=peer_id,
            review_cycle_id=review_cycle_id
        )
```

**Configuration in Rippling:**
1. Use Rippling webhooks to trigger peer assignment
2. When review cycle starts → webhook fires → your script runs
3. Script assigns peers via API
4. Rippling sends surveys automatically

#### 3.2 Automate Survey Distribution

**Rippling handles this natively:**
1. Configure survey send timing in review cycle settings
2. Rippling automatically sends to:
   - Employee (self-assessment)
   - Selected peers (360 surveys)
   - Manager (review form)
3. Automated reminders for incomplete surveys
4. Real-time completion tracking dashboard

**No custom scripting needed** - Rippling's built-in automation replaces the Google Forms API scripts in `scripts/`.

#### 3.3 Automate Data Aggregation

**360 Feedback Synthesis:**

Rippling automatically aggregates 360 responses:
- Anonymized feedback (if 3+ respondents)
- Quantitative data averaged
- Qualitative responses grouped by theme
- Presented to manager in review interface

**Manager view example:**
```
360 Feedback Summary for Jane Doe:

Collaboration (avg: 3.8/4.0)
- 4 reviewers rated 4, 1 rated 3

Themes from qualitative feedback:
✓ Strengths mentioned by multiple peers:
  - "Always responsive to questions" (3 mentions)
  - "Clear documentation" (2 mentions)
  - "Proactive in unblocking others" (2 mentions)

⚠ Development areas mentioned:
  - "Could be more concise in meetings" (2 mentions)
  - "Sometimes moves too fast without context" (1 mention)
```

#### 3.4 AI-Assisted Review Generation

**Rippling's AI capabilities (as of 2024):**

Rippling can use AI to:
1. Summarize 360 feedback themes
2. Draft review narrative based on manager ratings + notes
3. Suggest development actions based on competency gaps
4. Generate performance improvement plan templates

**How to use:**
1. Manager completes ratings and adds brief notes/examples
2. Clicks "Generate draft" in Rippling
3. AI synthesizes:
   - Manager notes
   - 360 feedback
   - Talent Signal data
   - Self-assessment
4. Produces draft review narrative
5. Manager reviews, edits, and personalizes

**Important:** Just like in your original framework, AI provides a **starting draft** - managers must review and personalize before delivery.

---

### Phase 4: Calibration Process (Week 4)

#### 4.1 Pre-Calibration Data Export

**Extract data from Rippling:**
1. Export all ratings for calibration session
2. Include: Employee name, role, level, ratings by criterion
3. Filter by team/department for calibration groups

**Rippling provides:**
- Rating distribution dashboard
- Outlier identification (unusually high/low ratings)
- Comparison to previous cycles
- Team-by-team breakdown

#### 4.2 Conduct Calibration Session

**Use your calibration framework** (from `docs/manager-guide.md`):

Rippling helps by providing:
- Side-by-side rating comparisons
- Historical rating data
- Team distribution visualizations

**Process:**
1. Managers meet with calibration group (peers + leadership)
2. Review rating distribution on Rippling dashboard
3. Discuss outliers and ensure consistency
4. Managers adjust ratings in Rippling if needed
5. Lock ratings after calibration approval

**Questions to ask** (from manager guide):
- "Would this person get the same rating with a different manager?"
- "Is the evidence sufficient for this rating?"
- "Are we applying the same standard as last cycle?"

#### 4.3 Post-Calibration Updates

**In Rippling:**
1. Managers update ratings based on calibration discussion
2. Add calibration notes to internal review section
3. Mark reviews as "Approved" after calibration
4. Lock reviews to prevent further changes

---

### Phase 5: Review Delivery & Follow-Up (Week 5+)

#### 5.1 Schedule Delivery Meetings

**Rippling automation:**
1. Once review is marked "Ready to share"
2. Rippling sends meeting invite to employee + manager
3. Suggested duration: 45-60 minutes
4. Review document shared with employee before meeting

**Meeting structure** (from your process guide):
- Share overall assessment (5 min)
- Discuss strengths (10 min)
- Discuss development areas (15 min)
- Create development plan (10 min)
- Career discussion (10 min)
- Q&A (5 min)

#### 5.2 Development Plan Tracking

**Create development plans in Rippling:**
1. After delivery meeting, manager creates development goals
2. Track in Rippling's goal management system
3. Link goals to specific competencies that rated < 4

**Example development goal:**
```
Goal: Improve proactive unblocking (Speed criterion rated 3)

Success Criteria:
- Ask for help within 4 hours when blocked (observable)
- No multi-day blocks on same issue for 3 consecutive sprints
- Post in #help-engineering with context when stuck

Timeline: Next 6 weeks (check-in bi-weekly)

Manager Support:
- Weekly 1-on-1 review of blockers
- Pair programming on first complex task
- Introduction to senior engineers for specific domains
```

**Rippling features:**
- Progress updates on goals
- Check-in reminders
- Goal completion tracking
- Links goals to next review cycle

#### 5.3 Compensation Integration

**Rippling automatically:**
1. Links performance ratings to compensation decisions
2. Flags employees eligible for merit increases (all 4s)
3. Syncs approved comp changes to payroll
4. Tracks compensation history

**Your framework rule:**
- Must be "all 4s" to be eligible for raises/stock
- Rippling can enforce this with approval workflows

**Setup:**
1. Configure compensation approval workflow
2. Set rule: Rating < 4 in any criterion = not eligible
3. Managers submit comp recommendations
4. Rippling checks eligibility automatically
5. Routes to appropriate approvers

---

## Technical Integration Points

### API Integration Opportunities

If you want deeper automation, Rippling's API supports:

#### 1. Automated Peer Assignment
```python
# Assign 360 reviewers based on collaboration data
POST /api/performance/review_cycles/{cycle_id}/assign_reviewers
{
  "employee_id": "emp_123",
  "reviewer_ids": ["emp_456", "emp_789", "emp_101"],
  "review_type": "360_peer"
}
```

#### 2. Bulk Review Creation
```python
# Programmatically create reviews for all employees
POST /api/performance/reviews/bulk_create
{
  "review_cycle_id": "cycle_abc",
  "template_id": "template_ic3_swe",
  "employee_ids": ["emp_123", "emp_456", ...]
}
```

#### 3. Webhook Integration
```python
# Receive notifications when reviews are completed
webhook_url: https://your-system.com/webhooks/rippling

Event types:
- review.completed
- review.calibrated
- review.delivered
- 360_survey.completed
```

#### 4. Data Export for Analysis
```python
# Export review data for custom analytics
GET /api/performance/reviews?cycle_id=cycle_abc&format=json

# Export Talent Signal data
GET /api/talent_signal/scores?employee_id=emp_123&period=Q4_2024
```

### Integration with Internal Tools

**GitHub Integration (for Engineering):**
- Rippling Talent Signal already connects to GitHub
- Provides commit frequency, PR quality, review participation
- No additional integration needed

**Slack Integration:**
- Send review reminders via Slack
- Post completion milestones to team channels
- Notify managers of pending reviews

**Calendar Integration:**
- Auto-schedule review delivery meetings
- Block time for calibration sessions
- Send reminders for check-ins

---

## Migration Strategy

### If You're Moving from Google Forms Automation

**What changes:**
| Current System | Rippling Equivalent |
|----------------|---------------------|
| Google Forms surveys | Rippling survey builder |
| Google Forms API scripts | Native Rippling automation |
| Manual email distribution | Automated Rippling emails |
| Python scripts for aggregation | Built-in Rippling analytics |
| Custom dashboard | Rippling reporting dashboard |

**What stays the same:**
- Your rubric content (competencies, criteria)
- Manager training materials
- Behavior-based feedback framework
- Calibration process

**Migration steps:**
1. Export rubric content from markdown files
2. Configure in Rippling review templates
3. Test with pilot group (1 team)
4. Iterate based on feedback
5. Roll out to entire organization
6. Deprecate Google Forms scripts

### Training Plan for Managers

**Week 1: Framework Training (2 hours)**
- Review `docs/manager-guide.md`
- Practice behavior-based feedback
- Understand WHAT-WHY-HOW framework
- Review rating criteria

**Week 2: Rippling Platform Training (1 hour)**
- Navigate Rippling Performance Management
- Complete practice review
- Understand Talent Signal data
- Learn AI-assisted review generation

**Week 3: Practice Reviews**
- Each manager completes 1 practice review
- Submit for peer review
- Get feedback on quality
- Iterate

**Week 4: Live Cycle Begins**
- Kick off first review cycle
- Provide manager office hours for questions
- Monitor completion rates
- Provide real-time support

---

## Best Practices

### 1. Start with Pilot Group
- Test with one team (10-20 employees) first
- Gather feedback on:
  - Clarity of rubric in Rippling interface
  - Time required to complete reviews
  - Quality of AI-generated drafts
  - Usability of Talent Signal data
- Iterate before full rollout

### 2. Keep Your Framework Documentation
- Don't rely solely on Rippling help text
- Maintain `docs/manager-guide.md` for training
- Use rubric markdown files as source of truth
- Update Rippling when rubrics evolve

### 3. Use Talent Signal as Data, Not Decision
- Talent Signal provides objective metrics
- Managers still apply judgment and context
- Combine with 360 feedback and self-assessment
- Final rating is manager decision, supported by data

### 4. Customize AI Prompts (if available)
- If Rippling allows custom AI prompts, configure to:
  - Use WHAT-WHY-HOW framework
  - Focus on behaviors, not traits
  - Include specific examples
  - Suggest actionable development steps

### 5. Regular Calibration is Critical
- Don't skip calibration sessions
- Use Rippling data to identify outliers
- Ensure consistency across teams
- Document calibration decisions

### 6. Link to Development Planning
- Every rating < 4 needs a development goal
- Track goals in Rippling's goal system
- Check-in bi-weekly or monthly
- Link goals to next review cycle

### 7. Monitor Time Investment
- Track time managers spend on reviews
- Goal: ~1.5 hours per direct report
- If higher, identify bottlenecks:
  - Unclear rubric?
  - Insufficient Talent Signal data?
  - Need better manager training?

---

## Troubleshooting

### Common Issues and Solutions

**Issue: Managers say AI drafts are too generic**
- Solution: Train managers to add specific examples in notes before generating
- More detailed manager notes = better AI output
- Emphasize: AI draft is starting point, not final product

**Issue: Talent Signal data doesn't match manager observations**
- Solution: Talent Signal shows output, not impact
- Manager should add context about quality, collaboration, impact
- Use Talent Signal as one data point, not sole source

**Issue: 360 surveys not getting completed**
- Solution:
  - Reduce number of peers (3-5 max)
  - Shorten survey (10 min max)
  - Send Slack reminders in addition to email
  - Have managers personally ask peers

**Issue: Reviews taking too long**
- Solution:
  - Managers should take notes throughout cycle (not all at end)
  - Use Talent Signal data to reduce evidence gathering
  - Simplify rubric if too many competencies
  - Provide templates and examples

**Issue: Inconsistent ratings across teams**
- Solution:
  - Mandatory calibration sessions
  - Use Rippling distribution dashboard to spot outliers
  - Manager training on rating criteria
  - Review sample reviews together

**Issue: Employees surprised by ratings**
- Solution: This is a process failure, not a tool issue
  - Managers must give real-time feedback in 1-on-1s
  - No surprises rule: If it's in the review, they've heard it before
  - Train managers on continuous feedback culture

---

## Cost-Benefit Analysis

### Time Savings with Rippling vs. Manual Process

**Per 50-employee review cycle:**

| Task | Manual (Google Forms) | Rippling | Time Saved |
|------|----------------------|----------|------------|
| Create 360 surveys | 4 hours | 30 min (one-time setup) | 3.5 hrs |
| Distribute surveys | 2 hours | Automated | 2 hrs |
| Send reminders | 3 hours | Automated | 3 hrs |
| Collect responses | 2 hours | Automated | 2 hrs |
| Aggregate data | 6 hours | Automated | 6 hrs |
| Generate review drafts | 40 hours (50 × 45 min) | 10 hours (with AI assist) | 30 hrs |
| Schedule meetings | 4 hours | 1 hour (automated invites) | 3 hrs |
| **Total** | **61 hours** | **11.5 hours** | **49.5 hrs (81% reduction)** |

### Additional Benefits

**Quantitative:**
- Reduced errors (automated data aggregation)
- Higher completion rates (automated reminders)
- Faster cycle time (parallel workflows)
- Better compliance tracking (audit trail)

**Qualitative:**
- More consistent reviews (AI standardization)
- Better evidence (Talent Signal data)
- Less manager bias (objective metrics)
- Improved employee experience (faster process)

### Investment Required

**Rippling costs:**
- Performance Management module: ~$8/employee/month
- Talent Signal: Currently free
- API access: Included with platform
- Training time: 4 hours per manager (one-time)

**Your framework value:**
- Behavior-based methodology (differentiator)
- Custom rubrics (tailored to your org)
- Manager training (quality improvement)
- Calibration process (consistency)

**Total:** Platform cost + framework development investment = ROI in first cycle

---

## Success Metrics

### Track These KPIs

**Process Efficiency:**
- Average time per review (target: 90 min)
- Review completion rate (target: 100%)
- 360 survey response rate (target: 95%+)
- Cycle completion time (target: 5 weeks)

**Quality Metrics:**
- Manager satisfaction with Rippling tools (survey)
- Employee satisfaction with review quality (survey)
- Number of appeals/disputes (target: <2%)
- Rating distribution consistency across teams

**Business Impact:**
- Retention rate for high performers (target: >90%)
- Time-to-improvement for 3-rated employees (target: <6 months)
- Promotion readiness clarity (% employees with clear path)
- Talent Signal accuracy (correlation with manager ratings)

**Adoption Metrics:**
- % managers using Talent Signal data
- % reviews using AI draft feature
- % development goals tracked in Rippling
- % employees who understand their ratings (survey)

---

## Next Steps

### Implementation Checklist

**Week 1-2: Setup**
- [ ] Provision Rippling Performance Management module
- [ ] Import rubric templates for all roles
- [ ] Configure review question sets
- [ ] Enable Talent Signal integrations
- [ ] Set up first review cycle

**Week 3-4: Training**
- [ ] Train managers on behavior-based framework
- [ ] Train managers on Rippling platform
- [ ] Conduct practice reviews
- [ ] Create manager resource hub

**Week 5-6: Pilot**
- [ ] Run pilot with 1-2 teams
- [ ] Gather feedback
- [ ] Iterate on rubrics/questions
- [ ] Refine process

**Week 7-8: Full Rollout**
- [ ] Launch organization-wide cycle
- [ ] Monitor completion rates
- [ ] Provide manager support
- [ ] Conduct calibration sessions

**Week 9: Review & Iterate**
- [ ] Analyze cycle metrics
- [ ] Survey managers and employees
- [ ] Document lessons learned
- [ ] Update process for next cycle

---

## Resources

### Documentation to Maintain
- This framework documentation (source of truth)
- Rippling configuration documentation
- Manager quick-start guides
- Employee FAQs
- Troubleshooting playbook

### Training Materials
- Manager training deck (behavior-based feedback)
- Rippling platform walkthrough video
- Sample reviews (good and bad examples)
- Calibration session guide
- Development planning templates

### Support Channels
- Manager Slack channel: #perf-reviews-managers
- Employee FAQ page
- HR partner office hours
- Rippling support: support.rippling.com

---

## Conclusion

**Rippling provides the automation and platform** to make your performance review process efficient and scalable. **Your framework provides the methodology and content** that makes reviews valuable and behavior-focused.

**Combined, you get:**
- ✅ 80%+ time savings through automation
- ✅ Objective data via Talent Signal
- ✅ Consistent, high-quality reviews
- ✅ Behavior-based feedback culture
- ✅ Clear development paths
- ✅ Scalable from 10 to 1000+ employees

**Key success factors:**
1. Don't abandon your framework - configure it into Rippling
2. Train managers on behaviors, not just the tool
3. Use AI as assistant, not replacement for judgment
4. Calibrate ratings to ensure fairness
5. Link reviews to development and growth

Start with a pilot, iterate based on feedback, and scale with confidence.
