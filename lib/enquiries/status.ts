export const enquiryStatuses = [
  "new",
  "contacted",
  "converted",
  "closed",
  "spam",
] as const;

export type EnquiryStatus = (typeof enquiryStatuses)[number];
