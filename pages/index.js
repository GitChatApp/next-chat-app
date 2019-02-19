import Head from 'next/head'
import Link from 'next/link'

import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()

const Index = () => (
  <div>
    <Head>
      <title>GitChatApp</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/png" href="static/favicon.png" />
    </Head>
    <img src="static/gitchatapp.png" alt="Git Chat App" />
    <Link href={`https://github.com/login/oauth/authorize?client_id=${publicRuntimeConfig.client_id}`}>
      <a>Login With GitHub</a>
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
        color: rgb(70, 190, 255);
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
