import styled from "styled-components";
import Button from "./Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import { CartContext } from "./CartContext";
import { useContext } from "react";

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 80px;
  }
`;

const ProductWrapper = styled.div`
  
`;

const Title = styled(Link)`
  font-size: 0.9rem;
  font-weight: normal;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  width: 100%; // Ensure it takes full width of its container
`;
const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

export default function ProductBox({_id, title, description, price, images}) {
  const uri = `/products/${_id}`;
  const {addProductToCart} = useContext(CartContext)
  return (
    <ProductWrapper>
      <WhiteBox href={uri}>
        <div>
        {images && images.length > 0 && <img src={images?.[0]} alt=""/>}
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={uri}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button primary outline onClick={()=>addProductToCart(_id)}> <CartIcon/> </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}

