import Mitarbeiterprofil from "./Mitarbeiterprofil";

export default function MitarbeiterPage({ params }) {
  const { id } = params;

  return <Mitarbeiterprofil employeeId={id} />;
}
