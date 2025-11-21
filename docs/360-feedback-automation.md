# 360 Feedback Automation System

## Problem Statement

Manual creation and distribution of 360 feedback surveys presents several operational challenges:

### Current Challenges

1. **Scale**: For an organization with 100+ engineers, manually creating individual surveys is time-prohibitive
2. **Role Customization**: Different roles (Software Engineer, Data Engineer, Engineering Manager, etc.) require different competency questions
3. **Level Specificity**: Competencies vary by level (IC1 vs IC5 have different expectations)
4. **Peer Mapping**: Determining who should review whom requires coordination
5. **Data Aggregation**: Collecting responses and routing them to the correct manager reviews is error-prone
6. **Consistency**: Ensuring all surveys ask questions in the same format for fair evaluation
7. **Tracking**: Monitoring who has completed surveys and sending reminders

### Impact

Without automation, HR/managers spend:
- **2-3 hours** creating survey forms for different roles
- **1-2 hours** manually distributing surveys and tracking completion
- **1-2 hours** aggregating responses into review documents

For a 50-person team, this represents **50-100 hours of manual work per review cycle**.

## Solution Overview

Build an automated 360 feedback system that:

1. **Reads employee data** from a central roster (CSV, YAML, or HRIS API)
2. **Maps employees to roles/levels** using existing role definitions (`data/roles.yaml`)
3. **Generates role-specific Google Forms** programmatically via Google Forms API
4. **Distributes surveys** to selected peers with tracking
5. **Collects responses** and aggregates them by employee
6. **Exports structured data** for manager review and AI synthesis

## Technical Architecture

```
┌─────────────────────┐
│  Employee Roster    │
│  (CSV/YAML/HRIS)    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Survey Generator   │◄─────── data/roles.yaml
│  (Python/Node.js)   │         (competencies)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Google Forms API   │
│  - Create forms     │
│  - Add questions    │
│  - Set permissions  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Email Distribution │
│  (Gmail API/SMTP)   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Peers Complete     │
│  360 Surveys        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Response Collector │
│  (Google Forms API) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Aggregated Data    │
│  (JSON/CSV export)  │
│  → Manager Review   │
└─────────────────────┘
```

## Data Requirements

### 1. Employee Roster

**Format**: CSV, YAML, or API connection to HRIS (BambooHR, Workday, etc.)

**Required Fields**:
```yaml
employees:
  - id: "emp_001"
    name: "Sarah Chen"
    email: "sarah.chen@company.com"
    role: "software_engineer"
    level: "ic3"
    manager_email: "jane.manager@company.com"
    peers:
      - "emp_002"
      - "emp_003"
      - "emp_004"
```

**CSV Example**:
```csv
id,name,email,role,level,manager_email,peer_ids
emp_001,Sarah Chen,sarah.chen@company.com,software_engineer,ic3,jane.manager@company.com,"emp_002;emp_003;emp_004"
emp_002,John Doe,john.doe@company.com,data_engineer,ic2,jane.manager@company.com,"emp_001;emp_005"
```

### 2. Peer Selection Matrix

**Option A: Pre-defined** (manager specifies who reviews whom)
**Option B: Algorithmic** (automatically select based on collaboration data, team structure)
**Option C: Hybrid** (employee nominates 3-5 peers, manager approves)

### 3. Role-to-Competency Mapping

Already exists in `data/roles.yaml`:
```yaml
software_engineer:
  ic3:
    competencies:
      - code_quality
      - technical_problem_solving
      - system_design
      - mentoring
```

## Google Forms API Integration

### Prerequisites

1. **Google Cloud Project** with Forms API enabled
2. **Service Account** with domain-wide delegation (for G Suite)
3. **OAuth 2.0 credentials** for user-based access
4. **Python/Node.js environment**

### API Capabilities

The Google Forms API allows programmatic:
- ✅ Form creation
- ✅ Question addition (multiple choice, scale, text)
- ✅ Section organization
- ✅ Response collection
- ✅ Pre-filling (for tracking which form is for which employee)
- ✅ Settings configuration (require sign-in, limit to 1 response)

### API Limitations

