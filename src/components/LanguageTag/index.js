import styles from "./LanguageTag.module.scss";

export default function LanguageTag({ language }) {
	return (
		<div className={styles.container}>
			<p>{language}</p>
		</div>
	);
}
