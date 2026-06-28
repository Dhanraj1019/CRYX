import { Trash2 } from "lucide-react";

function RegistrationsModal({onDelete, onClose, data = [] }) {
  const registrations = Array.isArray(data) ? data : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-3 py-6 backdrop-blur-sm">
      <div className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-md border border-cyan-400/40 bg-[#090d16] shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[3px] text-cyan-300">
              Event Registrations
            </p>
            <h2 className="mt-1 font-mono text-lg font-bold uppercase tracking-wider text-white sm:text-xl">
              Registered Users
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-red-400/50 font-mono text-xl text-red-400 transition hover:bg-red-400 hover:text-black"
            aria-label="Close modal"
          >
            x
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-4 sm:p-6">
          {registrations.length === 0 ? (
            <p className="rounded-sm border border-white/10 bg-white/5 px-4 py-8 text-center font-mono text-sm uppercase tracking-wider text-gray-400">
              No registrations found
            </p>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-200 border-collapse font-mono text-sm">
                  <thead>
                    <tr className="border-b border-cyan-400/30 text-left text-xs uppercase tracking-[2px] text-cyan-300">
                      <th className="px-3 py-3">Username</th>
                      <th className="px-3 py-3">Full Name</th>
                      <th className="px-3 py-3">Number</th>
                      <th className="px-3 py-3">Email</th>
                      <th className="px-3 py-3">Date</th>
                      {/* <th className="px-3 py-3">Time</th> */}
                      <th className="px-3 py-3 text-right">Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {registrations.map((user, index) => (
                      <tr
                        key={user.id || index}
                        className="border-b border-white/10 text-gray-200"
                      >
                        <td className="px-3 py-4">{user.username}</td>
                        <td className="px-3 py-4">{user.fullname}</td>
                        <td className="px-3 py-4 text-gray-400">{user.number}</td>
                        <td className="px-3 py-4 text-gray-400">{user.email}</td>
                        <td className="px-3 py-4 text-gray-400">{new Date(user.date).toLocaleDateString()}</td>
                        <td className="px-3 py-4">
                          <button
                            type="button"
                            onClick={()=>onDelete(user.id ? ["id",user.id] : ["username",user.username])}
                            className="ml-auto flex h-8 w-8 items-center justify-center rounded-sm border border-red-400/40 text-red-400 transition hover:bg-red-400 hover:text-black"
                            aria-label="Delete registration"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-3 md:hidden">
                {registrations.map((user, index) => (
                  <div
                    key={user.id || index}
                    className="rounded-sm border border-white/10 bg-white/5 p-4 font-mono"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-white">{user.fullname}</p>
                        <p className="mt-1 text-xs text-cyan-300">@{user.username}</p>
                      </div>
                      <button
                        type="button"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-red-400/40 text-red-400 transition hover:bg-red-400 hover:text-black"
                        aria-label="Delete registration"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                      {user.number && <p className="flex justify-between gap-4">
                        <span className="text-gray-500">Number</span>
                        <span className="text-right text-gray-300">{user.number}</span>
                      </p>}

                      {user.email && <p className="flex justify-between gap-4">
                        <span className="text-gray-500">Email</span>
                        <span className="break-all text-right text-gray-300">
                          {user.email}
                        </span>
                      </p>}

                      {user.date && <p className="flex justify-between gap-4">
                        <span className="text-gray-500">Date</span>
                        <span className="text-right text-gray-300">{new Date(user.date).toLocaleDateString()}</span>
                      </p>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegistrationsModal;
