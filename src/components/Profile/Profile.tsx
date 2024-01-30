import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

interface ProfileProps {
  username: string;
}
export default function Profile({ username }: ProfileProps) {
  return (
    <main>
      <ProfileHeader username={username} />
      <ProfileContent username={username} />
    </main>
  );
}
