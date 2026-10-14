import React,{ createContext, useCallback, useContext, useEffect, useState } from "react";

const ToastContext = createContext(null);

const toastStyles = {
	success: "border-emerald-200 bg-emerald-50 text-emerald-800",
	error: "border-red-200 bg-red-50 text-red-800",
	info: "border-zinc-200 bg-white text-zinc-800",
};

const Toast = ({ toast, onClose }) => {
	useEffect(() => {
		const timeoutId = window.setTimeout(onClose, toast.duration);
		return () => window.clearTimeout(timeoutId);
	}, [onClose, toast.duration]);

	return (
		<div
			role="status"
			className={`pointer-events-auto flex min-w-[280px] items-start justify-between gap-5 border px-4 py-3 text-sm shadow-lg ${toastStyles[toast.type] || toastStyles.info}`}
		>
			<span>{toast.message}</span>
			<button type="button" onClick={onClose} aria-label="Close notification" className="font-semibold opacity-60 hover:opacity-100">
				×
			</button>
		</div>
	);
};

export const ToastProvider = ({ children }) => {
	const [toasts, setToasts] = useState([]);

	const removeToast = useCallback((id) => {
		setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
	}, []);

	const showToast = useCallback((message, type = "info", duration = 3500) => {
		const id = `${Date.now()}-${Math.random()}`;
		setToasts((currentToasts) => [...currentToasts, { id, message, type, duration }]);
		return id;
	}, []);

	return (
		<ToastContext.Provider value={{ showToast, removeToast }}>
			{children}
			<div className="pointer-events-none fixed right-4 top-4 z-[100] flex flex-col gap-3">
				{toasts.map((toast) => (
					<Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
				))}
			</div>
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) throw new Error("useToast must be used inside ToastProvider");
	return context;
};
