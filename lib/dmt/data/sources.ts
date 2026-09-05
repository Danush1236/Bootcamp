import type { DmtKnowledgeCategory } from "../types/domain";

export type DmtCrawlSource = {
  title: string;
  url: string;
  category: DmtKnowledgeCategory;
  keywords: string[];
};

export const DMT_CRAWL_SOURCES: DmtCrawlSource[] = [
  {
    title: "DMT Appointment Portal",
    url: "https://dmtappointments.dmt.gov.lk/",
    category: "appointments",
    keywords: ["appointment", "booking", "district office", "otp"],
  },
  {
    title: "Vehicle First Registration",
    url: "https://dmt.gov.lk/index.php?catid=11&id=23&itemid=147&lang=en&option=com_content&view=article",
    category: "vehicle",
    keywords: ["vehicle registration", "first registration", "mta 2", "tin"],
  },
  {
    title: "Registration of Ownership Transfer",
    url: "https://dmt.gov.lk/index.php?id=24&lang=en&option=com_content&view=article",
    category: "vehicle",
    keywords: ["ownership transfer", "vehicle transfer", "mta 6", "mta 8"],
  },
  {
    title: "New Driving License",
    url: "https://dmt.gov.lk/index.php?id=48&lang=en&option=com_content&view=article",
    category: "driving-licence",
    keywords: ["new driving licence", "learner permit", "written test", "practical test"],
  },
  {
    title: "Renewal of Validity and Extension of Driving License",
    url: "https://dmt.gov.lk/index.php?Itemid=165&id=49&lang=en&option=com_content&view=article",
    category: "driving-licence",
    keywords: ["renewal", "validity", "medical certificate"],
  },
  {
    title: "Duplicate Driving License and Change of Particulars",
    url: "https://dmt.gov.lk/index.php?catid=12&id=50&itemid=166&lang=en&option=com_content&view=article",
    category: "driving-licence",
    keywords: ["duplicate", "lost licence", "change particulars", "police complaint"],
  },
  {
    title: "Conversion of Foreign License",
    url: "https://dmt.gov.lk/index.php?Itemid=164&id=54&lang=en&option=com_content&view=article",
    category: "driving-licence",
    keywords: ["foreign license", "conversion", "foreign driving licence"],
  },
  {
    title: "Driving License Charges For Services",
    url: "https://dmt.gov.lk/index.php?Itemid=167&id=57&lang=en&option=com_content&view=article",
    category: "fees",
    keywords: ["driving licence charges", "fees"],
  },
  {
    title: "Forms",
    url: "https://dmt.gov.lk/index.php?Itemid=101&catid=2&id=58&lang=en&option=com_content&view=article",
    category: "forms",
    keywords: ["forms", "mta", "cmt", "downloads"],
  },
  {
    title: "E-Services",
    url: "https://dmt.gov.lk/index.php?id=13&lang=en&layout=blog&option=com_content&view=category",
    category: "vehicle",
    keywords: ["e services", "vehicle details", "registration number"],
  },
  {
    title: "FAQs",
    url: "https://dmt.gov.lk/index.php?Itemid=122&lang=en",
    category: "faq",
    keywords: ["faq", "frequently asked questions"],
  },
  {
    title: "Inquiry",
    url: "https://dmt.gov.lk/index.php?Itemid=137&id=1&lang=en&option=com_contact&view=contact",
    category: "contact",
    keywords: ["contact", "inquiry", "phone", "address"],
  },
  {
    title: "Contact Details",
    url: "https://dmt.gov.lk/index.php?Itemid=138&lang=en",
    category: "contact",
    keywords: ["contact details", "telephone", "office"],
  },
];
