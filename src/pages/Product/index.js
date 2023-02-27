import { useParams } from "react-router-dom";
import useSWR from "swr";
import { isEmpty } from "../../components/utils";

function Product() {
  const param = useParams();
  console.log(param);

  const productId = param.id.split("_")[1];
  console.log(productId);

  const { data: product } = useSWR(
    `${process.env.REACT_APP_API_URL}api/products/${productId}`
  );
  // console.log(product);
  return !isEmpty(product) && <img src={product.imageUrl} alt="product" />;
}

export default Product;
