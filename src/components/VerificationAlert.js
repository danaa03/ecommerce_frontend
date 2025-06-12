import { useEffect, useState } from "react";
import { X } from "lucide-react"; 

export default function VerifyEmailAlert({ show, onClose }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed top-7 right-6 z-50 transition-transform duration-500 ease-in-out transform ${
        visible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="bg-purple-100 border border-purple-300 text-purple-800 rounded-xl shadow-lg px-6 py-4 w-80 flex items-start gap-3">
        <div>
          <h4 className="font-bold text-md mb-1">Verify Your Email</h4>
          <p className="text-sm leading-tight">
            Please check your inbox and click the verification link before logging in.
          </p>
        </div>
        <button onClick={() => setVisible(false)} className="mt-1">
          <X size={18} className="text-purple-600 hover:text-purple-800" />
        </button>
      </div>
    </div>
  );
}
