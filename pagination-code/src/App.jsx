import { useEffect } from "react"
import { useState } from "react"
import "./App.css"

const App = () => {

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)


  const fetchProducts = async () => {
    const result = await fetch(`https://dummyjson.com/products?limit=100`)
    const data = await result.json()

    if (data && data.products) {
      setProducts(data.products);
    }
  }

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== page) {
      setPage(selectedPage)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      {
        products.length > 0 && (
          <div className="products">
            {
              products.slice(page * 10 - 10, page * 10).map((product) => {
                return (
                  <span className="product" key={product.id}>
                    <img src={product.thumbnail} alt={product.title} />
                    <span>{product.title}</span>
                  </span>
                )
              })
            }
          </div>
        )
      }

      {
        products.length > 0 && (
          <div className="pagination">
            <span onClick={() => selectPageHandler(page - 1)}
              className={page > 1 ? "" : "pagination__disable"}>🔙</span>
            {
              [...Array(products.length / 10)].map((_, i) => {
                return <span className={page === i + 1 ? "pagination__selected" : ""} onClick={() => selectPageHandler(i + 1)} key={i}>{i + 1}</span>
              })
            }
            {/* <span>1</span> */}
            <span className={page < products.length / 10 ? "" : "pagination__disable"} onClick={() => selectPageHandler(page + 1)}>🔜</span>
          </div>
        )
      }
    </div>
  )
}

export default App