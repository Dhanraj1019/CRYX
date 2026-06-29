import { Trash2 } from "lucide-react";

function RegistrationsModal({title,subtitle, deleteStatus = true, onDelete, onClose, data = [] }) {
  const registrations = Array.isArray(data) ? data : [];

  return (
    // absolute fills the card; z-10 sits above card content
    <div
      className="absolute inset-0 z-10 flex flex-col rounded-sm bg-[#090d16]/95 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-3 py-2.5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-cyan-300">
            {title}
          </p>
          <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
            {subtitle}
            <span className="ml-2 text-xs font-normal text-gray-400">
              ({registrations.length})
            </span>
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-sm border border-red-400/50 font-mono text-sm text-red-400 transition hover:bg-red-400 hover:text-black"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 p-3 overflow-x-auto overflow-y-auto">
        {registrations.length === 0 ? (
          <p className="rounded-sm border border-white/10 bg-white/5 px-3 py-6 text-center font-mono text-xs uppercase tracking-wider text-gray-400">
            No registrations found
          </p>
        ) : (
          <table className="w-full border-collapse font-mono text-xs">
            <thead>
              <tr className=" border-b border-cyan-400/30 text-left text-[10px] uppercase tracking-[2px] text-cyan-300">
                <th className="px-2 py-2 font-medium">Username</th>
                <th className="px-2 py-2 font-medium">Full Name</th>
                <th className="px-2 py-2 font-medium hidden sm:table-cell">Number</th>
                <th className="px-2 py-2 font-medium hidden sm:table-cell">Email</th>
                <th className="px-2 py-2 font-medium">Date</th>
                {deleteStatus && (
                  <th className="px-2 py-2 font-medium text-right">Del</th>
                )}
              </tr>
            </thead>
            <tbody>
              {registrations.map((user, index) => (
                <tr
                  key={user.id || index}
                  className="border-b border-white/5 text-gray-200 transition-colors hover:bg-white/[0.03]"
                >
                  <td className="px-2 py-2 text-cyan-200">{user.username}</td>
                  <td className="px-2 py-2">{user.fullname}</td>
                  <td className="px-2 py-2 text-gray-400 hidden sm:table-cell">{user.number}</td>
                  <td className="px-2 py-2 text-gray-400 max-w-[120px] truncate hidden sm:table-cell">{user.email}</td>
                  <td className="px-2 py-2 text-gray-400 whitespace-nowrap">
                    {new Date(user.date).toLocaleDateString()}
                  </td>
                  {deleteStatus && (
                    <td className="px-2 py-2 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          onDelete(user.id ? ["id", user.id] : ["username", user.username])
                        }
                        className="ml-auto flex h-6 w-6 items-center justify-center rounded-sm border border-red-400/40 text-red-400 transition hover:bg-red-400 hover:text-black"
                        aria-label="Delete registration"
                      >
                        <Trash2 size={12} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/10 px-3 py-2">
        <p className="font-mono text-[10px] text-gray-500">
          {registrations.length} registration{registrations.length !== 1 ? "s" : ""} total
        </p>
      </div>
    </div>
  );
}

export default RegistrationsModal;