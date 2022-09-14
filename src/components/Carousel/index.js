import styles from "./Carousel.module.scss";
import banner from "../../../public/assets/banner.jpeg";
import Image from "next/image";

export default function Carousel() {
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
}
