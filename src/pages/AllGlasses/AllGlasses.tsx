import { Layout } from "antd";
import EyeglassesList from "../../components/UI/EyeGlassesList";
const { Content } = Layout;
import styled from "styled-components";

const StyledHeading = styled.h2`
	align-items: center;
	display: flex;
	font-size: 20px;
	padding-bottom: 20px;
	font-weight: 700;
	@media (max-width: 768px) {
		font-size: 17px;
	}
`;

const AllGlasses = () => {
	return (
		<Layout>
			<Content>
				<div style={{ minHeight: 460 }}>
					<StyledHeading>Eye Glasses Collection</StyledHeading>
					<EyeglassesList />
				</div>
			</Content>
		</Layout>
	);
};

export default AllGlasses;
