import styles from './Search.module.css'

//hooks
import {useFetchDocuments} from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

const Search = () => {

    const query = useQuery()
    const search = query.get('q') // "q" é um metodo de busca do google que vem na url após a "?"

  return (
    <div>
        <h2>Search</h2>
        <p>{search}</p>
    </div>
  )
}

export default Search