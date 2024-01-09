/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { IFlashcard, INewFlashcard } from "./shared/interfaces";

interface IAppContext {
	flashcards: IFlashcard[];
	handleSaveFlashcard: (newFlashcard: INewFlashcard) => Promise<{message: string}>;
}

interface IAppProvider {
	children: React.ReactNode;
}

const backendUrl = "http://localhost:4206";

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${backendUrl}/api/flashcards`);
			const _flashcards = response.data;
			setFlashcards(_flashcards);
		})();
	}, []);

	const handleSaveFlashcard = async (newFlashcard: INewFlashcard) => {
		return new Promise<{message: string}>((resolve, reject) => {
			(async () => {
				const headers = {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				};
				try {
					const response = await axios.post(
						`${backendUrl}/api/flashcards`,
						newFlashcard,
						{ headers }
					);

					if (response.status === 201) {
						const addedFlashcard: IFlashcard = response.data.flashcard;
						flashcards.push(addedFlashcard);
						const _flashcards = structuredClone(flashcards);
						setFlashcards(_flashcards);
						resolve({message: 'ok'});
					} else {
						reject({message: response.data.message});
					}
				} catch (e: any) {
						reject({message: `ERROR: ${e.message}`});
				}
			})();
		});
	};

	return (
		<AppContext.Provider
			value={{
				flashcards,
				handleSaveFlashcard,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
