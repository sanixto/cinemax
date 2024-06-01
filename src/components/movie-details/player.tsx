import styles from './player.module.css';

export default function url({url} : {url: string}) {
  return (
    <div className={styles.player}>
      <iframe
        width="100%"
        height="100%"
        src={url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}