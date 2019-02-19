import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

class Error extends React.Component {
  static getInitialProps({ req, query }) {
    return {
      code: query.code,
      message: query.message
    }
  }

  render() {
    return (
      <div>
        <Head>
          <title>GitChatApp</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/png" href="static/favicon.png" />
        </Head>
        <h3>{this.props.code} {this.props.message}</h3>
        <img src="static/gitchatapp.png" alt="Git Chat App" />
        <Link href="/">
          <a>Back To Home Page</a>
        </Link>
        <style jsx>{`
          div {
            margin-top: 50px;
            text-align: center;
          }
          h3 {
            color: rgb(126, 126, 126);
            display: block;
            font-size: 24px;
            margin-bottom: 22px;
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
  }
}

export default Error
