/* eslint-disable @typescript-eslint/no-unused-vars */
export interface Sale {
	eyeglassId?: TEyeGlasses;
	quantity: number;
	buyerName: string;
	saleDate: string;
}

export interface TEyeGlasses {
	_id: string;
}
