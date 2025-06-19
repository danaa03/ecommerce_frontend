import { useEffect, useState } from "react";
import { X } from "lucide-react"; 

export default function VerifyEmailAlert({ show, onClose, title = "Notice", message = "Something happened.", duration = 6000}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(show);
    if (show) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, onClose, duration]);

  return (
    <div
      className={`fixed top-7 right-6 z-50 transition-transform transition-opacity duration-500 ease-in-out transform ${
      visible ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-purple-100 border border-purple-300 text-purple-800 rounded-xl shadow-lg px-6 py-4 w-80 flex items-start gap-3">
        <div>
          <h4 className="font-bold text-md mb-1">{title}</h4>
          <p className="text-sm leading-tight">
            {/* Please check your inbox and click the verification link before logging in. */}
            {message}
          </p>
        </div>
        <button onClick={() => {setVisible(false); onClose?.();}} className="mt-1">
          <X size={18} className="text-purple-600 hover:text-purple-800" />
        </button>
      </div>
    </div>
  );
}
