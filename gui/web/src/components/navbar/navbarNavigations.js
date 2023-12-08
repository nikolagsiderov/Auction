import { Home, Category, AdminPanelSettings, Apps } from "@mui/icons-material";

const navbarNavigations = [
  {
    title: "Начало",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Аукциони",
    icon: <Category />,
    child: [
      {
        title: "Всички",
        url: "/items",
      },
      {
        title: "Медицина",
        url: "/",
      },
      {
        title: "Образование",
        url: "/",
      },
      {
        title: "Спорт",
        url: "/",
      },
    ],
  },
  {
    title: "Управление",
    icon: <Apps />,
    url: "/vendor/dashboard",
  },
  {
    title: "Администрация",
    icon: <AdminPanelSettings />,
    url: "/admin/dashboard",
  },
];

export default navbarNavigations;
