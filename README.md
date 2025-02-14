<h1 align="center">Базовая регистрация и авторизация для <a href="https://github.com/Gml-Launcher/Gml.Launcher" target="_blank">GML Launcher</a></h1>

<h3 align="left">Инструменты:</h3>
<h4 align="left">discord.js, express, mongoose</h4>

<h2 align="left">Информация:</h2>
<h4 align="left">Для работы используется база данных MongoDB. Для того чтобы функционировала регистрация пользователей, необходимо создать базу данных в <a href="https://www.mongodb.com/" target="_blank">MongoDB</a>.</h4>
<h4 align="left">В директории <strong>Auth_Backend</strong> в файле <code>.env</code> нужно указать свои данные.</h4>
<h4 align="left">В директории <strong>Discord_Auth_Bot</strong> в файле <code>.env</code> тоже укажи свои данные.</h4>

<h3 align="left">API</h3>
<p align="left">
  <strong>http://localhost:9000/api/registration</strong> - API Endpoint для регистрации пользователей.
</p>
<p align="left">
  <strong>http://localhost:9000/api/auth</strong> - API для авторизации, к этому API обращается GML Backend.
</p>

<h3 align="left">Bot Commands</h3>
<pre><code>/registration <Login> <Password> <Email></code></pre>

<h2 align="left">Установка:</h2>
<h4 align="left">Проинициализируй зависимости в обеих папках:</h4>
<pre><code>npm install</code></pre>

<h4 align="left">Запусти оба проекта:</h4>
<pre><code>npm run dev</code></pre>

<h4 align="left">В GML Frontend - Интеграции - Авторизация - Укажи API endpoint авторизации.</h4>
