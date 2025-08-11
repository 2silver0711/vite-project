import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [order, setOrder] = useState([]);

  const addToOrder = (item) => {
    setOrder([...order, item]);
  };

  const menuData = {
    버거: [
      {
        name: "뚱이치즈버거",
        img: "https://mblogthumb-phinf.pstatic.net/MjAyMDEwMjNfMzcg/MDAxNjAzMzgyOTQ0MjIz.QWKOl1JZSbj05umbDS9QFOQW1dRdMBZAtdQNyG_AzLwg.E42PE-SxA9w2uI9NPHzafrh438MDQGvcLSVLC-2MB1cg.GIF.ckzkslkkk/IMG_4620.GIF?type=w800",
      },
      {
        name: "징징이게살버거",
        img: "https://mblogthumb-phinf.pstatic.net/MjAyMDEwMjNfMTM2/MDAxNjAzMzgzNDY2MDgy.4HF-jMTtVukYNeF0mm-Ug7JICBvDH1PENw29jwgP8QAg.b35IOs0dle4Kv4ePoHIplR51m4KOgcyTOIqL8BvVW2Qg.GIF.ckzkslkkk/IMG_4646.GIF?type=w800",
      },
    ],
    디저트: [
      {
        name: "초코 케이크",
        img: "https://mblogthumb-phinf.pstatic.net/MjAyMDEwMjJfMzAw/MDAxNjAzMzc1NTU3NDE0.vNbZ9OXBv7shODMblPo0dP4-TwRMZWALsYMYp5RFG3Eg.a1xn9zzbrRHiNOZqZUe80pl8ymnEaZ6YCchqrVNv9Msg.GIF.mmj5202/1583843419760.gif?type=w800",
      },
      {
        name: "아이스크림",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8EQ-TZB5KRz2fOUDQGTlkkClRoG3xdAUNjg&s",
      },
    ],
    사이드: [
      {
        name: "감자튀김",
        img: "https://i2.ruliweb.com/ori/21/10/26/17cbb6f686c2f0c59.gif",
      },
      {
        name: "어니언링",
        img: "https://i1.ruliweb.com/ori/24/11/12/1931dd8c42a1f74ea.gif",
      },
    ],
    음료: [
      {
        name: "콜라",
        img: "https://mblogthumb-phinf.pstatic.net/MjAyMDAzMDNfMjQx/MDAxNTgzMjA2MjY3ODY5.bvebndyr0h4w2PrF2-78Q8AVTxyj5xZCgpAGKlPi3FYg.KP2I2PAV45cXmtby1g6z5vtXhqPqAToBhlW7aPfnmLUg.GIF.e7dk4/IMG_8316.GIF?type=w800",
      },
      {
        name: "사이다",
        img: "https://mblogthumb-phinf.pstatic.net/MjAyMDAzMDNfMjQx/MDAxNTgzMjA2MjY3ODY5.bvebndyr0h4w2PrF2-78Q8AVTxyj5xZCgpAGKlPi3FYg.KP2I2PAV45cXmtby1g6z5vtXhqPqAToBhlW7aPfnmLUg.GIF.e7dk4/IMG_8316.GIF?type=w800",
      },
    ],
  };

  return (
    <div className="app">
      <header>
        <h1>🍔 Burger Shop 🍔</h1>
      </header>

      <main>
        {Object.keys(menuData).map((category) => (
          <section key={category} className="menu">
            <h2>{category}</h2>
            <div className="menu-items">
              {menuData[category].map((item, idx) => (
                <div className="menu-item" key={idx}>
                  <img src={item.img} alt={item.name} />
                  <p>{item.name}</p>
                  <button onClick={() => addToOrder(item.name)}>
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="order">
          <h2>Your Order</h2>
          {order.length === 0 ? (
            <p>No items yet.</p>
          ) : (
            <ul>
              {order.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
