export const siteConfig = {
  name: "Greenwave Engineering Pvt. Ltd.",
  tagline: "Industrial MEP & Engineering Execution",
  description:
    "Greenwave Engineering delivers turnkey industrial MEP execution — HVAC, fire fighting, electrical, plumbing, and process systems — across India with in-house engineering, BIM capabilities, and technology-enabled project management.",
  established: 2013,
  entityFormed: 2021,
  origin: "Gurgaon, India",
  statesRegistered: 8,
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Portfolio", href: "#portfolio-distribution" },
  { label: "Technology", href: "#technology" },
  { label: "Contact", href: "#contact" },
] as const;

export const stats = [
  { value: "1,700+", label: "Skilled workforce" },
  { value: "2,000+", label: "Vendors across India" },
  { value: "8", label: "States across India" },
  { value: "7 Days", label: "Site mobilisation" },
];

export const timeline = [
  {
    year: "2013",
    title: "Established in Gurgaon",
    description: "Founded as an HVAC and mechanical contracting firm",
  },
  {
    year: "2015",
    title: "Fire fighting capability",
    description: "Received the first fire fighting project",
  },
  {
    year: "2016",
    title: "First turnkey project",
    description: "Civil, electrical, and mechanical turnkey execution",
  },
  {
    year: "2018",
    title: "Design & build",
    description: "First design and build project incl. HVAC and process systems",
  },
  {
    year: "2019",
    title: "IBR boiler works",
    description: "Entered IBR boiler installation and associated works",
  },
  {
    year: "2021",
    title: "Greenwave Engineering Pvt. Ltd.",
    description: "Entity formed; business registered across 8 states",
  },
  {
    year: "2022",
    title: "Major electrical projects",
    description: "First major electrical project with LT/HT and ELV works",
  },
  {
    year: "2024",
    title: "R&D testing facilities",
    description: "All-weather climatic vehicle testing chamber turnkey project",
  },
  {
    year: "2025",
    title: "Tata Agratas",
    description: "PO for India's largest lithium-ion factory — 780 M INR scope",
  },
];

export const clientsIntro =
  "Execution partner to leading Japanese EPC contractors and cleanroom specialists — with long-standing relationships across automotive, battery, electronics, and industrial manufacturing.";

export const services = [
  {
    title: "HVAC",
    shortDescription: "Advanced climate control systems.",
    description:
      "Air conditioning, ventilation, chilled water systems, VRV/DX, and cleanroom air conditioning for industrial facilities.",
  },
  {
    title: "Fire Fighting",
    shortDescription: "Safety and suppression systems.",
    description:
      "Sprinkler systems, fire protection, and SITC fire fighting works for factories and large industrial campuses.",
  },
  {
    title: "Electrical",
    shortDescription: "Power distribution and wiring.",
    description:
      "LT/HT electrical works, ELV systems, and secondary connections for manufacturing and process facilities.",
  },
  {
    title: "Plumbing",
    shortDescription: "Water supply and drainage.",
    description:
      "Industrial plumbing, process drains, and utility water systems for factory and plant environments.",
  },
  {
    title: "Steam Piping",
    shortDescription: "Thermal energy distribution.",
    description:
      "Steam distribution, IBR boiler-associated works, and syphonic piping for process-driven industries.",
  },
  {
    title: "Refrigeration",
    shortDescription: "Cooling and storage solutions.",
    description:
      "Process refrigeration and temperature-controlled systems for manufacturing and testing environments.",
  },
  {
    title: "Gas Pipelines",
    shortDescription: "Fuel and gas line installation.",
    description:
      "Industrial gas pipeline installation and integration for factory and process applications.",
  },
  {
    title: "Utility Piping",
    shortDescription: "General process piping.",
    description:
      "Chilled water, condenser water, process vacuum, dust collection, and multi-utility piping networks.",
  },
];

export const industries = [
  {
    title: "Battery & Energy",
    description:
      "Powering the future with advanced lithium factory solutions.",
    image: "/images/industries/battery-energy.jpg",
  },
  {
    title: "Automotive",
    description: "Driving innovation in OEM plant manufacturing.",
    image: "/images/industries/automotive.jpg",
  },
  {
    title: "Air Conditioning & Electronics",
    description: "Precision manufacturing for climate control systems.",
    image: "/images/industries/ac-electronics.jpg",
  },
  {
    title: "Semiconductor",
    description:
      "HVAC for substations, process piping, and semiconductor R&D facility execution.",
    image: "/images/industries/semiconductor.jpg",
  },
  {
    title: "R&D / Testing Facilities",
    description: "Validating performance with cutting-edge labs.",
    image: "/images/industries/rd-testing.jpg",
  },
  {
    title: "Industrial Manufacturing",
    description: "Scaling production for heavy industry needs.",
    image: "/images/industries/industrial-manufacturing.jpg",
  },
];

export type FeaturedPartner = {
  name: string;
  shortMark: string;
  subtitle: string;
  tone?: "brand" | "light";
};

