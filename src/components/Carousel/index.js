import styles from "./Carousel.module.scss";
import banner from "../../../public/assets/banner.png";
import Image from "next/image";

export default function Carousel() {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<Image
					src={banner}
					alt="banner"
					quality={100}
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					priority
				/>
			</div>
		</div>
	);
}
