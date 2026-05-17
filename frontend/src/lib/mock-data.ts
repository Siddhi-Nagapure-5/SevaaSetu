export type Need = {
  id: string;
  title: string;
  org: string;
  location: string;
  category: "Food" | "Clothing" | "Education" | "Medical" | "Shelter" | "Services";
  urgency: "Critical" | "High" | "Moderate";
  progress: number; // 0-100
  goal: string;
  posted: string;
};

export const needs: Need[] = [
  { id: "n1", title: "200 winter blankets for shelter", org: "Aasha Foundation", location: "Pune, MH", category: "Clothing", urgency: "Critical", progress: 64, goal: "200 blankets", posted: "2h ago" },
  { id: "n2", title: "Daily meals for 80 children", org: "Annapurna Kitchen", location: "Bengaluru, KA", category: "Food", urgency: "High", progress: 42, goal: "₹ 1,20,000", posted: "5h ago" },
  { id: "n3", title: "School supplies for grade 6", org: "Vidya Trust", location: "Jaipur, RJ", category: "Education", urgency: "Moderate", progress: 78, goal: "60 kits", posted: "1d ago" },
  { id: "n4", title: "Insulin & diabetes care kits", org: "Sanjeevani Clinic", location: "Chennai, TN", category: "Medical", urgency: "Critical", progress: 31, goal: "120 kits", posted: "30m ago" },
  { id: "n5", title: "Pro-bono legal counsel", org: "NyayaSetu", location: "Delhi NCR", category: "Services", urgency: "Moderate", progress: 18, goal: "20 hrs/wk", posted: "6h ago" },
  { id: "n6", title: "Temporary shelter mats", org: "Chhaya Network", location: "Mumbai, MH", category: "Shelter", urgency: "High", progress: 55, goal: "300 mats", posted: "3h ago" },
];

export const stats = [
  { label: "Matched donations", value: "12,480" },
  { label: "Verified partners", value: "342" },
  { label: "Cities live", value: "26" },
  { label: "Avg. match time", value: "4m 12s" },
];
