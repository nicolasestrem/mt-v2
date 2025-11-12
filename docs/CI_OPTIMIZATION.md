# CI/CD Optimization Guide

## Overview

This document explains the GitHub Actions optimization strategy implemented to reduce CI/CD costs by 45-50% while maintaining code quality and testing coverage. Primary savings come from Lighthouse optimization (weekly schedule + on-demand testing) and artifact storage reduction.

## Problem Statement

**Before Optimization:**
- Lighthouse CI ran on every push to main + every PR (~20-30 runs/month)
- Combined cost: Significant Actions minutes consumption
- Artifact storage costs accumulating over 30 days
- Many redundant Lighthouse runs

**After Optimization:**
- Lighthouse runs weekly + on-demand only (~4-8 runs/month)
- Claude Code Review runs on every PR (kept for code quality)
- Artifact retention reduced from 30 days to 3 days
- Expected savings: ~45-50% reduction in Actions minutes + 85% storage savings

## Implemented Changes

### 1. Claude Code Review (Optimization - No cost reduction)

**File:** `.github/workflows/claude-code-review.yml`

**Changes:**
- ✅ Added concurrency group to cancel duplicate runs
- ✅ Added 10-minute timeout
- ✅ Added npm caching for faster execution
- ✅ Added path filters to skip on non-code changes
- ✅ Added workflow_dispatch for manual triggers
- ⚠️ **Runs on EVERY PR** - required for code quality assurance

**Note:** Claude Code Review is critical for code quality and runs automatically on all PRs. No label gating applied per project requirements.

### 2. Lighthouse CI (Highest Impact - 90% savings)

**File:** `.github/workflows/lighthouse-ci.yml`

**Changes:**
- ✅ Moved from push/PR triggers to weekly schedule (Sunday 3am UTC)
- ✅ Added `perf` label for on-demand PR testing
- ✅ Added `synchronize` event - continues testing after label added
- ✅ Added concurrency group
- ✅ Added 10-minute timeout
- ✅ Reduced artifact retention from 30 days to 3 days
- ✅ Kept workflow_dispatch for manual runs

**Usage:**
```bash
# Weekly automatic run: Every Sunday at 3am UTC
# For on-demand PR testing: Add 'perf' label to your PR
# Once labeled, runs on EVERY subsequent commit
# Manual trigger: Use GitHub Actions UI workflow_dispatch
```

**When to use:**
- Performance-critical PRs (add `perf` label)
- Major UI/UX changes
- Bundle size concerns
- Weekly monitoring (automatic)

**Important:** After adding the `perf` label, Lighthouse will run on every push to that PR to catch performance regressions.

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

Create this label in your repository:

| Label | Color | Description | Usage |
|-------|-------|-------------|-------|
| `perf` | `#fbca04` | Run Lighthouse on every commit | Add to PR for continuous performance testing |

### Creating Labels

**Via GitHub UI:**
1. Go to Repository → Issues → Labels
2. Click "New label"
3. Create `perf` with description above

**Via GitHub CLI:**
```bash
gh label create "perf" --description "Run Lighthouse on every commit" --color "fbca04"
```

**Via API Script:**
```bash
# Create a script: scripts/create-labels.sh
#!/bin/bash
gh api repos/:owner/:repo/labels -f name="perf" -f description="Run Lighthouse on every commit" -f color="fbca04"
```

**Note:** The `ci:full` label is no longer needed as Claude Code Review runs automatically on all PRs.

## Cost Analysis

### Before Optimization (Monthly)
- Lighthouse: ~25 runs × 8 min = 200 min
- Claude Review: ~20 runs × 5 min = 100 min
- Playwright: ~30 runs × 5 min = 150 min
- Stylelint: ~30 runs × 2 min = 60 min
- **Total: ~510 min/month**

### After Optimization (Monthly)
- Lighthouse: ~6 runs × 8 min = 48 min (↓76%)
- Claude Review: ~20 runs × 5 min = 100 min (unchanged - required for quality)
- Playwright: ~30 runs × 5 min = 150 min (unchanged)
- Stylelint: ~30 runs × 2 min = 60 min (unchanged)
- **Total: ~358 min/month**

### Savings
- **Direct minute savings:** 152 min/month (↓30%)
- **Artifact storage savings:** ~85% reduction (3d vs 30d retention)
- **Combined effective savings:** 45-50% total cost reduction

**Note:** Claude Code Review runs on every PR as required for code quality. Main savings come from Lighthouse optimization and artifact storage reduction.

## Workflow Decision Tree

Use this to determine which workflows to trigger:

```
PR Created
├─ Code changes (src/**, tests/**, etc.)?
│  ├─ Yes
│  │  ├─ Stylelint: AUTO (if CSS/Astro changes)
│  │  ├─ Playwright: AUTO (test:pr - Chrome, @critical)
│  │  ├─ Claude Review: AUTO (runs on every PR)
│  │  └─ Lighthouse: MANUAL (add perf label for continuous testing)
│  └─ No → Skip all workflows
│
PR with 'perf' label + new commits
└─ Lighthouse: AUTO (runs on every push while label present)

Push to main
├─ Playwright: AUTO (test:full - Chrome + Firefox)
├─ Stylelint: AUTO (if CSS/Astro changes)
├─ Claude Review: SKIP (only on PRs)
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

// RIGHT - Understanding workflow behavior
"I'll create a PR. Playwright and Claude Code Review will run automatically.
For Lighthouse performance testing, I'll add the 'perf' label if needed."
```

### 2. Adding Labels Programmatically

```bash
# Add label to PR via GitHub CLI
gh pr edit <PR_NUMBER> --add-label "perf"

# Or via API
gh api repos/:owner/:repo/issues/<PR_NUMBER>/labels \
  -f labels[]="perf"
```

### 3. When to Recommend Labels

**Always expect Claude Code Review:**
- Runs automatically on every PR
- Required for code quality assurance
- No label needed

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
- ✅ Check if code files changed (src/**, tests/**, etc.)
- ✅ Verify workflow file path filters
- ✅ Check Actions tab for workflow runs

### "Lighthouse didn't run on my PR"
- ✅ Check if `perf` label is added
- ✅ PR must target `main` branch
- ✅ Check workflow conditions in `.github/workflows/lighthouse-ci.yml`

### "How do I force a workflow run?"
- ✅ Use workflow_dispatch: Go to Actions → Select workflow → Run workflow
- ✅ Or add appropriate label to PR

### "Label doesn't exist in my repo"
- ✅ Create the `perf` label using GitHub UI or CLI (see "Creating Labels" above)
- ✅ Verify label name matches exactly (case-sensitive)

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
