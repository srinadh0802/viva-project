export const STATUS_STYLE = {
  "Scheduled": "bg-emerald-100 text-emerald-700",
  "Proposed": "bg-violet-100 text-violet-700",
  "Awaiting availability": "bg-amber-100 text-amber-700",
  "Completed": "bg-slate-200 text-slate-600",
};

export const ROLE_COLOR = {
  supervisor: { dot: "bg-emerald-500", block: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  marker: { dot: "bg-blue-500", block: "bg-blue-50 border-blue-200 text-blue-700" },
};

export const TODAY_LABEL = "Wed 24 Sep";

export const DAY_ORDER = {
  "Mon 22 Sep": 1, "Tue 23 Sep": 2, "Wed 24 Sep": 3, "Thu 25 Sep": 4, "Fri 26 Sep": 5,
  "Mon 29 Sep": 6, "Tue 30 Sep": 7, "Wed 01 Oct": 8, "Thu 02 Oct": 9, "Fri 03 Oct": 10,
};

export function sortByWhen(items) {
  return [...items].sort((a, b) => (DAY_ORDER[a.day] - DAY_ORDER[b.day]) || a.time.localeCompare(b.time));
}

export const SUPERVISED = [
  { id: "s1", name: "Aisha Mensah", course: "MSc Advanced Computer Science",
    project: "Federated Learning for Privacy-Preserving Medical Imaging",
    desc: "A federated training framework that lets multiple hospitals train a shared diagnostic model without sharing raw patient scans.",
    role: "supervisor", supervisor: "You (Supervisor)", marker: "Dr Lucas Okafor",
    status: "Scheduled", day: "Mon 22 Sep", time: "09:00", room: "V1-03", color: "emerald" },
  { id: "s2", name: "Liam O'Brien", course: "MSc Data Analytics",
    project: "Real-Time Anomaly Detection in IoT Sensor Networks",
    desc: "Streaming pipeline using autoencoders to flag faults in factory sensor data with sub-second latency.",
    role: "supervisor", supervisor: "You (Supervisor)", marker: "Dr Carmen Wei",
    status: "Proposed", day: "Tue 23 Sep", time: "11:00", room: "V1-01", color: "blue" },
  { id: "s3", name: "Priya Nair", course: "MSc Software Engineering",
    project: "A Microservices Framework for Scalable E-Health Platforms",
    desc: "Reference architecture showing how an e-health platform scales appointment and records services independently under load.",
    role: "supervisor", supervisor: "You (Supervisor)", marker: "Dr Sara Rossi",
    status: "Proposed", day: "Wed 24 Sep", time: "09:00", room: "V2-05", color: "violet" },
  { id: "s4", name: "Tom Becker", course: "MSc Cyber Security",
    project: "Adversarial Robustness of Intrusion Detection Models",
    desc: "Studies how evasion attacks degrade ML-based intrusion detection and tests adversarial training as a defence.",
    role: "supervisor", supervisor: "You (Supervisor)", marker: "Dr Amara Khan",
    status: "Scheduled", day: "Fri 26 Sep", time: "11:00", room: "V1-02", color: "amber" },
  { id: "s5", name: "Maria Gonzalez", course: "MSc Cloud Computing",
    project: "Cost-Aware Autoscaling for Multi-Tenant Kubernetes Clusters",
    desc: "Proposes an autoscaler that factors in per-tenant cost budgets alongside latency targets.",
    role: "supervisor", supervisor: "You (Supervisor)", marker: "Dr Ravi Patel",
    status: "Awaiting availability", day: "—", time: "—", room: "—", color: "slate" },
  { id: "s6", name: "Daniel Kim", course: "MSc Robotics",
    project: "Vision-Based Grasping for Cluttered Warehouse Bins",
    desc: "Trains a grasp-point detector on synthetic bin scenes and validates it on a physical robot arm.",
    role: "supervisor", supervisor: "You (Supervisor)", marker: "Dr Marco Silva",
    status: "Awaiting availability", day: "—", time: "—", room: "—", color: "slate" },
];

export const MARKING = [
  { id: "m1", name: "Laura Okafor", course: "MSc Computer Science",
    project: "Explainable AI for Credit Risk Scoring",
    desc: "Applies SHAP and counterfactual explanations to a credit-scoring model and tests usability with non-technical loan officers.",
    role: "marker", supervisor: "Dr Ravi Patel", marker: "You (Second marker)",
    status: "Scheduled", day: "Tue 23 Sep", time: "14:00", room: "V1-04", color: "pink" },
  { id: "m2", name: "Chen Wei", course: "MSc Artificial Intelligence",
    project: "Reinforcement Learning for Autonomous Drone Navigation",
    desc: "Trains a PPO agent to navigate cluttered indoor environments in simulation, with a transfer study to a physical quadcopter.",
    role: "marker", supervisor: "Dr Marco Silva", marker: "You (Second marker)",
    status: "Proposed", day: "Thu 25 Sep", time: "14:00", room: "V2-03", color: "blue" },
  { id: "m3", name: "Sofia Rossi", course: "MSc Data Science",
    project: "Graph Neural Networks for Fraud Detection",
    desc: "Models transaction networks as graphs and compares GNN architectures against gradient-boosted baselines for detecting fraud rings.",
    role: "marker", supervisor: "Dr Jane Adams", marker: "You (Second marker)",
    status: "Awaiting availability", day: "—", time: "—", room: "—", color: "slate" },
  { id: "m4", name: "Ben Carter", course: "MSc Information Systems",
    project: "Process Mining for Hospital Discharge Bottlenecks",
    desc: "Mines event logs from a hospital EHR system to surface the biggest discharge-delay bottlenecks.",
    role: "marker", supervisor: "Dr Amara Khan", marker: "You (Second marker)",
    status: "Proposed", day: "Wed 24 Sep", time: "11:00", room: "V2-05", color: "violet" },
  { id: "m5", name: "Nadia Hussain", course: "MSc Cyber Security",
    project: "Detecting Lateral Movement in Enterprise Networks",
    desc: "Builds a graph-based detector for lateral-movement patterns using simulated enterprise network traffic.",
    role: "marker", supervisor: "Dr Lucas Okafor", marker: "You (Second marker)",
    status: "Awaiting availability", day: "—", time: "—", room: "—", color: "slate" },
];

export const COMPLETED = [
  { id: "c1", name: "Ethan Brooks", course: "MSc Computer Science", project: "Compiler Optimisations for WebAssembly Targets",
    desc: "Benchmarks a set of WASM-specific compiler passes against native LLVM output across common numeric workloads.",
    role: "supervisor", supervisor: "You (Supervisor)", marker: "Dr Carmen Wei",
    status: "Completed", day: "Thu 12 Jun", time: "10:00", room: "V1-02", color: "emerald" },
  { id: "c2", name: "Naomi Clarke", course: "MSc Data Analytics", project: "Forecasting Hospital Bed Demand with Hybrid Time-Series Models",
    desc: "Combines ARIMA and gradient-boosted trees to forecast short-term bed demand from admissions data.",
    role: "marker", supervisor: "Dr Ravi Patel", marker: "You (Second marker)",
    status: "Completed", day: "Fri 13 Jun", time: "11:00", room: "V1-04", color: "blue" },
  { id: "c3", name: "Victor Adeyemi", course: "MSc Cyber Security", project: "Honeypot-Driven Detection of Credential Stuffing Attacks",
    desc: "Deploys a network of low-interaction honeypots to fingerprint credential-stuffing tooling in the wild.",
    role: "supervisor", supervisor: "You (Supervisor)", marker: "Dr Amara Khan",
    status: "Completed", day: "Mon 16 Jun", time: "09:00", room: "V1-03", color: "violet" },
  { id: "c4", name: "Grace Lin", course: "MSc Artificial Intelligence", project: "Few-Shot Classification of Rare Plant Diseases",
    desc: "Applies prototypical networks to classify plant diseases from a handful of labelled field images per class.",
    role: "marker", supervisor: "Dr Marco Silva", marker: "You (Second marker)",
    status: "Completed", day: "Mon 16 Jun", time: "13:00", room: "V2-03", color: "amber" },
  { id: "c5", name: "Oscar Fischer", course: "MSc Software Engineering", project: "Mutation Testing for Microservice Contract Tests",
    desc: "Measures how well contract tests catch real regressions by injecting mutations into service boundaries.",
    role: "supervisor", supervisor: "You (Supervisor)", marker: "Dr Jane Adams",
    status: "Completed", day: "Tue 17 Jun", time: "10:00", room: "V1-01", color: "pink" },
  { id: "c6", name: "Yusuf Demir", course: "MSc Cloud Computing", project: "Spot-Instance Scheduling for Fault-Tolerant Batch Pipelines",
    desc: "Designs a checkpoint-and-resume scheduler that cuts cloud spend by shifting batch jobs onto spot capacity.",
    role: "marker", supervisor: "Dr Lucas Okafor", marker: "You (Second marker)",
    status: "Completed", day: "Wed 18 Jun", time: "14:00", room: "V2-05", color: "blue" },
  { id: "c7", name: "Isla Murphy", course: "MSc Robotics", project: "Tactile Feedback for Teleoperated Surgical Grippers",
    desc: "Evaluates whether added tactile feedback improves grip-force accuracy during teleoperated grasping tasks.",
    role: "supervisor", supervisor: "You (Supervisor)", marker: "Dr Sara Rossi",
    status: "Completed", day: "Thu 19 Jun", time: "09:00", room: "V1-02", color: "emerald" },
  { id: "c8", name: "Felix Wagner", course: "MSc Information Systems", project: "Auditability of Smart-Contract Based Supply Chain Records",
    desc: "Reviews how well permissioned blockchain ledgers support after-the-fact audits of supply chain events.",
    role: "marker", supervisor: "Dr Ravi Patel", marker: "You (Second marker)",
    status: "Completed", day: "Fri 20 Jun", time: "11:00", room: "V1-04", color: "violet" },
];

export const EXAMINERS = [
  { id: "e1", name: "Dr Lucas Okafor", department: "School of Computing", office: "ATT-310", role: "Second marker on 1 of your vivas" },
  { id: "e2", name: "Dr Carmen Wei", department: "School of Computing", office: "ATT-312", role: "Second marker on 1 of your vivas" },
  { id: "e3", name: "Dr Sara Rossi", department: "School of Computing", office: "KE-204", role: "Second marker on 1 of your vivas" },
  { id: "e4", name: "Dr Amara Khan", department: "School of Computing", office: "KE-208", role: "Second marker / supervisor on 2 of your vivas" },
  { id: "e5", name: "Dr Ravi Patel", department: "School of Computing", office: "ATT-318", role: "Supervisor on 1 viva you're marking" },
  { id: "e6", name: "Dr Marco Silva", department: "School of Computing", office: "ATT-320", role: "Second marker / supervisor on 2 of your vivas" },
  { id: "e7", name: "Dr Jane Adams", department: "School of Computing", office: "KE-212", role: "Supervisor on 1 viva you're marking" },
];

export const ANNOUNCEMENTS = [
  { id: "a1", title: "Viva Period Reminder", body: "Viva period is from 22 Sep to 3 Oct. Please ensure all duties are completed.", time: "2 days ago" },
  { id: "a2", title: "New Guidelines", body: "Updated viva guidelines and marking scheme are now available.", time: "5 days ago" },
  { id: "a3", title: "Training Session", body: "Join the viva coordination training on Sep 20 at 3 PM.", time: "1 week ago" },
];

export const NOTIFICATIONS = [
  { id: "n1", text: "Aisha Mensah's viva is confirmed for Mon 22 Sep, 09:00 in V1-03.", time: "2h ago", tone: "emerald", read: false },
  { id: "n2", text: "Liam O'Brien's viva slot is proposed for Tue 23 Sep, 11:00 — pending your confirmation.", time: "1d ago", tone: "violet", read: false },
  { id: "n3", text: "Reminder: 4 students are still awaiting an availability-based slot.", time: "2d ago", tone: "amber", read: false },
  { id: "n4", text: "Tom Becker's viva room was changed to V1-02.", time: "3d ago", tone: "blue", read: true },
  { id: "n5", text: "Laura Okafor's marking report was approved by the coordinator.", time: "4d ago", tone: "emerald", read: true },
];

export const ACTIVITY = [
  { id: "act1", icon: "checkin", text: "Liam O'Brien submitted his availability", time: "10:30 AM" },
  { id: "act2", icon: "approve", text: "You approved Priya Nair's proposed slot", time: "Yesterday" },
  { id: "act3", icon: "schedule", text: "Tom Becker's viva was scheduled", time: "2 days ago" },
  { id: "act4", icon: "report", text: "Laura Okafor's marking report uploaded", time: "2 days ago" },
  { id: "act5", icon: "person", text: "New student assigned: Daniel Kim", time: "3 days ago" },
];

export const REPORTS = [
  { id: "r1", name: "Viva Timetable — Autumn 2025", type: "PDF", updated: "Today" },
  { id: "r2", name: "Supervised Students Summary", type: "CSV", updated: "2 days ago" },
  { id: "r3", name: "Second Marker Report Log", type: "CSV", updated: "5 days ago" },
  { id: "r4", name: "Availability Submission History", type: "PDF", updated: "1 week ago" },
];

export const MESSAGE_THREADS = [
  { id: "t1", name: "Admin Coordinator", lastMessage: "Could you confirm Liam's slot by Friday?", time: "1h ago", unread: true,
    messages: [
      { from: "them", text: "Hi Srinadh, could you confirm Liam's proposed slot by Friday?", time: "09:12" },
      { from: "them", text: "We're trying to finalise the timetable for that week.", time: "09:13" },
    ] },
  { id: "t2", name: "Aisha Mensah", lastMessage: "Thank you for confirming the room!", time: "Yesterday", unread: false,
    messages: [
      { from: "them", text: "Hi, just checking the room for my viva is still V1-03?", time: "Mon 14:02" },
      { from: "me", text: "Yes, confirmed — V1-03, Mon 09:00.", time: "Mon 14:10" },
      { from: "them", text: "Thank you for confirming the room!", time: "Mon 14:11" },
    ] },
  { id: "t3", name: "Dr Ravi Patel", lastMessage: "Sounds good, see you there.", time: "3 days ago", unread: false,
    messages: [
      { from: "me", text: "Happy to second-mark Laura's viva on Tuesday at 14:00.", time: "Fri 16:40" },
      { from: "them", text: "Sounds good, see you there.", time: "Fri 16:55" },
    ] },
];

export function allStudents(supervised, marking) {
  return [...supervised, ...marking];
}

export function findClashes(items) {
  const byDayTime = {};
  items.forEach((it) => {
    if (it.day === "—" || it.time === "—") return;
    const key = `${it.day}-${it.time}`;
    (byDayTime[key] = byDayTime[key] || []).push(it);
  });
  return Object.values(byDayTime).filter((group) => group.length > 1);
}
