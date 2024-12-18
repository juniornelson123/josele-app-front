import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { Media } from '../../types';
import styles from '../../styles/Cards.module.scss';
import getInstance from '../../utils/axios';

const Cards = dynamic(import('./Cards'));
const FeatureCard = dynamic(import('./FeatureCards'));

interface ListProps {
  defaultCard?: boolean;
  heading: string;
  topList?: boolean;
  endpoint: string;
}

export default function List({
  defaultCard = true,
  heading,
  topList = false,
  endpoint
}: ListProps): React.ReactElement {
  const [media, setMedia] = useState<Media[]>([]);
  const axios = getInstance();
 
 
  async function getEndpoint() {
    try {
      const result = await axios.get(endpoint);
      console.log(result)
      setMedia(result.data.data);
    } catch (error) {}
  }

  useEffect(() => {
    getEndpoint();
  }, []);

  return (
    <div className={styles.listContainer}>
      <strong className={styles.category}>{heading}</strong>
      <div className={styles.cardRow}>
        {media?.map((item, index) => {
          if (topList) {
            if (index < 10) {
              return <FeatureCard key={index} index={index + 1} item={item} />;
            }
          } else {
            return (
              <Cards
                key={index}
                defaultCard={defaultCard}
                item={item}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
