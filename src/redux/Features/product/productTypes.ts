import { BaseQueryApi } from "@reduxjs/toolkit/query";

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

export type TError = {
	data: {
		message: string;
		success: boolean;
	};
	status: number;
};

export type TMeta = {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
};
export type TResponz<T> = {
	data?: T;
	error?: TError;
	meta?: TMeta;
	success: boolean;
	message: string;
};

export type TResponseRedux<T> = TResponz<T> & BaseQueryApi;

export type TQueryParam = {
	text: string;
	value: string | number;
};
