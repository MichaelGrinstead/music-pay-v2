import Profile from "@/components/Profile/Profile";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div>
      <Profile />
    </div>
  );
}
