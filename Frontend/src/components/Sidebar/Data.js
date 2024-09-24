const userMenu = [
  {
    name: "Home",
    icon: "fa-solid fa-house",
    slug: "/dashboard",
  },
  {
    name: "Appointments",
    icon: "fa-solid fa-list-check",
    slug: "/user/appointments",
  },
  {
    name: "Apply Doctor",
    icon: "fa-solid fa-user-doctor",
    slug: "/apply-doctor",
  },
];

const adminMenu = [
  {
    name: "Home",
    icon: "fa-solid fa-house",
    slug: "/dashboard",
  },
  {
    name: "Doctors",
    icon: "fa-solid fa-user-doctor",
    slug: "/admin/doctors",
  },
  {
    name: "Users",
    icon: "fa-solid fa-users ",
    slug: "/admin/users",
  },
  {
    name: "Profiles",
    icon: "fa-solid fa-user-tie",
    slug: "/profiles",
  },
];

export { adminMenu, userMenu };
