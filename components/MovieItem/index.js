import Image from 'next/image';
import React, { useState } from 'react';

import movieImg from '../../images/default-movie.jpg';
import styles from '../../styles/Movie.module.css';
import { convertDuration, getIdFromKey, getRandom } from '@/utils/common';
import Cast from '../Cast';
import Reviews from '../Reviews';
import { useRouter } from 'next/router';
import { useAppStore } from '@/store/store';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
import Preloader from '../Preloader';

const MovieItem = ({
  id,
  title: { title, image, year, runningTimeInMinutes: duration },
  ratings: { rating },
  plotSummary: plot,
  plotOutline: shortPlot,
  genres,
}) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const { setItems } = useAppStore();
  const [isLoading, setLoading] = useState(false);

  const getByGenre = async (genre) => {
    if (isLoading) return;

    setLoading(true);
    const type = genre.replaceAll(' ', '-').toLowerCase();
    const { data } = await axios.get(`${BASE_URL}/api/genres?genre=${type}`);

    const random = getRandom(data.length);
    const id = getIdFromKey(data[random]);

    await setItems(data);
    router.push(`${BASE_URL}/${id}`).then(() => setLoading(false));
  };

  return (
    <>
      {isLoading ? (
        <div className={styles.centered}>
          <Preloader />
        </div>
      ) : (
        <div className={styles.movie}>
          <div className={styles.title}>
            <h1 className={styles.h1}>{title}</h1>
            {rating && (
              <div className={styles.rating}>
                <span>IMDb</span> {rating}
              </div>
            )}
          </div>

          <div className={styles.content}>
            <div className={styles.image}>
              <Image
                src={image ? image.url : movieImg}
                alt={title}
                width={image ? image.width : '300'}
                height={image ? image.height : '300'}
                quality="0.5"
              />
            </div>

            <div className={styles.info}>
              <div className={styles.about}>
                {year && <div className={styles.year}>{year}</div>}
                {duration && <div className={styles.duration}>{convertDuration(duration)}</div>}
              </div>

              <div className={styles.plot}>{plot?.text || shortPlot?.text}</div>

              <div className={styles.genres}>
                {genres.map((genre) => (
                  <div
                    key={genre}
                    className={`${styles.genre} ${isLoading ? 'disabled' : ''}`}
                    onClick={() => getByGenre(genre)}>
                    {genre}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {isOpen && (
            <>
              <Cast id={id} />
              <Reviews id={id} />
            </>
          )}

          <div
            className={styles.more}
            onClick={() => {
              setOpen(!isOpen);
            }}>
            {isOpen ? 'Hide info' : 'View more info'}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieItem;
