import { getSession } from "@/lib/session";
import UpdateForm from "./UpdateForm";

const Profile = async () => {
  const session = await getSession();

  if (!session) return null;
  const { id, ...user } = session;

  return <UpdateForm user={user} />;
};

export default Profile;
