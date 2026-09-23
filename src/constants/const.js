import { User, Bell, ShieldCheck ,CircleHelp,Palette,Languages } from "lucide-react";

export const CONST = {
  DAYS__OF__WEEK: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  MONTHS__OF__YEAR: [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ],
  ACTION_TYPES: {
    THIS__MONTH: 'THIS__MONTH',
    PREV__MONTH: 'PREV__MONTH',
    NEXT__MONTH: 'NEXT__MONTH',
    THIS__YEAR: 'THIS__YEAR',
    PREV__YEAR: 'PREV__YEAR',
    NEXT__YEAR: 'NEXT__YEAR',
    THIS__DAY: 'THIS__DAY',
    FIRST__DAY__IN__MONTH:'FIRST__DAY__IN__MONTH',
    WEEK:'WEEK',
    NEXT__WEEK:'NEXT__WEEK',
    PREV__WEEK:"PREV__WEEK",
    NEXT__DAY:'NEXT__DAY',
    PREV__DAY : 'PREV__DAY'



  }

}
export const SETTINGS_ITEMS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "security", label: "Security", icon: ShieldCheck },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "language", label: "Language", icon: Languages },
  { key: "appearance", label: "Appearance", icon: Palette },
  { key: "help", label: "Help", icon: CircleHelp },
];