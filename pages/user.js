import { UserProfile } from "@clerk/clerk-react";

const UserProfilePage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserProfile />
    </div>
  );
};

export default UserProfilePage;
