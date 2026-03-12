import Header from './components/Header'
import Produtos from './containers/Produtos'
import { useGetProdutosQuery } from './services/api'
import { useDispatch, useSelector } from 'react-redux'

import { GlobalStyle } from './styles'
import { Produto } from './types'
import { addToCart } from './store/cartSlice'
import { toggleFavorite } from './store/favoritesSlice'
import type { AppDispatch, RootState } from './store'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { data: produtos = [], isLoading, isError } = useGetProdutosQuery()

  const carrinho = useSelector((state: RootState) => state.cart.items)
  const favoritos = useSelector((state: RootState) => state.favorites.items)

  function adicionarAoCarrinho(produto: Produto) {
    if (carrinho.find((p) => p.id === produto.id)) {
      alert('Item já adicionado')
    } else {
      dispatch(addToCart(produto))
    }
  }

  function favoritar(produto: Produto) {
    dispatch(toggleFavorite(produto))
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        {isLoading && <p>Carregando produtos...</p>}
        {isError && <p>Erro ao carregar produtos.</p>}
        {!isLoading && !isError && (
          <Produtos
            produtos={produtos}
            favoritos={favoritos}
            favoritar={favoritar}
            adicionarAoCarrinho={adicionarAoCarrinho}
          />
        )}
      </div>
    </>
  )
}

export default App
