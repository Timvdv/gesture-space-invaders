import { useState } from "react";

import styles from "./carousel.module.scss";
import data from "./carousel.json";

/**
 * This module handles all the logic required for the Carousel component
 * @constructor
 */
const Carousel = () => {
  const [currIndex, setCurrIndex] = useState(0);

  /**
   * @param {Number} index - Index of page to show
   */
  const showPage = (index: number) => {
    setCurrIndex(index);
  };

  /**
   * @param {Event} e - Handle click event emitted by the prev button
   */
  const goToPrevPage = (e) => {
    let nextIndex = currIndex - 1;

    // Set nextIndex to last page if required page is negative
    if (nextIndex < 0) {
      nextIndex = data.pages.length - 1;
    }

    showPage(nextIndex);

    e.preventDefault();
  };

  /**
   * @param {Event} e - Handle click event emitted by the next button
   */
  const goToNextPage = (e) => {
    let nextIndex = currIndex + 1;

    // Set nextIndex to first page if exceeding amount of pages
    if (nextIndex > data.pages.length - 1) {
      nextIndex = 0;
    }

    showPage(nextIndex);

    e.preventDefault();
  };

  return (
    <div className={styles.carousel}>
      <ul className={styles.carousel__pages}>
        {data.pages.map((page, index: number) => (
          <li
            className={styles.carousel__page}
            key={page.heading}
            aria-hidden={index !== currIndex}
          >
            <h3>{page.heading}</h3>
            <p>{page.copy}</p>

            <picture>
              {page.image.sources.map((source) => (
                <source
                  key={source.src}
                  srcSet={source.src}
                  media={source.media}
                />
              ))}

              <img src={page.image.src} alt={page.image.alt} />
            </picture>
          </li>
        ))}
      </ul>

      <div className={styles.carousel__actions}>
        <button className={styles.carousel__action} onClick={goToPrevPage}>
          {data.actions.previous}
        </button>
        <button className={styles.carousel__action} onClick={goToNextPage}>
          {data.actions.next}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
