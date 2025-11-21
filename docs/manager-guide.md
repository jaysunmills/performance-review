---
title: Manager's Guide to Performance Reviews
version: 1.0.0
last_updated: 2025-01-15
audience: managers
---

# Manager's Guide to Performance Reviews

## Purpose of This Guide

This guide helps you conduct effective performance reviews that are:
- **Behavior-focused**: Based on observable actions, not personality traits
- **Evidence-based**: Supported by specific examples
- **Actionable**: Providing clear paths for improvement
- **Fair**: Consistently applied across all direct reports

---

## Core Principle: Behaviors Over Traits

### What This Means

Performance reviews should focus on **what people do** (behaviors and actions), not **who they are** (personality or character).

| ❌ Trait-Based (Avoid) | ✅ Behavior-Based (Use) |
|------------------------|-------------------------|
| "You're lazy" | "You missed 3 out of 5 sprint deadlines this quarter" |
| "You have a bad attitude" | "In the last 3 team meetings, you interrupted colleagues while they were speaking" |
| "You're not a team player" | "When the frontend team asked for help with the API, you didn't respond for 4 days" |
| "You're unorganized" | "Your PRs frequently have missing tests that reviewers catch" |
| "You're difficult to work with" | "In code reviews, you reject suggestions without explaining your reasoning" |

### Why This Matters

**Behaviors are:**
- Observable and measurable
- Changeable through specific actions
- Less likely to trigger defensiveness
- Easier to discuss objectively

**Traits are:**
- Subjective interpretations
- Feel like personal attacks
- Hard to change or action on
- Lead to unproductive conversations

---

## The WHAT-WHY-HOW Framework

Use this framework for every piece of feedback:

### 1. WHAT (The Behavior)
Describe the specific, observable action or pattern.

**Good examples:**
- "In the last 6 PRs, you didn't write unit tests"
- "You delivered the user authentication feature 2 weeks past the agreed deadline"
- "During standup yesterday, you said you were blocked but didn't mention what on"

**Bad examples:**
- "Your code quality is poor" (too vague)
- "You're always late" (not specific)
- "You don't communicate well" (subjective)

### 2. WHY (The Impact)
Explain the consequences of this behavior.

**Good examples:**
- "...which resulted in 3 bugs making it to production"
- "...which delayed the Q4 release and affected the marketing launch"
- "...which meant you stayed blocked for 2 more days when someone could have helped immediately"

**Bad examples:**
- "...which is unacceptable" (judgment, not impact)
- "...which makes you look bad" (personal, not business impact)
- "...because that's not how we do things" (not explaining why it matters)

### 3. HOW (The Path Forward)
Provide specific, actionable guidance.

**Good examples:**
- "Going forward, please add unit tests before submitting PRs. I can pair with you on the first few if helpful."
- "Let's establish a practice: if you're blocked for more than 4 hours, post in #help-engineering with what you've tried"
- "When you disagree with code review feedback, explain your reasoning: 'I chose approach X because of Y'"

**Bad examples:**
- "You need to do better" (not actionable)
- "Try to be more organized" (vague)
- "Just improve your attitude" (not behavioral)

---

## Writing Evidence-Based Reviews

### The Evidence Standard

Every rating should be supported by **multiple specific examples** from the review period.

#### Strong Evidence
- **Specific projects/tasks**: "In the Q3 migration project..."
- **Measurable outcomes**: "Reduced API latency from 800ms to 200ms"
- **Observable behaviors**: "In 4 out of 5 design reviews, you asked clarifying questions"
- **Dated examples**: "On Sept 15th, when the database went down..."
- **360 feedback quotes**: "Three peers mentioned: 'Always responds to questions within 2 hours'"

#### Weak Evidence
- Generalizations: "You usually do good work"
- Feelings: "I feel like you could be more proactive"
- Comparisons: "You're not as strong as Sarah"
- Vague memories: "I remember you did something good"
- No examples: "Your code quality is excellent"

