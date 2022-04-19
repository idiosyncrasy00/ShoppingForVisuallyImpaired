import { useParams } from "react-router-dom"
import ProfileForm from "../components/ProfilePage/ProfileForm"

function ProfilePage() {
  let { id } = useParams();
  return (
    <div>
      <h1>This is profile page of id: {id}</h1>
      <ProfileForm />
    </div>
  );
}

export default ProfilePage;