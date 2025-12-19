export default function Help() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>
      <p className="text-slate-400 mb-8">
        Find answers to common questions or contact support.
      </p>

      <div className="space-y-4">
        {[
          "How do I reset my password?",
          "How can I upgrade my plan?",
          "How do I contact support?",
        ].map((question, index) => (
          <div key={index} className="bg-slate-900 p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">{question}</h3>
            <p className="text-slate-400 text-sm">
              This is a placeholder answer. You can replace this with real FAQ
              content or connect it to a backend later.
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
