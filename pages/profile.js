import { StyledSection } from "./favorites";
import Image from "next/image";

export default function Profile() {
  return (
    <StyledSection>
      <Image
        src={"/images/Profilbild.jpg"}
        width={200}
        height={300}
        alt="Nutzer Profilbild"
      />

      <h2>Lizzy Lazycat</h2>
      <h3>About me:</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
        quis enim.{" "}
      </p>
    </StyledSection>
  );
}
