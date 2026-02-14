# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Do not open a public issue for security vulnerabilities.**

Instead, use GitHub's private vulnerability reporting:

1. Go to the repository
2. Click "Security" tab
3. Click "Report a vulnerability"
4. Fill in the details

Or email: security@barazo.forum

We will respond within 72 hours with next steps.

## Security Scope for This Repo

barazo-lexicons defines AT Protocol lexicon schemas and generates TypeScript types. The following areas are in scope for security reports:

### Schema Validation
- **Schema bypass** -- crafted AT Protocol records that pass lexicon validation but contain malicious or unexpected data
- **Type generation flaws** -- generated TypeScript types that are more permissive than the lexicon schema allows, enabling invalid data to pass type checks
- **Missing constraints** -- fields that should have length limits, pattern restrictions, or enum constraints but don't

### Supply Chain
- **npm package tampering** -- the published `@barazo-forum/lexicons` package containing code or types not present in the source repo
- **Build script injection** -- malicious code in the type generation pipeline that could execute during `npm install` or build
- **Dependency confusion** -- packages with similar names that could be installed instead of the legitimate package

### AT Protocol Compliance
- **Namespace violations** -- schemas using namespaces outside `forum.barazo.*` that could conflict with other AT Protocol applications
- **Record size abuse** -- schemas that permit records large enough to cause storage or processing issues in downstream consumers (AppView, PDS)

## Security Practices

- Lexicon schemas follow the AT Protocol specification
- Generated TypeScript types use strict mode (no `any`)
- Published package contains only schemas and generated types (no runtime code with side effects)
- Dependencies updated weekly via Dependabot
- CodeQL security scanning on every PR

## Disclosure Policy

We follow responsible disclosure:
- 90 days before public disclosure
- Credit given to reporter (if desired)
- CVE assigned when applicable
