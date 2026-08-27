# Auth + Admin (Cloudflare D1)

## Stack
- Cloudflare Pages Functions API (`twon-api`)
- D1 database: `msg1000-auth` (users/sessions + shop_overrides)
- Admin bootstrap: `admin` / `admin1218` (PBKDF2 hashed in D1)

## Commands
```bash
npm install
npm run db:migrate
npm run deploy:api
```

## Frontend
- Hamburger menu: 로그인 / 회원가입 / 로그아웃
- `login.html`, `signup.html`
- Detail page (admin): 수정 / 삭제
- `shop-edit.html?id=...` : card + detail fields edit preview

## API
- `POST /api/signup|login|logout`
- `GET /api/me`
- `GET /api/shops`
- `PUT /api/shops/:id` (admin)
- `DELETE /api/shops/:id` (admin soft-delete)
