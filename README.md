===============================
🚀 PERSONAGENS RICK AND MORTY
===============================

📌 **Descrição**  
Este aplicativo mobile foi desenvolvido com React Native (via Expo) e consome a API pública da série Rick and Morty para listar todos os personagens com ordenação alfabética, sistema de favoritos persistente, e sistema de busca personalizado por nome com paginação local. É um projeto acadêmico com foco em consumo de APIs REST, estado local, performance e estilização avançada.

---

🛠️ **Tecnologias Utilizadas**

- React Native + Expo  
- TypeScript  
- React Navigation  
- AsyncStorage (armazenamento local)  
- API pública Rick and Morty  
- Estilo visual cartunesco personalizado  

---

📱 **Funcionalidades do App**

🔍 **Lista de Personagens**  
- Consumo da API oficial: https://rickandmortyapi.com/api/character  
- Busca por nome com ou sem “*”  
  → Ex: `rick` busca nomes que **começam com** "rick"  
  → Ex: `*rick` busca nomes que **contenham** "rick" em qualquer parte  
- Ordenação global A-Z (símbolos e números vêm antes)  
- Paginação local baseada em 20 personagens por página  
- Exibição da **página atual** e do **total de páginas**

⭐ **Sistema de Favoritos**  
- Cada personagem pode ser favoritado ou desfavoritado  
- Ícone muda visualmente (☆ / 🌟)  
- Tela separada para visualizar favoritos  
- Remoção de favoritos diretamente na tela dedicada  
- Armazenamento persistente com AsyncStorage  

🎨 **Estilo Cartunesco**  
- Fundo escuro `#1e1f26` com cores vibrantes `#52e3c2` e `#ffcc00`  
- Estilização inspirada na identidade visual de Rick and Morty  
- Interface amigável e lúdica  

---

📁 **Estrutura do Projeto**

```
PersonagensRickAndMorty/
├── assets/               → imagens e ícones
├── navigation/           → configuração de rotas
├── screens/              → CharacterListScreen.tsx, FavoritesScreen.tsx
├── App.tsx               → ponto de entrada do app
├── package.json          → configuração do projeto
└── tsconfig.json         → configuração TypeScript
```

---

▶️ **Como Executar o Projeto**

1. Clone o repositório:
   ```bash
   git clone [URL-DO-REPO]
   ```

2. Acesse a pasta:
   ```bash
   cd PersonagensRickAndMorty
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o projeto com Expo:
   ```bash
   npx expo start
   ```

---

📦 **Instale também:**

```bash
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage
```

---

👨‍💻 **Autor**

- **Nome:** EDEZKANIRO
- **GitHub:** https://github.com/efsartorelli
- **Turma:** 3ESPV - Engenharia de Software — FIAP 2025

---

📚 **Observações Finais**

- Projeto acadêmico com fins educativos  
- Todos os dados são carregados dinamicamente da API pública  
- Aplicação 100% mobile e funcional  
- Visual moderno e responsivo, inspirado no universo Rick and Morty  

Eduardo de Oliveira Nistal - RM94524
Enzo Vazquez Sartorelli - RM94618 
Kaue Pastori - RM98501
Nicolas Nogueira Boni - RM551965 
Rodrigo Viana - RM551057

🗓️ Última atualização: 19/05/2025
