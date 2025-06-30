// src/components/products/ProductDetails.jsx
import React, { useState } from "react";
import { Modal } from "antd";

const ProductDetails = ({ product, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)} style={{ flex: 1 }}>
        {children}
      </div>

      <Modal
        title={product.title}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          style={{
            width: "100%",
            maxHeight: 250,
            objectFit: "cover",
            borderRadius: 8,
            marginBottom: 12,
          }}
        />
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Price:</strong> {product.price.toLocaleString()}₫
        </p>
        <p>
          <strong>Stock:</strong> {product.stock} sản phẩm
        </p>
        <p>
          <strong>Ưu đãi:</strong> Giao hàng miễn phí toàn quốc 🚚
        </p>
      </Modal>
    </>
  );
};

export default ProductDetails;
