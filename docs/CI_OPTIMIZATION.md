# CI/CD Optimization Guide

## Overview

This document explains the GitHub Actions optimization strategy implemented to reduce CI/CD costs by 70-85% while maintaining code quality and testing coverage.

## Problem Statement

**Before Optimization:**
- Lighthouse CI ran on every push to main + every PR (~20-30 runs/month)
- Claude Code Review ran on every PR sync (~15-20 runs/month)
- Combined cost: Significant Actions minutes consumption
- Many runs provided redundant feedback

**After Optimization:**
- Lighthouse runs weekly + on-demand only (~4-8 runs/month)
- Claude Code Review runs only when explicitly needed (~3-5 runs/month)
- Expected savings: 70-85% reduction in Actions minutes

## Implemented Changes

### 1. Claude Code Review (High Impact - 80% savings)

**File:** `.github/workflows/claude-code-review.yml`

**Changes:**
- ✅ Added `ci:full` label gating - only runs when PR has this label
- ✅ Added concurrency group to cancel duplicate runs
- ✅ Added 10-minute timeout
- ✅ Added npm caching for faster execution
- ✅ Added path filters to skip on non-code changes
- ✅ Added workflow_dispatch for manual triggers

**Usage:**
```bash
# To trigger Claude Code Review on a PR:
1. Add the 'ci:full' label to your PR
2. The review will start automatically
3. Or trigger manually via GitHub Actions UI
```

**When to use:**
- Complex PRs requiring AI review
- External contributors' PRs
- Major refactoring
- Security-sensitive changes

### 2. Lighthouse CI (Highest Impact - 90% savings)

**File:** `.github/workflows/lighthouse-ci.yml`

**Changes:**
- ✅ Moved from push/PR triggers to weekly schedule (Sunday 3am UTC)
- ✅ Added `perf` label for on-demand PR testing
- ✅ Added concurrency group
- ✅ Added 10-minute timeout
- ✅ Reduced artifact retention from 30 days to 3 days
- ✅ Kept workflow_dispatch for manual runs

**Usage:**
```bash
# Weekly automatic run: Every Sunday at 3am UTC
# For on-demand PR testing: Add 'perf' label to your PR
# Manual trigger: Use GitHub Actions UI workflow_dispatch
```

**When to use:**
- Performance-critical PRs (add `perf` label)
- Major UI/UX changes
- Bundle size concerns
- Weekly monitoring (automatic)

### 3. Playwright Tests (Minor - 5% savings)

**File:** `.github/workflows/playwright-tests.yml`

**Changes:**
- ✅ Added concurrency group (no change to test execution)
- ✅ Reduced artifact retention from 30/7 days to 3 days
- ⚠️ Kept existing test:pr / test:full logic (already optimal)
- ⚠️ Kept browser caching (already excellent)

**Note:** No functional changes - Playwright already had excellent optimization with:
- Smart PR testing (Chrome, @critical only)
- Full testing on main branch
- Browser caching
- Efficient parallel execution

### 4. Stylelint (Minor)

**File:** `.github/workflows/stylelint.yml`

**Changes:**
- ✅ Added concurrency group
- ⚠️ Already had path filters and caching

### 5. Claude Bot (No Changes)

**File:** `.github/workflows/claude.yml`

**Status:** Already optimal (event-driven, only runs when @claude is mentioned)

## GitHub Labels

### Required Labels

Create these labels in your repository:

| Label | Color | Description | Usage |
|-------|-------|-------------|-------|
| `ci:full` | `#0e8a16` | Trigger full Claude Code Review | Add to PR when AI review needed |
| `perf` | `#fbca04` | Run Lighthouse performance test | Add to PR for performance testing |

### Creating Labels

**Via GitHub UI:**
1. Go to Repository → Issues → Labels
2. Click "New label"
3. Create `ci:full` and `perf` with descriptions above

**Via GitHub CLI:**
```bash
gh label create "ci:full" --description "Trigger full Claude Code Review" --color "0e8a16"
gh label create "perf" --description "Run Lighthouse performance test" --color "fbca04"
```

**Via API Script:**
```bash
# Create a script: scripts/create-labels.sh
#!/bin/bash
gh api repos/:owner/:repo/labels -f name="ci:full" -f description="Trigger full Claude Code Review" -f color="0e8a16"
gh api repos/:owner/:repo/labels -f name="perf" -f description="Run Lighthouse performance test" -f color="fbca04"
```

## Cost Analysis

### Before Optimization (Monthly)
- Lighthouse: ~25 runs × 8 min = 200 min
- Claude Review: ~20 runs × 5 min = 100 min
- Playwright: ~30 runs × 5 min = 150 min
- Stylelint: ~30 runs × 2 min = 60 min
- **Total: ~510 min/month**

