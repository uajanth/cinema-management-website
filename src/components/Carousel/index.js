import styles from "./Carousel.module.scss";
import banner from "../../../public/assets/banner.jpeg";
import Image from "next/image";

export default function Carousel() {
	return (
		<div className={styles.container}>
			<Image
				src={banner}
				alt="cobra banner"
				width="1200"
				height="400"
				layout="intrinsic"
				style={{
					objectFit: "cover",
					position: "absolute",
					top: 0,
					left: 0,
					maxHeight: "100%",
				}}
			/>
		</div>
	);
}
