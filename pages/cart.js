import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.2fr .8fr;
    }
    gap: 40px;
    margin-top: 40px;
`

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`

const ProductInfoCell = styled.td`
padding: 10px 0;
display: flex;
flex-direction: column;
align-items: center;
gap: 10px; /* Optional: Adds space between the image and the text */
`

const ProductImageBox = styled.div`
    width: 100px;
    height: 100px;
    padding: 2px;
    border: 1px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img{
        max-width: 80px;
        max-height: 80px;
    }
    @media screen and (min-width: 768px) {
        padding: 10px;
    }
`

const QuantityLabel = styled.span`
    padding: 0 3px;
`

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`

export default function CartPage(){
    const {cartProducts, addProductToCart, removeProductFromCart, clearCart} = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [city,setCity] = useState('')
    const [postalCode,setPostalCode] = useState('')
    const [streetAddress,setStreetAddress] = useState('')
    const [country,setCountry] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    useEffect(()=> {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', {ids: cartProducts})
            .then(response => setProducts(response.data))
        } else {
            setProducts([])
        }
    }, [cartProducts])
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.location.href.includes('success')){
            setIsSuccess(true)
            clearCart()
        }
    }, [])
    function moreOfThisProduct(id){
        addProductToCart(id)
    }
    function lessOfThisProduct(id){
        removeProductFromCart(id)
    }
    async function handleCheckout(){
        const response = await axios.post('/api/checkout', {
            name,
            email,
            city,
            postalCode,
            streetAddress,
            country,
            cartProducts,
        })
        if (response.data.checkout_url) {
            window.location.href = response.data.checkout_url
        }
    }
    let total = 0;
    for (const productid of cartProducts){
        const price = products.find(product => product._id === productid)?.price || 0
        total += price
    }

    if (isSuccess){
        return (
            <>
                <Header />
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h2>Thank you for your purchase</h2>
                            <p>Your order has been confirmed</p>
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </>
        )
    }
    return(
        <>
        <Header/>
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h2>Cart</h2>
                        {!cartProducts.length && (
                            <h2>Your cart is empty</h2>
                        )}
                        {products.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]} alt=""/>
                                                </ProductImageBox>
                                                {product.title}
                                            </ProductInfoCell>
                                            <td>
                                                <Button onClick={() => lessOfThisProduct(product._id)} >-</Button>
                                                <QuantityLabel>
                                                    {cartProducts.filter(id => id === product._id).length}
                                                </QuantityLabel>
                                                <Button 
                                                    onClick={() => moreOfThisProduct(product._id)} >+</Button>
                                            </td>
                                            <td>
                                                ${cartProducts.filter(id => id === product._id).length * product.price}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="2"></td>
                                        <td style={{ paddingTop: '20px', fontWeight: 'bold' }}>Total: ${total}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {!!cartProducts.length && (
                    <Box>
                        <h2>Order information</h2>
                        <Input type="text" placeholder="Name" name="name" value={name} onChange={e => setName(e.target.value)} />
                        <Input type="text" placeholder="Email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <CityHolder>
                            <Input type="text" placeholder="City" name="city" value={city} onChange={e => setCity(e.target.value)} />
                            <Input type="text" placeholder="Postal Code" name="postalCode" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                        </CityHolder>
                        <Input type="text" placeholder="Street Address" name="streetAddress" value={streetAddress} onChange={e => setStreetAddress(e.target.value)} />
                        <Input type="text" placeholder="Country" name="country" value={country} onChange={e => setCountry(e.target.value)} />
                        <Button black block onClick={handleCheckout}>Continue to payment</Button>
                    </Box>
                    )}
                </ColumnsWrapper>
            </Center>
        </>
    )
}

