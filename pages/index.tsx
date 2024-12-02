import Head from 'next/head';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';

import styles from '../styles/Login.module.scss';
import LoginBg from '../public/assets/loginBg.jpg';
import { ROUTES } from '../config/route';
import getInstance from '../utils/axios';
import { useEffect, useState } from 'react';

export default function Home(): React.ReactElement {
  const router: NextRouter = useRouter();
  const axios = getInstance()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSignIn = async () => {

    try {
      const response = await axios.post('/api/auth/local', {
        identifier: email,
        password: password,
      })
      console.log(response)
      localStorage.setItem('token', response.data.jwt)
      router.push(ROUTES.BROWSE)
    } catch (error) {
      console.log(error)
      alert("Erro ao efetuar login")
    }
  
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      router.replace(ROUTES.BROWSE)
    }
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <meta name='description' content='Netflix clone, made using Next.js' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Image src={LoginBg} alt='background image' placeholder='blur' layout='fill' className={styles.main__bgImage} />
        <div className={styles.main__card}>
          <h1>
            Nextflix
          </h1>
          <input type='text' name="email" className={styles.input} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
          <input type='password' name="email" className={styles.input} onChange={(e) => setPassword(e.target.value)} placeholder='Senha'/>
          <div className={styles.button} onClick={onSignIn}>Sign in</div>
        </div>
      </main>
    </div>
  );
}
