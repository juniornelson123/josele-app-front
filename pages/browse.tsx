/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic';
import React, { useContext, useEffect, useState } from 'react';

import { ModalContext } from '../context/ModalContext';
import styles from '../styles/Browse.module.scss';
import { Section } from '../types';
import getInstance from '../utils/axios';

const List = dynamic(import('../components/List'));
const Modal = dynamic(import('../components/Modal'));
const Layout = dynamic(import('../components/Layout'));
const Banner = dynamic(import('../components/Banner'));

export default function Browse(): React.ReactElement {
  const { isModal } = useContext(ModalContext);
  const [sections, setSections ] = useState<Section[]>([]);
  const axios = getInstance();
 

  const getDataCategoria = async () => {
    try {
      const result = await axios.get("/api/categorias");
      setSections(result.data.data)
    } catch (error) {}  
  }
  
  useEffect(() => {
    getDataCategoria()
  }, [])

  return (
    <>
      {isModal && <Modal />}
      <Layout>
        <Banner />
        <div className={styles.contentContainer}>
          {sections.map((item, index) => {
            return (
              <List
                key={index}
                heading={item.nome}
                endpoint={`/api/midias?populate[]=categoria&populate[]=imagem&populate[]=imagem_grande&filters[categoria][documentId][$eq]=${item.documentId}`}
                defaultCard={item?.defaultCard}
                topList={item?.topList}
              />
            );
          })}
        </div>
      </Layout>
    </>
  );
}
