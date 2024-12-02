/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useContext } from 'react';

import Button from '../Button';
import { Media } from '../../types';
import { Play, Info } from '../../utils/icons';
import { ModalContext } from '../../context/ModalContext';
import styles from '../../styles/Banner.module.scss';
import getInstance from '../../utils/axios';



export default function Banner() {
  const [media, setMedia] = useState<any>();
  const random = Math.floor(Math.random() * 20);
  const { setModalData, setIsModal } = useContext(ModalContext);
  const axios = getInstance();

  const onClick = (data: any) => {
    setModalData(data);
    setIsModal(true);
  };

  const getMedia = async () => {
    try {
      const result = await axios.get('/api/banner-home?populate[]=banner');
      setMedia(result.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <div className={styles.spotlight}>
      <img src={`${media?.banner.url}`} alt='spotlight' className={styles.spotlight__image} />
      <div className={styles.spotlight__details}>
        <div className={styles.title}>{media?.title}</div>
        <div className={styles.synopsis}>{media?.descricao}</div>
        <div className={styles.buttonRow}>
          <Button label='Play' filled Icon={Play} />
        </div>
      </div>
    </div>
  );
}
