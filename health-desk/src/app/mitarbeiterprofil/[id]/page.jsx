import Mitarbeiterprofil from "./mitarbeiterprofil";

export default function MitarbeiterPage({ params }) {
  const { id } = params;

  return <Mitarbeiterprofil employeeId={id} />;
}
