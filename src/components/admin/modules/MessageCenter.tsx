import { useState } from "react";
import { Trash2, Mail, MailOpen } from "lucide-react";
import { useContactMessages, markMessageAsRead, deleteContactMessage } from "@/hooks/useContactMessages";

export default function MessageCenter() {
  const { messages, loading } = useContactMessages();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleMarkAsRead = async (id: string) => {
    const success = await markMessageAsRead(id);
    if (success) {
      window.location.reload();
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الرسالة؟")) return;
    const success = await deleteContactMessage(id);
    if (success) {
      window.location.reload();
    }
  };

  const selectedMessage = messages.find((m) => m.id === selectedId);

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">الرسائل الواردة</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
            {loading ? (
              <div className="p-4 text-center text-muted-foreground">جاري التحميل...</div>
            ) : messages.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">لا توجد رسائل</div>
            ) : (
              <div className="divide-y divide-border max-h-96 overflow-y-auto">
                {messages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => setSelectedId(message.id)}
                    className={`w-full text-right p-4 transition-colors hover:bg-primary/5 ${
                      selectedId === message.id ? "bg-primary/10 border-r-2 border-primary" : ""
                    } ${!message.is_read ? "font-semibold" : ""}`}
                  >
                    <div className="flex items-center gap-2">
                      {!message.is_read ? (
                        <Mail className="size-4 text-primary shrink-0" />
                      ) : (
                        <MailOpen className="size-4 text-muted-foreground shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate">{message.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{message.email}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Details */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-1">الاسم</label>
                  <p className="text-foreground">{selectedMessage.name}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-1">البريد الإلكتروني</label>
                    <p className="text-sm text-foreground break-all" dir="ltr">
                      {selectedMessage.email}
                    </p>
                  </div>
                  {selectedMessage.phone && (
                    <div>
                      <label className="text-sm font-semibold text-foreground block mb-1">رقم الهاتف</label>
                      <p className="text-sm text-foreground" dir="ltr">
                        {selectedMessage.phone}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground block mb-1">التاريخ</label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedMessage.created_at).toLocaleDateString("ar-SA", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">الرسالة</label>
                  <div className="bg-background border border-border rounded-lg p-4 text-sm text-foreground whitespace-pre-wrap break-words">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  {!selectedMessage.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(selectedMessage.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-semibold text-sm"
                    >
                      <MailOpen className="size-4" />
                      تحديد كمقروءة
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleDelete(selectedMessage.id);
                      setSelectedId(null);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors font-semibold text-sm"
                  >
                    <Trash2 className="size-4" />
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-soft">
              <p className="text-muted-foreground">اختر رسالة لعرض تفاصيلها</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
