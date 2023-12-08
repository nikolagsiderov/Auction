import {
  VolunteerActivism,
  Dashboard,
  Gavel,
  Logout,
} from "@mui/icons-material";

export const navigations = [
  {
    type: "label",
    label: "Администрация",
  },
  {
    name: "Начало",
    icon: Dashboard,
    path: "/vendor/dashboard",
  },
  {
    name: "Дарителски категории",
    icon: VolunteerActivism,
    children: [
      {
        name: "Всички",
        path: "/admin/categories",
      },
      {
        name: "Създай",
        path: "/admin/categories/create",
      },
    ],
  },
  {
    type: "label",
    label: "Настройки",
  },
  {
    name: "Аукциони",
    icon: Gavel,
    path: "/admin/settings/auctions",
  },
  {
    name: "Излез",
    icon: Logout,
    path: "/logout",
  },
];
