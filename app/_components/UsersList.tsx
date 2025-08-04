import { getUsers } from "@/app/_lib/data-services";
import User from "./User";

export default async function UsersList() {
  const users = await getUsers();

  return (
    <div
      className="w-full overflow-hidden rounded-lg border shadow-sm"
      style={{
        borderColor: "#374151", // border-gray-700
        backgroundColor: "#111827", // bg-gray-900
      }}
    >
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700/50">
          <thead style={{ backgroundColor: "var(--sidebar)" }}>
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase border-r"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "#374151", // border-gray-700
                }}
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase border-r"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "#374151", // border-gray-700
                }}
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase border-r"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "#374151", // border-gray-700
                }}
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase border-r"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "#374151", // border-gray-700
                }}
              >
                Phone Number
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase border-r"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "#374151", // border-gray-700
                }}
              >
                Address
              </th>
            </tr>
          </thead>
          <tbody
            className="divide-y divide-gray-700/50"
            style={{
              backgroundColor: "#111827", // bg-gray-900
              borderColor: "#374151", // border-gray-700
            }}
          >
            {users.map((user) => (
              <User user={user} key={user.id} view="table" />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-700/50">
        {users.map((user) => (
          <User user={user} key={user.id} view="card" />
        ))}
      </div>
    </div>
  );
}
