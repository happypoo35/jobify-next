import { getSession } from "@/lib/session";
import UpdateForm from "./UpdateForm";

const Profile = async () => {
  const user = await getSession();

  if (!user) return null;

  return <UpdateForm user={user} />;
};

export default Profile;
