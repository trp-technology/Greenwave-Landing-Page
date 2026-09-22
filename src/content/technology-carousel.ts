export type TechCarouselSlide = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const appCarouselSlides: TechCarouselSlide[] = [
  {
    id: "workforce",
    title: "Workforce Management",
    description:
      "Manage your entire project workforce from one place.",
    image: "/tech-images/workforce.jpg",
    imageAlt:
      "Greenwave app workforce management with worker profiles and project assignments",
  },
  {
    id: "smart-attendance",
    title: "Smart Attendance",
    description:
      "Reliable attendance with location and identity verification.",
    image: "/tech-images/home.jpeg",
    imageAlt:
      "Greenwave app smart attendance with face verification and check-in",
  },
  {
    id: "geo-attendance",
    title: "Geo-Tagged Attendance",
    description:
      "Know exactly where and when your workforce checked in.",
    image: "/tech-images/geo-attendance.jpg",
    imageAlt:
      "Greenwave app geo-tagged attendance showing on-site location verification",
  },
  {
    id: "working-hours",
    title: "Working Hours & Overtime",
    description:
      "Automatically calculate working hours and overtime.",
    image: "/tech-images/check.jpeg",
    imageAlt:
      "Greenwave app check-out screen with worked hours and overtime calculation",
  },
  {
    id: "dpr",
    title: "Daily Progress Reports",
    description:
      "Track manpower, work completed, materials, equipment and site observations every day.",
    image: "/tech-images/dpr.jpg",
    imageAlt:
      "Greenwave app daily progress report with manpower, materials and site photos",
  },
  {
    id: "salary-sheets",
    title: "Salary Sheets",
    description:
      "Turn attendance and overtime into accurate worker salary calculations.",
    image: "/tech-images/salary-sheets.jpg",
    imageAlt:
      "Greenwave app salary sheets with wage breakdown and project-wise payroll",
  },
  {
    id: "hr-compliance",
    title: "HR & Compliance",
    description:
      "Keep worker documents, statutory details and compliance records organized.",
    image: "/tech-images/profile.jpg",
    imageAlt:
      "Greenwave app account profile with HR and compliance management",
  },
  {
    id: "site-expenses",
    title: "Site Expenses",
    description:
      "Manage petty cash, labour expenses and site spending with approvals.",
    image: "/tech-images/site-expenses.jpg",
    imageAlt:
      "Greenwave app site expenses with petty cash and labour expense tracking",
  },
  {
    id: "leave-holidays",
    title: "Leave & Holidays",
    description:
      "Manage employee leave requests, approvals and project holiday calendars.",
    image: "/tech-images/leave-holidays.jpg",
    imageAlt:
      "Greenwave app leave requests and project holiday calendar management",
  },
  {
    id: "intelligence",
    title: "Construction Intelligence",
    description:
      "Turn workforce, project and operational data into actionable insights.",
    image: "/tech-images/intelligence.jpg",
    imageAlt:
      "Greenwave app construction intelligence with project analytics and insights",
  },
];

export const webCarouselSlides: TechCarouselSlide[] = [
  {
    id: "workspace",
    title: "Project Workspace",
    description:
      "Run every construction project from one connected workspace.",
    image: "/tech-images/web/dashboard.png",
    imageAlt:
      "Greenwave web project workspace dashboard with pipeline and procurement overview",
  },
  {
    id: "boq",
    title: "BOQ Planning",
    description:
      "Upload and manage bills of quantities as the single source of truth for project scope.",
    image: "/tech-images/web/boq-planning.png",
    imageAlt:
      "Greenwave web BOQ planning with bill of quantities upload and scope management",
  },
  {
    id: "tasks",
    title: "Task Management",
    description:
      "Break projects into clear work packages that drive procurement and execution.",
    image: "/tech-images/web/task-management.png",
    imageAlt:
      "Greenwave web task management with work packages and execution tracking",
  },
  {
    id: "purchase-requests",
    title: "Purchase Requests",
    description:
      "Raise, review and approve purchase requests with controlled multi-level workflows.",
    image: "/tech-images/web/purchase-request.png",
    imageAlt:
      "Greenwave web purchase request with approval workflow and line items",
  },
  {
    id: "purchase-orders",
    title: "Purchase Orders",
    description:
      "Convert approved requests into vendor POs with rates, taxes and commercial clarity.",
    image: "/tech-images/web/purchase-orders.png",
    imageAlt:
      "Greenwave web purchase orders with vendor rates, taxes and commercial terms",
  },
  {
    id: "work-orders",
    title: "Work Orders",
    description:
      "Manage service engagements separately from material orders, end to end.",
    image: "/tech-images/web/work-order.png",
    imageAlt:
      "Greenwave web work order detail with vendor, line items and approval",
  },
  {
    id: "vendor-catalog",
    title: "Vendor & Catalog Management",
    description:
      "Keep vendors, products, clients and entities organized for faster sourcing and billing.",
    image: "/tech-images/web/vendor-catalog.png",
    imageAlt:
      "Greenwave web vendor and catalog management with products and clients",
  },
  {
    id: "site-execution",
    title: "Site Execution & DPR",
    description:
      "Track deliveries and installations against issued orders with daily progress visibility.",
    image: "/tech-images/web/site-execution.png",
    imageAlt:
      "Greenwave web site execution with delivery tracking and daily progress reports",
  },
  {
    id: "material-tracking",
    title: "Material Tracking",
    description:
      "Follow every quantity from BOQ to PR, PO, delivery and installation in one flow.",
    image: "/tech-images/web/material-tracking.png",
    imageAlt:
      "Greenwave web material tracking from purchase request to installation",
  },
  {
    id: "invoicing",
    title: "Invoicing & Payments",
    description:
      "Turn approved site progress into invoices and track payments with full financial control.",
    image: "/tech-images/web/invoicing.png",
    imageAlt:
      "Greenwave web invoicing and payments with financial tracking",
  },
  {
    id: "reports",
    title: "Reports & Spend Insights",
    description:
      "See orders placed, bills received and project spend with clear, actionable analytics.",
    image: "/tech-images/web/reports.png",
    imageAlt:
      "Greenwave web reports and spend insights with project analytics",
  },
  {
    id: "roles",
    title: "Roles & Approvals",
    description:
      "Give every stakeholder the right access with project roles and approval accountability.",
    image: "/tech-images/web/roles-approvals.png",
    imageAlt:
      "Greenwave web roles and approvals with stakeholder access control",
  },
];
