import Modal from 'react-modal'
import { Container, RadioBox, TransactionTypeContainer } from './styles'
import closeImg from '../../assets/icon-fechar.svg'
import incomeImg from '../../assets/icon-entradas.svg'
import outcomeImg from '../../assets/icon-saidas.svg'
import { FormEvent, useState, useContext } from 'react'
import { useTransactions } from '../../hooks/useTransactions'

interface NewtransctionModalProps {
  isOpen: boolean,
  onRequestClose: () => void,
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewtransctionModalProps) {
  const { createTransaction } = useTransactions()

  const [title, setTitle] = useState('')
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit')

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()
    await createTransaction({
      title,
      amount: value,
      category,
      type,
    })

    setTitle('')
    setValue(0)
    setCategory('')
    setType('deposit')
    onRequestClose()
  }

  return (
    <Modal isOpen={isOpen} overlayClassName="react-modal-overlay" className="react-modal-content" onRequestClose={onRequestClose}>

      <button type="button" onClick={onRequestClose} className='react-modal-close'>
        <img src={closeImg} alt="Fechar" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder='Titulo'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder='Valor'
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => { setType('deposit') }}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => { setType('withdraw') }}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saídas</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder='Categoria'
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}