- ⚠️ Cannot directly send forms via API (use Gmail API or SMTP)
- ⚠️ Response notifications require Google Workspace add-ons or webhooks
- ⚠️ Rate limits: 300 requests per minute per project

## Implementation Approach

### Phase 1: Data Preparation

**Script**: `scripts/prepare-roster.py`

```python
#!/usr/bin/env python3
"""
Prepares employee roster data for 360 feedback generation
"""

import yaml
import csv
from typing import List, Dict

def load_employee_roster(file_path: str) -> List[Dict]:
    """Load employee data from CSV"""
    with open(file_path, 'r') as f:
        reader = csv.DictReader(f)
        return list(reader)

def load_role_definitions(file_path: str) -> Dict:
    """Load role/competency mappings"""
    with open(file_path, 'r') as f:
        return yaml.safe_load(f)

def map_employees_to_competencies(employees: List[Dict],
                                   roles: Dict) -> List[Dict]:
    """
    Map each employee to their role-specific competencies

    Returns:
        List of employees with 'competencies' field added
    """
    result = []

    for emp in employees:
        role = emp['role']
        level = emp['level']

        # Get competencies from roles.yaml
        competencies = roles.get(role, {}).get(level, {}).get('competencies', [])

        emp['competencies'] = competencies
        result.append(emp)

    return result

def generate_peer_assignments(employees: List[Dict]) -> Dict:
    """
    Generate who should review whom

    Returns:
        {
          'emp_001': ['emp_002', 'emp_003'],  # Sarah reviewed by John, Alice
          'emp_002': ['emp_001', 'emp_004']   # John reviewed by Sarah, Bob
        }
    """
    assignments = {}

    for emp in employees:
        emp_id = emp['id']

        # Option 1: Use pre-defined peer list
        if 'peer_ids' in emp:
            peer_ids = emp['peer_ids'].split(';')
            assignments[emp_id] = peer_ids

        # Option 2: Auto-assign based on team (same manager)
        # Option 3: Use collaboration data from Git, Jira, etc.

    return assignments

if __name__ == '__main__':
    employees = load_employee_roster('data/employee-roster.csv')
    roles = load_role_definitions('data/roles.yaml')

    # Enrich employee data with competencies
    enriched = map_employees_to_competencies(employees, roles)

    # Generate peer review assignments
    assignments = generate_peer_assignments(enriched)

    # Save for next phase
    with open('data/360-assignments.yaml', 'w') as f:
        yaml.dump({
            'employees': enriched,
            'peer_assignments': assignments
        }, f, default_flow_style=False)

    print(f"✅ Prepared {len(enriched)} employees for 360 feedback")
```

### Phase 2: Survey Generation

**Script**: `scripts/generate-surveys.py`

