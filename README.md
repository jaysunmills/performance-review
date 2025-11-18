# Engineering Performance Management System

A non-curve-based performance management framework for technical teams where everyone can achieve top ratings through universal standards and role-specific competencies.

## Philosophy

This system is designed to **enable high performance**, not artificially constrain it. Unlike traditional forced-distribution systems:

- **No bell curve**: Everyone can achieve a 4 rating
- **Clear standards**: Transparent criteria for all levels
- **Growth-focused**: Competencies evolve with career progression
- **Fair compensation**: Must be "all 4s" to be eligible for raises/stock

## Quick Start

1. **Find Your Role**: Navigate to `rubrics/` and locate your role track
2. **Review Universal Criteria**: See `docs/universal-criteria.md` for standards that apply to everyone
3. **Understand Scoring**: Read `docs/scoring-system.md` for the 1-4 scale definitions
4. **Use Templates**: Find review templates in `templates/`

## Directory Structure

```
performance-review/
├── README.md                    # This file
├── docs/                        # Core documentation
│   ├── scoring-system.md        # 1-4 scale definitions
│   ├── universal-criteria.md    # Criteria for all roles
│   └── framework-overview.md    # System overview
├── rubrics/                     # Role-specific competency rubrics
│   ├── ic-track/                # Individual Contributor roles
│   │   ├── software-engineer/
│   │   ├── data-engineer/
│   │   ├── ml-ai-engineer/
│   │   ├── devops-platform-engineer/
│   │   ├── security-engineer/
│   │   └── qa-test-engineer/
│   ├── management-track/        # Engineering management roles
│   └── tpm-pm-track/            # Program/Product management
│       ├── technical-project-manager/
│       ├── technical-program-manager/
│       └── technical-product-manager/
├── data/                        # Structured data files
│   └── roles.yaml               # Role hierarchy definitions
├── schemas/                     # JSON schemas for validation
│   └── rubric-schema.json       # Schema for rubric files
└── templates/                   # Review templates
    ├── self-assessment.md
    ├── manager-review.md
    └── peer-feedback.md
```

## Scoring System Overview

| Score | Rating | Description |
|-------|--------|-------------|
| 4 | Meets Expectations | Target for everyone - completes work in reasonable time, proactively unblocks self |
| 3 | Needs Improvement | Good work but doesn't speak up when blocked |
| 2 | Below Expectations | Slow work, quality issues, or resistance to change |
| 1 | Unacceptable | Significant performance issues requiring immediate action |

## Universal Criteria

All engineering roles are evaluated on:

1. **Craft/Quality**: Excellence in core role responsibilities
2. **Speed**: Reasonable execution pace + proactive unblocking
3. **Adaptiveness**: Willingness to change and flexibility

## Role Tracks

### Individual Contributor (IC) Track
- Software Engineer (IC1-IC5)
- Data Engineer (IC1-IC5)
- ML/AI Engineer (IC1-IC5)
- DevOps/Platform Engineer (IC1-IC5)
- Security Engineer (IC2-IC5)
- QA/Test Engineer (IC1-IC4)

### Management Track
- Engineering Manager
- Senior Engineering Manager
- Director of Engineering
- VP of Engineering

### TPM/PM Track
- Technical Project Manager
- Technical Program Manager
- Technical Product Manager

## File Formats

This system uses portable, version-control-friendly formats:

- **Markdown (.md)**: All documentation and rubrics
- **JSON (.json)**: Structured data for programmatic use
- **YAML (.yaml)**: Configuration and role definitions

## Usage

### For Individual Contributors
1. Review your role's rubric in `rubrics/ic-track/[your-role]/`
2. Complete self-assessment using `templates/self-assessment.md`
3. Discuss with manager using the competency framework

### For Managers
1. Review direct reports' role rubrics
2. Use `templates/manager-review.md` for evaluations
3. Ensure ratings are based on documented criteria

### For HR/Leadership
1. Use `data/roles.yaml` for role hierarchy reference
2. Import structured data from JSON files into your systems
3. Customize templates as needed for your organization

## Contributing

This is a living document. To propose changes:

1. Create a branch for your changes
2. Update relevant documentation and data files
3. Ensure JSON/YAML files validate against schemas
4. Submit for review

## License

Internal use only. Customize for your organization's needs.
