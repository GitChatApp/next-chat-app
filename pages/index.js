import Head from 'next/head'
import Link from 'next/link'

const Index = () => (
  <div>
    <Head>
      <title>GitChatApp</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/png" href="static/favicon.png" />
    </Head>
    <img src="static/gitchatapp.png" alt="Git Chat App" />
    <Link href="/chatroom">
      <a>Chat Room</a>
    </Link>
    <style jsx>{`
      div {
        margin-top: 100px;
        text-align: center;
      }
      img {
        display: block;
        margin: 0 auto;
      }
      a {
        color: rgb(65, 210, 145);
        font-size: 20px;
      }
    `}</style>
    <style global jsx>{`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      body {
        background-color: rgb(231, 234, 237);
        font-family: sans-serif;
      }
    `}</style>
  </div>
)

export default Index
