/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { SiOneplus } from "react-icons/si";
import { MdCancel } from "react-icons/md";
import { FaFloppyDisk } from "react-icons/fa6";
import { INewFlashcard, blankNewFlashcard } from "../shared/interfaces";

export const PageManageFlashcards = () => {
	const { flashcards, handleSaveFlashcard } = useContext(AppContext);
	const [isAdding, setIsAdding] = useState(false);
	const [newFlashcard, setNewFlashcard] = useState<INewFlashcard>(
		structuredClone(blankNewFlashcard)
	);

	const handleNewFlashcardFieldChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		fieldName: string
	) => {
		const value = e.target.value;
		switch (fieldName) {
			case "category":
				newFlashcard.category = value;
				break;
			case "front":
				newFlashcard.front = value;
				break;
			case "back":
				newFlashcard.back = value;
				break;
		}
		const _newFlashcard = structuredClone(newFlashcard);
		setNewFlashcard(_newFlashcard);
	};

	const handleCancelAddForm = () => {
		setNewFlashcard(structuredClone(blankNewFlashcard));
		setIsAdding(false);
	};

	const handleSaveAddForm = async () => {
		try {
			const response = await handleSaveFlashcard(newFlashcard);
			if (response.message === "ok") {
				handleCancelAddForm();
			}
		} catch (e: any) {
			console.log(e.message);
			alert(
				"Sorry, we cannot save the flaschard at this time. Try again later."
			);
		}
	};

	return (
		<>
			<p>There are {flashcards.length} flashcards:</p>
			<table className="mt-4 dataTable w-[80rem]">
				<thead>
					<tr>
						<th>SUIID</th>
						<th>Category</th>
						<th>Front</th>
						<th>Back</th>
						<th>
							<div className="flex justify-center">
								<SiOneplus
									onClick={() => setIsAdding(!isAdding)}
									className="text-2xl cursor-pointer text-[#222] hover:text-[#1d411b]"
								/>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{isAdding && (
						<tr>
							<td></td>
							<td>
								<input
									value={newFlashcard.category}
									onChange={(e) =>
										handleNewFlashcardFieldChange(
											e,
											"category"
										)
									}
									className="w-full"
								/>
							</td>
							<td>
								<input
									value={newFlashcard.front}
									onChange={(e) =>
										handleNewFlashcardFieldChange(
											e,
											"front"
										)
									}
									className="w-full"
								/>
							</td>
							<td>
								<input
									value={newFlashcard.back}
									onChange={(e) =>
										handleNewFlashcardFieldChange(e, "back")
									}
									className="w-full"
								/>
							</td>
							<td>
								<div className="flex gap-2">
									<FaFloppyDisk
										onClick={handleSaveAddForm}
										className="cursor-pointer text-[#222] hover:text-[#1d411b]"
									/>
									<MdCancel
										onClick={handleCancelAddForm}
										className="cursor-pointer text-[#222] hover:text-[#592727]"
									/>
								</div>
							</td>
						</tr>
					)}
					{flashcards.map((flashcard) => {
						return (
							<tr key={flashcard.suuid}>
								<td className="font-mono">{flashcard.suuid}</td>
								<td>{flashcard.category}</td>
								<td>{flashcard.front}</td>
								<td>{flashcard.back}</td>
								<td>
									<div className="flex gap-2">
										<FaPencilAlt className="cursor-pointer text-[#222] hover:text-[#1d411b]" />
										<FaRegTrashAlt className="cursor-pointer text-[#222] hover:text-[#592727]" />
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};
