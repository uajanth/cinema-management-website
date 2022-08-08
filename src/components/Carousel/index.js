import styles from "./Carousel.module.scss";

export default function Carousel() {
<<<<<<< Updated upstream
	return <div className={styles.container}></div>;
=======
	return (
		<div className={styles.container}>
			<Image
				src={banner}
				alt="cobra banner"
				quality={100}
				layout="fill"
				objectFit="cover"
				objectPosition="center"
				priority
			/>
		</div>
	);
>>>>>>> Stashed changes
}
