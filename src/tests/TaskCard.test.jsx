// Importa a biblioteca React para renderizar componentes no ambiente de teste.
import React from 'react';

// Importa a função render da biblioteca de testes @testing-library/react-native.
import { render } from '@testing-library/react-native';

// Importa o componente Header que será testado. Certifique-se de que o caminho do arquivo esteja correto.
import TaskCard from '../components/TaskCard'
// Define um bloco de teste chamado "Header Component" para organizar os testes relacionados ao componente Header.
describe('App', () => {

  // Define um teste específico chamado "should render the component".
  it('should render the component', () => {
    // Renderiza o componente Header e armazena a função getByText para buscar elementos no componente renderizado.
    const { getByText } = render(<TaskCard
      id="1"
      data={{ deadline: '2023-11-23', finalizada: true, nome: 'teste' }}
      handleCheckbox={() => 'teste'}
      handleDelete={() => 'teste'}
      handleEdit={() => 'teste'}
    />);

    // Busca um elemento no componente renderizado com o texto "Lista de Usuários" e o armazena na variável headerText.
    const headerText = getByText('teste');

    // Verifica se o elemento com o texto "Lista de Usuários" foi encontrado no componente renderizado.
    expect(headerText).toBeTruthy();
  });
});
