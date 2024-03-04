import { useRouter } from "next/router";
import DetailsCard from "@/components/DetailsCard";

export default function Place({ places }) {
  const router = useRouter();
  const { id } = router.query;
  const matchingPlace = places.find(({ id }) => id === router.query.id);

  if (!matchingPlace) {
    return <h1>Sorry, this place is not available</h1>;
  }

  return <DetailsCard matchingPlace={matchingPlace} />;
}
