export interface EyeglassesAttributes {
	name: string;
	profileImg?: string | undefined;
	price: number;
	quantity: number;
	frameMaterial: string;
	frameShape: string;
	lensType: string;
	brand: string;
	color: string;
	priceRange: string;
	gender: string;
	isDeleted: boolean;
}

export interface Product {
	id: string;
	name: string;
	profileImg?: string | undefined;
	price: number;
	quantity: number;
	frameMaterial: string;
	frameShape: string;
	lensType: string;
	brand: string;
	color: string;
	priceRange: string;
	gender: string;
	isDeleted: boolean;
}