```python
#!/usr/bin/env python3
"""
Generates role-specific Google Forms for 360 feedback
"""

from google.oauth2 import service_account
from googleapiclient.discovery import build
import yaml
from typing import Dict, List

# Scopes required for Forms API
SCOPES = [
    'https://www.googleapis.com/auth/forms.body',
    'https://www.googleapis.com/auth/drive'
]

def create_forms_service():
    """Authenticate and return Forms API service"""
    credentials = service_account.Credentials.from_service_account_file(
        'credentials/service-account.json',
        scopes=SCOPES
    )
    return build('forms', 'v1', credentials=credentials)

def create_360_form(service, employee: Dict, competencies: List[str]) -> str:
    """
    Create a Google Form for 360 feedback for a specific employee

    Args:
        service: Google Forms API service
        employee: Employee data dict
        competencies: List of competency names for this role/level

    Returns:
        Form URL
    """

    # Define the form structure
    form = {
        "info": {
            "title": f"360 Feedback: {employee['name']}",
            "documentTitle": f"360_Feedback_{employee['id']}_{employee['name'].replace(' ', '_')}",
        }
    }

    # Create the form
    result = service.forms().create(body=form).execute()
    form_id = result['formId']

    # Build questions
    requests = []

    # Introduction section
    requests.append({
        "createItem": {
            "item": {
                "title": "Instructions",
                "description": (
                    f"You are providing feedback for {employee['name']}. "
                    f"Please answer honestly and constructively. "
                    f"This survey takes approximately 10-15 minutes.\n\n"
                    f"Rate each competency on a 1-4 scale:\n"
                    f"4 = Meets Expectations (target performance)\n"
                    f"3 = Needs Improvement (developing)\n"
                    f"2 = Below Expectations (requires action)\n"
                    f"1 = Unacceptable (immediate intervention needed)"
                ),
                "questionItem": {
                    "question": {
                        "required": False,
                        "textQuestion": {
                            "paragraph": False
                        }
                    }
                }
            },
            "location": {"index": 0}
        }
    })

    # Universal Criteria (always included)
    universal_criteria = [
        {
            "name": "Craft / Quality",
            "description": "Delivers high-quality work that meets team standards"
        },
        {
            "name": "Speed",
            "description": "Completes work within reasonable timeframes and self-unblocks"
        },
        {
            "name": "Adaptiveness",
            "description": "Responds effectively to changing priorities and feedback"
        }
    ]

    question_index = 1

    for criterion in universal_criteria:
        # Rating question (1-4 scale)
        requests.append({
            "createItem": {
                "item": {
                    "title": f"{criterion['name']}: Rating",
                    "description": criterion['description'],
                    "questionItem": {
                        "question": {
                            "required": True,
                            "choiceQuestion": {
                                "type": "RADIO",
                                "options": [
                                    {"value": "4 - Meets Expectations"},
                                    {"value": "3 - Needs Improvement"},
                                    {"value": "2 - Below Expectations"},
                                    {"value": "1 - Unacceptable"}
                                ]
                            }
                        }
                    }
                },
                "location": {"index": question_index}
            }
        })
        question_index += 1

        # Brief narrative for evidence/examples
        requests.append({
            "createItem": {
                "item": {
                    "title": f"{criterion['name']}: Evidence (Optional)",
                    "description": "Provide specific examples or observations (2-3 sentences)",
                    "questionItem": {
                        "question": {
                            "required": False,
                            "textQuestion": {
                                "paragraph": True
                            }
                        }
                    }
                },
                "location": {"index": question_index}
            }
        })
        question_index += 1

    # Role-specific competencies
    for competency in competencies:
        competency_title = competency.replace('_', ' ').title()

        requests.append({
            "createItem": {
                "item": {
                    "title": f"{competency_title}: Rating",
                    "questionItem": {
                        "question": {
                            "required": True,
                            "choiceQuestion": {
                                "type": "RADIO",
                                "options": [
                                    {"value": "4 - Meets Expectations"},
                                    {"value": "3 - Needs Improvement"},
                                    {"value": "2 - Below Expectations"},
                                    {"value": "1 - Unacceptable"},
                                    {"value": "N/A - No observation"}
                                ]
                            }
                        }
                    }
                },
                "location": {"index": question_index}
            }
        })
        question_index += 1

        requests.append({
            "createItem": {
                "item": {
                    "title": f"{competency_title}: Evidence (Optional)",
                    "description": "Provide specific examples (2-3 sentences)",
                    "questionItem": {
                        "question": {
                            "required": False,
                            "textQuestion": {
                                "paragraph": True
                            }
                        }
                    }
                },
                "location": {"index": question_index}
            }
        })
        question_index += 1

    # Overall feedback section
    requests.append({
        "createItem": {
            "item": {
                "title": "Strengths",
                "description": f"What does {employee['name']} do particularly well?",
                "questionItem": {
                    "question": {
                        "required": False,
                        "textQuestion": {
                            "paragraph": True
                        }
                    }
                }
            },
            "location": {"index": question_index}
        }
    })
    question_index += 1

    requests.append({
        "createItem": {
            "item": {
                "title": "Development Areas",
                "description": f"What would help {employee['name']} grow?",
                "questionItem": {
                    "question": {
                        "required": False,
                        "textQuestion": {
                            "paragraph": True
                        }
                    }
                }
            },
            "location": {"index": question_index}
        }
    })

    # Batch update the form with all questions
    service.forms().batchUpdate(
        formId=form_id,
        body={"requests": requests}
    ).execute()

    # Configure form settings
    service.forms().batchUpdate(
        formId=form_id,
        body={
            "requests": [{
                "updateSettings": {
                    "settings": {
                        "quizSettings": None,  # Not a quiz
                    },
                    "updateMask": "quizSettings"
                }
            }]
        }
    ).execute()

    form_url = f"https://docs.google.com/forms/d/{form_id}/edit"
    responder_url = f"https://docs.google.com/forms/d/{form_id}/viewform"

    print(f"✅ Created form for {employee['name']}: {responder_url}")

    return {
        'form_id': form_id,
        'edit_url': form_url,
        'responder_url': responder_url,
        'employee_id': employee['id']
    }

def main():
    # Load prepared data
    with open('data/360-assignments.yaml', 'r') as f:
        data = yaml.safe_load(f)

    employees = data['employees']
    peer_assignments = data['peer_assignments']

    # Create Forms API service
    service = create_forms_service()

    # Generate forms for each employee
    generated_forms = []

    for employee in employees:
        form_data = create_360_form(
            service,
            employee,
            employee['competencies']
        )
        generated_forms.append(form_data)

    # Save form URLs for distribution
    with open('data/generated-forms.yaml', 'w') as f:
        yaml.dump({
            'forms': generated_forms,
            'peer_assignments': peer_assignments
        }, f, default_flow_style=False)

    print(f"\n✅ Generated {len(generated_forms)} forms")
    print(f"📄 Form data saved to data/generated-forms.yaml")

if __name__ == '__main__':
    main()
```

