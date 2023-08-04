**CoinSynch: aplicação de cripto moedas**


## Descrição

CoinSynch  é uma aplicação web construída com Next.js que fornece um painel poderoso e amigável para traders de criptomoedas. Permite que os usuários monitorem dados de mercado em tempo real, rastreiem suas carteiras e acessem análises abrangentes para tomar decisões informadas nas negociações. A aplicação integra-se com APIs populares de criptomoedas para obter dados de mercado atualizados, garantindo precisão e informações em tempo real.

## Funcionalidades

- Dados de mercado em tempo real para criptomoedas populares.
- Gerenciamento de carteiras com rastreamento de lucro/perda.
- Design responsivo para uso sem problemas em desktops e dispositivos móveis.

## Como Rodar

Antes de executar a aplicação, verifique se o Node.js está instalado no seu sistema.

1. Clone o repositório:

```bash
git clone https://github.com/joaoSouza-js/portal-front-end-challenge
```

2. Navegue até o diretório do projeto:

```bash
cd portal-front-end-challenge
```

3. Instale as dependências:

```bash
npm install
```

ou

```bash
pnpm install
```

ou

```bash
yarn install
```

4. Crie um arquivo `.env.local` na raiz do projeto e adicione sua chave de API para dados de criptomoedas:

   4.1 a api para consume de cryptos foi a coinmarketcap você poder gerar a sua api key em https://pro.coinmarketcap.com/account

```plaintext
NEXT_PUBLIC_COIN_MARKET_API_KEY
```


5. Execute a build do app com:

```bash
npm run build
```

ou

```bash
pnpm run build
```

ou

```bash
yarn build
```

5. Execute o servidor com a build pronta com o comando start:

```bash
npm run build
```

ou

```bash
pnpm run build
```

ou

```bash
yarn build
```

  5.1 agora inicie o servidor com o comando start 
      ```bash
    npm run start
    ```
    
    ou
    
    ```bash
    pnpm run start
    ```
    
    ou
    
    ```bash
    yarn start
    ```

6. se Você não coseguir execuatar o sevidor em forma de build por algum motivo execute em mode de desevolvedor como o comando dev
       ```bash
    npm run dev
    ```
    
    ou
    
    ```bash
    pnpm run dev
    ```
    
    ou
    
    ```bash
    yarn dev
    ```
  

8. Abra seu navegador e acesse `http://localhost:3000` para utilizar a aplicação.

## Configuração

A aplicação requer uma chave de API válida para buscar os dados das criptomoedas. Você pode obter uma chave em um provedor de API de criptomoedas  ( CoinMarketCap) e adicioná-la ao arquivo `.env.local` como mostrado na seção "Como Rodar".


## Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).

## Reconhecimentos

- O desenvolvimento deste dashboard foi inspirado pela vibrante comunidade de criptomoedas e pela necessidade de uma ferramenta de negociação poderosa e acessível.
- Agradecimento especial à equipe do Next.js e aos desenvolvedores das várias bibliotecas e APIs utilizadas neste projeto por torná-lo possível.

Sinta-se à vontade para modificar este README de acordo com os detalhes específicos do seu projeto e adicionar seções relevantes, como Implantação, Testes, etc. Feliz codificação!
