# Descriere proiect: Aplicație de management a programărilor pentru service auto

Această aplicație reprezintă un sistem integrat de gestionare a programărilor pentru service-uri auto. Ea combină atât funcționalitățile unui frontend, cât și ale unui backend pentru a oferi o experiență completă utilizatorilor.

## Tehnologii utilizate:

- **Backend:** Node.js
- **Baza de date:** MongoDB
- **Autentificare:** Passport
- **Frontend** React

## Comenzi de start pentru servere:

npm start


Utilizați această comandă pentru a porni atât serverul frontend, cât și backend-ul.

## Autentificare și autorizare:

Aplicația folosește Passport pentru autentificarea utilizatorilor prin conturile Google. Configurările pentru conexiunea la baza de date MongoDB și setările Passport sunt disponibile în fișierul `.env`.

## Structura de date:

- **Schema de autentificare:** Utilizatorii sunt împărțiți în trei ranguri: Client, Mecanic, Admin. Configurarea rangurilor și a schemelor de autentificare se găsește în fișierul `server/db/schemas/auth_schema.js`. Default, am configurat eu să primești rank-ul Admin pentru a testa aplicația.
- **Schema de status:** Mecanicii si Adminii pot seta statusuri diferite la programari: `Default: To Be Approved, Approved, Declined, In Service, Done`

## Funcționalități pe baza rangului utilizatorilor:

### Client:

- **Programări:** Utilizatorii cu rol de client pot crea programări pentru service și pot vizualiza informații despre mașini și statusurile acestora.
- **Gestionarea mașinilor:** Utilizatorii pot modifica sau șterge mașinile înainte ca acestea să fie aprobate pentru o programare.

### Mecanic:

- **Toate funcționalitățile pentru client:** Mecanicii au acces la toate funcționalitățile disponibile pentru clienți.
- **Panel de control specific:** Mecanicii au un panel de control dedicat, unde pot modifica statusurile mașinilor și pot adăuga descrieri ale problemelor identificate.

### Admin:

- **Toate funcționalitățile pentru client și mecanic:** Administratorii au acces la toate funcționalitățile oferite clienților și mecanicilor.
- **Panel de administrare:** Administratorii pot gestiona utilizatorii, având posibilitatea de a modifica rangurile acestora sau de a-i șterge din baza de date.

## Observații:

- Aplicația este concepută pentru a oferi interfețe distincte pentru fiecare rang de utilizator, asigurând o experiență personalizată în funcție de privilegiile acordate.
# service-app
