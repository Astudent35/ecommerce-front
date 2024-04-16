import Link from "next/link";
import styled from "styled-components";

const StyledHeader = styled.header`
    background-color: #222;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Link href={"/"}>Ecommerce</Link>
      <nav>
        <Link href={"/"}>Home</Link>
        <Link href={"/products"}>All products</Link>
        <Link href={"/categories"}>Categories</Link>
        <Link href={"/account"}>Account</Link>
        <Link href={"/cart"}>Cart (0)</Link>
      </nav>
    </StyledHeader>
  )
}

