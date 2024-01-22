import { useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";
import Product from "../components/Product/Product";
import { nanoid } from "nanoid";

function KidsPage() {
  const { Allproducts } = useSelector((s) => s?.products);
  const [kidsProducts, setKidsProducts] = useState();

  useEffect(() => {
    if (Allproducts) {
      let temp = Allproducts.filter((el) => {
        if (el.category === "men") {
          return el;
        }
      });

      setKidsProducts(temp);
    }
  }, [Allproducts]);

  return (
    <UserLayout>
      {kidsProducts && (
        <ul className="flex px-12">
          <>
            {kidsProducts.map((el) => {
              return <Product key={nanoid(4)} data={el} />;
            })}
          </>
        </ul>
      )}
    </UserLayout>
  );
}

export default KidsPage;
