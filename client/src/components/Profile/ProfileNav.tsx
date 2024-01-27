const ProfileNav = ({
  active,
  setActive,
}: {
  active: string;
  setActive: any;
}) => {
  const links = [
    {
      name: "Posts",
      value: "posts",
    },
    {
      name: "Education",
      value: "education",
    },
    {
      name: "Work Experience",
      value: "workExperience",
    },
  ];

  return (
    <div className="border p-6">
      <div className="flex items-center gap-6">
        {links.map((link) => (
          <div
            key={link.name}
            className={`cursor-pointer ${
              active === link.value ? "text-blue-500" : ""
            }`}
            onClick={() => setActive(link.value)}
          >
            {link.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileNav;
