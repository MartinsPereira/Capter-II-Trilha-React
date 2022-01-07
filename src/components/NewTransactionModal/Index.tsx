import Modal from 'react-modal'
import { Container, RadioBox, TransactionTypeContainer } from './styles'
import closeImg from '../../assets/icon-fechar.svg'
import incomeImg from '../../assets/icon-entradas.svg'
import outcomeImg from '../../assets/icon-saidas.svg'
import { useState } from 'react'

interface NewtransctionModalProps {
  isOpen: boolean,
  onRequestClose: () => void,
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewtransctionModalProps) {
  const [type, setType] = useState('deposit')

  return (
    <Modal isOpen={isOpen} overlayClassName="react-modal-overlay" className="react-modal-content" onRequestClose={onRequestClose}>

      <button type="button" onClick={onRequestClose} className='react-modal-close'>
        <img src={closeImg} alt="Fechar" />
      </button>
      <Container>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder='Titulo'
        />

        <input
          type="number"
          placeholder='Valor'
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
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}