import styled from 'styled-components/native';

export const Card = styled.View`
  background-color: #FFF;
  border-radius: 8px;
  border-color: #68B2F8;
  border-width: 1px;
  margin: 12px;
  padding: 16px;
`;

export const TitleDate = styled.View`
  flex-direction: row;
  text-align: left;
  align-content: space-between;
  justify-content: space-between;
`;

export const Titulo = styled.Text`
  font-size: 15px;
  text-transform: capitalize;
  text-align: left;
  margin-bottom: 12px;
`;

export const Data = styled.Text`
  font-size: 15px;
  text-align: center;
  margin-bottom: 12px;
`;

export const DataOcurrencies = styled.View`
  flex-direction: row;
  margin: 12px;
  padding: 16px;
  align-content: center;
  justify-content: space-evenly;
  gap: 48px;
`;

export const DataOcurrency = styled.Text`
  font-size: 12px;
  text-transform: capitalize;
  text-align: center;
  margin-bottom: 12px;
  background-color: #68B2F8;
  padding: 8px;
  border-radius: 4px;
  color: #FFF;
`;
export const Botao = styled.TouchableHighlight`
  background-color: #68B2F8;
  width: 100%;
  height: 45px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
`;

export const BotaoTexto = styled.Text`
  font-size: 18px;
  color: #FFF;
`;
