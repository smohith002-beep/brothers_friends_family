"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, Save, CheckCircle2, AlertCircle } from "lucide-react";

interface SettingItem {
  id: string;
  key: string;
  value: string;
  description: string | null;
}

export function AdminSettingsManager({ initialSettings }: { initialSettings: SettingItem[] }) {
  const router = useRouter();
  const [settings, setSettings] = useState<SettingItem[]>(initialSettings);
  const [values, setValues] = useState<Record<string, string>>(
    initialSettings.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {})
  );
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSave = async (key: string) => {
    setSavingKey(key);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: values[key] }),
      });

      const data = await res.json();
      if (res.ok) {
        setFeedback(data.message);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="space-y-6">
      {feedback && (
        <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        {settings.map((s) => (
          <div key={s.key} className="space-y-2 border-b border-slate-800/80 pb-6 last:border-b-0">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400">{s.key}</span>
                {s.description && (
                  <p className="text-[11px] text-slate-400 mt-0.5">{s.description}</p>
                )}
              </div>

              <button
                onClick={() => handleSave(s.key)}
                disabled={savingKey === s.key}
                type="button"
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savingKey === s.key ? "Saving..." : "Save Setting"}</span>
              </button>
            </div>

            <input
              type="text"
              value={values[s.key] ?? s.value}
              onChange={(e) => setValues({ ...values, [s.key]: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