### The 3-Example Rule

For any claim in a review, provide **at least 3 specific examples** from different contexts or time periods.

**Example: Rating someone highly on "Proactive Unblocking"**

❌ Weak:
> "You're good at unblocking yourself when stuck."

✅ Strong:
> "You consistently unblock yourself when facing obstacles:
> - When the external API docs were incomplete, you reverse-engineered the endpoints using Postman and documented them for the team
> - During the database migration, you proactively reached out to the infrastructure team before attempting the schema change
> - When blocked on design decisions, you drafted 2-3 options with tradeoffs and brought them to the team meeting for discussion"

---

## Rating Each Criterion: A Decision Guide

Use these behavior-based indicators to determine ratings.

### Universal Criterion: Craft/Quality

#### Level 4 (Meets Expectations)
**Observable behaviors:**
- Code/work passes review with minimal revisions
- Edge cases and error handling are considered upfront
- Work is maintainable (others can understand and modify it)
- Proactively addresses quality issues before review

**Example evidence:**
- "In the last 10 PRs, average comment count was 2.3 (low for our team)"
- "Implemented comprehensive error handling in the payment flow that caught 3 issues in staging"
- "Added inline documentation that enabled new team member to modify the code without help"

#### Level 3 (Needs Improvement)
**Observable behaviors:**
- Work is complete but requires significant revision
- Overlooks edge cases or error scenarios regularly
- Quality inconsistent between tasks

**Example evidence:**
- "PRs frequently require 2-3 rounds of review for basic issues (missing tests, unclear variable names)"
- "Authentication feature didn't handle session expiry, found during QA"
- "Code works for happy path but crashes on invalid input"

#### Level 2 (Below Expectations)
**Observable behaviors:**
- Work frequently doesn't meet basic quality standards
- Same mistakes repeated despite feedback
- Quality issues reach production regularly

#### Level 1 (Unacceptable)
**Observable behaviors:**
- Work is incomplete or unusable
- Critical quality issues that impact customers/business
- No improvement despite direct intervention

### Universal Criterion: Speed

#### Level 4 (Meets Expectations)
**Observable behaviors:**
- Delivers work in reasonable timeframes for complexity
- Asks for help within 4-8 hours of being blocked
- Communicates early when timeline is at risk
- Breaks down large tasks to maintain momentum

**Example evidence:**
- "Delivered 8 features this quarter, all within estimated timelines"
- "When stuck on the OAuth implementation, posted in Slack after 6 hours with what you'd tried"
- "Flagged the API integration timeline risk 1 week in advance, allowing us to adjust scope"

#### Level 3 (Needs Improvement)
**Observable behaviors:**
- Good work pace but waits too long to ask for help
- Stays blocked for days without escalating
- Doesn't communicate timeline risks proactively

**Example evidence:**
- "Spent 3 days debugging Kubernetes config alone; team member solved it in 30 min when you finally asked"
- "Missed sprint deadline by 2 days but didn't mention challenges until standup on due date"
- "Good work quality but could deliver 20% faster with earlier unblocking"

#### Level 2 (Below Expectations)
**Observable behaviors:**
- Consistently slow execution for complexity level
- Regularly misses deadlines without communication
- Doesn't respond to offers of help

#### Level 1 (Unacceptable)
**Observable behaviors:**
- Work velocity significantly below role expectations
- Blocks team progress by not delivering dependencies
- Unresponsive to timeline concerns

### Universal Criterion: Adaptiveness

#### Level 4 (Meets Expectations)
**Observable behaviors:**
- Incorporates feedback without defensiveness
- Adjusts approach when presented with new information
- Handles priority shifts constructively
- Tries new approaches when first attempt doesn't work

**Example evidence:**
- "When the team suggested using GraphQL instead of REST, you researched both and presented a decision matrix"
- "After feedback about PR size, your next 5 PRs were well-scoped (200-400 lines)"
- "When Q4 priorities shifted, you pivoted to the new project without complaint and got up to speed quickly"

