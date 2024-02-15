/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input } from "antd";

const { Search } = Input;

const SearchFilter = ({
	placeholder,
	filterFn,
	confirm,
	clearFilters,
}: any) => (
	<div style={{ padding: 8 }}>
		<Search
			placeholder={placeholder}
			onChange={(e) => filterFn(e.target.value)}
			onPressEnter={() => confirm()}
			style={{ width: 188, marginBottom: 8, display: "block" }}
		/>
		<Button
			type="primary"
			onClick={() => confirm()}
			size="small"
			style={{ width: 90, marginRight: 8 }}
		>
			Search
		</Button>
		<Button
			onClick={() => clearFilters()}
			size="small"
			style={{ width: 90 }}
		>
			Reset
		</Button>
	</div>
);

export default SearchFilter;
