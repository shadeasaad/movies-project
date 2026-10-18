import { Film, Tv, Search, Star, MessageSquare, Smartphone, ShieldCheck, Code2, HelpCircle, Globe } from "lucide-react";

function Guide() {
  return (
    <div className="w-full min-h-screen pt-24 px-4 sm:px-8 pb-16 transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <div className="max-w-6xl mx-auto text-center py-12 sm:py-20">
        <span 
          className="inline-block text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider"
          style={{ backgroundColor: "var(--card-bg)", color: "var(--primary-color)", border: "1px solid var(--card-border)" }}
        >
          دليل المشروع وتعريف المستخدم
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight">
          منصة الأفلام والمسلسلات الذكية <span style={{ color: "var(--primary-color)" }}>Movie App</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
          وجهتك الأولى لاكتشاف أحدث الأفلام والمسلسلات، تصفح قوائم الرائجة، قراءة التفاصيل الشاملة، والتفاعل عبر إضافة تقييماتك ومراجعاتك بكل سهولة.
        </p>
      </div>

      {/* Tech Stack Badges */}
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6 flex items-center justify-center gap-2">
          <Code2 size={18} style={{ color: "var(--primary-color)" }} />
          التقنيات والأدوات المستخدمة في المشروع
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {["React.js", "Tailwind CSS", "TMDB API", "React Router", "Lucide Icons", "Vercel Deployment", "JavaScript (ES6+)"].map((tech, index) => (
            <span 
              key={index}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-transform hover:scale-105"
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)", color: "var(--text-color)" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Overview / About & Deployment Section */}
      <div className="max-w-5xl mx-auto mb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="p-8 rounded-3xl border shadow-xl flex flex-col justify-between"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <ShieldCheck className="w-7 h-7" style={{ color: "var(--primary-color)" }} />
              فكرة المشروع وهدفه
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              تم تطوير هذا المشروع باستخدام أحدث تقنيات الويب (React و Tailwind CSS) بهدف توفير تجربة تصفح سينمائية متكاملة للمستخدم تشبه المنصات العالمية مع دعم الوضع الداكن والفاتح.
            </p>
          </div>
        </div>

        <div 
          className="p-8 rounded-3xl border shadow-xl flex flex-col justify-between"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Globe className="w-7 h-7" style={{ color: "var(--primary-color)" }} />
              الاستضافة والنشر (Vercel)
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              تم رفع ونشر الموقع بالكامل على منصة <span className="font-bold text-white">Vercel</span> السحابية، مما يضمن أداءً سريعاً جداً (High Performance)، واستقراراً تاماً، وإمكانية الوصول للموقع عبر رابط مباشر من أي مكان وعلى أي جهاز.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Key Features Grid */}
      <div className="max-w-6xl mx-auto mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">أهم مميزات الموقع (Key Features)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div 
            className="p-6 rounded-2xl border transition-transform duration-300 hover:-translate-y-1"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(0, 188, 125, 0.1)", color: "var(--primary-color)" }}>
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">بحث فوري وسريع</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              ابحث عن أي فيلم أو مسلسل، وستظهر النتائج أمامك بشكل فوري ولحظي لتوفير الوقت.
            </p>
          </div>

          {/* Feature 2 */}
          <div 
            className="p-6 rounded-2xl border transition-transform duration-300 hover:-translate-y-1"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(0, 188, 125, 0.1)", color: "var(--primary-color)" }}>
              <Film size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">تصنيفات متنوعة</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              تصفح أقسام الأفلام الرائجة (Trending)، الشائعة (Popular)، وأفلام وقادمة قريباً (Coming Soon).
            </p>
          </div>

          {/* Feature 3 */}
          <div 
            className="p-6 rounded-2xl border transition-transform duration-300 hover:-translate-y-1"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(0, 188, 125, 0.1)", color: "var(--primary-color)" }}>
              <Tv size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">قسم خاص للمسلسلات</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              استمتع باستعراض أفضل المسلسلات التلفزيونية الحاصلة على أعلى التقييمات عالمياً.
            </p>
          </div>

          {/* Feature 4 */}
          <div 
            className="p-6 rounded-2xl border transition-transform duration-300 hover:-translate-y-1"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(0, 188, 125, 0.1)", color: "var(--primary-color)" }}>
              <Star size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">صفحة تفاصيل شاملة</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              اضغط على أي فيلم لمعرفة القصة بالكامل، تاريخ الإصدار، مدة العرض، التقييمات، وأنواع التصنيفات.
            </p>
          </div>

          {/* Feature 5 */}
          <div 
            className="p-6 rounded-2xl border transition-transform duration-300 hover:-translate-y-1"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(0, 188, 125, 0.1)", color: "var(--primary-color)" }}>
              <MessageSquare size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">إضافة وتعديل التقييمات</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              يستطيع المستخدم إضافة رأيه وتقييمه (من 1 إلى 10) على أي فيلم، مع إمكانية تعديل أو حذف تقييمه الخاص.
            </p>
          </div>

          {/* Feature 6 */}
          <div 
            className="p-6 rounded-2xl border transition-transform duration-300 hover:-translate-y-1"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(0, 188, 125, 0.1)", color: "var(--primary-color)" }}>
              <Smartphone size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">تصميم متجاوب (Responsive)</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              يعمل الموقع بكفاءة عالية وبشكل سلس ومتناسق على جميع الأجهزة (الهواتف الذكية، الأجهزة اللوحية، وأجهزة الكمبيوتر).
            </p>
          </div>

        </div>
      </div>

      {/* 4. How to Use Section */}
      <div className="max-w-4xl mx-auto mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">دليل استخدام الموقع (How to Use)</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4 p-5 rounded-2xl border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}>
            <span className="font-bold text-xl" style={{ color: "var(--primary-color)" }}>01</span>
            <div>
              <h4 className="font-bold mb-1">تصفح الصفحة الرئيسية</h4>
              <p className="text-sm text-gray-400">ابدأ بفتح الصفحة الرئيسية لرؤية أحدث الأفلام والمسلسلات الرائجة المتاحة أمامك.</p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}>
            <span className="font-bold text-xl" style={{ color: "var(--primary-color)" }}>02</span>
            <div>
              <h4 className="font-bold mb-1">استخدم شريط البحث</h4>
              <p className="text-sm text-gray-400">اكتب اسم الفيلم المطلوب في خانة البحث لتظهر لك النتائج المطابقة فوراً.</p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}>
            <span className="font-bold text-xl" style={{ color: "var(--primary-color)" }}>03</span>
            <div>
              <h4 className="font-bold mb-1">عرض التفاصيل والتعليقات</h4>
              <p className="text-sm text-gray-400">انقر على أي فيلم لعرض قصته بالكامل، تفاصيل الممثلين، وقراءة أو كتابة تقييمك الخاص.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
          <HelpCircle size={28} style={{ color: "var(--primary-color)" }} />
          الأسئلة الشائعة (FAQ)
        </h2>
        
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}>
            <h4 className="font-bold mb-2 text-base">س: من أين يتم جلب بيانات الأفلام والمسلسلات؟</h4>
            <p className="text-sm text-gray-400">ج: يتم جلب البيانات مباشرة وبشكل حي ومحدث من قاعدة بيانات الأفلام العالمية عبر (TMDB API).</p>
          </div>

          <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}>
            <h4 className="font-bold mb-2 text-base">س: هل يمكنني تعديل أو حذف تقييمي بعد إضافته؟</h4>
            <p className="text-sm text-gray-400">ج: نعم، يتيح لك الموقع إضافة تقييمك الخاص، مع وجود أزرار مخصصة لتعديل أو حذف تقييمك بكل سهولة داخل صفحة الفيلم.</p>
          </div>

          <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}>
            <h4 className="font-bold mb-2 text-base">س: اين يتم استضافة وتشغيل الموقع؟</h4>
            <p className="text-sm text-gray-400">ج: الموقع منشور ومرفوع على منصة Vercel السحابية لضمان عمله بكفاءة وسرعة عالية على الإنترنت.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Guide;