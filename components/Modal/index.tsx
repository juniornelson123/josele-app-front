/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react';
import styles from '../../styles/Modal.module.scss';
import { ModalContext } from '../../context/ModalContext';
import { Play, Add, Like, Dislike } from '../../utils/icons';
import Button from '../Button';
import { Genre } from '../../types';

export default function Modal() {
  const { modalData, setIsModal, isModal } = useContext(ModalContext);
  const { nome, imagem, descricao, link, genre } = modalData;

  const openLink = () => {
    window.open(link, '_blank')  
  }

  return (
    <div className={styles.container} style={{ display: isModal ? 'flex' : 'none' }}>
      <div className={styles.overlay} onClick={() => setIsModal(false)}></div>
      <div className={styles.modal}>
        <div className={styles.spotlight}>
          <img src={`${imagem.url}`} alt='spotlight' className={styles.spotlight__image} />
          <div className={styles.details}>
            <div className={styles.title}>{nome}</div>
            <div className={styles.buttonRow}>
              <Button label='Play' filled Icon={Play} onClick={() => openLink()}/>
            </div>
          </div>
        </div>

        <div className={styles.cross} onClick={() => setIsModal(false)}>
          &#10005;
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.column}>{descricao}</div>
        </div>
      </div>
    </div>
  );
}

