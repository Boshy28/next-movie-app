import { getIdFromKey } from '@/utils/common';
import { BASE_URL } from '@/utils/constants';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import styles from '../../styles/Cast.module.css';
import Preloader from '../Preloader';

const Cast = ({ id }) => {
  const [cast, setCast] = useState([]);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      setPending(true);
      const { data } = await axios.get(`${BASE_URL}/api/cast?id=${getIdFromKey(id)}/`);

      setCast([...data.cast.slice(0, 7)]);
      setPending(false);
    };
    fetchCast();
  }, [id]);

  return (
    <div className={styles.cast}>
      <h2 className={styles.heading}>Cast</h2>
      {isPending ? (
        <Preloader />
      ) : (
        <div className={styles.list}>
          {cast.map(({ characters, id, image, name }) => (
            <Link className={styles.item} href={`${BASE_URL}/actor/${getIdFromKey(id)}/`} key={id}>
              <div className={styles.image} style={{ backgroundImage: `url(${image?.url})` }} />

              <div className={styles.info}>
                <div className={styles.name}>{name}</div>
                {characters?.length && <div className={styles.character}>{characters[0]}</div>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cast;
