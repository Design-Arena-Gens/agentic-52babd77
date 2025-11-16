import Image from "next/image";
import Link from "next/link";
import { getVocheShampoos } from "@/lib/digikala";

const numberFormatter = new Intl.NumberFormat("fa-IR");
const dateTimeFormatter = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "Asia/Tehran",
});

export default async function Page() {
  const { products, fetchedAt } = await getVocheShampoos();
  const updatedLabel = dateTimeFormatter.format(new Date(fetchedAt));

  return (
    <main>
      <header className="header">
        <div>
          <h1>شامپوهای برند وچه در دیجی‌کالا</h1>
          <p>
            اطلاعات زیر به صورت مستقیم از API عمومی دیجی‌کالا خوانده شده و
            هر&nbsp;ساعت به‌روزرسانی می‌شود. برای خرید، روی هر کارت کلیک کنید تا
            وارد صفحه محصول شوید.
          </p>
        </div>
        <span>آخرین به‌روزرسانی: {updatedLabel}</span>
      </header>

      {products.length > 0 ? (
        <div className="card-grid">
          {products.map((product) => (
            <Link
              key={product.id}
              href={product.link}
              target="_blank"
              rel="noreferrer"
              className="card"
              prefetch={false}
            >
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={320}
                  height={320}
                  sizes="(max-width: 768px) 100vw, 320px"
                  priority
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, rgba(148,163,184,0.2), rgba(226,232,240,0.5))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    color: "#475569",
                    fontSize: "0.95rem",
                  }}
                >
                  بدون تصویر
                </div>
              )}
              <h3>{product.title}</h3>
              <p>
                قیمت:{" "}
                {product.priceToman
                  ? `${numberFormatter.format(product.priceToman)} تومان`
                  : "ناموجود"}
              </p>
              {product.rating !== null && product.ratingCount !== null ? (
                <p>
                  امتیاز کاربران: {product.rating} از ۵ (بر اساس{" "}
                  {numberFormatter.format(product.ratingCount)} رأی)
                </p>
              ) : (
                <p>امتیاز ثبت شده‌ای موجود نیست</p>
              )}
              <p style={{ fontWeight: 600, marginTop: "auto", color: "#1e3a8a" }}>
                مشاهده در دیجی‌کالا ↗
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <section
          style={{
            backgroundColor: "rgba(255,255,255,0.75)",
            borderRadius: "18px",
            padding: "2.5rem 1.5rem",
            textAlign: "center",
            boxShadow:
              "0 18px 25px rgba(15, 23, 42, 0.08), 0 12px 18px rgba(15, 23, 42, 0.06)",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#0f172a" }}>محصولی یافت نشد</h2>
          <p style={{ marginBottom: 0, color: "#475569" }}>
            در حال حاضر نتیجه‌ای برای شامپوهای برند وچه پیدا نکردیم. لطفاً کمی بعد
            دوباره امتحان کنید.
          </p>
        </section>
      )}

      <footer className="footer">
        داده‌ها از وب‌سرویس عمومی دیجی‌کالا خوانده شده‌اند و هیچ اطلاعات حساسی
        ذخیره یا نگهداری نمی‌شود.
      </footer>
    </main>
  );
}
