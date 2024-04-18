import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

export default function HomePage({featuredProduct}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "6610e7421211a042e9525638";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
    },
  };
}

