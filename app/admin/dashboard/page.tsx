"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FaPlus, FaEdit, FaTrash, FaEye, FaUserShield, FaUserLock, FaUserCheck, FaSignOutAlt, FaKey, FaUserEdit, FaFileCsv, FaUsers, FaProjectDiagram, FaHistory } from 'react-icons/fa';

const ProjectForm = dynamic(() => import("../../../components/ProjectForm"), { ssr: false });

interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const router = useRouter();

  // Admin info from localStorage
  const [admin, setAdmin] = useState<{ name: string; email: string } | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [userCount, setUserCount] = useState<number | null>(null);

  const [users, setUsers] = useState<any[]>([]);

  const [detailsProject, setDetailsProject] = useState<Project | null>(null);

  const [activityLogs, setActivityLogs] = useState<any[]>([]);

  const [projectStats, setProjectStats] = useState<any[]>([]);

  const [userStats, setUserStats] = useState<any[]>([]);

  const [adminLoginLogs, setAdminLoginLogs] = useState<any[]>([]);

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("isAdmin") !== "true") {
      router.push("/admin/login");
    } else {
      fetchProjects();
      // Get admin info
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user.role === "admin") setAdmin({ name: user.name, email: user.email });
        } catch {}
      }
      // Fetch user count for analytics
      fetch("/api/admin-stats").then(res => res.json()).then(data => {
        setUserCount(data.userCount);
      });
      fetchUsers();
      fetchActivityLogs();
      fetchProjectStats();
      fetchUserStats();
      fetchAdminLoginLogs();
    }
    // eslint-disable-next-line
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/admin-users");
    const data = await res.json();
    setUsers(data.users);
  };

  const fetchActivityLogs = async () => {
    const res = await fetch("/api/admin-activity");
    const data = await res.json();
    setActivityLogs(data.logs);
  };

  const fetchProjectStats = async () => {
    const res = await fetch("/api/admin-project-stats");
    const data = await res.json();
    setProjectStats(data.stats);
  };

  const fetchUserStats = async () => {
    const res = await fetch("/api/admin-user-stats");
    const data = await res.json();
    setUserStats(data.stats);
  };

  const fetchAdminLoginLogs = async () => {
    const res = await fetch('/api/admin-login-log');
    const data = await res.json();
    setAdminLoginLogs(data.data || []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      setToast({ type: "success", message: "Project deleted successfully!" });
      fetchProjects();
      logActivity("Delete Project", id);
    } else {
      setToast({ type: "error", message: "Failed to delete project." });
    }
  };

  const handleAdd = () => {
    setEditProject(null);
    setModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditProject(project);
    setModalOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    setFormLoading(true);
    let res;
    if (editProject) {
      res = await fetch(`/api/projects/${editProject._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setFormLoading(false);
    setModalOpen(false);
    if (res.ok) {
      setToast({ type: "success", message: editProject ? "Project updated!" : "Project added!" });
      fetchProjects();
      logActivity(editProject ? "Edit Project" : "Add Project", data.title);
    } else {
      setToast({ type: "error", message: "Failed to save project." });
    }
  };

  // User delete handler
  const handleUserDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    const res = await fetch(`/api/admin-users/${id}`, { method: "DELETE" });
    if (res.status === 204) {
      setToast({ type: "success", message: "User deleted successfully!" });
      fetchUsers();
      logActivity("Delete User", id);
    } else {
      const data = await res.json();
      setToast({ type: "error", message: data.error || "Failed to delete user." });
    }
  };

  // User role change handler
  const handleUserRoleChange = async (id: string, newRole: string) => {
    const res = await fetch(`/api/admin-users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    if (res.ok) {
      setToast({ type: "success", message: "User role updated!" });
      fetchUsers();
      logActivity("Change User Role", `${id} → ${newRole}`);
    } else {
      const data = await res.json();
      setToast({ type: "error", message: data.error || "Failed to update role." });
    }
  };

  // User block/unblock handler
  const handleUserBlock = async (id: string, blocked: boolean) => {
    const res = await fetch(`/api/admin-users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocked }),
    });
    if (res.ok) {
      setToast({ type: "success", message: blocked ? "User blocked!" : "User unblocked!" });
      fetchUsers();
      logActivity(blocked ? "Block User" : "Unblock User", id);
    } else {
      const data = await res.json();
      setToast({ type: "error", message: data.error || "Failed to update user." });
    }
  };

  // Toast auto-hide
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");
    router.push("/admin/login");
  };

  // Filtered and paginated projects
  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProjects.length / perPage);
  const paginatedProjects = filteredProjects.slice((page - 1) * perPage, page * perPage);

  // Helper: log activity
  const logActivity = async (action: string, target: string) => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return;
    const user = JSON.parse(userStr);
    await fetch("/api/admin-activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, user: { name: user.name, email: user.email, role: user.role }, target }),
    });
    fetchActivityLogs();
  };

  // Export Projects as CSV
  const exportProjectsCSV = () => {
    const headers = ["Title", "Description", "Image URL", "Link"];
    const rows = projects.map(p => [p.title, p.description, p.imageUrl, p.link]);
    let csv = headers.join(",") + "\n" + rows.map(r => r.map(x => '"' + (x || '') + '"').join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "projects.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export Users as CSV
  const exportUsersCSV = () => {
    const headers = ["Name", "Email", "Role", "Blocked"];
    const rows = users.map(u => [u.name, u.email, u.role, u.blocked ? "Yes" : "No"]);
    let csv = headers.join(",") + "\n" + rows.map(r => r.map(x => '"' + (x || '') + '"').join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setToast({ type: 'error', message: 'All fields are required.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setToast({ type: 'error', message: 'Passwords do not match.' });
      return;
    }
    setPasswordLoading(true);
    const res = await fetch('/api/admin-change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: admin?.email, oldPassword, newPassword }),
    });
    setPasswordLoading(false);
    const data = await res.json();
    if (res.ok) {
      setToast({ type: 'success', message: 'Password changed successfully!' });
      setPasswordModalOpen(false);
      setOldPassword(""); setNewPassword(""); setConfirmPassword("");
    } else {
      setToast({ type: 'error', message: data.message || 'Failed to change password.' });
    }
  };

  const openProfileModal = () => {
    setProfileName(admin?.name || "");
    setProfileEmail(admin?.email || "");
    setProfileModalOpen(true);
  };

  const handleProfileUpdate = async () => {
    if (!profileName || !profileEmail) {
      setToast({ type: 'error', message: 'All fields are required.' });
      return;
    }
    setProfileLoading(true);
    const res = await fetch('/api/admin-update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: admin?.email, newName: profileName, newEmail: profileEmail }),
    });
    setProfileLoading(false);
    const data = await res.json();
    if (res.ok) {
      setToast({ type: 'success', message: 'Profile updated!' });
      setProfileModalOpen(false);
      setAdmin({ name: data.user.name, email: data.user.email });
      if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          user.name = data.user.name;
          user.email = data.user.email;
          localStorage.setItem('user', JSON.stringify(user));
        }
      }
    } else {
      setToast({ type: 'error', message: data.message || 'Failed to update profile.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg font-semibold text-white ${toast.type === "success" ? "bg-emerald-600" : "bg-red-600"}`}>
          {toast.message}
        </div>
      )}
      <div className="max-w-4xl mx-auto bg-gray-800 rounded shadow p-6">
        {/* Projects per Month Bar Chart */}
        <div className="mb-8 border-b border-gray-700 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <FaProjectDiagram className="text-emerald-600" />
            <h2 className="text-lg font-bold">Projects per Month (last 12 months)</h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={projectStats} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" fontSize={12} />
              <YAxis allowDecimals={false} fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" fill="#059669" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Users per Month Bar Chart */}
        <div className="mb-8 border-b border-gray-700 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <FaUsers className="text-blue-600" />
            <h2 className="text-lg font-bold">Users per Month (last 12 months)</h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={userStats} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" fontSize={12} />
              <YAxis allowDecimals={false} fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Analytics Cards */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-emerald-900 border border-emerald-700 rounded-lg p-4 flex flex-col items-center shadow-sm">
            <div className="text-3xl font-bold text-emerald-300">{projects.length}</div>
            <div className="text-emerald-100 font-medium">Total Projects</div>
          </div>
          <div className="flex-1 bg-blue-900 border border-blue-700 rounded-lg p-4 flex flex-col items-center shadow-sm">
            <div className="text-3xl font-bold text-blue-300">{userCount !== null ? userCount : "-"}</div>
            <div className="text-blue-100 font-medium">Total Users</div>
          </div>
        </div>
        {/* Admin Profile & Logout */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><FaUserShield className="text-emerald-600" /> Admin Dashboard</h1>
            {admin && (
              <div className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                <span className="font-semibold">{admin.name}</span> &bull; {admin.email}
                <button onClick={openProfileModal} className="ml-2 text-blue-600 underline text-xs flex items-center gap-1" aria-label="Edit Profile"><FaUserEdit /> Edit Profile</button>
                <button onClick={() => setPasswordModalOpen(true)} className="ml-2 text-blue-600 underline text-xs flex items-center gap-1" aria-label="Change Password"><FaKey /> Change Password</button>
              </div>
            )}
          </div>
          <button onClick={handleLogout} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 font-semibold flex items-center gap-2" aria-label="Logout"><FaSignOutAlt /> Logout</button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2" aria-label="Add Project"><FaPlus /> Add Project</button>
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="border border-emerald-200 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full md:w-64"
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <div></div>
          <button onClick={exportProjectsCSV} className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 text-sm font-semibold flex items-center gap-2" aria-label="Export Projects CSV"><FaFileCsv /> Export Projects CSV</button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-8"><svg className="animate-spin h-6 w-6 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg></div>
        ) : (
          paginatedProjects.length === 0 ? (
            <div className="text-center text-gray-400 py-8">No projects found.</div>
          ) : (
          <>
            <table className="min-w-full table-auto border rounded overflow-hidden">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-white">Image</th>
                  <th className="px-4 py-2 text-white">Title</th>
                  <th className="px-4 py-2 text-white">Description</th>
                  <th className="px-4 py-2 text-white">Link</th>
                  <th className="px-4 py-2 text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProjects.map((project, idx) => (
                  <tr key={project._id} className={(idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800") + " border-t hover:bg-emerald-900 transition"}>
                    <td className="px-4 py-2">
                      <img src={project.imageUrl} alt={project.title} className="w-16 h-16 object-cover rounded" />
                    </td>
                    <td className="px-4 py-2">
                      <button onClick={() => setDetailsProject(project)} className="text-emerald-300 font-semibold underline hover:text-emerald-100" aria-label="View Project Details">
                        {project.title}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-gray-100">{project.description}</td>
                    <td className="px-4 py-2">
                      <a href={project.link} className="text-blue-300 underline" target="_blank" rel="noopener noreferrer">Visit</a>
                    </td>
                    <td className="px-4 py-2 space-x-2 flex items-center">
                      <button onClick={() => setDetailsProject(project)} className="bg-emerald-600 text-white px-2 py-1 rounded flex items-center gap-1 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-400" aria-label="View"><FaEye /></button>
                      <button onClick={() => handleEdit(project)} className="bg-yellow-500 text-white px-2 py-1 rounded flex items-center gap-1 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400" aria-label="Edit"><FaEdit /></button>
                      <button onClick={() => handleDelete(project._id)} className="bg-red-600 text-white px-2 py-1 rounded flex items-center gap-1 hover:bg-red-700 focus:ring-2 focus:ring-red-400" aria-label="Delete"><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50 focus:ring-2 focus:ring-gray-400"
                >
                  Prev
                </button>
                <span className="font-medium">Page {page} of {totalPages}</span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50 focus:ring-2 focus:ring-gray-400"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ))}
        {/* Project Details Modal */}
        {detailsProject && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
              <button onClick={() => setDetailsProject(null)} className="absolute top-2 right-2 text-gray-500">✕</button>
              <img src={detailsProject.imageUrl} alt={detailsProject.title} className="w-full h-48 object-cover rounded mb-4" />
              <h2 className="text-2xl font-bold mb-2">{detailsProject.title}</h2>
              <p className="mb-3 text-gray-700">{detailsProject.description}</p>
              <a href={detailsProject.link} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Visit Project</a>
            </div>
          </div>
        )}
        {/* User Management Section */}
        <div className="mt-10 border-t pt-10">
          <div className="flex items-center gap-2 mb-4">
            <FaUsers className="text-blue-600" />
            <h2 className="text-xl font-bold">User Management</h2>
          </div>
          <div className="flex justify-between items-center mb-2">
            <div></div>
            <button onClick={exportUsersCSV} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-semibold flex items-center gap-2" aria-label="Export Users CSV"><FaFileCsv /> Export Users CSV</button>
          </div>
          <table className="min-w-full table-auto border rounded overflow-hidden">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-white">Name</th>
                <th className="px-4 py-2 text-white">Email</th>
                <th className="px-4 py-2 text-white">Role</th>
                <th className="px-4 py-2 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan={4} className="text-center text-gray-400 py-8">No users found.</td></tr>
              ) : users.map((user, idx) => (
                <tr key={user._id} className={(idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800") + " border-t hover:bg-blue-900 transition"}>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{
                    user.role !== "admin" && admin && user.email !== admin.email ? (
                      <select
                        value={user.role}
                        onChange={e => handleUserRoleChange(user._id, e.target.value)}
                        className="border px-2 py-1 rounded text-black"
                        aria-label="Change User Role"
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    ) : (
                      <span>{user.role}</span>
                    )
                  }</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    {user.role !== "admin" ? (
                      <>
                        <button onClick={() => handleUserDelete(user._id)} className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-700 focus:ring-2 focus:ring-red-400" aria-label="Delete User" title="Delete User"><FaTrash /></button>
                        <button
                          onClick={() => handleUserBlock(user._id, !user.blocked)}
                          className={`px-3 py-1 rounded flex items-center gap-1 text-white focus:ring-2 ${user.blocked ? 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-400' : 'bg-gray-400 hover:bg-gray-500 focus:ring-gray-400'}`}
                          aria-label={user.blocked ? 'Unblock User' : 'Block User'}
                          title={user.blocked ? 'Unblock User' : 'Block User'}
                        >
                          {user.blocked ? <FaUserCheck /> : <FaUserLock />}{user.blocked ? 'Unblock' : 'Block'}
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Activity Log Section */}
        <div className="mt-10 border-t pt-10">
          <div className="flex items-center gap-2 mb-4">
            <FaHistory className="text-gray-600" />
            <h2 className="text-xl font-bold">Activity Log</h2>
          </div>
          <table className="min-w-full table-auto text-sm border rounded overflow-hidden">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-white">Action</th>
                <th className="px-4 py-2 text-white">User</th>
                <th className="px-4 py-2 text-white">Target</th>
                <th className="px-4 py-2 text-white">Time</th>
              </tr>
            </thead>
            <tbody>
              {activityLogs.length === 0 ? (
                <tr><td colSpan={4} className="text-center text-gray-400 py-8">No activity logs found.</td></tr>
              ) : activityLogs.map((log, idx) => (
                <tr key={log._id} className={(idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800") + " border-t hover:bg-gray-700 transition"}>
                  <td className="px-4 py-2">{log.action}</td>
                  <td className="px-4 py-2">{log.user?.name} ({log.user?.email})</td>
                  <td className="px-4 py-2">{log.target}</td>
                  <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Admin Login History Section */}
        <div className="mt-10 border-t pt-10">
          <div className="flex items-center gap-2 mb-4">
            <FaHistory className="text-gray-600" />
            <h2 className="text-xl font-bold">Admin Login History</h2>
          </div>
          <table className="min-w-full table-auto text-sm border rounded overflow-hidden">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-white">Email</th>
                <th className="px-4 py-2 text-white">Name</th>
                <th className="px-4 py-2 text-white">IP</th>
                <th className="px-4 py-2 text-white">Time</th>
              </tr>
            </thead>
            <tbody>
              {adminLoginLogs.length === 0 ? (
                <tr><td colSpan={4} className="text-center text-gray-400 py-8">No login history found.</td></tr>
              ) : adminLoginLogs.map((log, idx) => (
                <tr key={log._id} className={(idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800") + " border-t hover:bg-gray-700 transition"}>
                  <td className="px-4 py-2">{log.email}</td>
                  <td className="px-4 py-2">{log.name}</td>
                  <td className="px-4 py-2">{log.ip}</td>
                  <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-2 right-2 text-gray-500">✕</button>
            <h2 className="text-xl font-bold mb-4">{editProject ? "Edit Project" : "Add Project"}</h2>
            <ProjectForm
              initialValues={editProject || {}}
              onSubmit={handleFormSubmit}
              loading={formLoading}
            />
          </div>
        </div>
      )}
      {/* Password Change Modal */}
      {passwordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button onClick={() => setPasswordModalOpen(false)} className="absolute top-2 right-2 text-gray-500">✕</button>
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Old Password</label>
              <input type="password" className="border px-3 py-2 rounded w-full" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">New Password</label>
              <input type="password" className="border px-3 py-2 rounded w-full" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Confirm New Password</label>
              <input type="password" className="border px-3 py-2 rounded w-full" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            <button onClick={handlePasswordChange} disabled={passwordLoading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full font-semibold">
              {passwordLoading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </div>
      )}
      {/* Profile Edit Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button onClick={() => setProfileModalOpen(false)} className="absolute top-2 right-2 text-gray-500">✕</button>
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" className="border px-3 py-2 rounded w-full" value={profileName} onChange={e => setProfileName(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="border px-3 py-2 rounded w-full" value={profileEmail} onChange={e => setProfileEmail(e.target.value)} />
            </div>
            <button
              onClick={handleProfileUpdate}
              disabled={profileLoading || (!profileName || !profileEmail) || (profileName === admin?.name && profileEmail === admin?.email)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full font-semibold disabled:opacity-50"
            >
              {profileLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 