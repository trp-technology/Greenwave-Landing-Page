export type PlatformFeature = {
  title: string;
  description: string;
};

export type TechnologyPlatform = {
  id: "app" | "web";
  name: string;
  tagline: string;
  features: PlatformFeature[];
};

export const technologySection = {
  title: "Technology-enabled project execution",
  description:
    "Proprietary in-house systems, built by our own tech team, power workforce management on site and project control from the office — connected across every active project.",
  badge: "In-house tech team",
};

export const technologyPlatforms: TechnologyPlatform[] = [
  {
    id: "app",
    name: "Greenwave App",
    tagline: "Field operations in every worker's pocket",
    features: [
      {
        title: "Workforce Management",
        description:
          "Manage your entire project workforce from one place.",
      },
      {
        title: "Smart Attendance",
        description:
          "Reliable attendance with location and identity verification.",
      },
      {
        title: "Geo-Tagged Attendance",
        description:
          "Know exactly where and when your workforce checked in.",
      },
      {
        title: "Working Hours & Overtime",
        description:
          "Automatically calculate working hours and overtime.",
      },
      {
        title: "Daily Progress Reports",
        description:
          "Track manpower, work completed, materials, equipment and site observations every day.",
      },
      {
        title: "Salary Sheets",
        description:
          "Turn attendance and overtime into accurate worker salary calculations.",
      },
      {
        title: "HR & Compliance",
        description:
          "Keep worker documents, statutory details and compliance records organized.",
      },
      {
        title: "Site Expenses",
        description:
          "Manage petty cash, labour expenses and site spending with approvals.",
      },
      {
        title: "Leave & Holidays",
        description:
          "Manage employee leave requests, approvals and project holiday calendars.",
      },
      {
        title: "Construction Intelligence",
        description:
          "Turn workforce, project and operational data into actionable insights.",
      },
    ],
  },
  {
    id: "web",
    name: "Greenwave Web",
    tagline: "Project control from procurement to close-out",
    features: [
      {
        title: "Project Workspace",
        description:
          "Run every construction project from one connected workspace.",
      },
      {
        title: "BOQ Planning",
        description:
          "Upload and manage bills of quantities as the single source of truth for project scope.",
      },
      {
        title: "Task Management",
        description:
          "Break projects into clear work packages that drive procurement and execution.",
      },
      {
        title: "Purchase Requests",
        description:
          "Raise, review and approve purchase requests with controlled multi-level workflows.",
      },
      {
        title: "Purchase Orders",
        description:
          "Convert approved requests into vendor POs with rates, taxes and commercial clarity.",
      },
      {
        title: "Work Orders",
        description:
          "Manage service engagements separately from material orders, end to end.",
      },
      {
        title: "Vendor & Catalog Management",
        description:
          "Keep vendors, products, clients and entities organized for faster sourcing and billing.",
      },
      {
        title: "Site Execution & DPR",
        description:
          "Track deliveries and installations against issued orders with daily progress visibility.",
      },
      {
        title: "Material Tracking",
        description:
          "Follow every quantity from BOQ to PR, PO, delivery and installation in one flow.",
      },
      {
        title: "Invoicing & Payments",
        description:
          "Turn approved site progress into invoices and track payments with full financial control.",
      },
      {
        title: "Reports & Spend Insights",
        description:
          "See orders placed, bills received and project spend with clear, actionable analytics.",
      },
      {
        title: "Roles & Approvals",
        description:
          "Give every stakeholder the right access with project roles and approval accountability.",
      },
    ],
  },
];
