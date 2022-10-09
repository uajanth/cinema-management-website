import SyncLoader from "react-spinners/SyncLoader";
export default function Loader({ color, loading }) {
	return (
		<div
			style={{
				width: "100%",
				height: "200px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<SyncLoader loading={loading} color={color} />
		</div>
	);
}