export const featuredPartners: FeaturedPartner[] = [
  {
    name: "Integrated Cleanroom Technologies",
    shortMark: "iCLEAN",
    subtitle: "Cleanroom & dry room execution",
    tone: "brand",
  },
  {
    name: "Hitachi Plant Technologies",
    shortMark: "HITACHI",
    subtitle: "Plant Technologies",
    tone: "light",
  },
  {
    name: "Sumitomo Mitsui Construction",
    shortMark: "SMCC",
    subtitle: "Construction Co., Ltd.",
    tone: "light",
  },
  {
    name: "Takenaka India",
    shortMark: "TAKENAKA",
    subtitle: "India Pvt. Ltd.",
    tone: "brand",
  },
];

export const differentiators = [
  {
    title: "In-house engineering & BIM",
    description:
      "Dedicated design team with Revit, Autodesk, and BIM modelling — from design inception through shop drawings to as-built documentation.",
  },
  {
    title: "1,700+ own workforce",
    description:
      "Trained in-house workforce across ducting, piping, electrical, VRF/DX, insulation, and plumbing — no subcontractor dependency for execution.",
  },
  {
    title: "2,000+ vendor network",
    description:
      "Pan-India procurement network from ancillaries to major equipment, enabling rapid sourcing at industrial scale.",
  },
  {
    title: "8-state presence",
    description:
      "Registered and operating across 8 states in India, with the ability to mobilise a site within 7 days.",
  },
  {
    title: "Technology-enabled execution",
    description:
      "Proprietary in-house ERP for project management, procurement, manpower, attendance, DPR, and material tracking in real time.",
  },
  {
    title: "Full statutory compliance",
    description:
      "100% compliant with government and labour regulations including ESIC, EPFO, LWF, BOCW, and GST.",
  },
];

export const technologyModules = [
  {
    title: "Project Management",
    description:
      "Manage projects through Initiation, Execution, Hold, and Completed stages with full lifecycle visibility.",
    image: "/images/hero/erp-overlay.jpg",
  },
  {
    title: "Procurement",
    description:
      "Centralised purchase request workflow with vendor interactions, approvals, and material lifecycle tracking.",
    image: "/images/technology/erp-manpower.jpg",
  },
  {
    title: "Manpower & Attendance",
    description:
      "Track assigned personnel, roles, daily wages, and attendance records across all active project sites.",
    image: "/images/technology/erp-manpower.jpg",
  },
  {
    title: "DPR & Material Tracking",
    description:
      "Daily progress reporting against BOQ with real-time delivery, installation status, and material traceability.",
    image: "/images/technology/erp-dpr.jpg",
  },
];

export type Partner = {
  name: string;
  logo?: string;
  darkLogo?: boolean;
};

export const partners: Partner[] = [
  {
    name: "Hitachi Plant Technologies",
    logo: "/images/clients/partners/hitachi.jpg",
    darkLogo: true,
  },
  { name: "Daiichi Jitsugyo India" },
  { name: "Takasago Engineering India" },
  {
    name: "Sumitomo Mitsui Construction (SMCC)",
    logo: "/images/clients/partners/smcc.jpg",
    darkLogo: true,
  },
  {
    name: "Takenaka India",
    logo: "/images/clients/partners/takenaka.png",
    darkLogo: false,
  },
  {
    name: "Taikisha Engineering India",
    logo: "/images/clients/partners/taikisha.jpg",
    darkLogo: true,
  },
  {
    name: "Integrated Cleanroom Technologies",
    logo: "/images/clients/partners/iclean.jpg",
    darkLogo: true,
  },
  { name: "Panasonic Appliances India" },
  { name: "Blue Star India" },
  {
    name: "Maeda Corporation India",
    logo: "/images/clients/partners/maeda.jpg",
    darkLogo: true,
  },
  {
    name: "Shimizu Corporation India",
    logo: "/images/clients/partners/shimizu.jpg",
    darkLogo: true,
  },
  {
    name: "CK Solution Co., Ltd.",
    logo: "/images/clients/partners/ck-solution.jpg",
    darkLogo: true,
  },
];

/** @deprecated Use partners */
export const clients = partners.map((partner) => partner.name);

export const qhsePoints = [
  {
    title: "Quality-first execution",
    description:
      "Entire workforce trained in-house to ensure consistent quality standards across every project discipline.",
  },
  {
    title: "Safety at the core",
    description:
      "Dedicated safety leadership with site safety officers ensuring safe operations across all active projects.",
  },
  {
    title: "Recognised excellence",
    description:
      "Awarded Best MEP Contractor Pan-India by Takenaka, with repeat QHSE awards across a wide client portfolio.",
  },
  {
    title: "Regulatory compliance",
    description:
      "Full adherence to statutory and regulatory requirements for labour, safety, and environmental standards.",
  },
];

export const contact = {
  company: "Greenwave Engineering Pvt. Ltd.",
  address: "Gurgaon, Haryana, India",
  addressNote:
    "Registered across 8 states in India. Full office address to be confirmed.",
  email: "hr@greenwave.ws",
  emailNote: "For project inquiries and partnerships.",
  phone: "+91 XXXXX XXXXX",
  phoneNote: "Placeholder — confirm official contact number.",
};

export type { Project } from "@/content/taxonomy";
export { projects } from "@/content/projects";
