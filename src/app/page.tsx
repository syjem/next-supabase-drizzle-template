import { getEmployees } from "#/app/actions/get-employees";

export default async function Home() {
 const employees = await getEmployees();
  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {employees?.map((employee) => (
          <li key={employee.id}>{employee.name} - {employee.employee_id}</li>
        ))}
      </ul>
    </div>
  );
}
