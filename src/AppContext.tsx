import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { IFlashcard } from "./shared/interfaces";

interface IAppContext {
	flashcards: IFlashcard[]
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

	return (
		<AppContext.Provider
			value={{
				flashcards
			}}
		>
			{children}
		</AppContext.Provider>
	);
};