#!/usr/bin/env node

import fs from "node:fs";

const [inputPath = "tasks.json", outputPath = "tmp/base44-import-dry-run.json", asOfArg = new Date().toISOString().slice(0, 10)] = process.argv.slice(2);
const OWNER_MAP = {
  Yechiel: {
    id: "6a7321862bceb35f885ac75f",
    attribution: "Yechiel (imported POS history)"
  }
};
const CATEGORY_MAP = {
  "Job search": ["work", "job-search"],
  "Professional advancement": ["work", "professional-development"],
  "Unemployment": ["personal", "unemployment"],
  "Errands": ["personal", "errands"],
  "Finances": ["personal", "finances"]
};
const PRIORITY_MAP = { 0: "critical", 1: "high", 2: "medium", 3: "low" };

function kebab(value) {
  return String(value).trim().toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function statusFor(task, asOf) {
  if (task.status === "completed") return "done";
  if (task.status === "not_started" && task.effective_date && task.effective_date > asOf) return "backlog";
  const allowed = new Set(["not_started", "in_progress", "waiting", "blocked", "backlog", "deferred", "cancelled"]);
  if (!allowed.has(task.status)) throw new Error(`Unexpected status ${task.status} on ${task.id}`);
  return task.status;
}

function sourceDateTime(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`Invalid source date: ${date}`);
  return `${date}T12:00:00Z`;
}

const source = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const ids = new Set();
const errors = [];

for (const task of source) {
  if (ids.has(task.id)) errors.push(`Duplicate id: ${task.id}`);
  ids.add(task.id);
}
for (const task of source) {
  const parts = task.id.split("-");
  if (parts.length > 2) errors.push(`Unsupported nesting depth: ${task.id}`);
  if (parts.length === 2 && !ids.has(parts[0])) errors.push(`Missing parent for ${task.id}: ${parts[0]}`);
  if (!CATEGORY_MAP[task.category]) errors.push(`Unexpected category on ${task.id}: ${task.category}`);
  if (task.priority != null && PRIORITY_MAP[task.priority] == null) errors.push(`Unexpected priority on ${task.id}: ${task.priority}`);
  if (!OWNER_MAP[task.owner]) errors.push(`Unmapped owner on ${task.id}: ${task.owner}`);
}
if (errors.length) throw new Error(errors.join("\n"));

const records = source.map(task => {
  const [category, categoryTag] = CATEGORY_MAP[task.category];
  const owner = OWNER_MAP[task.owner];
  const tags = [...new Set([categoryTag, ...(task.tags || []).map(kebab)].filter(Boolean))];
  // Historical POS Effective Dates predate the activation-gate semantics now
  // used by SentinelTask. An explicitly Deferred task with a reached date is
  // deferred indefinitely unless a new future activation date is assigned.
  const effectiveDate =
    task.status === "deferred" && task.effective_date && task.effective_date <= asOfArg
      ? null
      : task.effective_date || null;

  const record = {
    title: task.name,
    summary: task.notes || null,
    description: null,
    status: statusFor(task, asOfArg),
    priority: PRIORITY_MAP[task.priority ?? 2],
    category,
    due_date: task.due_date || null,
    effective_date: effectiveDate,
    assignee_id: owner.id,
    legacy_pos_id: task.id,
    focus_locked: false,
    tags,
    log: (task.history || []).map(entry => ({
      date: sourceDateTime(entry.date),
      note: `Imported POS history: ${entry.note}`,
      updated_by: owner.attribution
    }))
  };

  return {
    legacy_pos_id: task.id,
    parent_legacy_pos_id: task.id.includes("-") ? task.id.split("-")[0] : null,
    record
  };
});

const topLevel = records.filter(item => !item.parent_legacy_pos_id);
const children = records.filter(item => item.parent_legacy_pos_id);
const statusCounts = Object.fromEntries(records.reduce((m, x) => m.set(x.record.status, (m.get(x.record.status) || 0) + 1), new Map()));

const output = {
  generated_at: new Date().toISOString(),
  as_of_date: asOfArg,
  source_file: inputPath,
  source_counts: {
    tasks: source.length,
    top_level: topLevel.length,
    children: children.length,
    notes: source.filter(x => x.notes).length,
    history_entries: source.reduce((n, x) => n + (x.history || []).length, 0)
  },
  transformed_counts: {
    tasks: records.length,
    top_level: topLevel.length,
    children: children.length,
    by_status: statusCounts
  },
  owner_mapping: Object.fromEntries(Object.entries(OWNER_MAP).map(([k, v]) => [k, v.id])),
  validation: {
    unique_legacy_ids: new Set(records.map(x => x.legacy_pos_id)).size === source.length,
    no_orphans: children.every(x => ids.has(x.parent_legacy_pos_id)),
    max_depth_two: source.every(x => x.id.split("-").length <= 2),
    one_output_per_source: records.length === source.length
  },
  top_level_records: topLevel,
  child_records: children
};

fs.mkdirSync(outputPath.split("/").slice(0, -1).join("/") || ".", { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify({ outputPath, ...output.source_counts, by_status: statusCounts, validation: output.validation }, null, 2));
