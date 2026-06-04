import heroCommunity from "@/assets/hero-community.jpg";
import workshop from "@/assets/workshop.jpg";
import initiative from "@/assets/initiative.jpg";
import youth from "@/assets/youth.jpg";

// All mock data is shaped to match a future Supabase / CMS schema so it
// can be swapped to a server function or query without UI changes.

export type CategorySlug =
  | "khuta-center"
  | "ajialuna"
  | "workshops"
  | "initiatives"
  | "events"
  | "news";

export type Category = {
  slug: CategorySlug;
  title: string;
  description: string;
  icon: string;
};

export const categories: Category[] = [
  {
    slug: "khuta-center",
    title: "مركز خطى",
    description:
      "مركز متكامل يقدّم خدمات الإرشاد والتأهيل والدعم النفسي والاجتماعي لأفراد المجتمع.",
    icon: "🏛️",
  },
  {
    slug: "ajialuna",
    title: "أجيالنا",
    description:
      "برنامج تربوي وتنموي يستهدف الأطفال والناشئة لبناء جيل واعٍ ومسؤول.",
    icon: "🌱",
  },
  {
    slug: "workshops",
    title: "ورشات تدريبية",
    description:
      "ورشات نوعية في تطوير الذات والمهارات المهنية والريادة لجميع الفئات.",
    icon: "🎓",
  },
  {
    slug: "initiatives",
    title: "مبادرات",
    description:
      "مبادرات مجتمعية تطوعية تعالج قضايا واقعية وتُحدث أثرًا ملموسًا.",
    icon: "🤝",
  },
  {
    slug: "events",
    title: "فعاليات",
    description:
      "فعاليات وملتقيات دورية تجمع المتطوعين والشركاء والمستفيدين.",
    icon: "🎪",
  },
  {
    slug: "news",
    title: "أخبار الجمعية",
    description: "آخر الأخبار والإعلانات والمستجدات الرسمية من جمعية خطى الأمان.",
    icon: "📰",
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: CategorySlug;
  date: string;
  author: string;
  image: string;
  featured?: boolean;
};

export const posts: Post[] = [
  {
    slug: "iftitah-markaz-khuta",
    title: "افتتاح مركز خطى لخدمة المجتمع في حلّته الجديدة",
    excerpt:
      "بحضور عدد من الشخصيات الرسمية والاعتبارية، افتتحت الجمعية مركز خطى بعد عملية تطوير شاملة لتقديم خدمات أوسع وأشمل.",
    content:
      "افتتحت جمعية خطى الأمان مركزها المجتمعي في حلّته الجديدة بعد عملية تطوير استمرّت لعدة أشهر، ويهدف المركز إلى تقديم خدمات الإرشاد الأسري والدعم النفسي والتأهيل المهني تحت سقفٍ واحد. وأكد رئيس الجمعية أن هذه الخطوة تأتي ضمن خطة استراتيجية لتوسيع رقعة المستفيدين ورفع جودة الخدمات المقدّمة.",
    category: "khuta-center",
    date: "2025-03-12",
    author: "إدارة الإعلام",
    image: heroCommunity,
    featured: true,
  },
  {
    slug: "warshat-rayadat-amal",
    title: "ورشة \"رياديات أمل\" تختتم أعمالها بمشاركة ٤٠ سيدة",
    excerpt:
      "اختتمت الجمعية ورشة تدريبية متخصصة في ريادة الأعمال للسيدات بمشاركة فاعلة وحضور ملهم.",
    content:
      "نظّمت الجمعية ورشة \"رياديات أمل\" على مدار خمسة أيام، وتناولت محاور بناء النموذج التجاري، والتسويق الرقمي، وإدارة المشاريع الصغيرة. وتميزت الورشة بتقديم استشارات فردية لكل مشاركة، وإطلاق مجموعة دعم مستمرة بعد الورشة.",
    category: "workshops",
    date: "2025-02-28",
    author: "قسم التدريب",
    image: workshop,
  },
  {
    slug: "mubadarat-ahyaa-akhdar",
    title: "إطلاق مبادرة \"أحياء خضراء\" لتشجير الأحياء السكنية",
    excerpt:
      "أطلقت الجمعية مبادرة بيئية لزراعة أكثر من ١٢٠٠ شجرة في خمسة أحياء سكنية بمشاركة المتطوعين والأهالي.",
    content:
      "ضمن جهودها لتعزيز الوعي البيئي، أطلقت الجمعية مبادرة \"أحياء خضراء\" بالشراكة مع البلديات المحلية. وشارك في المرحلة الأولى أكثر من ٢٠٠ متطوع نجحوا في زراعة ١٢٠٠ شجرة في خمسة أحياء، مع وضع خطة للمتابعة والرعاية.",
    category: "initiatives",
    date: "2025-02-15",
    author: "فريق المبادرات",
    image: initiative,
    featured: true,
  },
  {
    slug: "barnamaj-ajialuna-sayfi",
    title: "انطلاق البرنامج الصيفي \"أجيالنا\" للأطفال والناشئة",
    excerpt:
      "ينطلق البرنامج الصيفي بمشاركة ٣٠٠ طفل وناشئ في أنشطة تعليمية وترفيهية وتطوّعية.",
    content:
      "يُقام البرنامج على مدار ستة أسابيع ويتضمّن مسارات في القراءة، والتفكير الإبداعي، والمهارات الحياتية، والأنشطة الرياضية، إضافةً إلى رحلات ميدانية وزيارات تثقيفية. ويشرف على البرنامج فريق من المختصين والمتطوعين المدرَّبين.",
    category: "ajialuna",
    date: "2025-06-01",
    author: "برنامج أجيالنا",
    image: youth,
  },
  {
    slug: "multaqa-mutatawiin",
    title: "ملتقى المتطوعين السنوي يجمع أكثر من ١٥٠ متطوعًا",
    excerpt:
      "احتفت الجمعية بمتطوعيها في ملتقى سنوي شمل ورشًا تفاعلية وتكريمًا للمتميزين.",
    content:
      "أقامت الجمعية ملتقاها السنوي للمتطوعين الذي يهدف إلى بناء روح الفريق وتطوير القدرات وتكريم المتطوعين المتميّزين خلال العام. وتخلّل الملتقى ورش عمل في القيادة، والعمل التطوعي الفعّال، وعرض إنجازات المبادرات.",
    category: "events",
    date: "2025-01-20",
    author: "إدارة المتطوعين",
    image: initiative,
  },
  {
    slug: "hamla-tawiya-saha-nafsia",
    title: "حملة توعوية حول الصحة النفسية لطلبة المدارس",
    excerpt:
      "أطلقت الجمعية حملة توعوية بالتعاون مع وزارة التربية لاستهداف طلبة المرحلة الثانوية.",
    content:
      "تستهدف الحملة طلبة المدارس الثانوية في عشر مدارس، وتقدّم جلسات تفاعلية في إدارة الضغوط، والمرونة النفسية، والتعامل مع القلق، إضافة إلى توفير قنوات استشارة آمنة وسرية.",
    category: "news",
    date: "2024-12-10",
    author: "إدارة الإعلام",
    image: youth,
  },
  {
    slug: "qisat-najah-aisha",
    title: "قصة نجاح: عائشة من مستفيدة إلى مدرّبة",
    excerpt:
      "كيف غيّر برنامج \"رياديات أمل\" حياة عائشة وحوّلها إلى صاحبة مشروع ومدرّبة لنساء أخريات.",
    content:
      "بدأت رحلة عائشة كمستفيدة من ورشة \"رياديات أمل\" قبل عامين، واليوم تمتلك مشروعها الخاص في صناعة المنتجات الغذائية الصحية، وتشارك خبرتها كمدرّبة في الورشات اللاحقة. قصتها واحدة من عشرات قصص النجاح التي ترعاها الجمعية.",
    category: "initiatives",
    date: "2024-11-22",
    author: "إدارة الإعلام",
    image: workshop,
  },
  {
    slug: "sharaka-jamiia",
    title: "توقيع شراكة استراتيجية مع جامعة محلية لدعم الشباب",
    excerpt:
      "وقّعت الجمعية اتفاقية تعاون مع جامعة محلية لتطوير برامج تدريب الشباب وفرص التدريب الميداني.",
    content:
      "تنصّ الاتفاقية على تطوير برامج مشتركة في القيادة وريادة الأعمال، وتوفير فرص تدريب ميداني لطلبة الجامعة في مشاريع الجمعية، إضافة إلى تبادل الخبرات بين الفرق البحثية والتنفيذية.",
    category: "news",
    date: "2024-10-05",
    author: "إدارة الشراكات",
    image: heroCommunity,
  },
];

export const stats = [
  { label: "المستفيدون", value: "+12,500" },
  { label: "الورشات التدريبية", value: "+340" },
  { label: "المبادرات المنفّذة", value: "+85" },
  { label: "المتطوعون النشطون", value: "+620" },
];

export const programs = [
  {
    title: "مركز خطى للإرشاد والتأهيل",
    description:
      "خدمات إرشادية وتأهيلية متكاملة للأسرة والفرد بإشراف نخبة من المختصين.",
    image: heroCommunity,
    slug: "khuta-center",
  },
  {
    title: "برنامج أجيالنا",
    description:
      "برنامج تربوي طويل المدى يستهدف الأطفال والناشئة ببرامج صيفية وأسبوعية.",
    image: youth,
    slug: "ajialuna",
  },
  {
    title: "أكاديمية الورشات التدريبية",
    description:
      "منصّة تدريبية تقدّم ورشًا نوعية في تطوير الذات وريادة الأعمال والمهارات.",
    image: workshop,
    slug: "workshops",
  },
  {
    title: "مبادرات الأثر المجتمعي",
    description:
      "مبادرات تطوعية بيئية وإنسانية تنفّذها الجمعية بشراكة المجتمع المحلي.",
    image: initiative,
    slug: "initiatives",
  },
];

export const partners = [
  "وزارة التنمية الاجتماعية",
  "البلدية المحلية",
  "الغرفة التجارية",
  "صندوق التنمية",
  "جامعة الوطن",
  "هيئة الشباب",
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getPostsByCategory(slug: CategorySlug): Post[] {
  return posts.filter((p) => p.category === slug);
}

export function formatArabicDate(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}