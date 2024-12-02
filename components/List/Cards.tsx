/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react';
import dynamic from 'next/dynamic';

import { Genre, Media } from '../../types';
import styles from '../../styles/Cards.module.scss';
import { ModalContext } from '../../context/ModalContext';
import { Add, Play, Down, Like, Dislike } from '../../utils/icons';

const Button = dynamic(import('../Button'));

interface CardsProps {
  defaultCard?: boolean;
  item: any;
}

export default function Cards({ defaultCard = true, item }: CardsProps): React.ReactElement {
  const style = defaultCard ? styles.card : styles.longCard;
  const infoStyle = defaultCard ? styles.cardInfo : styles.more;
  const { nome, imagem, imagem_grande, rating, link } = item;
  
  const { setModalData, setIsModal } = useContext(ModalContext);

  const onClick = (data: Media) => {
    setModalData(data);
    setIsModal(true);
  };

  const openLink = () => {
    window.open(link, '_blank')  
  }

  return (
    <div className={style}>
      <img src={`${imagem.url}`} alt='img' className={styles.cardPoster} />
      <div className={infoStyle}>
        <div className={styles.actionRow}>
          <div className={styles.actionRow}>
            <Button Icon={Play} rounded filled onClick={() => openLink()}/>
           </div>
          <Button Icon={Down} rounded onClick={() => onClick(item)} />
        </div>
        <div className={styles.textDetails}>
          <strong>{nome}</strong>
        </div>
      </div>
    </div>
  );
}
