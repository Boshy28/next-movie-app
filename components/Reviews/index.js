import { getIdFromKey } from '@/utils/common';
import { BASE_URL } from '@/utils/constants';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import styles from '../../styles/Reviews.module.css';
import MoreText from '../MoreText';
import Preloader from '../Preloader';

const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setPending(true);
      const { data } = await axios.get(`${BASE_URL}/api/reviews?id=${getIdFromKey(id)}`);

      setReviews(data.reviews);
      setPending(false);
    };
    fetchReviews();
  }, [id]);

  return (
    <div className={styles.list}>
      <h2>Reviews</h2>
      {isPending ? (
        <Preloader />
      ) : reviews?.length ? (
        <div className={styles.container}>
          <div className={styles.reviews}>
            {reviews.map(
              ({
                author: { displayName, userId },
                authorRating,
                reviewText,
                reviewTitle,
                submissionDate,
              }) => (
                <div className={styles.review} key={`${userId}_${reviewTitle}`}>
                  <div className={styles.user}>
                    <div className={styles.header}>
                      <div className={styles.author}>{displayName}</div>
                      <div className={styles.date}>{submissionDate}</div>
                    </div>

                    {authorRating && (
                      <div className={styles.rating}>
                        <span>{authorRating}</span> / 10
                      </div>
                    )}
                  </div>

                  <div className={styles.content}>
                    <div className={styles.title}>{reviewTitle}</div>
                    <MoreText text={reviewText} desiredLenght={300} />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      ) : (
        <div className={styles.results}>No reviews yet</div>
      )}
    </div>
  );
};

export default Reviews;
