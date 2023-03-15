import React, { useState } from 'react';

import styles from '../../styles/Actor.module.css';
import ActorFilms from '../ActorFilms';
import GetButton from '../GetButton';
import MoreText from '../MoreText';

const ActorItem = ({
  id,
  birthDate,
  birthPlace,
  image: { url },
  name,
  realName,
  miniBios,
  gender,
}) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={styles.wrap}>
      <GetButton text="Back" />

      <div className={styles.actor}>
        <div className={styles.names}>
          <div className={styles.name}>{name}</div>
          <div className={styles.realName}>{realName}</div>
        </div>

        <div className={styles.info}>
          <div className={styles.image} style={{ backgroundImage: `url(${url})` }} />

          <div className={styles.content}>
            <div className={styles.dates}>
              {/* <div>{gender}</div> gender */}
              {birthDate && (
                <div className={styles.birthday}>{new Date(birthDate).getFullYear()}</div>
              )}
              <div className={styles.place}>{birthPlace}</div>
            </div>

            {miniBios?.length && (
              <div className={styles.bio}>
                <MoreText text={miniBios[0].text} desiredLenght={1000} />
              </div>
            )}
          </div>
        </div>

        {isOpen && <ActorFilms id={id} />}

        <div className={styles.more} onClick={() => setOpen(!isOpen)}>
          {isOpen ? 'Hide' : 'Show'} filmography
        </div>
      </div>
    </div>
  );
};

export default ActorItem;
