import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { updateSiteSetting } from "@/hooks/useSiteSettings";

const SETTINGS_KEYS = [
  { key: "charity_name", label: "اسم الجمعية" },
  { key: "phone_number", label: "رقم الهاتف" },
  { key: "location_address", label: "العنوان" },
  { key: "email", label: "البريد الإلكتروني" },
  { key: "working_hours", label: "ساعات العمل" },
  { key: "donation_link", label: "رابط التبرع" },
  { key: "about_us_text", label: "نص عن الجمعية" },
];

export default function SiteSettingsModule() {
  const { settings, loading } = useSiteSettings();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    let allSuccess = true;

    for (const key of SETTINGS_KEYS.map((s) => s.key)) {
      const success = await updateSiteSetting(key, formData[key] || "");
      if (!success) allSuccess = false;
    }

    setSaving(false);
    if (allSuccess) {
      alert("تم حفظ الإعدادات بنجاح!");
    } else {
      alert("حدث خطأ أثناء حفظ بعض الإعدادات.");
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">جاري التحميل...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">إعدادات الموقع</h2>

      <div className="grid lg:grid-cols-2 gap-6 max-w-4xl">
        {SETTINGS_KEYS.map((setting) => (
          <div key={setting.key} className="bg-card border border-border rounded-2xl p-6 shadow-soft">
            <label className="text-sm font-semibold text-foreground block mb-2">{setting.label}</label>
            {setting.key === "about_us_text" ? (
              <textarea
                value={formData[setting.key] || ""}
                onChange={(e) => setFormData({ ...formData, [setting.key]: e.target.value })}
                disabled={saving}
                rows={4}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 resize-none"
              />
            ) : (
              <input
                type={setting.key === "email" || setting.key === "donation_link" ? "url" : "text"}
                value={formData[setting.key] || ""}
                onChange={(e) => setFormData({ ...formData, [setting.key]: e.target.value })}
                disabled={saving}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                dir={["email", "donation_link", "phone_number"].includes(setting.key) ? "ltr" : "rtl"}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-deep text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50"
        >
          <Save className="size-4" />
          {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
        </button>
      </div>
    </div>
  );
}
