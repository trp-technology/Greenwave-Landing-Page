export type IsoCertificate = {
  id: string;
  image: string;
  width: number;
  height: number;
  standard: string;
  title: string;
  issuer: string;
  scope: string;
  certificateNumber: string;
  validUntil: string;
  alt: string;
};

export const isoCertificatesIntro =
  "Certified to international management system standards — demonstrating structured quality, environmental responsibility, and occupational health & safety across MEP execution.";

export const isoCertificates: IsoCertificate[] = [
  {
    id: "iso-9001-2015",
    image: "/images/iso/IMG_3815.jpg",
    width: 3412,
    height: 4545,
    standard: "ISO 9001:2015",
    title: "Quality Management Systems",
    issuer: "Royal Assessments Pvt. Ltd.",
    scope:
      "MEP contractors — SITC, HVAC, fire fighting, plumbing, mechanical & electrical",
    certificateNumber: "E20260243910",
    validUntil: "Feb 2029",
    alt: "ISO 9001:2015 Quality Management Systems certificate for Greenwave Engineering Private Limited issued by Royal Assessments Pvt. Ltd.",
  },
  {
    id: "iso-14001-2015",
    image: "/images/iso/IMG_3816.jpg",
    width: 2184,
    height: 2914,
    standard: "ISO 14001:2015",
    title: "Environmental Management Systems",
    issuer: "Royal Assessments Pvt. Ltd.",
    scope:
      "MEP contractors — SITC, HVAC, fire fighting, plumbing, mechanical & electrical",
    certificateNumber: "E20260243911",
    validUntil: "Feb 2029",
    alt: "ISO 14001:2015 Environmental Management Systems certificate for Greenwave Engineering Private Limited issued by Royal Assessments Pvt. Ltd.",
  },
  {
    id: "iso-45001-2018",
    image: "/images/iso/IMG_3817.jpg",
    width: 2215,
    height: 2953,
    standard: "ISO 45001:2018",
    title: "Occupational Health & Safety Management",
    issuer: "Royal Assessments Pvt. Ltd.",
    scope:
      "MEP contractors — SITC, HVAC, fire fighting, plumbing, mechanical & electrical",
    certificateNumber: "E20260243912",
    validUntil: "Feb 2029",
    alt: "ISO 45001:2018 Occupational Health and Safety Management Systems certificate for Greenwave Engineering Private Limited issued by Royal Assessments Pvt. Ltd.",
  },
];