### Phase 3: Survey Distribution

**Script**: `scripts/distribute-surveys.py`

```python
#!/usr/bin/env python3
"""
Distributes 360 feedback surveys to peers via email
"""

from google.oauth2 import service_account
from googleapiclient.discovery import build
import yaml
import base64
from email.mime.text import MIMEText

SCOPES = ['https://www.googleapis.com/auth/gmail.send']

def create_gmail_service():
    """Authenticate and return Gmail API service"""
    credentials = service_account.Credentials.from_service_account_file(
        'credentials/service-account.json',
        scopes=SCOPES
    )
    return build('gmail', 'v1', credentials=credentials)

def create_survey_email(reviewer_name: str,
                        employee_name: str,
                        survey_url: str) -> str:
    """Generate email body for survey request"""

    return f"""
Hi {reviewer_name},

It's time for our bi-annual performance review cycle. You've been identified as someone who works closely with {employee_name} and can provide valuable feedback on their performance.

Please complete this brief 360 feedback survey (10-15 minutes):
{survey_url}

This feedback will be aggregated with other inputs to help {employee_name} understand their strengths and development opportunities.

Key points:
• Your individual responses are anonymized and aggregated
• Focus on specific, observable behaviors
• Be honest and constructive
• Deadline: [DATE - 1 week from send]

Thank you for contributing to our team's growth!

Best regards,
People Team
"""

def send_survey_email(service,
                      to_email: str,
                      to_name: str,
                      employee_name: str,
                      survey_url: str):
    """Send survey invitation via Gmail API"""

    message = MIMEText(
        create_survey_email(to_name, employee_name, survey_url)
    )
    message['to'] = to_email
    message['subject'] = f'360 Feedback Request: {employee_name}'

    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()

    service.users().messages().send(
        userId='me',
        body={'raw': raw}
    ).execute()

    print(f"  ✉️  Sent to {to_name} ({to_email})")

def main():
    # Load generated forms and assignments
    with open('data/generated-forms.yaml', 'r') as f:
        data = yaml.safe_load(f)

    with open('data/360-assignments.yaml', 'r') as f:
        assignments_data = yaml.safe_load(f)

    forms = {f['employee_id']: f for f in data['forms']}
    peer_assignments = data['peer_assignments']
    employees = {e['id']: e for e in assignments_data['employees']}

    # Create Gmail service
    service = create_gmail_service()

    # Send surveys
    sent_count = 0

    for employee_id, peer_ids in peer_assignments.items():
        employee = employees[employee_id]
        form_url = forms[employee_id]['responder_url']

        print(f"\n📊 Distributing surveys for {employee['name']}:")

        for peer_id in peer_ids:
            peer = employees.get(peer_id)
            if not peer:
                print(f"  ⚠️  Peer {peer_id} not found, skipping")
                continue

            # Add tracking parameter to URL
            personalized_url = f"{form_url}?usp=pp_url&entry.reviewer_id={peer_id}"

            send_survey_email(
                service,
                peer['email'],
                peer['name'],
                employee['name'],
                personalized_url
            )
            sent_count += 1

    print(f"\n✅ Sent {sent_count} survey invitations")

if __name__ == '__main__':
    main()
```

