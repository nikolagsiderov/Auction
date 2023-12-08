import {
  Receipt,
  Category,
  Dashboard,
  Hail,
  ManageAccounts,
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
    name: "Аукциони",
    icon: Category,
    children: [
      {
        name: "Всички",
        path: "/vendor/items",
      },
      {
        name: "Създай",
        path: "/vendor/items/create",
      },
    ],
  },
  {
    name: "Поръчки",
    icon: Receipt,
    path: "/vendor/orders",
  },
  {
    name: "История",
    icon: Hail,
    children: [
      {
        name: "Приходи",
        path: "/vendor/earnings",
      },
      {
        name: "Плащания",
        path: "/vendor/payouts",
      },
      {
        name: "Заявки за плащания",
        path: "/vendor/payout-request",
      },
    ],
  },
  {
    type: "label",
    label: "Настройки",
  },
  {
    name: "Акаунт",
    icon: ManageAccounts,
    path: "/vendor/account",
  },
  {
    name: "Излез",
    icon: Logout,
    path: "/logout",
  },
];
