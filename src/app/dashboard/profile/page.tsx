import { getSession } from "@/lib/session";
import UpdateForm from "./UpdateForm";

const Profile = async () => {
  const session = await getSession();

  if (!session) return null;

  return <UpdateForm session={session} />;
};

export default Profile;
