export type TechSpotlight = {
  id: string;
  label: string;
  platform: "app" | "web";
  headline: string;
  image: string;
  imageAlt: string;
};

export const techSpotlights: TechSpotlight[] = [
  {
    id: "workforce",
    label: "Workforce",
    platform: "app",
    headline: "Manage your entire project workforce from one place",
    image: "/tech-section/app-workforce.jpg",
    imageAlt:
      "Greenwave app workforce management with worker profiles, project assignments and site team directory",
  },
  {
    id: "workspace",
    label: "Workspace",
    platform: "web",
    headline: "Run every construction project from one connected workspace",
    image: "/tech-section/web-workspace.png",
    imageAlt:
      "Greenwave web project workspace with pipeline overview, active projects and procurement dashboard",
  },
  {
    id: "attendance",
    label: "Attendance",
    platform: "app",
    headline: "Smart attendance with location and identity verification",
    image: "/tech-section/app-attendance.jpg",
    imageAlt:
      "Greenwave app smart attendance with face verification, GPS geo-tagging and real-time check-in",
  },
  {
    id: "procurement",
    label: "Procurement",
    platform: "web",
    headline: "From BOQ to purchase order with controlled approvals",
    image: "/tech-section/web-procurement.png",
    imageAlt:
      "Greenwave web BOQ planning, purchase requests, multi-level approvals and purchase orders",
  },
  {
    id: "dpr",
    label: "DPR",
    platform: "app",
    headline: "Track manpower, work, materials and site observations every day",
    image: "/tech-section/app-dpr.jpg",
    imageAlt:
      "Greenwave app daily progress reporting with manpower, materials, equipment and site photos",
  },
  {
    id: "material-tracking",
    label: "Materials",
    platform: "web",
    headline: "Track every material from BOQ to installation",
    image: "/tech-section/web-material-tracking.png",
    imageAlt:
      "Greenwave web vendor catalog and material tracking from BOQ through PR, PO, delivery and installation",
  },
  {
    id: "payroll",
    label: "Payroll",
    platform: "app",
    headline: "From attendance to accurate salary sheets",
    image: "/tech-section/app-payroll.jpg",
    imageAlt:
      "Greenwave app salary sheets with automatic wage calculation, overtime and project-wise payroll",
  },
  {
    id: "site-execution",
    label: "Execution",
    platform: "web",
    headline: "Connect daily site reporting with procurement and execution",
    image: "/tech-section/web-site-execution.png",
    imageAlt:
      "Greenwave web site execution and DPR with delivery tracking, site photos and approval workflows",
  },
  {
    id: "analytics",
    label: "Intelligence",
    platform: "app",
    headline: "Turn site data into actionable construction intelligence",
    image: "/tech-section/app-intelligence.jpg",
    imageAlt:
      "Greenwave app construction intelligence with project analytics, workforce trends and cost insights",
  },
  {
    id: "finance",
    label: "Finance",
    platform: "web",
    headline: "Full financial control across projects",
    image: "/tech-section/web-finance.png",
    imageAlt:
      "Greenwave web finance dashboard with invoicing, spend insights, reports and project cost analytics",
  },
];

/** @deprecated Use TechSpotlight */
export type AppSpotlight = Omit<TechSpotlight, "platform"> & {
  featureTitles?: string[];
};

/** @deprecated Use techSpotlights */
export const appSpotlights = techSpotlights.filter((s) => s.platform === "app");
