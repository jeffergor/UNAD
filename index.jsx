import { useState } from "react";
import { Home, FileText, Database, Settings } from "lucide-react";

export default function DocumentDashboard() {
  const [message, setMessage] = useState("");

  const documents = [
    { title: "Quarterly Sales Report", type: "PDF" },
    { title: "Project Plan", type: "DOCX" },
    { title: "Invoice #12345", type: "PDF" },
    { title: "Presentation Slides", type: "PPTX" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-10">Document Automation<br />& Management</h1>
        <nav className="space-y-6 text-gray-700">
          <div className="flex items-center space-x-3">
            <Home size={20} />
            <span>Home</span>
          </div>
          <div className="flex items-center space-x-3">
            <FileText size={20} />
            <span>Documents</span>
          </div>
          <div className="flex items-center space-x-3">
            <Database size={20} />
            <span>Database</span>
          </div>
          <div className="flex items-center space-x-3">
            <Settings size={20} />
            <span>Automation</span>
          </div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        {/* Chatbot */}
        <div className="bg-blue-100 p-6 rounded-2xl mb-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-blue-500 text-white rounded-full p-3">
              🤖
            </div>
            <div className="text-lg font-medium">How can I assist you today?</div>
          </div>
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-3 rounded-l-2xl bg-white outline-none"
            />
            <button className="bg-blue-500 text-white p-3 rounded-r-2xl">
              ➔
            </button>
          </div>
        </div>

        {/* Documents Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Documents</h2>
            <div className="flex space-x-3">
              <button className="bg-gray-200 p-2 rounded-xl text-sm">Type</button>
              <button className="bg-gray-200 p-2 rounded-xl text-sm">Date</button>
              <button className="bg-gray-200 p-2 rounded-xl text-sm">Category</button>
            </div>
          </div>

          <div className="space-y-4">
            {documents.map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-200 p-3 rounded-full">
                    📄
                  </div>
                  <div>
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-sm text-gray-500">{doc.type}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-500">🔍</button>
                  <button className="text-gray-500">⬇️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
