import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Newspaper, Settings, MessageSquare, LogOut } from "lucide-react";
import NewsManagement from "./modules/NewsManagement";
import SiteSettingsModule from "./modules/SiteSettingsModule";
import MessageCenter from "./modules/MessageCenter";

type TabType = "news" | "settings" | "messages";

export default function AdminDashboard({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState<TabType>("news");

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="container-narrow flex items-center justify-between py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">لوحة التحكم</h1>
            <p className="text-sm text-muted-foreground mt-1">مرحبا، {user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-700 hover:bg-red-500/20 transition-colors text-sm font-semibold"
          >
            <LogOut className="size-4" />
            تسجيل الخروج
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-card border-b border-border">
        <div className="container-narrow flex gap-0">
          {[
            { id: "news" as TabType, label: "إدارة الأخبار", icon: Newspaper },
            { id: "settings" as TabType, label: "إعدادات الموقع", icon: Settings },
            { id: "messages" as TabType, label: "الرسائل الواردة", icon: MessageSquare },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors font-semibold text-sm ${
                activeTab === id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="container-narrow py-8">
        {activeTab === "news" && <NewsManagement />}
        {activeTab === "settings" && <SiteSettingsModule />}
        {activeTab === "messages" && <MessageCenter />}
      </main>
    </div>
  );
}
