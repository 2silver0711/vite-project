import React, { useState } from "react";
import "./App.css";

const categoryNames = {
  scotch: "스카치",
  bourbon: "버번",
  rye: "호밀",
  irish: "아이리시",
  japanese: "일본산",
  other: "기타"
};

// whiskeyMenu 배열 내 각 항목의 imageUrl 필드를 변경하여 원하는 이미지 사용 가능
const whiskeyMenu = [
  { id: "w1", name: "Glenfiddich 12", category: "scotch", price: 15000, description: "Smooth single malt", abv: 40, region: "Speyside", age: 12, imageUrl: "https://winesonline.com.sg/cdn/shop/products/Glenfiddich-Personalised-Label_2020_12YO_1200x.jpg?v=1623808863" },
  { id: "w2", name: "Macallan 18", category: "scotch", price: 45000, description: "Rich & complex", abv: 43, region: "Speyside", age: 18, imageUrl: "https://preview.redd.it/140th-whisky-review-61st-scotch-whisky-review-macallan-12-v0-tdj2zmlns7jd1.jpeg?width=1080&crop=smart&auto=webp&s=4c53d51c76e2f3855ed4119f07deea6d4e0075c5" },
  { id: "w3", name: "Yamazaki 12", category: "japanese", price: 35000, description: "Elegant Japanese whisky", abv: 43, region: "Japan", age: 12, imageUrl: "https://www.mcf-rarewine.com/cdn/shop/files/the-yamazaki-12yr-100th-anniversary-liquor-whiskey-japan-mcf-rare-wine-41772293259543.jpg?v=1687022718" },
  { id: "w4", name: "Woodford Reserve", category: "bourbon", price: 18000, description: "Full-bodied bourbon whiskey", abv: 45, region: "USA", age: 8, imageUrl: "https://preview.redd.it/review-the-woodford-reserve-double-double-oaked-v0-ng34bseepvae1.jpeg?width=1080&crop=smart&auto=webp&s=59a6856e7094a87632b8924d0f5b3312d1cadf80" },
  { id: "w5", name: "Jameson Irish Whiskey", category: "irish", price: 16000, description: "Smooth Irish whiskey with hints of vanilla", abv: 40, region: "Ireland", age: 5, imageUrl: "https://thewhiskeyjug.com/wp-content/uploads/2014/12/Jameson-Irish-Whiskey-750x750.jpg" },
  { id: "w6", name: "Woodford Reserve", category: "bourbon", price: 18000, description: "Full-bodied bourbon whiskey", abv: 45, region: "USA", age: 8, imageUrl: "https://preview.redd.it/review-the-woodford-reserve-double-double-oaked-v0-ng34bseepvae1.jpeg?width=1080&crop=smart&auto=webp&s=59a6856e7094a87632b8924d0f5b3312d1cadf80" },
  { id: "w7", name: "Jameson Irish Whiskey", category: "irish", price: 16000, description: "Smooth Irish whiskey with hints of vanilla", abv: 40, region: "Ireland", age: 5, imageUrl: "https://thewhiskeyjug.com/wp-content/uploads/2014/12/Jameson-Irish-Whiskey-750x750.jpg" },
  // 추가 메뉴 등 자유롭게 여기에 넣기
];

export default function App() {
  const [orderItems, setOrderItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const formatPrice = (p) => `₩${p.toLocaleString()}`;

  const addToOrder = (whiskey) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.id === whiskey.id);
      if (existing) {
        return prev.map((i) =>
          i.id === whiskey.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...whiskey, quantity: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) removeItem(id);
    else {
      setOrderItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
      );
    }
  };

  const removeItem = (id) => {
    setOrderItems((prev) => prev.filter((i) => i.id !== id));
  };

  const completeOrder = () => {
    if (!orderItems.length) return;
    const number = String(Date.now()).slice(-6);
    setOrderNumber(number);
    setShowModal(true);
    setOrderItems([]);
  };

  const filteredList =
    selectedCategory === "all"
      ? whiskeyMenu
      : whiskeyMenu.filter((w) => w.category === selectedCategory);

  const total = orderItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <div className="container">
      {/* Header */}
      <header>
        <div className="header-emoji">🥃</div>
        <div className="header-title-group">
          <h1 className="header-title">The Whiskey Counter</h1>
          <div className="header-subtitle">Premium Whiskey Experience</div>
        </div>
      </header>

      {/* Cart */}
      <section className="card" id="order-cart">
        <div className="card-header">
          <div className="card-title">
            주문 내역 {orderItems.length > 0 && `(${orderItems.length}개)`}
          </div>
        </div>
        <div className="card-content scroll-area">
          {orderItems.length === 0 ? (
            <p style={{ color: "gray", textAlign: "center" }}>
              주문할 위스키를 선택해주세요
            </p>
          ) : (
            orderItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <br />
                  <small>
                    {formatPrice(item.price)} × {item.quantity}
                  </small>
                </div>
                <div>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    className="btn btn-destructive btn-sm"
                    onClick={() => removeItem(item.id)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="card-footer total">
          <span>총 금액</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <div className="card-footer">
          <button
            onClick={completeOrder}
            className="btn btn-default btn-lg"
            style={{ width: "100%" }}
          >
            주문 완료
          </button>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{ marginTop: "2rem" }}>
        <h2>위스키 컬렉션</h2>
        <div className="category-filter">
          {["all", ...Object.keys(categoryNames)].map((cat) => (
            <button
              key={cat}
              className={`${selectedCategory === cat
                  ? "btn btn-default btn-sm"
                  : "btn btn-outline btn-sm"
                }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "all" ? "전체" : categoryNames[cat]} (
              {cat === "all"
                ? whiskeyMenu.length
                : whiskeyMenu.filter((w) => w.category === cat).length}
              )
            </button>
          ))}
        </div>
      </section>

      {/* Whiskey Menu */}
      <section className="whiskey-menu">
        {filteredList.map((w) => (
          <div key={w.id} className="card">
            <div className="card-image-wrap">
              <img src={w.imageUrl} alt={w.name} />
              <div className="card-image-overlay"></div>
            </div>
            <div className="card-header">
              <div className="card-title">{w.name}</div>
            </div>
            <div className="card-content">
              <p>{w.description}</p>
              <small>
                {w.region} {w.age && `${w.age}년`}
              </small>
            </div>
            <div className="card-footer">
              <span>{formatPrice(w.price)}</span>
              <button
                className="btn btn-default btn-sm"
                onClick={() => addToOrder(w)}
              >
                추가
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Modal */}
      {showModal && (
        <div
          className="modal"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-complete-title"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 id="order-complete-title">주문이 완료되었습니다!</h3>
            <p>
              주문 번호: <span>{orderNumber}</span>
            </p>
            <strong style={{ display: "block", marginTop: "1rem" }}>
              {formatPrice(total)}
            </strong>
            <button
              onClick={() => setShowModal(false)}
              className="btn btn-default btn-lg"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              새 주문 시작
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
