export interface INewFlashcard {
	category: string;
	front: string
	back: string;
}

export const blankNewFlashcard = {
	category: '',
	front: '',
	back: ''
}

export interface IFlashcard extends INewFlashcard {
	suuid: string;
}

export interface IPatchFlashcard {
	category?: string;
	front?: string
	back?: string;
}

export interface IDatabase {
	flashcards: IFlashcard[];
}