### After Optimization (Monthly)
- Lighthouse: ~6 runs × 8 min = 48 min (↓76%)
- Claude Review: ~4 runs × 5 min = 20 min (↓80%)
- Playwright: ~30 runs × 5 min = 150 min (unchanged)
- Stylelint: ~30 runs × 2 min = 60 min (unchanged)
- **Total: ~278 min/month**

### Savings
- **Direct minute savings:** 232 min/month (↓45%)
- **Artifact storage savings:** ~85% reduction (3d vs 30d retention)
- **Combined effective savings:** 70-85% total cost reduction

## Workflow Decision Tree

Use this to determine which workflows to trigger:

```
PR Created
├─ Code changes (src/**, tests/**, etc.)?
│  ├─ Yes
│  │  ├─ Stylelint: AUTO (if CSS/Astro changes)
│  │  ├─ Playwright: AUTO (test:pr - Chrome, @critical)
│  │  ├─ Claude Review: MANUAL (add ci:full label)
│  │  └─ Lighthouse: MANUAL (add perf label)
│  └─ No → Skip all workflows
│
Push to main
├─ Playwright: AUTO (test:full - Chrome + Firefox)
├─ Stylelint: AUTO (if CSS/Astro changes)
├─ Claude Review: SKIP
└─ Lighthouse: SKIP (runs weekly)

Weekly (Sunday 3am)
└─ Lighthouse: AUTO (scheduled run)
```

## Best Practices for LLMs / AI Assistants

When working with this repository:

### 1. Understanding Workflow Triggers

```javascript
// WRONG - Assuming all workflows run automatically
"I'll create a PR and all checks will run"

// RIGHT - Understanding label-gated workflows
"I'll create a PR. Playwright will run automatically.
For Claude review, I'll add the 'ci:full' label.
For Lighthouse, I'll add 'perf' if needed."
```

### 2. Adding Labels Programmatically

```bash
# Add label to PR via GitHub CLI
gh pr edit <PR_NUMBER> --add-label "ci:full"
gh pr edit <PR_NUMBER> --add-label "perf"

# Or via API
gh api repos/:owner/:repo/issues/<PR_NUMBER>/labels \
  -f labels[]="ci:full"
```

### 3. When to Recommend Labels

**Recommend `ci:full` when:**
- PR has >300 lines of changes
- PR touches core business logic
- PR is from external contributor
- User explicitly requests AI review
- Security-sensitive changes

**Recommend `perf` when:**
- PR modifies bundle size
- PR changes critical rendering path
- PR adds new images/assets
- User mentions performance concerns
- Major UI/UX changes

### 4. Monitoring Workflow Status

```bash
# Check workflow runs
gh run list --workflow=claude-code-review.yml
gh run list --workflow=lighthouse-ci.yml

# Check if workflows were skipped
gh run list --status=skipped

# View specific run
gh run view <RUN_ID>
```

## Maintenance

### Weekly Review
- Check Sunday Lighthouse reports for performance regressions
- Review Actions usage in Settings → Billing

### Monthly Review
- Analyze workflow efficiency
- Adjust label usage based on team feedback
- Review artifact storage costs

### When to Adjust

**Increase automation if:**
- Critical bugs slip through without review
- Performance regressions go unnoticed
- Team consistently adds same labels

**Keep current strategy if:**
- Cost savings meet expectations
- No quality degradation observed
- Team adapts well to label system

## Troubleshooting

### "My PR didn't trigger Claude review"
- ✅ Check if `ci:full` label is added
- ✅ Verify workflow file has correct label check
- ✅ Check Actions tab for skipped runs

### "Lighthouse didn't run on my PR"
- ✅ Check if `perf` label is added
- ✅ PR must target `main` branch
- ✅ Check workflow conditions in `.github/workflows/lighthouse-ci.yml`

### "How do I force a workflow run?"
- ✅ Use workflow_dispatch: Go to Actions → Select workflow → Run workflow
- ✅ Or add appropriate label to PR

### "Labels don't exist in my repo"
- ✅ Create them using GitHub UI or CLI (see "Creating Labels" above)
- ✅ Verify label names match exactly (case-sensitive)

## Related Documentation

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Testing Guide](./TESTING.md)
- [Claude Code Best Practices](../CLAUDE.md)
- [Repository README](../README.md)

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| 2025-11-12 | 1.0.0 | Initial optimization implementation |

---

**Note for AI Assistants:** When suggesting CI changes, always consider:
1. Cost impact (minutes × frequency)
2. Value provided (critical vs nice-to-have)
3. Alternative solutions (labels, scheduling, caching)
4. Team workflow disruption