#### Level 3 (Needs Improvement)
**Observable behaviors:**
- Initially resistant to feedback but eventually adapts
- Struggles with ambiguity or changing requirements
- Prefers familiar approaches even when not optimal

**Example evidence:**
- "When asked to add tests, your first response was 'that will take too long', but you did add them after discussion"
- "When the product requirements changed, you expressed frustration in 3 team meetings before moving forward"
- "Continued using jQuery when team had moved to React, requiring rework"

#### Level 2 (Below Expectations)
**Observable behaviors:**
- Resists feedback repeatedly
- Requires manager intervention to adapt
- Frequently references "how we did it at my last company" negatively

#### Level 1 (Unacceptable)
**Observable behaviors:**
- Refuses to adapt despite multiple conversations
- Openly undermines new processes or decisions
- Impacts team morale with resistance

---

## Common Pitfalls to Avoid

### 1. Recency Bias
**Problem**: Overweighting recent events vs. full review period

**How to avoid:**
- Keep notes throughout the review period (weekly or bi-weekly)
- Review commit history, project timelines, and tickets
- Ask yourself: "What did they do in Q1?" (not just Q3)

### 2. The Halo/Horn Effect
**Problem**: One strong trait colors evaluation of all areas

**How to avoid:**
- Rate each criterion independently
- Use the rubric for each criterion separately
- Ask: "Can someone be great at X but weak at Y?"

### 3. Comparing to Others
**Problem**: Rating based on team rank instead of criteria

**How to avoid:**
- Every rating should reference the rubric, not other people
- Multiple people can get 4s
- Ask: "Does this person meet the criteria?" (not "Are they the best on the team?")

### 4. The "Comfort Zone" Trap
**Problem**: Avoiding difficult conversations by inflating ratings

**How to avoid:**
- Remember: False 4s hurt the employee (no development) and team (sets wrong bar)
- A 3 rating is constructive feedback, not a personal attack
- Ask: "If I don't tell them, how will they improve?"

### 5. Vague Language
**Problem**: Using subjective terms that mean different things to different people

**Avoid these words:**
- "Good" / "Bad" (compared to what standard?)
- "Always" / "Never" (rarely literally true)
- "Professional" / "Unprofessional" (define the behavior)
- "Team player" (what actions demonstrate this?)
- "Proactive" (what did they do proactively?)

**Replace with:**
- Specific behaviors
- Measurable outcomes
- Concrete examples

---

## Conducting the Review Conversation

### Before the Meeting

