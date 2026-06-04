import { useState } from "react";
import { Trash2, Edit2, Plus } from "lucide-react";
import { useNewsPosts, createNewsPost, updateNewsPost, deleteNewsPost } from "@/hooks/useNewsPosts";

export default function NewsManagement() {
  const { posts, loading } = useNewsPosts();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "", image_url: "" });
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setFormData({ title: "", content: "", image_url: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (post: any) => {
    setFormData({ title: post.title, content: post.content, image_url: post.image_url || "" });
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      alert("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    setSaving(true);
    const success = editingId
      ? await updateNewsPost(editingId, formData.title, formData.content, formData.image_url)
      : await createNewsPost(formData.title, formData.content, formData.image_url);

    setSaving(false);
    if (success) {
      resetForm();
      window.location.reload();
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الخبر؟")) return;
    const success = await deleteNewsPost(id);
    if (success) {
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">إدارة الأخبار</h2>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-deep text-primary-foreground px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
        >
          <Plus className="size-4" />
          {showForm ? "إلغاء" : "إضافة خبر جديد"}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-card border border-border rounded-2xl p-6 shadow-soft">
          <h3 className="text-lg font-bold text-foreground mb-4">
            {editingId ? "تعديل الخبر" : "إضافة خبر جديد"}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-1.5">العنوان</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={saving}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground block mb-1.5">المحتوى</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                disabled={saving}
                rows={6}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 resize-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground block mb-1.5">رابط الصورة (اختياري)</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                disabled={saving}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                dir="ltr"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary hover:bg-primary-deep text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50"
            >
              {saving ? "جاري الحفظ..." : "حفظ"}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">جاري التحميل...</div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">لا توجد أخبار</div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{post.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString("ar-SA")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                  >
                    <Edit2 className="size-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
