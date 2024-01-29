"use client";
import { useGetUser } from "@/hooks/useGetUser";

interface ProfileContentProps {
  username: string;
}

export default function ProfileContent({ username }: ProfileContentProps) {
  const { about } = useGetUser(username);

  return (
    <div className="flex flex-col items-center justify-between p-16 gap-6">
      <h3 className="text-4xl font-semibold">{username}</h3>
      {!about && (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          mollis ligula justo, id tempus mi porttitor vitae. Aliquam porttitor
          vel arcu pellentesque viverra. Vivamus efficitur odio eu lectus
          pretium consectetur. Nunc ac dolor eget risus convallis euismod. Morbi
          vel tempus arcu. Phasellus ut malesuada libero. Etiam lacus arcu,
          posuere non ipsum quis, condimentum malesuada mauris. Proin vehicula
          orci lectus, non elementum ipsum interdum sit amet. Ut eros eros,
          imperdiet sit amet luctus at, dictum a velit. Vivamus lacinia
          fermentum leo non pharetra. Pellentesque sit amet accumsan erat. Ut
          aliquet pretium congue. Phasellus ac dui non libero blandit tincidunt
          vitae sit amet nibh. Nullam nec ex arcu. Nulla quis elit sit amet est
          fringilla commodo. Etiam aliquam magna et mauris gravida, ac ultrices
          nulla pretium. Pellentesque auctor libero in faucibus ornare.
          Phasellus eros erat, laoreet non aliquet at, efficitur vitae mi. Donec
          accumsan lorem a odio hendrerit varius. Integer urna urna, dictum in
          posuere et, condimentum nec neque. Fusce et molestie lorem. In sed
          ipsum id neque aliquam laoreet. In feugiat, diam vitae rutrum
          ultrices, ex neque fermentum nunc, eget scelerisque velit ante a
          sapien. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Donec blandit sagittis nunc, id dictum
          nunc tempor ut. Integer eu tellus augue. Etiam luctus nulla quam, ac
          laoreet metus fringilla non. Vestibulum dolor mi, laoreet convallis
          finibus sed, vulputate sed libero. Morbi pretium risus vitae neque
          sollicitudin, nec semper sem posuere.
        </p>
      )}
    </div>
  );
}
