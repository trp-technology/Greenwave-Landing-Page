import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  Building2,
  Calculator,
  Camera,
  ClipboardCheck,
  Clock,
  Download,
  FileText,
  HardHat,
  MapPin,
  Package,
  PieChart,
  ScanFace,
  ShieldCheck,
  TrendingUp,
  UserCircle,
  Users,
  WifiOff,
} from "lucide-react";

export type TechOutcome = {
  label: string;
  icon: LucideIcon;
};

export type TechFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type TechModule = {
  id: string;
  label: string;
  title: string;
  description: string;
  accent: string;
  backgroundImage: string;
  features: TechFeature[];
  outcomes: TechOutcome[];
};

export const technologyPlatform = {
  title: "Technology-enabled project execution",
  description:
    "Proprietary in-house systems, built by our own tech team, power workforce management, attendance, daily progress reporting, payroll, and site intelligence across every active project.",
  badge: "In-house tech team",
};

export const technologyModules: TechModule[] = [
  {
    id: "workforce",
    label: "Workforce",
    title: "Manage your workforce with confidence",
    description:
      "Bring your entire project workforce together — from worker profiles to project assignments, all in one place.",
    accent: "Right people on the right project",
    backgroundImage: "/images/about/workforce.jpg",
    features: [
      {
        title: "Centralized workforce directory",
        description: "Every worker, role, and skill in a single searchable record.",
        icon: Users,
      },
      {
        title: "Complete worker profiles",
        description: "Contact details, certifications, wage rates, and assignment history.",
        icon: UserCircle,
      },
      {
        title: "Project-wise assignments",
        description: "Deploy the right crew to each site with clear accountability.",
        icon: HardHat,
      },
      {
        title: "Track roles and skills",
        description: "Masons, electricians, supervisors — mapped to capability and availability.",
        icon: BadgeCheck,
      },
      {
        title: "Real-time workforce insights",
        description: "Headcount, attendance rates, and site coverage at a glance.",
        icon: BarChart3,
      },
    ],
    outcomes: [
      { label: "Organize your workforce", icon: Users },
      { label: "Assign with clarity", icon: BadgeCheck },
      { label: "Improve productivity", icon: TrendingUp },
      { label: "Build safer sites", icon: ShieldCheck },
    ],
  },
  {
    id: "attendance",
    label: "Attendance",
    title: "Smart attendance for a more productive site",
    description:
      "Accurate, hassle-free attendance with face verification, GPS location, and real-time sync — even offline.",
    accent: "Every presence builds progress",
    backgroundImage: "/images/capabilities/execution.jpg",
    features: [
      {
        title: "Face verification",
        description: "Ensure the right person checks in at the right time.",
        icon: ScanFace,
      },
      {
        title: "GPS geo-tagging",
        description: "Verify on-site presence before marking attendance.",
        icon: MapPin,
      },
      {
        title: "Works offline",
        description: "Capture check-ins without connectivity; auto-sync when online.",
        icon: WifiOff,
      },
      {
        title: "Real-time attendance",
        description: "Instant visibility for site supervisors and project managers.",
        icon: Clock,
      },
    ],
    outcomes: [
      { label: "Higher accountability", icon: Users },
      { label: "Better productivity", icon: Clock },
      { label: "Safer worksites", icon: ShieldCheck },
      { label: "Real-time insights", icon: BarChart3 },
    ],
  },
  {
    id: "dpr",
    label: "DPR",
    title: "Track real progress on site",
    description:
      "Capture daily updates on manpower, work completed, materials, equipment, and site observations — with photos, all in one place.",
    accent: "Small updates, big outcomes",
    backgroundImage: "/images/hero/industrial-site.jpg",
    features: [
      {
        title: "Manpower tracking",
        description: "Log headcount and trade-wise deployment for each shift.",
        icon: Users,
      },
      {
        title: "Work completed logs",
        description: "Record activities against BOQ with status and remarks.",
        icon: ClipboardCheck,
      },
      {
        title: "Materials and equipment",
        description: "Track consumption, deliveries, and machine hours on site.",
        icon: Package,
      },
      {
        title: "Site photos and observations",
        description: "Attach visual evidence and notes for transparent reporting.",
        icon: Camera,
      },
    ],
    outcomes: [
      { label: "Track progress in real time", icon: BarChart3 },
      { label: "Improve accountability", icon: BadgeCheck },
      { label: "Align teams on site", icon: Users },
      { label: "Build better projects", icon: Building2 },
    ],
  },
  {
    id: "payroll",
    label: "Payroll",
    title: "From attendance to accurate salary sheets",
    description:
      "Automatically calculate daily wages, overtime, and project-wise salary sheets — simple, transparent, and error-free.",
    accent: "Fair pay, stronger teams",
    backgroundImage: "/images/about/team.jpg",
    features: [
      {
        title: "Automatic wage calculation",
        description: "Daily wages and OT computed directly from attendance records.",
        icon: Calculator,
      },
      {
        title: "Worker-wise salary sheets",
        description: "Clear breakdowns for every worker, every pay period.",
        icon: FileText,
      },
      {
        title: "Project-wise salary reports",
        description: "Track labour costs across projects for budget control.",
        icon: Building2,
      },
      {
        title: "Export to Excel or PDF",
        description: "Ready for payroll processing and statutory compliance.",
        icon: Download,
      },
      {
        title: "Transparent and accurate",
        description: "Reduce manual effort, disputes, and calculation errors.",
        icon: ShieldCheck,
      },
    ],
    outcomes: [
      { label: "Happy workers, stronger sites", icon: Users },
      { label: "Better cost control", icon: PieChart },
      { label: "Compliance made easy", icon: ShieldCheck },
      { label: "More time for what matters", icon: Clock },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    title: "Smarter decisions, stronger projects",
    description:
      "Turn site data into actionable insights — track progress, costs, workforce trends, and risks in real time.",
    accent: "Data today, stronger tomorrow",
    backgroundImage: "/images/hero/industrial-facility.jpg",
    features: [
      {
        title: "Real-time project insights",
        description: "Track progress, cost, and productivity across all active sites.",
        icon: BarChart3,
      },
      {
        title: "Workforce analytics",
        description: "Attendance trends, headcount patterns, and deployment efficiency.",
        icon: Users,
      },
      {
        title: "Cost and expense intelligence",
        description: "Labour, materials, equipment — broken down by project and period.",
        icon: PieChart,
      },
      {
        title: "Identify risks early",
        description: "Alerts for low attendance, cost overruns, and schedule slippage.",
        icon: AlertTriangle,
      },
      {
        title: "Data-driven growth",
        description: "Benchmark performance and scale operations with confidence.",
        icon: TrendingUp,
      },
    ],
    outcomes: [
      { label: "Increase productivity", icon: TrendingUp },
      { label: "Reduce project costs", icon: PieChart },
      { label: "Minimize risks", icon: ShieldCheck },
      { label: "Deliver on time", icon: Clock },
    ],
  },
];
