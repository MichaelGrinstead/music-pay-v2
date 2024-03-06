import Profile from "@/components/Profile/UserProfile";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div>
      <Profile username={params.username} />
    </div>
  );
}
