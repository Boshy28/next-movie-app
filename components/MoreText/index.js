import { useState } from 'react';
import styles from '../../styles/MoreText.module.css';

const MoreText = ({ text, desiredLenght = 100 }) => {
  const isFull = text.length < desiredLenght;
  const fullText = !isFull ? `${text.slice(0, desiredLenght)}...` : text;
  const [isOpen, setOpen] = useState(false);

  const longText =
    text.length < 2000
      ? { height: 'max-content', overflowY: 'unset' }
      : { height: '80vh', overflowY: 'scroll' };

  const handleClick = () => setOpen(!isOpen);

  return (
    <>
      <div>
        <div className={styles.text}>
          {fullText}

          {!isFull && (
            <div className={styles.more} onClick={handleClick}>
              Read more...
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <>
          <div
            className={styles.modal}
            style={{ height: longText.height, overflowY: longText.overflowY }}>
            <span onClick={handleClick}>✖</span>
            {text}
          </div>

          <div onClick={handleClick} className={styles.overlay} />
        </>
      )}
    </>
  );
};

export default MoreText;
