export default function PreviewCard({ formResults }) {
  console.log(formResults);

  return (
    <>
      {formResults.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </>
  );
}
