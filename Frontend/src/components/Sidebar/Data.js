const userMenu = [
  {
    name: "Home",
    icon: "fa-solid fa-house",
    slug: "/dashboard",
  },
  {
    name: "Appointments",
    icon: "fa-solid fa-list-check",
    slug: "/appointments",
  },
  {
    name: "Apply Doctor",
    icon: "fa-solid fa-user-doctor",
    slug: "/apply-doctor",
  },
  {
    name: "Update Profile",
    icon: "fa-regular fa-user",
    slug: `/doctor/update-profile`,
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

const doctorMenu = [
  {
    name: "Home",
    icon: "fa-solid fa-house",
    slug: "/dashboard",
  },
  {
    name: "Appointments",
    icon: "fa-solid fa-list-check",
    slug: "/appointments",
  },

  {
    name: "Update Profile",
    icon: "fa-regular fa-user",
    slug: `/doctor/update-profile`,
  },
];

export { adminMenu, userMenu, doctorMenu };
