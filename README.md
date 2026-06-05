# 🚗 AutoPrime

Site completo de revenda de carros com painel admin para CRUD de veículos.
Construído seguindo um design no Figma, usando **React + Vite + Tailwind** no front, **Node + Express** no back e **Supabase** como banco/autenticação.

---

## 📁 Estrutura

```
autoprime/
├── frontend/      # React + Vite + Tailwind
├── backend/       # Node + Express + Supabase
├── supabase/
│   └── schema.sql # Schema do banco (rode no Supabase)
└── README.md
```

---

## 🛠️ Setup passo a passo

### 1. Criar projeto no Supabase

1. Acesse https://app.supabase.com e crie um novo projeto.
2. Vá em **SQL Editor → New Query**, cole o conteúdo de `supabase/schema.sql` e rode.
3. Em **Authentication → Users → Add user**, crie o usuário admin (ex: `admin@autoprime.com`) com senha.
4. Em **Settings → API**, copie:
   - `Project URL`
   - `anon public key`
   - `service_role key` (mantenha em segredo!)

### 2. Configurar o backend

```bash
cd backend
cp .env.example .env
# Edite .env e preencha SUPABASE_URL, SUPABASE_ANON_KEY e SUPABASE_SERVICE_ROLE_KEY
npm install
npm run dev
```

A API ficará em `http://localhost:3001`.

### 3. Configurar o frontend

Em outro terminal:

```bash
cd frontend
cp .env.example .env
# Edite .env e preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
npm install
npm run dev
```

A interface ficará em `http://localhost:5173`.

---

## 🔐 Acessar o painel admin

1. Abra `http://localhost:5173/admin/login`
2. Use o e-mail e senha criados no Supabase (passo 1.3)
3. Você pode cadastrar, editar, excluir carros e marcar como destaque

> 💡 Há também um link discreto **"Área do Administrador"** no rodapé.

---

## 📦 Funcionalidades

### Site público
- [x] Home com hero, busca rápida, "Por que escolher", carros em destaque
- [x] Página de estoque com filtros (marca, ano, combustível, câmbio, faixa de preço)
- [x] Detalhe do carro com info completa e botão de WhatsApp
- [x] Página de contato com formulário
- [x] Responsivo (mobile/desktop)

### Painel admin
- [x] Login com Supabase Auth
- [x] Listagem de todos os carros
- [x] Criar / editar / excluir carros
- [x] Marcar como destaque (aparece na home)
- [x] Preview da imagem ao colar URL
- [x] Badges (Baixa KM, Novo, Promoção, Destaque)

---

## 🚀 Build de produção

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Os arquivos finais ficam em dist/ — faça deploy em Vercel/Netlify
```

Lembre de configurar no provedor de hospedagem do front:
- `VITE_API_URL` apontando para a URL da API em produção
- `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`

E na API:
- `FRONTEND_URL` apontando para o domínio do front (para o CORS)
- Demais variáveis do Supabase

---

## 🧰 Stack

| Camada    | Tecnologia                           |
|-----------|--------------------------------------|
| Frontend  | React 18, Vite, Tailwind, React Router, lucide-react |
| Backend   | Node 20+, Express, @supabase/supabase-js |
| Banco     | Supabase (PostgreSQL)                |
| Auth      | Supabase Auth (e-mail/senha)         |
| RLS       | Habilitado: leitura pública, escrita só autenticado |

---

## 📝 Observações

- A política de RLS já permite **leitura pública** dos carros e **escrita apenas** para usuários autenticados. Mesmo se alguém tentar bater direto no Supabase com a `anon key`, não consegue alterar dados.
- A API faz uma segunda camada de proteção validando o JWT antes de qualquer escrita.
- A pasta `supabase/` contém apenas o SQL — não é um projeto Supabase CLI; rode o script direto no editor.

Bons códigos! 🚗💨