**Prepare:**
1. ✅ Read employee's self-assessment thoroughly
2. ✅ Review 360 feedback and identify themes
3. ✅ Gather specific examples for each rating
4. ✅ Anticipate questions or concerns
5. ✅ Plan development discussion based on career goals
6. ✅ Book 45-60 minutes (don't rush)

**Mental preparation:**
- This is a developmental conversation, not a judgment
- You're helping them grow, even if some ratings aren't 4s
- Listen as much as you talk

### Meeting Structure (45-60 min)

**1. Set the tone (2 min)**
- "This is a conversation, not a lecture. I want to hear your perspective."
- "My goal is to help you grow and succeed."
- "No surprises - this should align with our 1-on-1s."

**2. Share overall assessment (5 min)**
- Start with the big picture
- "Overall, your performance this cycle was [strong/solid/needs improvement]"
- "You received [X] 4s and [Y] 3s"

**3. Discuss strengths (10 min)**
- Start positive
- Use specific examples
- "Your work on X demonstrated strong Y. For example..."
- Ask: "What are you most proud of from this cycle?"

**4. Discuss development areas (15 min)**
- Be direct but constructive
- Use the WHAT-WHY-HOW framework
- "The area for improvement is [behavior]. This impacted [outcome]. Here's how we can address it..."
- Ask: "Does this feedback align with your self-assessment?"

**5. Development plan (10 min)**
- Collaboratively create action items
- "What support do you need from me?"
- "What will success look like in 3 months?"
- Set specific check-in dates

**6. Career discussion (10 min)**
- "Where do you want to go next?"
- "Here's what you'd need to demonstrate to get there..."
- "Let's talk about opportunities to develop those skills"

**7. Questions and wrap-up (5 min)**
- "What questions do you have?"
- "What's one thing you're taking away from this conversation?"
- Confirm next steps and check-ins

### Handling Difficult Reactions

**If they disagree with a rating:**
1. Listen first: "Tell me more about your perspective"
2. Acknowledge their view: "I understand why you see it that way"
3. Share your evidence: "Here's what I observed..."
4. Stay behavior-focused: "Let's look at specific examples"
5. Find alignment: "Can we agree that [behavior] happened and discuss the impact?"

**If they become emotional:**
1. Pause and acknowledge: "I can see this is hard to hear"
2. Take a break if needed: "Let's take 5 minutes"
3. Empathize: "Getting feedback is never easy"
4. Refocus on growth: "My goal is to help you succeed"
5. Follow up: "Let's schedule time tomorrow to continue this conversation"

**If they're surprised:**
1. This is a red flag - you should have discussed this in 1-on-1s
2. Acknowledge: "I should have raised this earlier. I apologize."
3. Be honest: "Here's what I observed and why I didn't mention it sooner"
4. Commit to real-time feedback going forward
5. Don't change the rating, but commit to better ongoing communication

---

## Writing Strong Review Narratives

### Formula for Strong Paragraphs

**For areas rated 4:**
```
[Employee] demonstrates strong [competency] through [behavior pattern].

[Example 1 with context and outcome].
[Example 2 with context and outcome].
[Example 3 with context and outcome].

[Summary of impact/value].
```

**Example:**
> Alex demonstrates strong technical problem-solving through systematic debugging and root cause analysis.
>
> When the production API latency spiked to 2000ms, Alex methodically traced the issue through the stack—identifying a missing database index that had been overlooked during the migration. The fix reduced latency to 150ms and prevented customer churn.
>
> During the payment gateway integration, Alex identified that the vendor's documented rate limits were incorrect through load testing, preventing a production incident.
>
> When investigating intermittent frontend errors, Alex set up comprehensive logging and reproduced the issue, discovering a race condition in our state management that had eluded the team for weeks.
>
> This systematic approach to problem-solving has made Alex a go-to person for critical production issues and has significantly improved our system reliability.

**For areas rated 3:**
```
[Employee] shows [positive aspects] in [competency], with opportunity to improve in [specific behavior area].

[Positive example demonstrating current capability].

However, [specific behavior pattern that needs improvement]. [Example 1]. [Example 2].

[Impact of this gap].

To reach a 4 rating: [Specific, observable behaviors they should demonstrate].
```

**Example:**
> Jamie shows good fundamental coding skills in code quality, with opportunity to improve in proactive testing and edge case handling.
>
> Jamie's code is generally well-structured and readable, with clear variable names and good separation of concerns. The authentication service Jamie built was clean and maintainable.
>
> However, Jamie's PRs frequently require reviewer feedback on missing tests and unhandled edge cases. The user profile update feature didn't validate email format (caught in review). The search functionality crashed on empty strings (caught in QA). The CSV import failed on files with special characters (caught in staging).
>
> This pattern delays code review cycles and increases QA burden, as issues that should be caught during development reach later stages.
>
> To reach a 4 rating: Before submitting PRs, test with invalid inputs, edge cases, and error scenarios. Add unit tests that cover both happy path and error cases. Use a pre-submission checklist: "What could go wrong with this code?"

---

## Development Plans That Work

### Characteristics of Effective Development Plans

**Good development plans are:**
- ✅ Specific: Clear behaviors to demonstrate
- ✅ Measurable: Observable outcomes
- ✅ Time-bound: Specific check-in dates
- ✅ Supported: Manager provides resources/help
- ✅ Relevant: Connected to employee's role and goals

### Development Plan Template

| Development Area | Current State (Observable) | Target State (Observable) | Action Steps | Success Criteria | Timeline | Manager Support |
|------------------|---------------------------|---------------------------|--------------|------------------|----------|-----------------|
| | | | | | | |

### Example: Speed/Unblocking Development Plan

| Development Area | Current State | Target State | Action Steps | Success Criteria | Timeline | Manager Support |
|------------------|---------------|--------------|--------------|------------------|----------|-----------------|
| Proactive unblocking when stuck | Waits 2-3 days before asking for help when blocked | Asks for help within 4-8 hours of being stuck | 1. Set 4-hour timer when blocked<br>2. Document what you've tried<br>3. Post in #help-engineering with context<br>4. Escalate in 1-on-1 if still blocked | 3 consecutive sprints with no multi-day blocks on the same issue | Next 6 weeks | - Weekly 1-on-1 review of blockers<br>- Pair programming on first complex task<br>- Introduction to senior engineers for specific domains |

### Example: Code Quality Development Plan

| Development Area | Current State | Target State | Action Steps | Success Criteria | Timeline | Manager Support |
|------------------|---------------|--------------|--------------|------------------|----------|-----------------|
| Comprehensive testing before PR submission | PRs submitted without tests or with incomplete test coverage | All PRs include tests for both happy path and error cases | 1. Create personal PR checklist<br>2. Write tests BEFORE implementation (TDD)<br>3. Use coverage tool to verify >80% coverage<br>4. Test with invalid inputs manually | 5 consecutive PRs with comprehensive tests on first submission | Next 4 weeks | - Code review focus on test quality<br>- Pairing session on TDD approach<br>- Share examples of excellent test coverage |

---

## Performance Improvement Plans (PIPs)

### When to Use a PIP

A PIP is appropriate when:
- Employee has rating of 2 or below in any criterion
- Previous informal coaching hasn't led to improvement
- Clear, specific behaviors need to change
- Employee needs to understand seriousness of situation

### PIP Best Practices

**1. Be specific about the problem**
- Use observable behaviors, not traits
- Provide dated examples
- Quantify the gap when possible

❌ "Your work is not meeting expectations"
✅ "In the last 6 weeks, you've missed 4 out of 5 sprint commitments, delivered features that required significant rework (3+ review cycles), and missed 2 critical production bugs that reached customers."

**2. Set clear, measurable expectations**
- Define exactly what success looks like
- Make it observable by others
- Set specific check-in milestones

❌ "Improve your delivery speed"
✅ "Deliver 100% of sprint commitments for 3 consecutive sprints, with no more than 1 round of revisions per PR on average."

**3. Provide support**
- What training, resources, or help will you provide?
- Who can they ask for help?
- How often will you check in?

**4. Document consequences**
- Be clear about what happens if expectations aren't met
- Typically: "Continued employment will be at risk"
- Involve HR in setting this language

**5. Weekly check-ins**
- Document progress (or lack thereof)
- Provide real-time feedback
- Adjust support as needed

### PIP Timeline

Typical PIP duration: **30-60 days** (depends on severity and role)

**Week 1:** PIP kickoff meeting, establish baseline
**Weeks 2-7:** Weekly check-ins with documented progress
**Week 8:** Final evaluation meeting
**Outcome:** Continue employment / Extend PIP / Terminate

---

## Calibration: Ensuring Fairness

### What is Calibration?

A meeting where managers review ratings together to ensure:
- Consistent application of standards
- Similar ratings for similar performance
- Evidence-based decisions
- Reduced bias

### How to Prepare

**For each direct report:**
1. Complete your ratings with evidence
2. Prepare to justify each rating with 2-3 examples
3. Identify any ratings you're uncertain about
4. Review the rubric to ensure alignment

### What to Bring to Calibration

- Completed reviews (ratings and key evidence)
- Specific examples for any non-4 ratings
- Questions about edge cases
- Openness to adjusting ratings based on discussion

### During Calibration

**Present each rating:**
- State the rating
- Share 1-2 key examples
- Invite questions

**Listen to challenges:**
- "Would that behavior get a 3 on another team?"
- "Is that evidence sufficient for a 4?"
- "How does this compare to [similar situation]?"

**Be willing to adjust:**
- If you realize your evidence is weak: lower the rating or gather more evidence
- If you realize your standard was too harsh: adjust upward
- If you realize you missed something: incorporate it

### Calibration Questions to Ask

**Testing consistency:**
- "If this person moved to another team, would they get the same rating?"
- "Have we rated similar behaviors similarly across teams?"
- "Are we holding everyone to the same standard, or does this person get different treatment?"

**Testing evidence:**
- "Can you give 3 specific examples of this behavior from different times in the review period?"
- "Is this based on one incident or a pattern?"
- "How do we know this was their contribution vs. team contribution?"

**Testing bias:**
- "Are we rating the work or the person?"
- "Could this be recency bias?" (only remembering recent events)
- "Could this be halo effect?" (one strength/weakness coloring everything)
- "Are we penalizing them for being different from us?"

---

## Ongoing Performance Management

### Performance Reviews Are Not Enough

Reviews should **document** what you've already discussed, not introduce new information.

### Build a Continuous Feedback Culture

**Weekly 1-on-1s:**
- Discuss current work and blockers
- Give real-time feedback (both positive and corrective)
- Track development against goals
- Build relationship and trust

**Real-time feedback:**
- Praise specific behaviors when you see them
- Address concerning behaviors immediately (within 1 week)
- Don't save feedback for the review

**Monthly career conversations:**
- "How are you feeling about your growth?"
- "What do you want to learn next?"
- "What opportunities can I create for you?"

### Keeping Evidence Throughout the Cycle

Create a folder for each direct report and note:

**Weekly/Bi-weekly:**
- Significant projects completed
- Behaviors observed (positive and concerning)
- Feedback from others (peers, stakeholders)
- Examples of competencies demonstrated

**Monthly:**
- Review notes and identify patterns
- Share emerging feedback in 1-on-1s
- Adjust development plans if needed

**Benefits:**
- Review writing takes 50% less time
- No recency bias
- No "blank page" syndrome
- Better, more specific feedback

---

## Quick Reference: Review Writing Checklist

Before submitting a review, verify:

**Evidence Quality**
- [ ] Each rating supported by 2-3 specific, dated examples
- [ ] Examples span the full review period (not just recent)
- [ ] Examples describe behaviors, not traits
- [ ] Examples include impact/outcomes

**Language**
- [ ] No subjective language ("good," "bad," "professional")
- [ ] No personality judgments ("lazy," "difficult," "arrogant")
- [ ] Action-oriented for development areas
- [ ] Clear connection between behaviors and ratings

**Fairness**
- [ ] Applied same standard as other employees
- [ ] No recency bias or halo/horn effect
- [ ] Ratings match what you'd say in calibration
- [ ] No surprises (employee has heard this feedback before)

**Completeness**
- [ ] All criteria rated with evidence
- [ ] Development plan for any 3-rated areas
- [ ] Career discussion notes included
- [ ] Overall assessment summarizes key themes

**Actionability**
- [ ] Development areas include specific "how to improve"
- [ ] Success criteria are observable
- [ ] Timeline and support defined
- [ ] Employee can take action on feedback

---

## Resources and Support

**Need help with:**
- Writing specific behavioral feedback → Share draft with your manager or HR partner
- Calibrating a difficult rating → Discuss in 1-on-1 with your manager before calibration
- Delivering difficult feedback → Role-play with HR or peer manager
- Creating development plans → Review examples in rubrics, consult with HR
- PIPs → Always involve HR before initiating

**Remember:** The goal is to help people grow and succeed. Honest, specific, behavioral feedback is a gift—even when it's hard to hear.
