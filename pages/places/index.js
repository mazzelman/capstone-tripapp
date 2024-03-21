import AddPlaces from "@/components/Forms/FormAddPlaces";

export default function OwnPlaces({ getUniqueValues }) {
  return (
    <>
      <h2>Oh so much Places....</h2>
      <AddPlaces getUniqueValues={getUniqueValues} />
    </>
  );
}
