#  ๐งก ๐ ๐ heart-chart ๐ ๐ ๐งก
cute app to make affection into a competition  
<a href="https://github.com/wchorski/next-hearts/blob/main/config/defaultUsers.json"> Default User Login Cred </a>
<br>

Live website ๐ฑ
<a href="http://heart-chart.williamusic.com/">http://heart-chart.williamusic.com/</a>
<br>

# Screenshots ๐ธ
<img src="https://media.giphy.com/media/DkVufXnA4CmsNcVOay/giphy.gif">
<br>

<details>
  <summary>๐ฝ Tech & ๐ฆ packages</summary>

  ### ๐ฝ Tech
  - NextJs w/ typescript
  - MongoDB
  - Docker
  <br>

  ### ๐ฆ packages
  - NextAuth
  - chart.js
  - formik & yup
  - mongoose
  - react-spring
  - react-table
  - sass
  - styled-components
  - full list @ <a href="https://github.com/wchorski/heart-chart/blob/main/package.json"> https://github.com/wchorski/heart-chart/blob/main/package.json</a>
  <br>

</details>
<br>

## โฅ Features
- Admin backend
- animated pie chart
- self hosted database
<br>
<br>

## โ Dev Env 
0. install npm & MongoDB Community on development machine
0. `git clone` this repo
0. `cp ./.env.dev` to `./.env`
0. `npm i`
0. `npm run dev`
<br>

## ๐ญ Prod Env 
0. install Docker on production machine
0. `git clone` this repo
0. `cp ./.compose.prod.yml` to `./.compose.yml` (add environment variables to suite your project)
0. `docker compose up -d --build` or use my shell command `sh ./prod.sh`
<br>
<br>

## ๐  Wishlist 
- add CORs in auth
- client side validation for strong passwords
- /pages/api/users/[id].js -- Don't give users permission to PATCH all user info
<br>