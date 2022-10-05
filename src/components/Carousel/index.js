import styles from "./Carousel.module.scss";
import banner from "../../../public/assets/banner.png";
import smallBanner from "../../../public/assets/banner-small.png";

import Image from "next/image";
import { useMediaQuery } from "@react-hook/media-query";

export default function Carousel() {
	const isGreaterThan500px = useMediaQuery(
		"only screen and (min-width: 500px)"
	);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{isGreaterThan500px ? (
					<Image
						src={banner}
						alt="banner"
						quality={100}
						layout="fill"
						objectFit="cover"
						objectPosition="center"
						priority
					/>
				) : (
					<Image
						src={smallBanner}
						alt="banner"
						quality={100}
						layout="fill"
						objectFit="cover"
						objectPosition="center"
						priority
					/>
				)}
			</div>
		</div>
	);
}
