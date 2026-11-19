---
name: job-search-orchestrator
description: "Use as the primary entry point when the user shares a job, asks for job-search guidance, or wants help preparing an application or interview. Coordinate the relevant job-search skills end to end without requiring the user to invoke each one."
---

# Job Search Orchestrator

## Purpose

Coordinate the job-search skills as one evidence-led workflow, using the AI Workbench as the candidate-evidence source when it is available.

## Inputs

Use user-provided resumes, confirmed job history, and curated portfolio records as the evidence baseline. Conversation history is an optional supplement for additional context; a fact absent from chat history is not evidence that the experience is absent. Check for validated CareerEvidence records in the accessible Workbench private evidence area (`workbench/data/private/career_evidence/`) and follow its evidence schema. Also read the adjacent `source_of_truth_evidence.md`. If the Workbench is unavailable or has no applicable record, use the available resume and confirmed job-history sources, label them, and continue without blocking useful analysis.
## Instructions

1. **Identify the request.** Classify it as role evaluation, application preparation, interview preparation, career-gap analysis, or a broader job-search workflow. Reuse completed stages in the current conversation; do not repeat work unnecessarily.
2. **For a job evaluation, run in order:** JD Intelligence → Evidence & Fit Assessment → Job Selection Strategy. Deliver the integrated role profile, requirement-to-evidence fit, hard-gate decision, recommendation, and next action in one response. The user should not need to ask for each stage.
3. **For application preparation:** first complete the evaluation sequence if it has not been done. If Apply or Selective Apply is justified and the user requests preparation, run Resume & Application Optimizer → ATS & Recruiter Red Team. Produce the requested draft and prioritized corrections. Do not create or revise application documents solely because a JD was shared.
4. **For interview preparation:** run Interview Intelligence using the JD and evidence; use Interview Answer Coach for a supplied question or draft. Give realistic questions, relevant examples, and gaps to prepare for.
5. **For career development:** run Career Skill-Gap Analyzer across multiple roles or an explicit career goal. Separate recurring target-role gaps from one-off requirements.
6. **Use evidence carefully.** Classify relevant facts as Demonstrated, Transferable, Formal Learning, or No Evidence. Use validated Workbench records as canonical. A `candidate` or `needs_confirmation` record may guide a provisional analysis but must be labeled unvalidated and must not be treated as approved resume evidence. If sources conflict, surface the conflict and prefer neither silently. `No Evidence` describes a missing match to a JD requirement; it is not a candidate fact to add to CareerEvidence.
7. **Record safely.** When the user asks to save job-search work and the Workbench is accessible and writable, save the JD assessment and requested artifacts as private, linked work items. New candidate facts enter CareerEvidence only after user confirmation. Never write candidate evidence to the public registry or publish it without explicit approval.
8. **Report clearly.** State the recommendation and decisive evidence first; distinguish JD facts from inference; identify missing evidence and a concrete next step. Avoid dumping internal stage-by-stage notes unless requested.

## Output

A single, integrated response appropriate to the request: role analysis and Apply / Selective Apply / Skip decision; application draft and red-team findings; interview plan and answer coaching; or prioritized career gaps. Include sources, uncertainty, and next action.

## Rules

Apply the Hard-Gate Rule: a genuine mandatory qualification can block a role; do not turn preferences into gates. Never invent or inflate experience, scope, tools, metrics, dates, credentials, or outcomes. Transferable evidence must name its bridge; Formal Learning is not work experience. Treat missing information as unknown, and do not treat absence from conversation history as evidence that experience is absent. Do not submit applications, contact people, or make other external changes without explicit authorization. Keep effort proportional to fit and the user’s stated priorities.