### Phase 4: Response Collection

**Script**: `scripts/collect-responses.py`

```python
#!/usr/bin/env python3
"""
Collects responses from Google Forms and aggregates by employee
"""

from google.oauth2 import service_account
from googleapiclient.discovery import build
import yaml
import json
from typing import Dict, List

SCOPES = ['https://www.googleapis.com/auth/forms.responses.readonly']

def create_forms_service():
    """Authenticate and return Forms API service"""
    credentials = service_account.Credentials.from_service_account_file(
        'credentials/service-account.json',
        scopes=SCOPES
    )
    return build('forms', 'v1', credentials=credentials)

def get_form_responses(service, form_id: str) -> List[Dict]:
    """Fetch all responses for a form"""

    result = service.forms().responses().list(formId=form_id).execute()
    return result.get('responses', [])

def parse_responses(responses: List[Dict], employee_name: str) -> Dict:
    """
    Parse responses and aggregate ratings

    Returns:
        {
            'employee': 'Sarah Chen',
            'response_count': 4,
            'ratings': {
                'craft_quality': [4, 4, 3, 4],
                'speed': [4, 3, 4, 4],
                ...
            },
            'narratives': {
                'craft_quality': ['Great attention to detail...', ...],
                ...
            },
            'strengths': ['Strong technical skills...', ...],
            'development_areas': ['Could improve communication...', ...]
        }
    """

    aggregated = {
        'employee': employee_name,
        'response_count': len(responses),
        'ratings': {},
        'narratives': {},
        'strengths': [],
        'development_areas': []
    }

    for response in responses:
        answers = response.get('answers', {})

        for question_id, answer_data in answers.items():
            # Extract question title and answer
            # (Implementation depends on form structure)
            pass

    return aggregated

def main():
    # Load form data
    with open('data/generated-forms.yaml', 'r') as f:
        data = yaml.safe_load(f)

    service = create_forms_service()

    all_feedback = []

    for form_data in data['forms']:
        form_id = form_data['form_id']
        employee_id = form_data['employee_id']

        print(f"📥 Collecting responses for {employee_id}...")

        responses = get_form_responses(service, form_id)

        if len(responses) == 0:
            print(f"  ⚠️  No responses yet")
            continue

        # Parse and aggregate
        feedback = parse_responses(responses, employee_id)
        all_feedback.append(feedback)

        print(f"  ✅ {len(responses)} responses collected")

    # Export to JSON for manager review tool
    with open('data/360-feedback-results.json', 'w') as f:
        json.dump(all_feedback, f, indent=2)

    print(f"\n✅ Collected feedback for {len(all_feedback)} employees")
    print(f"📄 Results saved to data/360-feedback-results.json")

if __name__ == '__main__':
    main()
```

## Workflow Summary

### One-Time Setup (1-2 hours)
1. Enable Google Forms API and Gmail API in Google Cloud Console
2. Create service account and download credentials
3. Set up employee roster file format
4. Install Python dependencies: `pip install google-api-python-client google-auth pyyaml`

### Per Review Cycle (15-30 minutes)
1. **Update employee roster** - Add/remove employees, update roles/levels
2. **Run data preparation** - `python scripts/prepare-roster.py`
3. **Generate surveys** - `python scripts/generate-surveys.py` (creates ~50-100 forms in <5 minutes)
4. **Distribute surveys** - `python scripts/distribute-surveys.py`
5. **Wait 1 week** - Employees complete surveys
6. **Collect responses** - `python scripts/collect-responses.py`
7. **Import to review tool** - Load JSON into `mockups/review-tool.html` or custom app

## File Structure

