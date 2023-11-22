import React from 'react';
import { format } from 'date-fns';
import {
  Card,
  TitleDate,
  Titulo,
  DataOcurrencies,
  DataOcurrency,
  Data,
  Botao,
  BotaoTexto
} from './styles';
import CheckBox from 'expo-checkbox';

export default function TaskCard({ id, data, handleDelete, handleCheckbox, handleEdit}) {

  const dateReady = format(new Date(data.deadline), 'dd/MM/yyyy');

  return (
    <Card key={id}>
      <TitleDate>
        <Titulo>{data.nome}</Titulo>
        <CheckBox
          disabled={false}
          value={data.finalizada}
          onValueChange={(newValue) => handleCheckbox(id, newValue)}
          />
      </TitleDate>
      <TitleDate>
          <Data>{dateReady}</Data>
      </TitleDate>
      <Botao onPress={() => handleEdit(id)}>
        <BotaoTexto>Editar</BotaoTexto>
      </Botao>
      <Botao onPress={() => handleDelete(id)}>
        <BotaoTexto>Excluir</BotaoTexto>
      </Botao>
    </Card>
  );
}
