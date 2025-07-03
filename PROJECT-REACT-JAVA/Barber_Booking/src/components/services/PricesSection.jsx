// import React, { useState } from "react";
// import "../../css/style.css";

// const PricesSection = () => {
//   const [showPrices, setShowPrices] = useState(false);

//   return (
//     <div
//       className="blockz-element tab-prices size-2 hsize-2"
//       style={{
//         padding: "30px",
//         backgroundColor: "#fff",
//         borderRadius: "12px",
//         margin: "20px auto",
//         maxWidth: "800px",
//       }}
//     >
//       <div className="blockz-element-wrapper with-padding with-big-text">
//         <div className="blockz-element-content">
//           <h2
//             className="blockz-block-title"
//             style={{
//               fontStyle: "italic",
//               color: "#f0a500",
//               marginBottom: "20px",
//               borderBottom: "2px solid #f0a500",
//               paddingBottom: "10px",
//               fontWeight: "700",
//             }}
//           >
//             Prices
//           </h2>
//           <ul
//             className="blockz-price-list"
//             style={{ listStyle: "none", padding: 0 }}
//           >
//             <li style={{ marginBottom: "20px" }}>
//               <div
//                 className="blockz-price-title"
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <div
//                   className="blockz-price-name"
//                   style={{ fontWeight: "600", fontSize: "18px" }}
//                 >
//                   Hair Trim
//                 </div>
//                 <div
//                   className="blockz-price-dots"
//                   style={{
//                     flexGrow: 1,
//                     borderBottom: "1px dotted #ccc",
//                     margin: "0 10px",
//                   }}
//                 ></div>
//                 <div
//                   className="blockz-price-price"
//                   style={{
//                     fontWeight: "700",
//                     fontSize: "18px",
//                     color: "#f0a500",
//                   }}
//                 >
//                   $25
//                 </div>
//               </div>
//               <div
//                 className="blockz-price-description"
//                 style={{ marginTop: "5px", color: "#555" }}
//               >
//                 <p>Basic haircut for a fresh look.</p>
//               </div>
//             </li>

//             <li style={{ marginBottom: "20px" }}>
//               <div
//                 className="blockz-price-title"
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <div
//                   className="blockz-price-name"
//                   style={{ fontWeight: "600", fontSize: "18px" }}
//                 >
//                   Beard Trim
//                 </div>
//                 <div
//                   className="blockz-price-dots"
//                   style={{
//                     flexGrow: 1,
//                     borderBottom: "1px dotted #ccc",
//                     margin: "0 10px",
//                   }}
//                 ></div>
//                 <div
//                   className="blockz-price-price"
//                   style={{
//                     fontWeight: "700",
//                     fontSize: "18px",
//                     color: "#f0a500",
//                   }}
//                 >
//                   $20
//                 </div>
//               </div>
//               <div
//                 className="blockz-price-description"
//                 style={{ marginTop: "5px", color: "#555" }}
//               >
//                 <p>Professional beard shaping and trimming.</p>
//               </div>
//             </li>

//             <li style={{ marginBottom: "20px" }}>
//               <div
//                 className="blockz-price-title"
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <div
//                   className="blockz-price-name"
//                   style={{ fontWeight: "600", fontSize: "18px" }}
//                 >
//                   Special Beard Treatment
//                 </div>
//                 <div
//                   className="blockz-price-dots"
//                   style={{
//                     flexGrow: 1,
//                     borderBottom: "1px dotted #ccc",
//                     margin: "0 10px",
//                   }}
//                 ></div>
//                 <div
//                   className="blockz-price-price"
//                   style={{
//                     fontWeight: "700",
//                     fontSize: "18px",
//                     color: "#f0a500",
//                   }}
//                 >
//                   $55
//                 </div>
//               </div>
//               <div
//                 className="blockz-price-description"
//                 style={{ marginTop: "5px", color: "#555" }}
//               >
//                 <p>Deep conditioning and revitalizing treatment.</p>
//               </div>
//             </li>

//             <li style={{ marginBottom: "20px" }}>
//               <div
//                 className="blockz-price-title"
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <div
//                   className="blockz-price-name"
//                   style={{ fontWeight: "600", fontSize: "18px" }}
//                 >
//                   Complete Treatment
//                 </div>
//                 <div
//                   className="blockz-price-dots"
//                   style={{
//                     flexGrow: 1,
//                     borderBottom: "1px dotted #ccc",
//                     margin: "0 10px",
//                   }}
//                 ></div>
//                 <div
//                   className="blockz-price-price"
//                   style={{
//                     fontWeight: "700",
//                     fontSize: "18px",
//                     color: "#f0a500",
//                   }}
//                 >
//                   $95
//                 </div>
//               </div>
//               <div
//                 className="blockz-price-description"
//                 style={{ marginTop: "5px", color: "#555" }}
//               >
//                 <p>Full service package for hair and beard care.</p>
//               </div>
//             </li>

//             {/* Bạn có thể thêm các mục giá khác ở đây */}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PricesSection;

import React from "react";
import "../../css/style.css";

const pricesData = [
  {
    name: "Hair Trim",
    price: "$25",
    description: "Basic haircut for a fresh look.",
  },
  {
    name: "Hair Trim",
    price: "$25",
    description: "Basic haircut for a fresh look.",
  },
  {
    name: "Hair Trim",
    price: "$25",
    description: "Basic haircut for a fresh look.",
  },
  {
    name: "Hair Trim",
    price: "$25",
    description: "Basic haircut for a fresh look.",
  },
  {
    name: "Beard Trim",
    price: "$20",
    description: "Professional beard shaping and trimming.",
  },
  {
    name: "Special Beard Treatment",
    price: "$55",
    description: "Deep conditioning and revitalizing treatment.",
  },
  {
    name: "Complete Treatment",
    price: "$95",
    description: "Full service package for hair and beard care.",
  },
];

const PricesSection = () => {
  return (
    <div className="prices-container">
      <h2 className="prices-title">Prices</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {pricesData.map(({ name, price, description }) => (
          <li className="price-item" key={name}>
            <div className="price-title">
              <div className="price-name">{name}</div>
              <div className="price-dots"></div>
              <div className="price-price">{price}</div>
            </div>
            <div className="price-description">{description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricesSection;