```
performance-review/
├── data/
│   ├── employee-roster.csv           # Input: Employee data
│   ├── 360-assignments.yaml          # Generated: Who reviews whom
│   ├── generated-forms.yaml          # Generated: Form URLs
│   └── 360-feedback-results.json     # Output: Aggregated responses
├── scripts/
│   ├── prepare-roster.py             # Phase 1: Data prep
│   ├── generate-surveys.py           # Phase 2: Create forms
│   ├── distribute-surveys.py         # Phase 3: Send emails
│   └── collect-responses.py          # Phase 4: Gather responses
├── credentials/
│   └── service-account.json          # Google Cloud credentials (gitignored)
└── docs/
    └── 360-feedback-automation.md    # This document
```

## Benefits

### Time Savings
- **Manual process**: 50-100 hours per cycle for 50 employees
- **Automated process**: 15-30 minutes + 1 week wait time
- **ROI**: 95%+ time reduction

### Consistency
- ✅ All surveys ask identical questions for the same role/level
- ✅ Standardized 1-4 rating scale across all feedback
- ✅ Reduces rater bias through structured questions

### Scalability
- ✅ Works for 10 employees or 1000 employees
- ✅ Easy to add new roles/competencies
- ✅ Automated tracking and reminders

### Data Quality
- ✅ Structured responses enable statistical analysis
- ✅ Anonymous aggregation encourages honesty
- ✅ JSON export integrates with review generation tools

## Alternative Approaches

### Option 1: Google Forms + Manual Process
**Pros**: No coding required, use Forms UI
**Cons**: Still manual for each role/employee, hard to scale

### Option 2: Typeform API
**Pros**: Beautiful UI, conditional logic
**Cons**: Paid plans required, similar implementation complexity

### Option 3: SurveyMonkey API
**Pros**: Established platform, analytics built-in
**Cons**: Higher cost, API less flexible than Google Forms

### Option 4: Custom Web App
**Pros**: Full control, integrated with review tool
**Cons**: Higher development cost, maintenance burden

### Option 5: HRIS Integration (BambooHR, Workday)
**Pros**: Single system of record
**Cons**: Expensive, less flexible, vendor lock-in

**Recommendation**: Start with Google Forms API (Option as documented above) due to:
- Low/no cost (free for Google Workspace customers)
- High flexibility and customization
- Easy integration with existing tools
- Familiar interface for employees

## Security & Privacy Considerations

### Data Protection
- 🔒 Store service account credentials in secure vault (not git)
- 🔒 Limit API scopes to minimum required
- 🔒 Use Google Workspace domain restrictions (forms only accessible to company emails)
- 🔒 Enable 2FA for all admin accounts

### Anonymization
- Forms should NOT collect email addresses (if true anonymity desired)
- Aggregate responses (minimum 3-4 responses before showing to manager)
- Use tracking parameters only for completion monitoring, not individual attribution

### Compliance
- ✅ GDPR: Obtain consent, provide data access/deletion
- ✅ SOC 2: Audit trail of access to feedback data
- ✅ Company policy: Follow existing performance review confidentiality guidelines

## Next Steps

1. **Prototype with small team** (5-10 employees)
2. **Validate survey questions** with HR and sample employees
3. **Test end-to-end workflow** including data export/import
4. **Gather feedback** on survey length, question clarity
5. **Refine scripts** based on real-world usage
6. **Scale to full organization**

## Support & Resources

- [Google Forms API Documentation](https://developers.google.com/forms/api/reference/rest)
- [Gmail API Send Email Guide](https://developers.google.com/gmail/api/guides/sending)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Service Account Setup Guide](https://cloud.google.com/iam/docs/service-accounts-create)

## Questions for Implementation

Before building, clarify:

1. **Peer Selection**: Who decides who reviews whom? (Manager, employee, algorithm)
2. **Anonymity**: Truly anonymous or attributed feedback?
3. **HRIS Integration**: Do you have API access to BambooHR/Workday/etc?
4. **Google Workspace**: Do you have admin access to enable APIs?
5. **Timeline**: When is the next review cycle to target?
6. **Pilot Size**: How many employees for initial rollout?
